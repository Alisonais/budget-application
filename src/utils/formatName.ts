export function formatName(string: string) {
  return string.toLowerCase().replace(/(?:^|\s)(?!da\s|das\s|de\s|des\s|do\s|dos\s)\S/g, (l: any) => l.toUpperCase());
};

export function formatPlate(string: string) {
  return string.toUpperCase();
}
