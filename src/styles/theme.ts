import { extendTheme, ThemeOverride } from '@chakra-ui/react'

const overrides: ThemeOverride = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
}

export const theme = extendTheme(overrides)
