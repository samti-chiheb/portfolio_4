import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-bold leading-tight tracking-tight  text-slate-300",
        size === "xl" && "text-7xl md:text-9xl",
        size === "lg" && "text-4xl sm:text-6xl md:text-8xl",
        size === "md" && "text-3xl sm:text-5xl md:text-6xl",
        size === "sm" && "text-2xl sm:text-3xl md:text-4xl",
        size === "xs" && "text-xl sm:text-2xl md:text-3xl",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
