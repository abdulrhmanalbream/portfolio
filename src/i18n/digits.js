// Converts Western/Latin digits (0-9) to Arabic-Indic digits (٠-٩).
// Display-only: never run this on values used for calculations.
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

export function toArabicDigits(input) {
  if (input == null) return input
  return String(input).replace(/[0-9]/g, (d) => AR_DIGITS[+d])
}
