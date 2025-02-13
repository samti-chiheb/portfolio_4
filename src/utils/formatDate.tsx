import { DateField } from "@prismicio/client";

/**
 * Formats a given date string into a full French date format.
 *
 * @param {DateField} dateStr - The date string to format.
 * @returns {string} - Formatted date in the format: "lundi 12 février 2025".
 *
 * @example
 * formatDate("2025-02-12"); // "mercredi 12 février 2025"
 */
export function formatDate(dateStr: DateField): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Format the date
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

/**
 * Extracts and formats only the month and year from a date string.
 *
 * @param {string | null} dateString - The date string to format.
 * @returns {string | undefined} - Formatted date in the format: "février 2025".
 *
 * @example
 * formatMonthYear("2025-02-12"); // "février 2025"
 */
export function formatMonthYear(dateString: string | null): string | undefined {
  if (dateString === null) return;

  const date = new Date(dateString);

  // Extract the month and year
  const month = date.toLocaleString("fr", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}

/**
 * Calculates the difference between two dates and returns it in a readable format.
 *
 * @param {string | null} startDateString - The start date.
 * @param {string | null} endDateString - The end date.
 * @returns {string | undefined} - Difference in years and months (e.g., "2 ans et 3 mois").
 *
 * @example
 * calculateDateDifference("2023-01-01", "2025-04-01"); // "2 ans et 3 mois"
 */
export function calculateDateDifference(
  startDateString: string | null,
  endDateString: string | null,
): string | undefined {
  if (startDateString === null) return;
  if (endDateString === null) return;

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  let result = "";
  if (years > 0) {
    result += `${years} an${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    result += (years > 0 ? " et " : "") + `${months} mois`;
  }

  return result || "0 mois";
}

/**
 * Formats a date into a short French format: "10 fév. 2025".
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} - Formatted date in the format: "10 fév. 2025".
 *
 * @example
 * getFormattedDate("2025-02-10"); // "10 fév. 2025"
 */
export function longFormatDate(dateString: string): string | undefined {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
