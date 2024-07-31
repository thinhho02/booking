import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import { inputTheme } from "./component/Input";
import { themeBtn } from "./component/Button";
// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      600: "#24388a",
      700: "#1b254b",
      800: "#111c44",
      900: "#0b1437",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("gray.50", "#1B254B")(props),
        fontFamily: "Helvetica, sans-serif",
      },
      html: {
        fontFamily: "Helvetica, sans-serif",
      },
      ".rdrCalendarWrapper": {
        fontFamily: "inherit",
      },
      ".rdrSelected": {
        background: "#3182ce", // Màu xanh cho các ngày được chọn
      },
      ".rdrInRange": {
        background: "#63b3ed", // Màu xanh nhạt cho các ngày trong khoảng
      },
      "*::placeholder": {
        color: mode("gray.400", "whiteAlpha.600")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.200", "whiteAlpha.300")(props),
        wordWrap: "break-word",
      },
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-track": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "gray",
        borderRadius: "24px",
      },
    }),
  },
  semanticTokens: {
    colors: {
      error: "red.500",
      text: {
        default: "gray.900",
        _dark: "gray.50",
      },
    },
  },
  components: {
    Button: themeBtn,
    Input: inputTheme,
  },
});

export default theme;
