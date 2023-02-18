import { colors } from 'ui/theme'

const kebabize = (str: string): string => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

for (const constant of Object.keys(colors)) {
  document.documentElement.style.setProperty('--color-' + kebabize(constant), colors[constant])
}
