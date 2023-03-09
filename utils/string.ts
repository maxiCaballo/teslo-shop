export const capitalize = (str: string): string => {
  //Que tenga un espacio en blanco,puntuación o sea el inicio final de una palabra y que sea un caracter
  return str.replace(/\b\w/g, (substr) => substr.toUpperCase());
};
export const convert_to_teslo_slug = (str: string = '') =>
  str.trim().replaceAll(' ', '_').replaceAll("'", '').toLocaleLowerCase();
