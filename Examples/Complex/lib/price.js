// @flow
type priceProp = {
  price: string,
};

export const parsePrice = ({ price }: priceProp) =>
  price.replace(/\.0+/, '').replace(/,/g, ' ');
