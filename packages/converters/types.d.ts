type ASTNodeType =
  'LineBreak'
  | 'Bold'
  | 'Italic'
  | 'Paragraph'
  | 'Heading-1'
  | 'Heading-2'
  | 'Heading-3'
  | 'Heading-4'
  | 'Heading-5'
  | 'Heading-6'
  | 'HorizontalLine'
  | 'OrderedList'
  | 'UnorderedList'
  | 'ListItem'
  | 'Root'

export type ASTInlineNode = {
  type: 'Text'
  value: string
  children?: ASTNode[]
}

export type ASTBlockNode = {
  type: ASTNodeType
  children?: ASTNode[]
}

export type ASTNode = ASTBlockNode | ASTInlineNode

export type AST = ASTNode

export type HTMLTag = 'br' | 'b' | 'i' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'hr' | 'ol' | 'ul' | 'li'
