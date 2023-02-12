import { useCallback, useRef, useState } from 'react'
import { StyleSheet, TextInput, Platform, Dimensions } from 'react-native'
import WebView from 'react-native-webview'
import * as Clipboard from 'expo-clipboard';
import { colors } from 'ui/theme'
import { ast2html, ast2md, html2ast, md2ast } from 'converters'
import { layout, title } from 'editor/config'
import { Window } from './Window'
import { Toolbar } from './Toolbar'
import { Button } from './Button'
import { Icon } from './Icon'
import { Separator } from './Separator'
import { EditorContainer } from './EditorContainer'

// Yep, I know that this will not work after build,
// but I didn't find a proper solution :(
import html from '../../../../packages/editor/contenteditable.html'

export const Editor = ({ welcomeMessage = '' }) => {
  const [markdown, setMarkdown] = useState('')
  const ref = useRef(null)

  const handleReceiveMessage = useCallback((event) => {
    const data = JSON.parse(event.nativeEvent.data)

    switch (data.type) {
      case 'input':
      case 'paste':
        const ast = html2ast(data.value)
        const md = ast2md(ast)

        setMarkdown(md)
        break

      case 'ready':
        convertAndSend(welcomeMessage)
        break
    }
  }, [])

  const convertAndSend = useCallback((text) => {
    setMarkdown(text)

    const ast = md2ast(text)
    const html = ast2html(ast)

    ref.current.postMessage(JSON.stringify({ type: 'setHTML', value: html }))
  }, [])

  const action = useCallback((name) => {
    if (name === 'copy') {
      Clipboard.setStringAsync(markdown)
      return
    }

    ref.current.postMessage(JSON.stringify({ type: 'action', value: name }))
  }, [markdown])

  return (
    <Window
      style={styles.window}
      title={title}
    >
      <Toolbar style={styles.toolbar}>
        {layout.map((item, idx) => {
          // Using index as a key is a bad practice in general,
          // but this is not that case, because we're using package
          // configuration file which will never be changed during
          // user and interface interaction.
          if (item.type === 'separator') return <Separator key={idx} />

          return (
            <Button onPress={() => action(item.action)} title={item.label} key={idx}>
              {item.icon && <Icon name={item.icon} />}
            </Button>
          )
        })}
      </Toolbar>
      <EditorContainer style={styles.richEditor}>
        <WebView
          ref={ref}
          source={{ html }}
          onMessage={handleReceiveMessage}
          injectedJavaScript={`window.postMessage('{"type":"ready"}')`}
          scalesPageToFit={false}
        />
      </EditorContainer>
      <EditorContainer style={styles.markdownEditor}>
        <TextInput
          style={styles.input}
          value={markdown}
          onChangeText={convertAndSend}
          multiline
        />
      </EditorContainer>
    </Window>
  )
}

const VIEW_MARGIN = 20

const styles = StyleSheet.create({
  window: {
    flex: 1,
    width: Dimensions.get('screen').width - VIEW_MARGIN * 2,
    marginVertical: VIEW_MARGIN,
  },
  richEditor: {
    flex: 1,
    backgroundColor: colors.editorBg,
  },
  markdownEditor: {
    flex: 1,
    backgroundColor: colors.editorBg,
    marginTop: 3,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    backgroundColor: colors.editorBg,
    textAlignVertical: 'top',
    fontSize: 16,
  },
})
