/**
 * Get the OS of the user
 * @returns {string} The OS of the user
 * @example
 * getOs() // 'Mac'
 * getOs() // 'Windows'
 * getOs() // 'Linux'
 * getOs() // null
 */
export const getOs = (): 'Mac' | 'Windows' | 'Linux' | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.includes('win')) return 'Windows';
  if (userAgent.includes('mac')) return 'Mac';
  if (userAgent.includes('linux')) return 'Linux';

  return null;
};