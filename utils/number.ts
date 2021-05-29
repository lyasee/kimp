import { Platform } from 'react-native';

export const toLocaleString = (value: number) => {
  if (Platform.OS === 'ios') {
    return value.toLocaleString();
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const convertToInternationalCurrency = (value: string | number) => {
  return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
    : Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
    : Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(value));
};
