// @flow
import config from '../config';
import { openURL } from 'react-native-today-widget';

type openInAppProps = {
  url?: string,
};

export const openInApp = ({ url }: openInAppProps) => {
  const link = `${config.inappLinks.base}${url || ''}`;
  openURL(link);
};
