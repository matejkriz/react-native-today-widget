import { parsePrice } from './price';

it('removes zero pennies', () => {
  expect(parsePrice({ price: '42.00 Kč' })).toEqual('42 Kč');
  expect(parsePrice({ price: '1.00 Kč' })).toEqual('1 Kč');
  expect(parsePrice({ price: '1.0000' })).toEqual('1');
  expect(parsePrice({ price: '1.0' })).toEqual('1');
});

it('keep non-zero pennies', () => {
  expect(parsePrice({ price: '42.80 Kč' })).toEqual('42.80 Kč');
  expect(parsePrice({ price: '1.8 Kč' })).toEqual('1.8 Kč');
  expect(parsePrice({ price: '1.42' })).toEqual('1.42');
  expect(parsePrice({ price: '1.4' })).toEqual('1.4');
});

it('replace comma with space', () => {
  expect(parsePrice({ price: '42,000,243,000 Kč' })).toEqual(
    '42 000 243 000 Kč',
  );
});

it('remove pennies and replace commas with space', () => {
  expect(parsePrice({ price: '42,123.00 Kč' })).toEqual('42 123 Kč');
});
