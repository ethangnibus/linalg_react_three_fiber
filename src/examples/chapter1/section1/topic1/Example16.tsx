import { H2 } from "@/components/ui/typography";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { MathJax } from "better-react-mathjax";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


// FIXME: USE ACCORDION for the three examples !!!
function Example16() {
  return (
    <div className="border-2">
          <H2 className="p-2">Example 16</H2>
          <div className="p-2">
          <MathJax dynamic={true} hideUntilTypeset={"every"}>
            {`Consider the vectors
            $$
              \\mathbf{v}_1 = \\begin{bmatrix} 1 \\cr 1 \\end{bmatrix}, 
              \\mathbf{v}_2 = \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix},
            $$
            Give a geometric description of their span $\\text{Span } \\{ \\mathbf{v}_1, \\mathbf{v}_2 \\}$.`}
          </MathJax>
          <Separator />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="">Solution</AccordionTrigger>
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
                the linear combinations in several steps.

                $$
                  \\bullet \\; \\text{Setting } a_2 = 0,
                  \\text{we get all scales of the first vector}
                $$
                $$
                  a_1 \\mathbf{v}_1 = a_1 \\begin{bmatrix} 1 \\cr 1 \\end{bmatrix}
                  \\qquad
                  \\text{for any } a_1 \\in \\mathbb{R}
                $$
                This gives $\\text{Span } \\{ \\mathbf{v}_1 \\}$,
                the straight line through the origin containing $\\mathbf{v}_1$.

                $$
                  \\bullet \\; \\text{Similarly, setting } a_1 = 0,
                  \\text{we get all scales of the second vector}
                $$
                $$
                  a_2 \\mathbf{v}_2 = a_2 \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix}
                  \\qquad
                  \\text{for any } a_2 \\in \\mathbb{R}
                $$
                This gives $\\text{Span } \\{ \\mathbf{v}_2 \\}$,
                the straight line through the origin containing $\\mathbf{v}_2$.

                $\\bullet \\;$ \\text{Finally observe that }
                  \\text{Span }\\{ \\mathbf{v}_1, \\mathbf{v}_2 \\},
                  \\text{consists of all vectors formed by adding vectors along these
                    two straight lines. Since any vector in the plane can be reached
                    in this way, we conclude that
                  }
                $
                $$
                  a_2 \\mathbf{v}_2 = a_2 \\begin{bmatrix} -1 \\cr 2 \\end{bmatrix}
                  \\qquad
                  \\text{for any } a_2 \\in \\mathbb{R}
                $$
                This gives $\\text{Span } \\{ \\mathbf{v}_2 \\}$,
                the straight line through the origin containing $\\mathbf{v}_2$.
                `}
                </MathJax>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>
        </div>
  );
}

export default Example16;
