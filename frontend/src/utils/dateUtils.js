/**
 * Formats a date to dd/mm/yyyy.
 * @param {Date|string|number} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };