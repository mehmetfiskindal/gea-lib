# <% projectName %>

A modern, high-performance, and reactive component library for **GeaJS**.

Built with compiler-first reactivity, proxy-based state management, and modern glassmorphic designs.

## Features

- ⚡ **No Virtual DOM**: Built on GeaJS, compile-time JSX transformations for surgical DOM patching.
- 🎨 **Premium Styling**: Pre-configured responsive styles, micro-animations, and glassmorphic designs.
- 🛠️ **Playground Included**: An interactive visual sandbox to test and showcase your components in real-time.

## Development

To start the interactive playground:

```bash
npm install
npm run dev
```

## Production Build

To build your library for distribution:

```bash
npm run build
```

The build process bundles your components into `dist/index.js` (ES Modules).

## Usage

Register components in your main application:

```javascript
import { Button, Card, counterStore } from '<% projectName %>';
import '<% projectName %>/style.css';
```
