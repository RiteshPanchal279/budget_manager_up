export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultValue;
    }
  }
  return defaultValue;
};
