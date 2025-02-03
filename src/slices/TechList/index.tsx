"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia(); // media query manager

      mm.add("(min-width: 1024px)", () => {
        // Desktop
        const tl = gsap.timeline({
          scrollTrigger: {
            pin: true,
            start: "top bottom",
            end: "bottom top",
            scrub: 4,
          },
        });

        tl.fromTo(
          ".tech-row",
          {
            x: (index) => {
              return index % 2 === 0
                ? gsap.utils.random(600, 400)
                : gsap.utils.random(-600, -400);
            },
          },
          {
            x: (index) => {
              return index % 2 === 0
                ? gsap.utils.random(-600, -400)
                : gsap.utils.random(600, 400);
            },
            ease: "power1.inOut",
          },
        );
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile
        const tl = gsap.timeline({
          scrollTrigger: {
            pin: true,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, 
          },
        });

        tl.fromTo(
          ".tech-row",
          {
            x: (index) => {
              return index % 2 === 0
                ? gsap.utils.random(200, 0)
                : gsap.utils.random(-200, 0);
            },
          },
          {
            x: (index) => {
              return index % 2 === 0
                ? gsap.utils.random(-200, 0)
                : gsap.utils.random(200, 0);
            },
            ease: "power1.inOut",
          },
        );
      });
    }, component);

    return () => ctx.revert(); // Nettoyage
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="lg" className="mb-4" as="h2">
          {slice.primary.title}
        </Heading>
      </Bounded>

      {slice.items.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className={`tech-row mb-2 flex items-center justify-center gap-4 text-slate-500`}
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className={
                  "tech-item text-6xl font-extrabold uppercase tracking-tighter md:text-8xl"
                }
                style={{
                  color: tech_color ? tech_color : "inherit",
                  opacity: index !== 7 ? "20%" : "100%",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl opacity-40">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
