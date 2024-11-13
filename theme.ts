'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  colors: {
    myColor: [
      "#ecfefa",
      "#d9faf4",
      "#aef7e7",
      "#81f3db",
      "#60f0d0",
      "#4feec9",
      "#45edc6",
      "#38d3ae",
      "#2bbc9a",
      "#0ba284"
    ] satisfies MantineColorsTuple
  }
});
