import parseISO from 'date-fns/parseISO';
import {utcToZonedTime, format} from 'date-fns-tz';
import * as RNLocalize from 'react-native-localize';

export const formatDate = (date: Date): string => {
  const timeZone = RNLocalize.getTimeZone();

  const zonedTime = utcToZonedTime(date, timeZone);

  return format(zonedTime, 'h:m MMM. d');
};
