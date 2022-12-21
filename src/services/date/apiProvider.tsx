import { fr } from "date-fns/locale";
import {
  Locale,
  format,
  parseISO,
  formatRelative as apiFormatRelative,
} from "date-fns";

interface DateAPI {
  locale: Locale;
  formatDate: (
    date: Date,
    dateFormat?: string,
    options?: DateFNSFormatOptions,
  ) => string;
  formatISO: (
    iso: string,
    dateFormat?: string,
    options?: DateFNSFormatOptions,
  ) => string;
  formatRelative: (date: Date, options?: DateFNSFormatOptions) => string;
}

type DateFNSFormatOptions = {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
};

const locale = fr;

export function useDate(): DateAPI {
  const formatDate = (
    date: Date,
    dateFormat: string = "PP",
    options: DateFNSFormatOptions = { locale },
  ) => {
    return format(date, dateFormat, options);
  };

  const formatISO = (
    iso: string,
    dateFormat: string = "PP",
    options: DateFNSFormatOptions = { locale },
  ) => {
    return formatDate(parseISO(iso), dateFormat, options);
  };

  const formatRelative = (
    date: Date,
    options: DateFNSFormatOptions = { locale },
  ) => {
    return apiFormatRelative(date, new Date(), options);
  };

  return {
    locale,
    formatDate,
    formatISO,
    formatRelative,
  };
}
