// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import watchPositionOptions from '../config/geolocation';

type GeolocationState = {
  error: ?string,
  latitude: ?number,
  longitude: ?number,
};

type GeolocationProps = any;

const Geolocation = (ComposedComponent: ComponentType<any>) =>
  class extends Component<GeolocationProps, GeolocationState> {
    constructor(props: GeolocationProps) {
      super(props);

      this.state = {
        error: null,
        latitude: null,
        longitude: null,
      };
    }

    componentDidMount() {
      if ('geolocation' in navigator) {
        this.geolocation = navigator.geolocation.watchPosition(
          position => {
            this.setState({
              error: null,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => this.setState({ error: error.message }),
          watchPositionOptions,
        );
      }
    }

    componentWillUnmount() {
      if ('geolocation' in navigator) {
        navigator.geolocation.clearWatch(this.geolocation);
      }
    }

    geolocation: any;

    render() {
      const { error, latitude, longitude } = this.state;

      if (error) {
        return null;
      }

      return (
        <ComposedComponent
          {...this.props}
          latitude={latitude}
          longitude={longitude}
        />
      );
    }
  };

export default Geolocation;
