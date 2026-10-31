// Enquiry form rendered from the owner's Wix Forms schema. Field names, labels, choices and the
// thank-you text all come from the dashboard; nothing here names a field.
import { useEffect, type ReactNode } from "react";
import { useWixForm, FORM_ERROR, otherText, otherValue } from "../../hooks/forms/useWixForm";
import type { FormDto, FormFieldDto } from "../../wix/forms/types";

interface Props {
  formId: string;
  initialForm?: FormDto;
}

const INPUT_TYPES: Record<string, string> = {
  text: "text",
  email: "email",
  url: "url",
  phone: "tel",
  password: "password",
  date: "date",
  time: "time",
  datetime: "datetime-local",
  number: "number",
  rating: "number",
};

export default function ContactForm({ formId, initialForm }: Props) {
  const f = useWixForm(formId, { initialForm });

  // The owner's redirect (or a paid form's checkout) is followed once, after the submit resolves.
  useEffect(() => {
    const url = f.outcome?.url;
    if (!url) return;
    if (f.outcome?.newTab) window.open(url, "_blank", "noopener");
    else window.location.assign(url);
  }, [f.outcome]);

  // A form that can't load is a setup problem: log the real error, show visitors a way forward.
  const loadError = f.errors[FORM_ERROR] && !f.form ? f.errors[FORM_ERROR] : null;
  useEffect(() => {
    if (loadError) console.error("[enquiry form]", loadError);
  }, [loadError]);

  if (f.outcome) {
    const paragraphs = (f.outcome.message ?? "").split("\n").filter(Boolean);
    return (
      <div className="form-success" role="status">
        <h3>Thank you</h3>
        {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p>We have your details and will get back to you about your date.</p>}
        <button type="button" className="link-arrow" onClick={f.reset} style={{ background: "none", border: 0, cursor: "pointer" }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  if (loadError) {
    return (
      <p className="form-error" role="alert">
        The enquiry form couldn&rsquo;t load right now. Please send your date on WhatsApp or call us instead.
      </p>
    );
  }

  if (!f.form) {
    return (
      <div className="wix-form" aria-busy="true" aria-label="Loading the enquiry form">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="skeleton" />)}
      </div>
    );
  }

  if (f.closed) {
    return <p className="form-error">{f.form.disabledMessage || "This form is not accepting enquiries right now. Please message us on WhatsApp."}</p>;
  }

  const form = f.form;
  const step = form.steps[f.step] ?? form.steps[0];
  const last = f.step >= form.steps.length - 1;
  const fields = step ? form.fields.filter((x) => x.stepId === step.id) : form.fields;

  const required = (field: FormFieldDto): ReactNode => {
    if (!field.required || form.requiredIndicator === "NONE") return null;
    return <span className="req">{form.requiredIndicator === "TEXT" ? " (Required)" : " *"}</span>;
  };
  const label = (field: FormFieldDto, htmlFor?: string): ReactNode => {
    if (!field.showLabel) return null;
    const mark = required(field);
    const content = form.requiredIndicatorBefore ? <>{mark}{field.label}</> : <>{field.label}{mark}</>;
    return htmlFor ? <label className="field-label" htmlFor={htmlFor}>{content}</label> : <span className="field-label">{content}</span>;
  };
  const error = (key: string) =>
    f.errors[key] ? <p className="field-error" id={`err-${key}`}>{f.errors[key]}</p> : <span id={`err-${key}`} hidden />;
  const help = (field: FormFieldDto) => (field.description ? <p className="field-help">{field.description}</p> : null);

  const renderField = (field: FormFieldDto) => {
    const id = `f-${field.target}`;
    const aria = field.showLabel ? undefined : field.label;
    const value = f.values[field.target];

    switch (field.control) {
      case "textarea":
        return (
          <div className="field" key={field.target}>
            {label(field, id)}
            <textarea id={id} aria-label={aria} placeholder={field.placeholder} disabled={field.readOnly} {...f.bind(field.target)} />
            {help(field)}
            {error(field.target)}
          </div>
        );
      case "select":
        return (
          <div className="field" key={field.target}>
            {label(field, id)}
            <select id={id} aria-label={aria} disabled={field.readOnly} {...f.bind(field.target)}>
              <option value="">{field.placeholder || "Select"}</option>
              {field.choices.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            {help(field)}
            {error(field.target)}
          </div>
        );
      case "radio": {
        const current = typeof value === "string" ? value : "";
        return (
          <fieldset className="field" key={field.target} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field-label">{field.label}{required(field)}</legend>
            {field.choices.map((c) => (
              <label className="choice" key={c.value}>
                <input
                  type="radio"
                  name={field.target}
                  value={c.value}
                  checked={current === c.value}
                  disabled={field.readOnly}
                  aria-describedby={`err-${field.target}`}
                  onChange={() => f.setValues((v) => ({ ...v, [field.target]: c.value }))}
                  onBlur={() => f.validate(field.target)}
                />
                {c.label}
              </label>
            ))}
            {field.otherOption && (
              <label className="choice">
                <input
                  type="radio"
                  name={field.target}
                  checked={otherText(field, current) !== null}
                  onChange={() => f.setValues((v) => ({ ...v, [field.target]: otherValue(field, "") }))}
                />
                {field.otherOption.label}
                <input
                  type="text"
                  placeholder={field.otherOption.placeholder}
                  value={otherText(field, current) ?? ""}
                  onChange={(e) => f.setValues((v) => ({ ...v, [field.target]: otherValue(field, e.target.value) }))}
                />
              </label>
            )}
            {help(field)}
            {error(field.target)}
          </fieldset>
        );
      }
      case "checkbox":
        return (
          <div className="field" key={field.target}>
            <label className="choice">
              <input
                type="checkbox"
                name={field.target}
                checked={value === true}
                disabled={field.readOnly}
                aria-describedby={`err-${field.target}`}
                onChange={(e) => f.setValues((v) => ({ ...v, [field.target]: e.target.checked }))}
                onBlur={() => f.validate(field.target)}
              />
              {field.label}{required(field)}
            </label>
            {help(field)}
            {error(field.target)}
          </div>
        );
      case "checkboxGroup":
      case "tags": {
        const selected = Array.isArray(value) ? (value as string[]) : [];
        return (
          <fieldset className="field" key={field.target} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field-label">{field.label}{required(field)}</legend>
            {field.choices.map((c) => (
              <label className="choice" key={c.value}>
                <input
                  type="checkbox"
                  name={field.target}
                  value={c.value}
                  checked={selected.includes(c.value)}
                  disabled={field.readOnly}
                  aria-describedby={`err-${field.target}`}
                  onChange={(e) =>
                    f.setValues((v) => {
                      const prev = Array.isArray(v[field.target]) ? (v[field.target] as string[]) : [];
                      return { ...v, [field.target]: e.target.checked ? [...prev, c.value] : prev.filter((x) => x !== c.value) };
                    })
                  }
                  onBlur={() => f.validate(field.target)}
                />
                {c.label}
              </label>
            ))}
            {help(field)}
            {error(field.target)}
          </fieldset>
        );
      }
      case "address": {
        const addr = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, string>) : {};
        return (
          <fieldset className="field" key={field.target} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field-label">{field.label}{required(field)}</legend>
            {field.addressParts.map((part) => {
              const key = `${field.target}/${part.sub}`;
              const set = (val: string) => f.setValues((v) => ({ ...v, [field.target]: { ...(v[field.target] as Record<string, string>), [part.sub]: val } }));
              return (
                <div className="field" key={key}>
                  <label className="field-label" htmlFor={`f-${key}`}>{part.label}{part.required ? " *" : ""}</label>
                  {part.choices ? (
                    <select id={`f-${key}`} value={addr[part.sub] ?? ""} onChange={(e) => set(e.target.value)} onBlur={() => f.validate(key)} aria-describedby={`err-${key}`}>
                      <option value="">Select</option>
                      {part.choices.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  ) : (
                    <input id={`f-${key}`} value={addr[part.sub] ?? ""} onChange={(e) => set(e.target.value)} onBlur={() => f.validate(key)} aria-describedby={`err-${key}`} />
                  )}
                  {error(key)}
                </div>
              );
            })}
            {error(field.target)}
          </fieldset>
        );
      }
      case "file":
      case "signature":
        return (
          <div className="field" key={field.target}>
            {label(field, id)}
            <input
              id={id}
              type="file"
              name={field.target}
              accept={field.validation.accept}
              multiple={(field.validation.fileLimit ?? 1) > 1}
              aria-describedby={`err-${field.target}`}
              onChange={(e) => f.setValues((v) => ({ ...v, [field.target]: [...(e.target.files ?? [])] }))}
            />
            {help(field)}
            {error(field.target)}
          </div>
        );
      case "payment":
      case "appointment":
      case "unknown":
        return (
          <p className="field-help" key={field.target}>
            {field.label}: please message us on WhatsApp for this part of your enquiry.
          </p>
        );
      default:
        return (
          <div className="field" key={field.target}>
            {label(field, id)}
            <input
              id={id}
              type={INPUT_TYPES[field.control] ?? "text"}
              aria-label={aria}
              placeholder={field.placeholder ?? (field.control === "phone" && field.phoneCountry === "IN" ? "+91 98765 43210" : undefined)}
              disabled={field.readOnly}
              min={field.validation.minDate ?? field.validation.minimum}
              max={field.validation.maxDate ?? field.validation.maximum}
              {...f.bind(field.target)}
            />
            {help(field)}
            {error(field.target)}
          </div>
        );
    }
  };

  return (
    <form className="wix-form" noValidate onSubmit={async (e) => { await f.submit(e); }}>
      {form.steps.length > 1 && step && <p className="eyebrow">{step.name} · {f.step + 1} of {form.steps.length}</p>}
      {fields.map(renderField)}
      {f.errors[FORM_ERROR] && <p className="form-error" role="alert">{f.errors[FORM_ERROR]}</p>}
      <div className="form-actions">
        {f.step > 0 && (
          <button type="button" className="btn btn-outline" onClick={f.previous}>{form.previousText || "Back"}</button>
        )}
        {last ? (
          <button type="submit" className="btn btn-primary" disabled={f.loading}>
            {f.loading ? "Sending…" : form.submitText || "Send enquiry"}
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => f.next()}>
            {form.nextText || "Continue"}
          </button>
        )}
      </div>
    </form>
  );
}
