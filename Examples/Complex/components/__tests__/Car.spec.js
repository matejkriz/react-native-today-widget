import 'react-native';
import React from 'react';
import Car from '../Car';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Car id={1} manufacturer="manufacturer" model="model" price="1 042 Kč" />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
