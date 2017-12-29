import 'react-native';
import React from 'react';
import CarsNearby from '../CarsNearby';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

/* eslint-disable react/prefer-stateless-function */
jest.mock('../withDate', () => {
  const React = require('react');
  return ComposedComponent =>
    class extends React.Component {
      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
});
/* eslint-disable react/no-multi-comp */
jest.mock('../withLocation', () => {
  const React = require('react');
  return ComposedComponent =>
    class extends React.Component {
      render() {
        return <ComposedComponent {...this.props} />;
      }
    };
});

jest.mock('../../lib/fetchBlob', () => ({
  dirs: { cacheDir: 'cache/dir/' },
  fetchToFile: () => Promise.resolve('resolved'),
  loadFromFile: () => mockCarsNearbyBlob,
}));

test('renders correctly', async () => {
  const component = await renderer.create(
    <CarsNearby latitude={50} longitude={14} date={new Date(2017, 12, 1)} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const mockCarsNearbyBlob = `[
    {
        "id": 685,
        "model": {
            "name": "Octavia Combi 2.0 TDI",
            "manufacturer": {
                "name": "Škoda"
            }
        },
        "local_total_price": {
            "amount": "993.00",
            "currency": "CZK",
            "verbose": "993.00 Kč"
        }
    },
    {
        "id": 617,
        "model": {
            "name": "Cee'd 1.6 CRDi 90",
            "manufacturer": {
                "name": "Kia"
            }
        },
        "local_total_price": {
            "amount": "993.00",
            "currency": "CZK",
            "verbose": "993.00 Kč"
        }
    },
    {
        "id": 562,
        "model": {
            "name": "CLK Coupe 320 CDI",
            "manufacturer": {
                "name": "Mercedes"
            }
        },
        "local_total_price": {
            "amount": "999.00",
            "currency": "CZK",
            "verbose": "999.00 Kč"
        }
    },
    {
        "id": 544,
        "model": {
            "name": "330d Cabrio",
            "manufacturer": {
                "name": "BMW"
            }
        },
        "local_total_price": {
            "amount": "1536.00",
            "currency": "CZK",
            "verbose": "1,536.00 Kč"
        }
    }
]`;
