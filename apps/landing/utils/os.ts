/**
 * Get the OS of the user
 * @returns {string} The OS of the user or null if not detected
 * @example
 * getOs() // 'Mac'
 * getOs() // 'Windows'
 * getOs() // 'Linux'
 * getOs() // 'iOS'
 * getOs() // 'Android'
 * getOs() // null
 */
export const getOs = (): 'Mac' | 'Windows' | 'Linux' | 'iOS' | 'Android' | null => {
  if (typeof window === 'undefined' || !window.navigator) {
    return null;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const osMapping: { [key: string]: 'Mac' | 'Windows' | 'Linux' | 'iOS' | 'Android' } = {
    iphone: 'iOS',
    android: 'Android',
    win: 'Windows',
    mac: 'Mac',
    linux: 'Linux',
  };

  for (const key in osMapping) {
    if (userAgent.includes(key)) {
      return osMapping[key];
    }
  }

  return null;
};