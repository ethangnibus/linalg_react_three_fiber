import { ThemeProvider } from "@/components/ui/theme-provider";
import { H3 } from "./components/ui/typography";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import { ModeToggle } from "@/components/ui/mode-toggle";

import Definition1 from "@/examples/chapter1/section1/topic1/Definition1.tsx";
import Example16 from "@/examples/chapter1/section1/topic1/Example16.tsx";

import Example20 from "@/examples/chapter1/section1/topic1/Example20.tsx";

import Sandbox from "@/examples/chapter1/section1/topic1/Sandbox.tsx";
import { ChangeEvent, useState } from "react";
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

// FIXME: USE ACCORDION for the three examples !!!
function App() {
  const [password, setPassword] = useState<string>("");
  const [locked, setLocked] = useState<boolean>(true);

  const unlockPassword = () => {
    if (password === "falcon") {
      setLocked(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <MathJaxContext
      version={2}
      config={mathJaxConfig}
      onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
    >
      <div>
        {locked ? (
          <div className="w-full h-full flex flex-col justify-center align-middle">
            <h1 className="h-20 p-24 m-10 text-center">
              Enter Password to Unlock
            </h1>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              className="h-48 p-10 m-10 bg-slate-100 border-2 border-black"
            />
            <button
              className="h-12 p-10 m-10 bg-green-500 text-center"
              onClick={unlockPassword}
            >
              Unlock
            </button>
          </div>
        ) : (
          <div>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <div className="absolute w-screen flex justify-end">
                <div className="m-8">
                  <ModeToggle />
                </div>
              </div>

              <div className="w-full p-2 md:p-24 lg:p-32 space-y-8">
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

                <div className="w-full h-1 border-b-2 bg-gradient-to-r from-primary to-secondary border-background" />
                <H3 className="ml-10 ">1.2.4: Spans</H3>

                <Sandbox />

                <MathJax dynamic={true} hideUntilTypeset={"every"}>
                  {`$\\qquad$ With the notion of linear combinations in hand,
            we now arrive at a natural question: Given a collection
            of real $n$-vectors, what does the set of $all$ linear
            combinations of the collection look like?`}
                </MathJax>

                <Definition1 />

                <MathJax dynamic={true} hideUntilTypeset={"every"}>
                  {`Determining the span of a collection of vectors is an
            important problem in linear algebra. Despite first appearances,
            it is a subtle problem. In Chapters 4 and 5, we will explain an
            algorithm that solves this problem. For now, let’s contemplate
            the general $shape$ and $size$ the span can take in
            $\\mathbb{R}^2$ and $\\mathbb{R}^3$.`}
                </MathJax>
                <Example16 />
                <div className="w-full h-1 border-b-2 bg-gradient-to-r from-primary to-secondary border-background" />

                <Example20 />
                <div className="w-full h-1 border-b-2 bg-gradient-to-r from-primary to-secondary border-background" />
              </div>
            </ThemeProvider>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
}

export default App;
