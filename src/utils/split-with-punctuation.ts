export const splitWithPunctuation = (inputString: string): string[] => {
  // Here we split a sente into words and punctutation:
  //
  // * we match individual words from unicode letters and a hyphen (-): [\p{L}-]+
  // * we match non-letter and non-space tokens: [^\p{L}\s]
  const regex = /([\d]+|[\p{L}-]+|[^\p{L}\s])/gu;

  const result = inputString.match(regex) || [];

  return result;
}
