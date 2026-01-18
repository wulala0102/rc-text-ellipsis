# rc-text-ellipsis

React TextEllipsis Component - A powerful and flexible text truncation component with expand/collapse functionality.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-text-ellipsis.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-text-ellipsis
[travis-image]: https://img.shields.io/travis/react-component/rc-text-ellipsis.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/rc-text-ellipsis
[coveralls-image]: https://img.shields.io/coveralls/react-component/rc-text-ellipsis.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/rc-text-ellipsis?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/rc-text-ellipsis.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/rc-text-ellipsis
[node-image]: https://img.shields.io/badge/node.js-%3E=_18.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-text-ellipsis.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-text-ellipsis

## Features

- 🎯 Multi-line text truncation with precise control
- 📍 Three ellipsis positions: start, middle, end
- 🔄 Expand/collapse functionality
- 🎨 Customizable action buttons
- 📱 Responsive - auto-recalculates on window resize
- 🎛️ Imperative API via ref
- 💪 TypeScript support
- ⚡ Efficient binary search algorithm

## Demo

🚀 [Live Demo](https://rc-text-ellipsis.vercel.app) - See all features in action!


## Installation

```bash
npm install rc-text-ellipsis --save
```

or

```bash
yarn add rc-text-ellipsis
```

## Usage

### Basic Example

```tsx
import React from 'react';
import TextEllipsis from 'rc-text-ellipsis';
import 'rc-text-ellipsis/assets/index.css';

function App() {
  return (
    <TextEllipsis
      rows={3}
      content="This is a very long text that needs to be truncated..."
      expandText="Expand"
      collapseText="Collapse"
    />
  );
}
```

### With Custom Action Button

```tsx
<TextEllipsis
  rows={2}
  content="Your long text here..."
  action={(expanded) => (
    <span style={{ color: 'red', fontWeight: 'bold' }}>
      {expanded ? '[Fold]' : '[Unfold]'}
    </span>
  )}
/>
```

### Using Ref for External Control

```tsx
import React, { useRef } from 'react';
import TextEllipsis, { TextEllipsisRef } from 'rc-text-ellipsis';

function App() {
  const textEllipsisRef = useRef<TextEllipsisRef>(null);

  const handleExpand = () => {
    textEllipsisRef.current?.toggle(true);
  };

  return (
    <>
      <TextEllipsis
        ref={textEllipsisRef}
        rows={2}
        content="Your long text here..."
        expandText="Expand"
        collapseText="Collapse"
      />
      <button onClick={handleExpand}>Expand from outside</button>
    </>
  );
}
```

### Different Ellipsis Positions

```tsx
// Ellipsis at the end (default)
<TextEllipsis
  position="end"
  rows={2}
  content="Your text..."
/>

// Ellipsis at the start
<TextEllipsis
  position="start"
  rows={2}
  content="Your text..."
/>

// Ellipsis in the middle
<TextEllipsis
  position="middle"
  rows={2}
  content="Your text..."
/>
```

## API

### Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | `string` | - | Additional CSS class for the root element |
| style | `React.CSSProperties` | - | Inline styles for the root element |
| rows | `number` | `1` | Number of lines to display before truncating |
| dots | `string` | `'...'` | The ellipsis text to show when truncated |
| content | `string` | `''` | The text content to display |
| expandText | `string` | `''` | Text for the expand action button |
| collapseText | `string` | `''` | Text for the collapse action button |
| position | `'start' \| 'middle' \| 'end'` | `'end'` | Position of the ellipsis |
| onClickAction | `(e: React.MouseEvent) => void` | - | Callback when action button is clicked |
| action | `(expanded: boolean) => React.ReactNode` | - | Custom render function for action button |

### Ref Methods

| Method | Type | Description |
| --- | --- | --- |
| toggle | `(expanded?: boolean) => void` | Programmatically toggle expand/collapse state |

### TypeScript Types

```tsx
import TextEllipsis, {
  TextEllipsisProps,
  TextEllipsisRef
} from 'rc-text-ellipsis';
```


## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Visit http://localhost:8000/examples/ to see examples
```

## Build

```bash
# Build the component
npm run build

# Run linter
npm run lint
```

## Test

```bash
# Run tests
npm test

# Run tests in Chrome
npm run chrome-test

# Generate coverage report
npm run coverage
```

## Browser Support

Modern browsers and IE11+

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

rc-text-ellipsis is released under the MIT license.
