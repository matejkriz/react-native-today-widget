// @flow
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import withLocation from './withLocation';
import api from '../config/api';
import Car from './Car';
import { getTomorrowDateRange } from '../lib/date';

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
    };
  }

  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props;
    if (prevProps.latitude !== latitude || prevProps.longitude !== longitude) {
      this.loadNearbyCars({
        dateRange: getTomorrowDateRange(new Date()),
        latitude,
        longitude,
        pickUpDistance: api.pickUpDistance,
      });
    }
  }

  loadNearbyCars = async ({
    dateRange,
    latitude,
    longitude,
    pickUpDistance,
  }: loadNearbyCarsProps): Promise<any> => {
    try {
      const response = await fetch(
        `${api.path}?available__between=${dateRange}&pick_up_distance=${
          latitude
        },${longitude},${pickUpDistance}`,
      );
      const responseJson = await response.json();
      this.setState({ carsNearby: responseJson, error: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { carsNearby, error } = this.state;
    const isLoading = !carsNearby.length;
    if (error) {
      return null;
    }
    if (isLoading) {
      return <ActivityIndicator style={styles.container} />;
    }
    return (
      <View style={styles.container}>
        {carsNearby
          .slice(0, 2)
          .map(car => (
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
