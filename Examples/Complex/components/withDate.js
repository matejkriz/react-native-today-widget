// @flow
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import type { ComponentType } from 'react';

type CurrentDateState = {};

type CurrentDateProps = any;

const CurrentDate = (ComposedComponent: ComponentType<any>) =>
  class extends Component<CurrentDateProps, CurrentDateState> {
    render() {
      return <ComposedComponent {...this.props} date={new Date()} />;
    }
  };

export default CurrentDate;
