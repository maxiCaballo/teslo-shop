export const capitalize = (str: string): string => {
  //Que tenga un espacio en blanco,puntuación o se el inicio final de una palabra y que sea un caracter
  return str.replace(/\b\w/g, (substr) => substr.toUpperCase());
};
