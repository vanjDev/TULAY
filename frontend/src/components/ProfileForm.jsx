import { useMemo, useState } from "react";
import {
  COURSES,
  EMPTY_PROFILE_FORM,
  GENDER_IDENTITIES,
  INTERESTS,
  MOTIVATIONS,
  SEXUAL_ORIENTATIONS,
  getCourseLabel,
  getInterestLabel,
  getMotivationLabel,
  getDisplayValue,
  participantToProfileForm,
  profileFormToPayload,
  validateProfileForm,
} from "../registrationOptions";

/**
 * Bridge Circle profile form — shared by Register (post-account), Bridge join, and Settings.
 */
export default function ProfileForm({
  initialParticipant = null,
  initialForm = null,
  submitLabel = "Save profile",
  submittingLabel = "Saving...",
  onSubmit,
  showConfirmation = true,
  compactHeader = false,
  title = "Bridge Circle profile",
  description = "Share a few details so we can welcome you into a circle with care.",
}) {
  const [form, setForm] = useState(() => {
    if (initialForm) return { ...EMPTY_PROFILE_FORM, ...initialForm };
    return participantToProfileForm(initialParticipant);
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const mainInterestOptions = useMemo(() => {
    const otherLabel = form.otherInterest.trim()
      ? `Others: ${form.otherInterest.trim()}`
      : "Others";
    return form.interests.map((interest) => ({
      value: interest,
      label: interest === "Others" ? otherLabel : interest,
    }));
  }, [form.interests, form.otherInterest]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError("");
    setSubmitted(null);
  }

  function toggleInterest(interest) {
    setForm((current) => {
      const isSelected = current.interests.includes(interest);
      if (!isSelected && current.interests.length === 3) return current;

      const interests = isSelected
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest];

      const nextMainInterest =
        current.mainInterest === interest && !interests.includes(interest)
          ? ""
          : current.mainInterest;

      return { ...current, interests, mainInterest: nextMainInterest };
    });
    setFormError("");
    setSubmitted(null);
  }

  function renderSharedValue(value, selfDescribeValue) {
    const displayValue = getDisplayValue(value, selfDescribeValue);
    const parts = String(displayValue || "").split("/");
    if (parts.length === 1) return displayValue;

    return parts.map((part, index) => (
      <span key={`${part}-${index}`} className="shared-value-part">
        {part}
        {index < parts.length - 1 && (
          <>
            /
            <br />
          </>
        )}
      </span>
    ));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const error = validateProfileForm(form);
    if (error) {
      setFormError(error);
      return;
    }

    const payload = profileFormToPayload(form);
    setSubmitting(true);
    setFormError("");
    try {
      const result = await onSubmit?.(payload, form);
      if (showConfirmation) {
        setSubmitted({
          ...form,
          name: form.name.trim(),
          age: String(form.age).trim(),
          courseLabel: getCourseLabel(form.course),
          otherInterest: form.otherInterest.trim(),
          genderSelfDescribe: form.genderSelfDescribe.trim(),
          orientationSelfDescribe: form.orientationSelfDescribe.trim(),
          motivationOther: form.motivationOther.trim(),
          result,
        });
      }
    } catch (err) {
      setFormError(err.message || "Unable to save profile");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="profile-form-wrap">
      {!compactHeader && (
        <div className="registration-head">
          <div>
            <h2 className="section-title left">{title}</h2>
            <p className="muted">{description}</p>
          </div>
          <span className="interest-meter">
            <strong>{form.interests.length}/3</strong>
            <span>selected</span>
          </span>
        </div>
      )}

      {compactHeader && (
        <div className="registration-head compact">
          <p className="muted" style={{ margin: 0 }}>
            {description}
          </p>
          <span className="interest-meter">
            <strong>{form.interests.length}/3</strong>
            <span>selected</span>
          </span>
        </div>
      )}

      <form className="form registration-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Section A: Basic Information</legend>
          <div className="form-row">
            <label>
              Name/Nickname
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your name or nickname"
                required
              />
            </label>
            <label>
              Course
              <select
                value={form.course}
                onChange={(e) => updateField("course", e.target.value)}
                required
              >
                <option value="">Select course</option>
                {COURSES.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Age
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              value={form.age}
              onChange={(e) =>
                updateField("age", e.target.value.replace(/\D/g, "").slice(0, 3))
              }
              placeholder="Enter age"
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Section B: Interests</legend>
          <p className="field-help">
            Select exactly 3 interests. These are used to form initial circles.
          </p>
          <div className="interest-grid" role="group" aria-label="Top 3 interests">
            {INTERESTS.map((interest) => {
              const checked = form.interests.includes(interest);
              const disabled = !checked && form.interests.length === 3;
              return (
                <label
                  key={interest}
                  className={`choice-card${checked ? " active" : ""}${
                    disabled ? " disabled" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleInterest(interest)}
                  />
                  <span>{interest}</span>
                </label>
              );
            })}
          </div>
          {form.interests.includes("Others") && (
            <label>
              Others
              <input
                value={form.otherInterest}
                onChange={(e) => updateField("otherInterest", e.target.value)}
                placeholder="Tell us your interest"
                required
              />
            </label>
          )}
          <label>
            Which interest would you most enjoy discussing today?
            <select
              value={form.mainInterest}
              onChange={(e) => updateField("mainInterest", e.target.value)}
              disabled={form.interests.length === 0}
              required
            >
              <option value="">Select from your top 3 interests</option>
              {mainInterestOptions.map((interest) => (
                <option key={interest.value} value={interest.value}>
                  {interest.label}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>Section C: Demographics</legend>
          <div className="form-row">
            <label>
              Gender Identity
              <select
                value={form.genderIdentity}
                onChange={(e) => updateField("genderIdentity", e.target.value)}
                required
              >
                <option value="">Select one</option>
                {GENDER_IDENTITIES.map((identity) => (
                  <option key={identity} value={identity}>
                    {identity}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sexual Orientation
              <select
                value={form.sexualOrientation}
                onChange={(e) => updateField("sexualOrientation", e.target.value)}
                required
              >
                <option value="">Select one</option>
                {SEXUAL_ORIENTATIONS.map((orientation) => (
                  <option key={orientation} value={orientation}>
                    {orientation}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            {form.genderIdentity === "Self-describe" && (
              <label>
                Self-describe gender identity
                <input
                  value={form.genderSelfDescribe}
                  onChange={(e) => updateField("genderSelfDescribe", e.target.value)}
                  required
                />
              </label>
            )}
            {form.sexualOrientation === "Self-describe" && (
              <label>
                Self-describe sexual orientation
                <input
                  value={form.orientationSelfDescribe}
                  onChange={(e) =>
                    updateField("orientationSelfDescribe", e.target.value)
                  }
                  required
                />
              </label>
            )}
          </div>
          <label>
            What motivated you to join today?
            <select
              value={form.motivation}
              onChange={(e) => updateField("motivation", e.target.value)}
              required
            >
              <option value="">Select one</option>
              {MOTIVATIONS.map((motivation) => (
                <option key={motivation} value={motivation}>
                  {motivation}
                </option>
              ))}
            </select>
          </label>
          {form.motivation === "Others" && (
            <label>
              Others
              <input
                value={form.motivationOther}
                onChange={(e) => updateField("motivationOther", e.target.value)}
                placeholder="Tell us what brought you here"
                required
              />
            </label>
          )}
        </fieldset>

        {formError && (
          <p className="alert error" role="alert">
            {formError}
          </p>
        )}

        <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
          {submitting ? submittingLabel : submitLabel}
        </button>
      </form>

      {showConfirmation && submitted && (
        <div className="registration-confirmation" role="status">
          <div className="confirmation-topline">
            <span className="pill">Profile saved</span>
          </div>
          <h3>{submitted.name} is ready for a Bridge Circle.</h3>
          <div className="confirmation-grid">
            <div className="confirmation-card course-card">
              <span>Course</span>
              <strong>{submitted.courseLabel}</strong>
            </div>
            <div className="confirmation-card age-card">
              <span>Age</span>
              <strong>{submitted.age}</strong>
            </div>
            <div className="confirmation-card">
              <span>Group Interest</span>
              <strong>
                {getInterestLabel(submitted.mainInterest, submitted.otherInterest)}
              </strong>
            </div>
            <div className="confirmation-card">
              <span>Motivation</span>
              <strong>{getMotivationLabel(submitted)}</strong>
            </div>
            <div className="confirmation-card shared-card">
              <span>Shared with us</span>
              <strong>
                {renderSharedValue(
                  submitted.genderIdentity,
                  submitted.genderSelfDescribe
                )}{" "}
                ·{" "}
                {renderSharedValue(
                  submitted.sexualOrientation,
                  submitted.orientationSelfDescribe
                )}
              </strong>
            </div>
          </div>
          <div className="confirmation-tags" aria-label="Selected interests">
            {submitted.interests.map((interest) => (
              <span key={interest}>
                {getInterestLabel(interest, submitted.otherInterest)}
              </span>
            ))}
          </div>
          <p>
            Thank you for joining with openness. Your responses help facilitators
            welcome you into a respectful circle, and identity details are handled
            with care and confidentiality.
          </p>
        </div>
      )}
    </div>
  );
}
