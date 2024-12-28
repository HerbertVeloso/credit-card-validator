
export function luhnValidation(value: string) {
  if (/[^0-9-\s]+/.test(value)) {
    return false;
  };

  let sum = 0;
  let isEven = false;

  const number = value.replace(/\D/g, "");

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));

    if (isEven) {
      digit *= 2;

      if (digit > 9) {
        digit = digit - 9;
        // digit = digit.toString().split('').reduce((s, n) => s + parseInt(n), 0);
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (sum % 10) === 0;
}
