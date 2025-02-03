import { DateField } from "@prismicio/client";

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
export function formatMonthYear(dateString: string | null): string | undefined {
  if (dateString === null) return;

  const date = new Date(dateString);

  // Extract the month and year
  const month = date.toLocaleString("fr", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}

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
