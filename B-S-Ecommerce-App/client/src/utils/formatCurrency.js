/**
 * Utility function to format a number as a currency value.
 * @param {number} amount - The amount to be formatted.
 * @param {string} currency - The currency to format (default: INR).
 * @returns {string} - The formatted currency string.
 */
const formatCurrency = (amount, currency = 'INR') => {
  if (isNaN(amount) || amount < 0) {
    return '₹0.00'; // return 0 if the value is invalid
  }

  // Options for formatting the currency
  const options = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2, // Always show two decimal places
    maximumFractionDigits: 2, // Limit to two decimal places
  };

  // Use the `Intl.NumberFormat` to format the currency properly
  const formatter = new Intl.NumberFormat('en-IN', options);
  return formatter.format(amount);
};

export default formatCurrency;

