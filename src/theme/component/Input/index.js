import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const search = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'gray.200',
    borderRadius: 'xl',

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.700',
    },
  },
  addon: {
    
    border: '1px solid',
    borderColor: 'gray.200',
    background: 'red.200',
    borderRadius: 'full',
    // color: 'gray.500',
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.600',
      color: 'gray.400',
    },
  },
})

export const inputTheme = defineMultiStyleConfig({
  variants: { search },
})

// Now we can use the new `pill` variant