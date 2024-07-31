import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const defaultBtn = defineStyle({
  backgroundColor: "orange.400",
  color: "gray.50",
  borderRadius: "7px",
  border: "none",
  boxShadow: "inner",

  _dark: {
    backgroundColor: "teal.400",
    color: "gray.200",
    _hover: {
      backgroundColor: "teal.500",
    },
  },
  _loading: {
    _hover: {
      backgroundColor: "orange.500",
    },
  },
  _hover: {
    backgroundColor: "orange.500",
  },

  _focus: {
    outline: "none",
  },
  fontSize: "sm",
});
const linkBtn = defineStyle({
  backgroundColor: "transparent",
  color: "gray.800",
  border: "none",
  outline: "none",
  borderRadius: "2xl",
  _dark: {
    color: "gray.50",
    _hover: {
      backgroundColor: "teal.500",
    },
  },

  _hover: {
    backgroundColor: "blackAlpha.400",
  },

  _focus: {
    outline: "none",
  },
  fontSize: "sm",
});
export const themeBtn = defineStyleConfig({
  variants: { defaultBtn, linkBtn },
});
