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
        <div key={index} className=" mt-8 max-w-2xl md:ml-12 md:mt-16">
          <Heading as="h3" size="sm" className="uppercase text-yellow-300">
            {item.title}
          </Heading>
          <Heading as="h4" size="xs">
            {item.institution ? `${item.institution}` : ""}
          </Heading>

          <div className="mt-1 flex w-fit flex-col gap-1 text-left text-2xl font-semibold tracking-tight text-slate-400">
            <span className="w-full capitalize">
              {formatMonthYear(item.start_date)}{" "}
              {item.end_date
                ? ` - ${formatMonthYear(item.end_date)}`
                : " - ( Aujourd'hui )"}
            </span>
            <span className="w-full text-xl lowercase">
              {item.end_date &&
                `( ${calculateDateDifference(
                  item.start_date,
                  item.end_date,
                )} )`}
            </span>
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
