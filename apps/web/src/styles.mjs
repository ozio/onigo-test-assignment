import * as constants from 'theme'

const constToKebab = (string) => {
  return string
    .toLowerCase()
    .replaceAll('_', '-')
}

for (const constant in constants) {
  document.documentElement.style.setProperty('--' + constToKebab(constant), constants[constant])
}
