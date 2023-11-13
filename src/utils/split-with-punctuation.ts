export const splitWithPunctuation = (inputString: string): string[] => {
  const regex = /([\p{L}-]+|[^\p{L}\s])/gu;

  const result = inputString.match(regex) || [];

  return result;
}
