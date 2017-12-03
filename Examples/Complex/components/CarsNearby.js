// @flow
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import withLocation from './withLocation';
import api from '../config/api';
import config from '../config';
import Car from './Car';
import { getTomorrowDateRange } from '../lib/date';
import { dirs, fetchToFile, loadFromFile } from '../lib/fetchBlob';

const carsNearbyPath = `${dirs.CacheDir}${config.cachePath}${
  config.carsNearbyFileName
}`;

type CarObject = {
  id: number,
  model: {
    name: string,
    manufacturer: {
      name: string,
    },
  },
  local_total_price: {
    amount: string,
    currency: string,
    verbose: string,
  },
};

type CarsNearbyState = {
  carsNearby: Array<CarObject>,
  error: ?string,
  isFetching: boolean,
};

type CarsNearbyProps = {
  latitude: number,
  longitude: number,
};

type loadNearbyCarsProps = {
  dateRange: string,
  latitude: number,
  longitude: number,
  pickUpDistance: number,
};

class CarsNearby extends Component<CarsNearbyProps, CarsNearbyState> {
  constructor(props) {
    super(props);

    this.state = {
      carsNearby: [],
      error: null,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.loadNearbyCars();
  }

  componentDidUpdate(prevProps, prevState) {
    const { latitude, longitude } = this.props;
    const { isFetching } = this.state;
    if (
      !isFetching &&
      (latitude !== prevProps.latitude || longitude !== prevProps.longitude)
    ) {
      this.fetchNearbyCars({
        dateRange: getTomorrowDateRange(new Date()),
        latitude,
        longitude,
        pickUpDistance: api.pickUpDistance,
      });
    } else if (prevState.isFetching && !isFetching) {
      this.loadNearbyCars();
    }
  }

  fetchNearbyCars = async ({
    dateRange,
    latitude,
    longitude,
    pickUpDistance,
  }: loadNearbyCarsProps): Promise<any> => {
    this.setState({
      isFetching: true,
    });
    try {
      await fetchToFile({
        headers: api.headers,
        path: carsNearbyPath,
        requestPath: api.requestPath({
          dateRange,
          latitude,
          longitude,
          pickUpDistance,
        }),
      });
      this.setState({
        error: null,
        isFetching: false,
      });
    } catch (error) {
      this.setState({ error, isFetching: false });
    }
  };

  loadNearbyCars = async () => {
    try {
      const carsNearby = await loadFromFile({ path: carsNearbyPath });
      this.setState({
        carsNearby: JSON.parse(carsNearby),
        error: null,
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { carsNearby, error, isFetching } = this.state;
    if (error) {
      return <Text>{error}</Text>;
    }
    if (isFetching && carsNearby && !carsNearby.length) {
      return <ActivityIndicator style={styles.container} />;
    }
    return (
      <View style={styles.container}>
        {carsNearby &&
          carsNearby.map(car => (
            <Car
              key={car.id}
              manufacturer={car.model.manufacturer.name}
              model={car.model.name}
              price={car.local_total_price.verbose}
            />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withLocation(CarsNearby);
