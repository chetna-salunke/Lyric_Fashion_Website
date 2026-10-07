import "./Field.css";

/* Label + input/textarea/select with an inline, screen-reader-friendly error message */
export default function Field({ id, label, optional, error, hint, as = "input", children, ...props }) {
  const Tag = as;
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={error ? "field field--error" : "field"}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">(optional)</span>}
      </label>
      <Tag id={id} name={id} aria-invalid={!!error} aria-describedby={describedBy} {...props}>
        {children}
      </Tag>
      {error ? (
        <p className="field__msg" id={`${id}-err`} role="alert">{error}</p>
      ) : hint ? (
        <p className="field__hint" id={`${id}-hint`}>{hint}</p>
      ) : null}
    </div>
  );
}
