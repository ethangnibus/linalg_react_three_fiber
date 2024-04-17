import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { H1 } from "./components/ui/typography";


import Definition1 from "@/examples/chapter1/section1/topic1/Definition1.tsx"

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <H1>1.2.4: Spans</H1> */}
      <Definition1/>
    </ThemeProvider>
  );
}

export default App;


















