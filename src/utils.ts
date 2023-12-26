import { ALPHABET_SET, NUMBER_SET } from "./constants";

/**
 * Generates a random string composed of alphanumeric characters.
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A randomly generated string.
 */
export function getRandomString(length: number): string {
  const characterSet = ALPHABET_SET + NUMBER_SET;

  let output = "";

  for (let i = 0; i < length; i++) {
    output += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    );
  }

  return output;
}
