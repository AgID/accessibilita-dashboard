import { locale } from "./i18n";

let lingua;
let uno = "";
let due = "";
let tre = "";
let quattro = "";
let periodo = "";

locale.subscribe(($locale) => {
  let currentLocale = $locale;
  if (currentLocale == "it") {
    lingua = "it-IT";
    uno = "primo";
    due = "secondo";
    tre = "terzo";
    quattro = "quarto";
    periodo = "trimestre";
  } else {
    lingua = "en-US";
    uno = "first";
    due = "second";
    tre = "third";
    quattro = "fourth";
    periodo = "quarter";
  }
});

export const nf = (value) =>
  new Intl.NumberFormat(lingua, { useGrouping: true }).format(value);
export const nf1d = (value) =>
  new Intl.NumberFormat(lingua, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value);

export const nf2d = (value) =>
  new Intl.NumberFormat(lingua, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);

export const nf5d = (value) =>
  new Intl.NumberFormat(lingua, {
    maximumFractionDigits: 5,
    minimumFractionDigits: 5,
  }).format(value);

export const df = (value) =>
  new Intl.DateTimeFormat(lingua, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

export const dp = Date.parse;

export const dmF = (value) => {
  return new Date(value).toLocaleString(lingua, {
    month: "long",
    year: "numeric",
  });
};

export const pm = (value) => {
  let newValue;
  let formattedPm;

  if (value.startsWith("Q")) {
    value = value.slice(1);
  }

  const trimestre = value[0];
  const anno = value.slice(2);

  switch (trimestre) {
    case "1":
      newValue = value[0].replace(trimestre, uno);
      break;
    case "2":
      newValue = value[0].replace(trimestre, due);
      break;
    case "3":
      newValue = value[0].replace(trimestre, tre);
      break;
    case "4":
      newValue = value[0].replace(trimestre, quattro);
      break;
    default:
      newValue = "";
  }
  formattedPm = `${newValue} ${periodo} ${anno}`;
  return formattedPm;
};
