import { useMemo, useRef, useState } from 'react'
import { StyleSheet, TextInput, Platform, Dimensions } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import * as Clipboard from 'expo-clipboard'
import { APP_NAME } from 'editor/globals'
import { type EditorAction, type MessageFromEditor, toolbar, useEditor } from 'editor'
import { colors } from 'ui/theme'
import { Window } from './Window'
import { Toolbar } from './Toolbar'
import { Button } from './Button'
import { Icon } from './Icon'
import { Separator } from './Separator'
import { EditorContainer } from './EditorContainer'

// @ts-ignore
//
// Yep, I know that this will not work after build,
// but I didn't find a proper solution :(
import html from '../../../../packages/editor/contenteditable.html'

interface EditorProps {
  initialMarkdown: string
}

export const Editor = ({ initialMarkdown }: EditorProps) => {
  const ref = useRef(null)
  const [markdown, setMarkdown] = useState('')

  const {
    onReceiveMessage,
    sendMarkdown,
    sendAction,
  } = useMemo(() => useEditor({
    editor: () => ref.current,
    setMarkdown,
    initialMarkdown,
  }), [setMarkdown, initialMarkdown, ref.current])

  const action = (name: EditorAction) => {
    if (name === 'copy') {
      Clipboard.setStringAsync(markdown)
      return
    }

    sendAction(name)
  }

  const handleReceiveMessage = (event: WebViewMessageEvent) => {
    onReceiveMessage(event.nativeEvent.data)
  }

  return (
    <Window
      style={styles.window}
      title={APP_NAME}
    >
      <Toolbar>
        {toolbar.map((item, idx) => {
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
          injectedJavaScript={`window.postMessage('${JSON.stringify({ type: 'ready' } as MessageFromEditor)}')`}
          scalesPageToFit={false}
        />
      </EditorContainer>
      <EditorContainer style={styles.markdownEditor}>
        <TextInput
          style={styles.input}
          value={markdown}
          onChangeText={sendMarkdown}
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
