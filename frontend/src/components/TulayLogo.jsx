export default function TulayLogo({ variant = "full", theme = "light" }) {
  const compact = variant === "mark";

  return (
    <span className={`tulay-logo tulay-logo-${theme}${compact ? " tulay-logo-compact" : ""}`}>
      <img
        className="tulay-logo-mark"
        src="/brand/tulay-mark.png"
        alt={compact ? "Project TULAY" : ""}
        aria-hidden={compact ? undefined : true}
      />
      {!compact && (
        <span className="tulay-logo-copy">
          <strong>Project TULAY</strong>
          <small>Bridge to Belonging</small>
        </span>
      )}
    </span>
  );
}
