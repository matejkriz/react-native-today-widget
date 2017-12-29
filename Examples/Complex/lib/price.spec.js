import { parsePrice } from './price';

it('remove penny', () => {
  expect(parsePrice({ price: '42.00 Kč' })).toEqual('42 Kč');
  expect(parsePrice({ price: '1.00 Kč' })).toEqual('1 Kč');
  expect(parsePrice({ price: '1.0000' })).toEqual('1');
  expect(parsePrice({ price: '1.0' })).toEqual('1');
});

it('replace comma with space', () => {
  expect(parsePrice({ price: '42,000,243,000 Kč' })).toEqual(
    '42 000 243 000 Kč',
  );
});

it('remove penny and replace comma with space', () => {
  expect(parsePrice({ price: '42,123.00 Kč' })).toEqual('42 123 Kč');
});
