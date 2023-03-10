import { fixtures } from './fixtures'
import { md2ast } from '../index'

describe('Markdown to AST', () => {
  fixtures.forEach(({ name, ast, markdown }) =>
    test(name, () => expect(md2ast(markdown)).toEqual(ast)))
})

