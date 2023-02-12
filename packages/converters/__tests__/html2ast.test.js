import { fixtures } from './fixtures'
import { html2ast } from '..'

describe('HTML to AST', () => {
  fixtures.forEach(({ name, html, ast }) =>
    test(name, () => expect(html2ast(html)).toEqual(ast)))
})
