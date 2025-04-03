// formatCurrency.js

/**
 * Formats a number into Indian Rupees (INR) currency format.
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted currency string.
 */
export function formatCurrency(amount) {
  if (isNaN(amount)) {
    throw new Error('Input is not a valid number');
  }

  // Convert to a string and round to 2 decimal places
  amount = Number(amount).toFixed(2);

  // Format the amount using the Intl.NumberFormat API
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  return formatter.format(amount);
}

