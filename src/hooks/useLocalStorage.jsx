import { useState, useEffect } from "react";

/** useLocalStorage Hook:
 * Stores and retrieves a value from localStorage.
 */
function useLocalStorage(key, defaultValue = null) {
  // Get value from localStorage or default value
  const [storedValue, setStoredValue] = useState(() => {
    const value = localStorage.getItem(key);

    //   Check for esisting value in localStorage
    if (value) {
      return value;
    } else {
      return defaultValue;
    }
  });

  //   Set state based on localStorage value
  useEffect(() => {
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
