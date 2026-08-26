type ArtKind =
  | "code"
  | "python"
  | "ml"
  | "deep"
  | "boost"
  | "table"
  | "timeseries"
  | "gears"
  | "vision";

/**
 * Animated SVG artwork for each course card.
 * Pure SVG/SMIL + CSS so it stays crisp, tiny and always in motion.
 */
export function CourseArt({ kind }: { kind: ArtKind }) {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-xl border border-border bg-[image:var(--gradient-canvas)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:16px_16px] text-primary/25" />
      <svg viewBox="0 0 200 100" className="relative h-full w-full" role="img" aria-hidden="true">
        {render(kind)}
      </svg>
    </div>
  );
}

const stroke = "currentColor";

function render(kind: ArtKind) {
  switch (kind) {
    case "code":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
          <path d="M62 32 L44 50 L62 68" />
          <path d="M138 32 L156 50 L138 68" />
          <path d="M112 26 L88 74">
            <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
          </path>
          <rect x="78" y="46" width="8" height="8" rx="2" className="text-accent-foreground">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 36 0; 0 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      );
    case "python":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round">
          <path d="M40 62 C40 38 70 38 70 50 C70 62 100 62 100 38 C100 20 130 22 130 44">
            <animate attributeName="stroke-dasharray" values="0 300;300 0" dur="3.2s" repeatCount="indefinite" />
          </path>
          <path d="M160 38 C160 62 130 62 130 50" className="text-accent-foreground" />
          <circle cx="40" cy="62" r="4" fill={stroke} stroke="none" />
          <circle cx="160" cy="38" r="4" fill={stroke} stroke="none" className="text-accent-foreground" />
        </g>
      );
    case "ml":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="2">
          <path d="M24 82 H176 M24 82 V16" strokeWidth="2.5" />
          <path d="M30 74 L60 62 L90 52 L120 38 L150 24 L170 20" className="text-accent-foreground" strokeWidth="3">
            <animate attributeName="stroke-dasharray" values="0 260;260 0" dur="2.8s" repeatCount="indefinite" />
          </path>
          {[
            [50, 68],
            [82, 60],
            [112, 44],
            [142, 32],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={stroke} stroke="none">
              <animate attributeName="r" values="3;6;3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      );
    case "deep":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="1.4">
          {[30, 50, 70].map((y, i) =>
            [70, 100, 130].map((x2, j) => (
              <line key={`${i}-${j}`} x1="45" y1={y} x2={x2} y2={30 + j * 20} opacity="0.45" />
            )),
          )}
          {[70, 100, 130].map((x, i) =>
            [40, 60].map((y2, j) => <line key={`b${i}-${j}`} x1={x} y1={30 + i * 20} x2="160" y2={y2} opacity="0.35" />),
          )}
          {[30, 50, 70].map((y, i) => (
            <circle key={`i${i}`} cx="45" cy={y} r="5" fill={stroke} stroke="none">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[30, 50, 70].map((y, i) => (
            <circle key={`h${i}`} cx={[70, 100, 130][i]} cy={y} r="5" className="text-accent-foreground" fill={stroke} stroke="none">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle cx="160" cy="40" r="5" fill={stroke} stroke="none" />
          <circle cx="160" cy="60" r="5" fill={stroke} stroke="none" />
        </g>
      );
    case "boost":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 55} 0)`}>
              <path d="M40 74 V44 M40 44 L28 30 M40 44 L52 30" />
              <circle cx="28" cy="28" r="4" fill={stroke} stroke="none" className="text-accent-foreground">
                <animate attributeName="r" values="2;5;2" dur="2.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <circle cx="52" cy="28" r="4" fill={stroke} stroke="none">
                <animate attributeName="r" values="5;2;5" dur="2.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </g>
      );
    case "table":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="1.8">
          <rect x="28" y="20" width="144" height="60" rx="6" />
          <line x1="28" y1="36" x2="172" y2="36" strokeWidth="2.5" />
          <line x1="76" y1="20" x2="76" y2="80" />
          <line x1="124" y1="20" x2="124" y2="80" />
          <line x1="28" y1="52" x2="172" y2="52" />
          <line x1="28" y1="66" x2="172" y2="66" />
          <rect x="28" y="52" width="48" height="14" fill={stroke} stroke="none" opacity="0.25" className="text-accent-foreground">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 96 0; 96 14; 0 14; 0 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      );
    case "timeseries":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="2">
          <path d="M20 84 H180" strokeWidth="2.5" />
          <path
            d="M20 60 Q40 30 60 58 T100 56 T140 34 T180 48"
            className="text-accent-foreground"
            strokeWidth="3"
          >
            <animate attributeName="stroke-dasharray" values="0 320;320 0" dur="3.4s" repeatCount="indefinite" />
          </path>
          <circle r="5" fill={stroke} stroke="none">
            <animateMotion
              path="M20 60 Q40 30 60 58 T100 56 T140 34 T180 48"
              dur="3.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      );
    case "gears":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="2.5">
          <g>
            <circle cx="78" cy="50" r="20" />
            <circle cx="78" cy="50" r="6" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="78"
                y1="24"
                x2="78"
                y2="30"
                transform={`rotate(${i * 45} 78 50)`}
                strokeLinecap="round"
              />
            ))}
            <animateTransform attributeName="transform" type="rotate" from="0 78 50" to="360 78 50" dur="9s" repeatCount="indefinite" />
          </g>
          <g className="text-accent-foreground">
            <circle cx="130" cy="66" r="14" />
            <circle cx="130" cy="66" r="4" />
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={i} x1="130" y1="48" x2="130" y2="53" transform={`rotate(${i * 60} 130 66)`} strokeLinecap="round" />
            ))}
            <animateTransform attributeName="transform" type="rotate" from="360 130 66" to="0 130 66" dur="6s" repeatCount="indefinite" />
          </g>
        </g>
      );
    case "vision":
      return (
        <g className="text-primary" fill="none" stroke={stroke} strokeWidth="2.5">
          <rect x="34" y="24" width="132" height="54" rx="8" />
          <circle cx="100" cy="51" r="14" className="text-accent-foreground">
            <animate attributeName="r" values="10;16;10" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="51" r="4" fill={stroke} stroke="none" />
          <path d="M34 40 H166" opacity="0.5">
            <animate attributeName="y1" values="28;74;28" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="28;74;28" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M44 24 V16 H60 M156 78 V86 H140" strokeLinecap="round" />
        </g>
      );
  }
}

export type { ArtKind };
