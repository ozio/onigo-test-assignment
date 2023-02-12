import { fixtures } from './fixtures'
import { ast2html } from '..'

describe('AST to HTML', () => {
  fixtures.forEach(({ name, html, ast }) =>
    test(name, () => expect(ast2html(ast)).toEqual(html)))
})

