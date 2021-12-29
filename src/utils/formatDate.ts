import {format} from 'date-fns';
import getMonth from 'date-fns/getMonth';

const MONTH_MAP = new Map(
  Object.entries({
    12: 'dec',
    11: 'nov',
    10: 'oct',
    9: 'sep',
    7: 'aug',
    6: 'jul',
    5: 'jun',
    4: 'may',
    3: 'apr',
    2: 'mar',
    1: 'feb',
    0: 'jan',
  }),
);

export const formatDate = (date: Date): string => {
  return format(date, 'MMM. d');
};
