export const splitWithPunctuation = (inputString: string): string[] => {
  const regex = /([\w-]+|[^\w\s])/g;

  const result = inputString.match(regex) || [];

  return result;
}
