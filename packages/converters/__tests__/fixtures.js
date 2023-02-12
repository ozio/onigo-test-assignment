const empty = {
  name: 'Empty tree',
  html: '',
  markdown: '',
  ast: {
    type: 'Root',
    children: [],
  },
}

const flatUnorderedList = {
  name: 'Flat lists [1]',
  html: '<ul><li>Item 1</li><li>Item 2</li></ul>',
  markdown: '- Item 1\n- Item 2',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'UnorderedList',
        children: [
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Item 1',
              },
            ],
          },
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Item 2',
              },
            ],
          },
        ],
      },
    ],
  },
}

const flatOrderedList = {
  name: 'Flat lists [2]',
  html: '<ol><li>Item 1</li><li>Item 2</li></ol>',
  markdown: '1. Item 1\n2. Item 2',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'OrderedList',
        children: [
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Item 1',
              },
            ],
          },
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Item 2',
              },
            ],
          },
        ],
      },
    ],
  },
}

const multiLineHeader1 = {
  name: 'Miltiline header [1]',
  html: '<h1>Title</h1>',
  markdown: 'Title\n=====',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Heading-1',
        children: [
          {
            type: 'Text',
            value: 'Title',
          },
        ],
      },
    ],
  },
}

const multiLineHeader2 = {
  name: 'Miltiline header [2]',
  html: '<h2>Title</h2>',
  markdown: 'Title\n-',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Heading-2',
        children: [
          {
            type: 'Text',
            value: 'Title',
          },
        ],
      },
    ],
  },
}

const inlineHeader = {
  name: 'Inline header',
  html: '<h3>Another title</h3>',
  markdown: '### Another title',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Heading-3',
        children: [
          {
            type: 'Text',
            value: 'Another title',
          },
        ],
      },
    ],
  },
}

const paragraphs = {
  name: 'Paragraphs',
  html: '<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>',
  markdown: 'Paragraph 1\n\nParagraph 2\n\nParagraph 3',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Paragraph 1',
          },
        ],
      },
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Paragraph 2',
          },
        ],
      },
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Paragraph 3',
          },
        ],
      },
    ],
  },
}

const linebreaks = {
  name: 'Linebreaks',
  html: '<p>Lorem ipsum<br>dolor sit amet</p>',
  markdown: 'Lorem ipsum\ndolor sit amet',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Lorem ipsum',
          },
          {
            type: 'LineBreak',
          },
          {
            type: 'Text',
            value: 'dolor sit amet',
          },
        ],
      },
    ],
  },
}

const string = {
  name: 'Simle string',
  html: '<p>Lorem ipsum dolor sit amet</p>',
  markdown: 'Lorem ipsum dolor sit amet',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Lorem ipsum dolor sit amet',
          },
        ],
      },
    ],
  },
}

const boldItalicString1 = {
  name: 'Inline markup [1]',
  html: '<p>Lorem <i>ipsum</i> dolor <b>sit amet</b></p>',
  markdown: 'Lorem _ipsum_ dolor **sit amet**',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Lorem ',
          },
          {
            type: 'Italic',
            children: [
              {
                type: 'Text',
                value: 'ipsum',
              },
            ],
          },
          {
            type: 'Text',
            value: ' dolor ',
          },
          {
            type: 'Bold',
            children: [
              {
                type: 'Text',
                value: 'sit amet',
              },
            ],
          },
        ],
      },
    ],
  },
}

const boldItalicString2 = {
  name: 'Inline markup [2]',
  html: '<p><b>Lorem ipsum <i>dolor sit</i> amet</b></p>',
  markdown: '**Lorem ipsum _dolor sit_ amet**',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Bold',
            children: [
              {
                type: 'Text',
                value: 'Lorem ipsum ',
              },
              {
                type: 'Italic',
                children: [
                  {
                    type: 'Text',
                    value: 'dolor sit',
                  },
                ],
              },
              {
                type: 'Text',
                value: ' amet',
              },
            ],
          },
        ],
      },
    ],
  },
}

const boldItalicString3 = {
  name: 'Inline markup [3]',
  html: '<p><b><i>Lorem ipsum</i></b> dolor <b><i>sit amet</i></b></p>',
  markdown: '**_Lorem ipsum_** dolor **_sit amet_**',
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Bold',
            children: [
              {
                type: 'Italic',
                children: [
                  {
                    type: 'Text',
                    value: 'Lorem ipsum',
                  },
                ],
              },
            ],
          },
          {
            type: 'Text',
            value: ' dolor ',
          },
          {
            type: 'Bold',
            children: [
              {
                type: 'Italic',
                children: [
                  {
                    type: 'Text',
                    value: 'sit amet',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

const complex1 = {
  name: 'Complex',
  html: `
<h1>Inline Title</h1>

<p>
  Lorem <i>ipsum</i>
  <br>
  dolor <b>sit amet</b>
</p>

<ul>
  <li>Unordered <i>List 1</i></li>
  <li>Unordered List 2</li>
</ul>

<ol>
  <li>Ordered List 1</li>
  <li><b>Ordered</b> List 2</li>
</ol>

<h2>Inline title</h2>
`.replace(/(\r\n|\n|\r|\t|\s{2,})/gm, ''),
  markdown: `# Inline Title

Lorem _ipsum_
dolor **sit amet**

- Unordered _List 1_
- Unordered List 2

1. Ordered List 1
2. **Ordered** List 2

## Inline title`,
  ast: {
    type: 'Root',
    children: [
      {
        type: 'Heading-1',
        children: [
          {
            type: 'Text',
            value: 'Inline Title',
          },
        ],
      },
      {
        type: 'Paragraph',
        children: [
          {
            type: 'Text',
            value: 'Lorem ',
          },
          {
            type: 'Italic',
            children: [
              {
                type: 'Text',
                value: 'ipsum',
              },
            ],
          },
          {
            type: 'LineBreak',
          },
          {
            type: 'Text',
            value: 'dolor ',
          },
          {
            type: 'Bold',
            children: [
              {
                type: 'Text',
                value: 'sit amet',
              },
            ],
          },
        ],
      },
      {
        type: 'UnorderedList',
        children: [
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Unordered ',
              },
              {
                type: 'Italic',
                children: [
                  {
                    type: 'Text',
                    value: 'List 1',
                  },
                ],
              },
            ],
          },
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Unordered List 2',
              },
            ],
          },
        ],
      },
      {
        type: 'OrderedList',
        children: [
          {
            type: 'ListItem',
            children: [
              {
                type: 'Text',
                value: 'Ordered List 1',
              },
            ],
          },
          {
            type: 'ListItem',
            children: [
              {
                type: 'Bold',
                children: [
                  {
                    type: 'Text',
                    value: 'Ordered',
                  },
                ],
              },
              {
                type: 'Text',
                value: ' List 2',
              },
            ],
          },
        ],
      },
      {
        type: 'Heading-2',
        children: [
          {
            type: 'Text',
            value: 'Inline title',
          },
        ],
      },
    ],
  },
}

export const fixtures = [
  empty,
  flatUnorderedList,
  flatOrderedList,
  multiLineHeader1,
  multiLineHeader2,
  inlineHeader,
  paragraphs,
  linebreaks,
  string,
  boldItalicString1,
  boldItalicString2,
  boldItalicString3,
  complex1,
]
