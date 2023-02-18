Onigo Test Assignment
=====================

Репозиторий представляет из себя монорепу с несколькими пакетами (`yarn workspaces`).

Приложения находятся здесь:

- /apps/mobile
- /apps/web

Вспомогательные пакеты здесь:

- /packages/converters
- /packages/editor
- /packages/ui

Мобильное приложение
--------------------

Поднятое на expo. Запускается командой `yarn workspace mobile start`.

Браузерное приложение
---------------------

Поднято на vite. Запускается командой `yarn workspace web dev`.

Общие компоненты
----------------

В пакете `converters` лежат функции для преобразования одного синтаксиса в другой. Работают они по схеме `markdown <-> ast <-> html`.

В пакете `editor` находится встраиваемый html-файл с contenteditable-элементом. В одном случае через iframe, в другом черещ WebView. Соответственно общение по одному протоколу.

Также вместе, вместе с компонентом лежат и общие для приложений свойства редактора: название, приветственное сообщение и настройки для тулбара.

В пакете `ui` лежат общие константы связанные с интерфейсом, а также иконки.

Известные проблемы
------------------

1. Не получилось найти хорошего способа для импорта html-файла в React Native в виде строки. Сложности добавило то, что html-файл лежит в отдельном пакете, да ещё и node_modules не в том месте из-за monorepo.
2. Только частично получилось реализовать вложенные списки, а также экранирование спецсимволов markdown (просто не успел).

Что хотелось бы сделать, но не сделалось
----------------------------------------
- Чтобы кнопочки работали также и на текстовом поле с самим Markdown. Сейчас там используются нативные компоненты и чтобы их униврсализировать опять-таки пришлось бы делать ещё один WebView/iframe, что достаточно большой кусок работы.
- Нормальную изоморфную дизайн-систему.

---

Очень кайфовал в процессе. Спасибо за интересную задачу!
