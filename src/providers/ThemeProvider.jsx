"use client";

import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({ children }) {
   return (
      <ThemeProvider
         attribute="data-theme"
         defaultTheme="light"
         enableSystem={false}
         // disableTransitionOnChange
      >
         {children}
      </ThemeProvider>
   );
}
