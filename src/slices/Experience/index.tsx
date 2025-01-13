import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { calculateDateDifference, formatMonthYear } from "@/utils/formatDate";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="md">
        {slice.primary.heading}
      </Heading>
      {slice.items.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          <Heading as="h3" size="sm">
            {item.title}
            {item.institution ? ` - ${item.institution}` : ""}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            <span>
              {formatMonthYear(item.start_date)} -{" "}
              {formatMonthYear(item.end_date)}
            </span>
            <span className="text-xl">{` ( ${calculateDateDifference(
              item.start_date,
              item.end_date,
            )} )`}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Experience;
