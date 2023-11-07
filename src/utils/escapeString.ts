export function escapeString(input: string) {
  return input.replace(/'/g, "''") // Escapa as aspas simples duplicando-as
}
