import { formateDate, getTomorrowDate, getTomorrowDateRange } from './date';

it('get the day after', () => {
  expect(getTomorrowDate(new Date(1510909200000))).toEqual(
    new Date(1510995600000),
  );
});

it('convert date to YYYY-MM-DDTHH:MM formate', () => {
  expect(formateDate(new Date(1510909200000))).toBe('2017-11-17T09:00');
});

it('get date range', () => {
  expect(getTomorrowDateRange(new Date(1510909200000))).toBe(
    '2017-11-18T09:00,2017-11-19T09:00',
  );
});
