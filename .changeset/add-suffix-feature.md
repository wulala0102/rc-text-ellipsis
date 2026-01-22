---
"rc-text-ellipsis": minor
---

Add suffix feature with overflow detection

- Add new `suffix` prop: `(expanded: boolean, isOverflow: boolean) => React.ReactNode`
- Suffix is always visible regardless of text overflow
- `suffix` takes priority over `action` when both are provided
- `isOverflow` parameter indicates whether text needs ellipsis
- Update examples, tests, and documentation
- Add syntax highlighting to demo page with Prism.js
