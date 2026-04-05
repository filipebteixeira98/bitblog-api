export const generateRandomUsername = (): string => {
  const usernamePrefix = 'user-';

  const randomCharacters = Math.random().toString(36).slice(2);

  const username = usernamePrefix + randomCharacters;

  return username;
};
