export const nf = new Intl.NumberFormat("it-IT").format;
export const nf2d = new Intl.NumberFormat('it-IT', {
  maximumFractionDigits: 2, minimumFractionDigits: 2,
}).format;

export const nf5d = new Intl.NumberFormat('it-IT', {
  maximumFractionDigits: 5, minimumFractionDigits: 5,
}).format;

export const df = new Intl.DateTimeFormat("it-IT", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format;

export const dp = Date.parse;

export const pm = (value) => {
  let newValue;
  let formattedPm;
  let trimestre = value[0];
  switch (trimestre) {
    case "1": newValue = value[0].replace(trimestre, "primo");
      break;
    case "2": newValue = value[0].replace(trimestre, "secondo");
      break;
    case "3": newValue = value[0].replace(trimestre, "terzo");
      break;
    case "4": newValue = value[0].replace(trimestre, "quarto");
      break;
    default: newValue = "";
  }
  formattedPm = `${newValue} trimestre ${value.slice(2, value.length)}`;
  return formattedPm
}
