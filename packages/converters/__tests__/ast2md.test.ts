import { fixtures } from './fixtures'
import { ast2md } from '../index'

describe('AST to Markdown', () => {
  fixtures.forEach(({ name, ast, markdown }) => {
    /*
    * AST does not know about multiline markup, so it is unnecessary to test it.
    */
    if (name === 'Miltiline header [1]') return
    if (name === 'Miltiline header [2]') return

    test(name, () => expect(ast2md(ast)).toEqual(markdown))
  })
})
