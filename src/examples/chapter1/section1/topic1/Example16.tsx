import { H2 } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";

import { MathJax } from "better-react-mathjax";
import Example16_1 from "@/examples/chapter1/section1/topic1/Example16_1.tsx";
import Example16_2 from "@/examples/chapter1/section1/topic1/Example16_2.tsx";
import Example16_3 from "@/examples/chapter1/section1/topic1/Example16_3.tsx";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// FIXME: USE ACCORDION for the three examples !!!
function Example16() {
  return (
    <div className="border-2">
      <H2 className="p-2 bg-gradient-to-r from-zinc-600 dark:from-slate-300 to-zinc-200 dark:to-slate-800 text-white dark:text-black">
        Example 16
      </H2>
      <div className="p-2">
        <MathJax
          dynamic={true}
          hideUntilTypeset={"every"}
          className="pb-4 border-b-2 border-secondary"
        >
          {`Consider the vectors
            $$
              \\mathbf{v}_1 = \\begin{bmatrix} 1 \\cr 1 \\end{bmatrix}, 
              \\mathbf{v}_2 = \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix}
            $$
            Give a geometric description of their span $\\text{Span } \\{ \\mathbf{v}_1, \\mathbf{v}_2 \\}$.`}
        </MathJax>

        <Accordion
          type="single"
          collapsible
          className="w-full border-2 pb-2 mt-4 px-2 bg-secondary"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sky-900 dark:text-sky-200">
              Solution
            </AccordionTrigger>
            <AccordionContent className="">
              <MathJax dynamic={true} hideUntilTypeset={"every"}>
                {`Let's think about the set inside of $\\mathbb{R}^2$ of all linear combinations of our vectors
                $$
                \\begin{align*}
                  a_1 \\mathbf{v}_1 + a_2 \\mathbf{v}_2
                    = a_1 \\begin{bmatrix} 1 \\cr 1 \\end{bmatrix}
                    + a_2 \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix}
                \\end{align*}
                \\qquad
                \\text{for any } a_1, a_2 \\in \\mathbb{R}
                $$
                To understand what this set looks like, we will build up
                the linear combinations in several steps. `}
              </MathJax>

              <ul className="list-disc pl-8 pt-2">
                <li>
                  <MathJax
                    dynamic={true}
                    hideUntilTypeset={"every"}
                    className="mt-4 ml-4 mr-4"
                  >
                    {" "}
                    {`
                      Setting $a_2 = 0$, we get all scales of the first vector
                      $$
                        a_1 \\mathbf{v}_1 = a_1 \\begin{bmatrix} 1 \\cr 1 \\end{bmatrix}
                        \\qquad
                        \\text{for any } a_1 \\in \\mathbb{R}
                      $$
                      This gives $\\text{Span } \\{ \\mathbf{v}_1 \\}$,
                      the straight line through the origin containing $\\mathbf{v}_1$.
                    `}
                  </MathJax>
                </li>

                <li>
                  <MathJax
                    dynamic={true}
                    hideUntilTypeset={"every"}
                    className="mt-4 ml-4 mr-4"
                  >
                    {" "}
                    {`
                    Similarly, setting $a_1 = 0$,
                    we get all scales of the second vector
                    $$
                      a_2 \\mathbf{v}_2 = a_2 \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix}
                      \\qquad
                      \\text{for any } a_2 \\in \\mathbb{R}
                    $$
                    This gives $\\text{Span } \\{ \\mathbf{v}_2 \\}$,
                    the straight line through the origin containing $\\mathbf{v}_2$.
                    `}
                  </MathJax>
                </li>

                <li>
                  <MathJax
                    dynamic={true}
                    hideUntilTypeset={"every"}
                    className="mt-4 ml-4 mr-4"
                  >
                    {" "}
                    {`
                    Finally observe that $\\text{Span }\\{ \\mathbf{v}_1, \\mathbf{v}_2 \\}$,
                    consists of $all$ vectors formed by adding vectors along these
                    two straight lines. Since any vector in the plane can be reached
                    in this way, we conclude that
                    $$
                      \\text{Span }\\{ \\mathbf{v}_1, \\mathbf{v}_2 \\} = \\mathbb{R}^2
                    $$
                    `}
                  </MathJax>
                </li>
              </ul>

              <div className="w-full h-auto flex justify-center">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-4/5 md:w-10/12"
                >
                  <CarouselContent>
                    <CarouselItem key={1} className="md:basis-1/2">
                      <div className="p-1">
                      <Card className="p-2 absolute z-10 m-8 opacity-95">
                          <MathJax dynamic={true} hideUntilTypeset={"every"}>{`
                              $\\text{Span} \\{ \\textbf{v}_1 \\}$
                              `}</MathJax>
                        </Card>
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Example16_1 />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>

                    <CarouselItem key={2} className="md:basis-1/2">
                      <div className="p-1">
                      <Card className="p-2 absolute z-10 m-8 opacity-95">
                          <MathJax dynamic={true} hideUntilTypeset={"every"}>{`
                              $\\text{Span} \\{ \\textbf{v}_2 \\}$
                              `}</MathJax>
                        </Card>
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Example16_2 />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>

                    <CarouselItem key={3} className="md:basis-1/2">
                      <div className="p-1">
                        <Card className="p-2 absolute z-10 m-8 opacity-95">
                          <MathJax dynamic={true} hideUntilTypeset={"every"}>{`
                              $\\text{Span} \\{ \\textbf{v}_1, \\textbf{v}_2 \\}$
                              `}</MathJax>
                        </Card>
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Example16_3 />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <MathJax
          dynamic={true}
          hideUntilTypeset={"every"}
          className="mt-4 pt-4 border-t-2 border-secondary"
        >
          {`Consider the vectors
            $$
              \\mathbf{v}_1 = \\begin{bmatrix} 1 \\cr 1 \\end{bmatrix}, 
              \\mathbf{v}_2 = \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix},
              \\mathbf{v}_3 = \\begin{bmatrix} -2 \\cr 5 \\end{bmatrix}
            $$
            Give a geometric description of their span $\\text{Span } \\{ \\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3 \\}$.`}
        </MathJax>
      </div>
    </div>
  );
}

export default Example16;
