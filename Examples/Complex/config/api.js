const api = {
  headers: {
    'Content-Type': 'application/json',
    'X-Base': 2,
    'X-Fields': 'id, model__name, model__manufacturer__name, local_total_price',
  },
  path: 'https://client.hoppycar.com/api/car/browser/',
  pickUpDistance: 1000,
};

export default api;
