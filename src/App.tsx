import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { H1, P } from "./components/ui/typography";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { AspectRatio } from "@/components/ui/aspect-ratio"


import Definition1 from "@/examples/chapter1/section1/topic1/Definition1.tsx";
const mathJaxConfig = {
  "fast-preview": {
    disabled: true,
  },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  messageStyle: "none",
};
const vectorNumber = 1;

function App() {
  return (
    <MathJaxContext
      version={2}
      config={mathJaxConfig}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
    >
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="w-full p-2 lg:p-4 space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Chapter 1</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Section 2</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Lesson 4</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Spans</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <H1>1.2.4: Spans</H1>

          <MathJax dynamic={true} hideUntilTypeset={"every"}>
            {`With the notion of linear combinations in hand,
            we now arrive at a natural question: Given a collection
            of real $n$-vectors, what does the set of $all$ linear
            combinations of the collection look like?`}
          </MathJax>

          

          <Card className="h-screen">
          <Definition1 />
          </Card>


          <MathJax dynamic={true} hideUntilTypeset={"every"}>
            {`Determining the span of a collection of vectors is an
            important problem in linear algebra. Despite first appearances,
            it is a subtle problem. In Chapters 4 and 5, we will explain an
            algorithm that solves this problem. For now, let’s contemplate
            the general $shape$ and $size$ the span can take in
            $\\mathbb{R}^2$ and $\\mathbb{R}^3$.`}
          </MathJax>

          
        </div>
      </ThemeProvider>
    </MathJaxContext>
  );
}

export default App;
