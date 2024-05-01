import { H2 } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card"


import { MathJax } from "better-react-mathjax";
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
} from "@/components/ui/carousel"


// FIXME: USE ACCORDION for the three examples !!!
function Example20() {
  return (
    <div className="border-2">
          <H2 className="p-2 bg-gradient-to-r from-zinc-600 dark:from-slate-300 to-zinc-200 dark:to-slate-800 text-white dark:text-black">Example 20</H2>
          <div className="p-2">
          <MathJax dynamic={true} hideUntilTypeset={"every"} className="pb-4 border-b-2 border-secondary">
            {`Consider the vectors
            $$
              \\mathbf{v}_1 = \\begin{bmatrix} -2 \\cr 3 \\cr 1 \\end{bmatrix}, 
              \\mathbf{v}_2 = \\begin{bmatrix} -3 \\cr -1 \\cr 2 \\end{bmatrix}, 
              \\mathbf{v}_3 = \\begin{bmatrix} 2 \\cr -3 \\cr 2 \\end{bmatrix}
            $$
            Give a geometric description of their span $\\text{Span } \\{ \\mathbf{v}_1, \\mathbf{v}_2, \\mathbf{v}_3 \\}$.`}
          </MathJax>

          <Accordion type="single" collapsible className="w-full border-2 pb-2 mt-4 px-2 bg-secondary">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sky-900 dark:text-sky-200">Solution</AccordionTrigger>
              <AccordionContent className="">
                <MathJax dynamic={true} hideUntilTypeset={"every"}>
                  {`Let's think about the set inside of $\\mathbb{R}^3$ of all linear combinations of our vectors
                $$
                \\begin{align*}
                  a_1 \\mathbf{v}_1 + a_2 \\mathbf{v}_2 + a_3 \\mathbf{v}_3
                    = a_1 \\begin{bmatrix} -2 \\cr 3 \\cr 1 \\end{bmatrix}
                    + a_2 \\begin{bmatrix} -3 \\cr -1 \\cr 2 \\end{bmatrix}
                    + a_3 \\begin{bmatrix} 2 \\cr -3 \\cr 2 \\end{bmatrix}
                \\end{align*}
                \\qquad
                \\text{for any } a_1, a_2, a_3 \\in \\mathbb{R}
                $$
                To understand what this set looks like, we will build up
                the linear combinations in several steps. `}
                </MathJax>


                <ul className="list-disc pl-8 pt-2">
                  <li>
                    <MathJax dynamic={true} hideUntilTypeset={"every"} className="mt-4 ml-4 mr-4"> {`
                      Setting $a_3 = 0$, we get Span $\\{ \\textbf{v}_1, \\textbf{v}_2 \\}$. From the
                      previous examples, we know this is the plane containing the origin,
                      $\\textbf{v}_1$, and $\\textbf{v}_2$.
                    `}</MathJax>
                  </li>

                  <li>
                    <MathJax dynamic={true} hideUntilTypeset={"every"} className="mt-4 ml-4 mr-4"> {`
                    If we now plot $\\textbf{v}_3$, we see that it lies outside the plane Span
                    $\\{ \\textbf{v}_1, \\textbf{v}_2 \\}$. This means the straight line Span 
                    $\\{ \\textbf{v}_3 \\}$ of all scales of $\\textbf{v}_3$ only intersects
                    this plane at the origin.
                    `}</MathJax>
                  </li>

                  <li>
                    <MathJax dynamic={true} hideUntilTypeset={"every"} className="mt-4 ml-4 mr-4"> {`
                    Finally the sum of all vectors in the plane Span $\\{ \\textbf{v}_1, \\textbf{v}_2 \\}$
                    and the straight line Span $\\{ \\textbf{v}_3 \\}$ give all of $\\mathbb{R}^3$,
                    and so we conclude
                    $$
                      \\text{Span } \\{ \\textbf{v}_1, \\textbf{v}_2, \\textbf{v}_3 \\} = \\mathbb{R}^3
                    $$
                    `}</MathJax>
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
                      <CarouselItem key={1} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-3xl font-semibold">{1}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>

                      <CarouselItem key={2} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-3xl font-semibold">{2}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>

                      <CarouselItem key={3} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-3xl font-semibold">{3}</span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>


                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                  </Carousel>
                </div>



              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <MathJax dynamic={true} hideUntilTypeset={"every"} className="mt-4">
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


export default Example20;
