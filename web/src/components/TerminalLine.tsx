import * as React from "react";

type Variant = "open" | "close";

interface TerminalLineProps {
  /** "open" for ┌─── label ───… or "close" for └───… */
  variant: Variant;
  /** Label shown after the opening corner (ignored for close) */
  label?: string;
  /** Override colour – defaults to "#555" */
  color?: string;
}

const DASH = "─";

function buildOpen(label: string, total: number): string {
  const prefix = `┌─── ${label} `;
  const remaining = Math.max(0, total - prefix.length);
  return prefix + DASH.repeat(remaining);
}

function buildClose(total: number): string {
  return "└" + DASH.repeat(Math.max(0, total - 1));
}

/**
 * Responsive terminal box-drawing line.
 * Renders a long line that clips gracefully on narrow viewports
 * instead of wrapping to the next line.
 */
const TerminalLine: React.FC<TerminalLineProps> = ({
  variant,
  label = "",
  color = "#555",
}) => {
  const line =
    variant === "open" ? buildOpen(label, 48) : buildClose(48);

  return (
    <div
      style={{
        color,
        fontSize: "0.75rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        maxWidth: "100%",
        ...(variant === "open"
          ? { marginBottom: "0.5rem" }
          : { marginTop: variant === "close" ? "0.5rem" : undefined }),
      }}
    >
      {line}
    </div>
  );
};

export default TerminalLine;
