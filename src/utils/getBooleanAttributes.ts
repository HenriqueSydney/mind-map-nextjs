export function getBooleanAttributes(obj: any) {
  const booleanAttributes: string[] = []

  for (const key in obj) {
    if (typeof obj[key] === 'boolean' && obj[key] === true) {
      booleanAttributes.push(key)
    }
  }

  return booleanAttributes
}
