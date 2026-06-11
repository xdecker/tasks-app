# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

# RNTL v14 Breaking Changes

- `render()` is `async` — must be `await`ed (e.g., `const { getByText } = await render(<Component />)`)
- Custom matcher `toBeOnScreen` renamed to `toBeOnTheScreen` (note capital S)
- Queries (`getByText`, `getByTestId`, `getByPlaceholderText`, etc.) still work but only after `await render()`
- FlatList items added after render may need `findByText` (async) instead of `getByText` (sync)

# Jest Config

- Manual config (`jest.config.js`) with `preset: 'react-native'`, `babel-jest` transform, `moduleNameMapper` for `@/`
- Uses `@react-native/babel-preset` (not `babel-preset-expo`)
- `jest.setup.ts`: imports `@testing-library/react-native`, mocks `@react-native-async-storage/async-storage`, `expo-router`, `@expo/vector-icons`, `react-native-safe-area-context`
- Jest 30.4.2 requires `jest-environment-node@30` (not @29)
