const api = {
  headers: {
    'Content-Type': 'application/json',
    'X-Base': '2',
    'X-Fields': 'id, model__name, model__manufacturer__name, local_total_price',
  },
  path: 'https://client.hoppycar.com/api/car/browser/',
  pickUpDistance: 1000,
  requestPath: ({ dateRange, latitude, longitude, pickUpDistance }) =>
    `${api.path}?available__between=${dateRange}&pick_up_distance=${latitude},${
      longitude
    },${pickUpDistance}`,
};

export default api;
