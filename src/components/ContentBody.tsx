import { SliceZone } from "@prismicio/react";
import { Content } from "@prismicio/client";

import { components } from "@/slices";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { formatDate } from "@/utils/formatDate";
import { FaGithub, FaEye, FaYoutube } from "react-icons/fa6";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  const formattedDate = formatDate(page.data.date);
  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex flex-wrap gap-4 text-yellow-400 opacity-70 ">
          {page.tags.map((tag, index) => (
            <span key={index} className="text-lg font-bold">
              #{tag}
            </span>
          ))}
        </div>
        <div className=" flex items-end justify-between">
          <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
            {formattedDate}
          </p>
          <div className=" flex justify-center">
            {'youtube_link' in page.data && isFilled.link(page.data.youtube_link) && (
              <PrismicNextLink
                field={page.data.youtube_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={"GitHub source code"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </PrismicNextLink>
            )}
            {'github_link' in page.data && isFilled.link(page.data.github_link) && (
              <PrismicNextLink
                field={page.data.github_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={"GitHub source code"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </PrismicNextLink>
            )}
            {"live_link" in page.data && isFilled.link(page.data.live_link) && (
              <PrismicNextLink
                field={page.data.live_link}
                className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
                aria-label={"live preview"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaEye />
              </PrismicNextLink>
            )}
          </div>
        </div>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
