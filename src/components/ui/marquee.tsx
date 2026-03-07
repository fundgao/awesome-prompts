import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover && "marquee-pause-on-hover",
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            data-marquee
            style={reverse ? { animationDirection: "reverse" } : undefined}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical
                ? "animate-marquee-vertical flex-col"
                : "animate-marquee flex-row",
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
