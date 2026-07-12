import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { campaign, bridgeCircleSteps } from "../campaign";

const INTERESTS = [
  "Gaming",
  "Music",
  "Movies",
  "Books",
  "Anime",
  "Photography",
  "Technology",
  "Art",
  "Food",
  "Coffee",
  "Sports",
  "Travel",
  "Mental Wellness",
  "Volunteering",
  "Others",
];

const COURSES = [
  { code: "BSCSAI", name: "Artificial Intelligence" },
  { code: "BSCSDS", name: "Data Science" },
  { code: "BSCSSE", name: "Software Engineering" },
  { code: "BSITCST", name: "Cybersecurity", note: "IT Specialization" },
  { code: "BSITWMA", name: "Web and Mobile Application" },
  { code: "BSITAGD", name: "Animation and Game Development" },
  { code: "BSITBA", name: "Business Analytics" },
  { code: "BMA", name: "Multimedia Arts" },
  { code: "BSCST", name: "Cybersecurity", note: "Degree Program" },
  { code: "BDMM", name: "Digital Marketing and Management" },
  { code: "BSFINTECH", name: "Financial Technology Engineering" },
  { code: "BSCEM", name: "Construction Engineering and Management" },
  { code: "BSCESE", name: "Structural Engineering" },
  { code: "BSCEWRE", name: "Water Resources Engineering" },
  { code: "BSCpEIDA", name: "Internet of Things (IoT) & Data Analytics" },
  { code: "BSCpENAC", name: "Network Administration and Cybersecurity" },
  { code: "BSEE", name: "Electrical Engineering" },
  { code: "BSECECE", name: "Communications Engineering" },
  { code: "BSECEIC", name: "Instrumentation and Control" },
  { code: "BSMEMECH", name: "Mechatronics" },
  { code: "BSMEMSE", name: "Materials Science and Engineering" },
].map((course) => ({
  ...course,
  value: course.code,
  label: course.note
    ? `${course.code} - ${course.name} (${course.note})`
    : `${course.code} - ${course.name}`,
}));

const GENDER_IDENTITIES = [
  "Woman",
  "Man",
  "Non-binary",
  "Transgender Woman",
  "Transgender Man",
  "Genderqueer/Gender Non-conforming",
  "Self-describe",
  "Prefer not to say",
];

const SEXUAL_ORIENTATIONS = [
  "Straight",
  "Gay",
  "Lesbian",
  "Bisexual",
  "Pansexual",
  "Asexual",
  "Queer",
  "Self-describe",
  "Prefer not to say",
];

const MOTIVATIONS = [
  "Meet new people",
  "Learn more about LGBTQIA+",
  "Support inclusivity",
  "Curious",
  "Friend invited me",
  "Others",
];

const INITIAL_FORM = {
  name: "",
  course: "",
  age: "",
  interests: [],
  otherInterest: "",
  mainInterest: "",
  genderIdentity: "",
  genderSelfDescribe: "",
  sexualOrientation: "",
  orientationSelfDescribe: "",
  motivation: "",
  motivationOther: "",
};

export default function Bridge() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submittedRegistration, setSubmittedRegistration] = useState(null);
  const [formError, setFormError] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState(false);

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
  }

  function openRegistration() {
    setRegistrationOpen(true);
    window.requestAnimationFrame(() => {
      document
        .getElementById("bridge-registration")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function toggleInterest(interest) {
    setForm((current) => {
      const isSelected = current.interests.includes(interest);
      if (!isSelected && current.interests.length === 3) {
        return current;
      }

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
  }

  function getDisplayValue(value, selfDescribeValue) {
    if (value === "Self-describe" && selfDescribeValue.trim()) {
      return selfDescribeValue.trim();
    }
    return value;
  }

  function renderSharedValue(value, selfDescribeValue) {
    const displayValue = getDisplayValue(value, selfDescribeValue);
    const parts = displayValue.split("/");
    if (parts.length === 1) {
      return displayValue;
    }

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

  function getInterestDisplay(registration) {
    return registration.interests.map((interest) => {
      if (interest === "Others" && registration.otherInterest) {
        return `Others: ${registration.otherInterest}`;
      }
      return interest;
    });
  }

  function getInterestLabel(interest, otherInterest) {
    if (interest === "Others" && otherInterest) {
      return `Others: ${otherInterest}`;
    }
    return interest;
  }

  function getCourseLabel(courseValue) {
    return COURSES.find((course) => course.value === courseValue)?.label || courseValue;
  }

  function getMotivationLabel(registration) {
    if (registration.motivation === "Others" && registration.motivationOther) {
      return `Others: ${registration.motivationOther}`;
    }
    return registration.motivation;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (form.interests.length !== 3) {
      setFormError("Please select exactly 3 interests for grouping.");
      return;
    }
    if (!form.name.trim()) {
      setFormError("Please enter your name or nickname.");
      return;
    }
    const age = form.age.trim();
    if (!/^\d+$/.test(age) || Number(age) < 1 || Number(age) > 120) {
      setFormError("Please enter a valid age.");
      return;
    }
    if (form.interests.includes("Others") && !form.otherInterest.trim()) {
      setFormError("Please describe your other interest.");
      return;
    }
    if (form.genderIdentity === "Self-describe" && !form.genderSelfDescribe.trim()) {
      setFormError("Please self-describe your gender identity.");
      return;
    }
    if (
      form.sexualOrientation === "Self-describe" &&
      !form.orientationSelfDescribe.trim()
    ) {
      setFormError("Please self-describe your sexual orientation.");
      return;
    }
    if (form.motivation === "Others" && !form.motivationOther.trim()) {
      setFormError("Please describe what motivated you to join.");
      return;
    }

    const registration = {
      ...form,
      name: form.name.trim(),
      age,
      courseLabel: getCourseLabel(form.course),
      otherInterest: form.otherInterest.trim(),
      genderSelfDescribe: form.genderSelfDescribe.trim(),
      orientationSelfDescribe: form.orientationSelfDescribe.trim(),
      motivationOther: form.motivationOther.trim(),
      submittedAt: new Date().toISOString(),
    };

    const saved = JSON.parse(
      window.localStorage.getItem("tulayBridgeRegistrations") || "[]"
    );
    window.localStorage.setItem(
      "tulayBridgeRegistrations",
      JSON.stringify([registration, ...saved])
    );
    setSubmittedRegistration(registration);
    setForm(INITIAL_FORM);
    setFormError("");
  }

  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill pill-alt">Live activity</span>
          <h1>Bridge to Belonging</h1>
          <p className="lead">{campaign.tagline}</p>
          <p className="hero-tag">How Features 3–5 happen in person</p>
          <div className="btn-row">
            <button className="btn btn-primary" type="button" onClick={openRegistration}>
              Join a Bridge Circle
            </button>
          </div>
        </header>
        <img
          src="/art/hero-bridge.jpg"
          alt="Bridge symbolizing connection across campus differences"
          className="page-hero-art"
        />
      </div>

      <section className="prose panel hover-lift">
        <h2>What is this activity?</h2>
        <p>
          Bridge to Belonging is the flagship campus activity under Project
          T.U.L.A.Y. It uses <strong>shared interests</strong> as an entry point
          so students can connect across differences in identity and background —
          moving beyond surface-level tolerance toward genuine inclusion through
          small-group conversation and guided reflection.
        </p>
        <p>
          On the website you can already learn, share stories, practice, and
          pledge. On activity day, those same goals become a facilitated
          experience: Bridge Circles, reflection themes, and physical commitment
          planks.
        </p>
      </section>

      <section className="panel panel-alt hover-lift" style={{ marginTop: "1.1rem" }}>
        <h2 className="panel-title">Maps to core Features 3–5</h2>
        <ul className="nice-list">
          <li>
            <strong>Feature 3 — Hear Each Other:</strong> interest-based circles
            + optional story sharing
          </li>
          <li>
            <strong>Feature 4 — Practice Belonging:</strong> ground rules +
            reflection prompts (Assumptions, Belonging, Inclusion, Values)
          </li>
          <li>
            <strong>Feature 5 — Leave Your Mark:</strong> commitment planks on a
            physical bridge display (+ digital pledges anytime online)
          </li>
        </ul>
      </section>

      <section className="section" style={{ marginTop: "1.5rem" }}>
        <div className="section-label">Activity flow</div>
        <h2 className="section-title left">From sign-up to crossing the bridge</h2>
        <div className="feature-list">
          {bridgeCircleSteps.map((s) => (
            <article key={s.n} className="feature-list-item panel hover-lift">
              <span className="feature-n">Step {s.n}</span>
              <h3>
                {s.title}{" "}
                <span className="feature-sub">({s.subtitle})</span>
              </h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="join-option panel hover-lift" style={{ marginTop: "1.1rem" }}>
        <div>
          <span className="pill">Ready when you are</span>
          <h2>Join today&apos;s Bridge Circle</h2>
          <p>
            Start with a simple website registration and we&apos;ll use your
            interests to help shape a welcoming first conversation.
          </p>
        </div>
        <button className="btn btn-primary" type="button" onClick={openRegistration}>
          Open website registration
        </button>
      </section>

      {registrationOpen && (
      <section id="bridge-registration" className="bridge-registration panel hover-lift">
        <div className="registration-kicker">
          <span className="section-label">Website registration</span>
          <span className="registration-line" aria-hidden="true" />
        </div>
        <div className="registration-head">
          <div>
            <h2 className="section-title left">Start your Bridge Circle registration</h2>
            <p className="muted">
              This is the pause before the activity flow begins. Share a few
              details so facilitators can welcome you into a circle with care.
            </p>
          </div>
          <span className="interest-meter">
            <strong>{form.interests.length}/3</strong>
            <span>selected</span>
          </span>
        </div>

        <form className="form registration-form" onSubmit={onSubmit}>
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
                    onChange={(e) =>
                      updateField("genderSelfDescribe", e.target.value)
                    }
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

          <button className="btn btn-primary btn-block" type="submit">
            Submit registration
          </button>
        </form>

        {submittedRegistration && (
          <div className="registration-confirmation" role="status">
            <div className="confirmation-topline">
              <span className="pill">Registration received</span>
            </div>
            <h3>{submittedRegistration.name} is ready for a Bridge Circle.</h3>
            <div className="confirmation-grid">
              <div className="confirmation-card course-card">
                <span>Course</span>
                <strong>{submittedRegistration.courseLabel}</strong>
              </div>
              <div className="confirmation-card age-card">
                <span>Age</span>
                <strong>{submittedRegistration.age}</strong>
              </div>
              <div className="confirmation-card">
                <span>Group Interest</span>
                <strong>
                  {getInterestLabel(
                    submittedRegistration.mainInterest,
                    submittedRegistration.otherInterest
                  )}
                </strong>
              </div>
              <div className="confirmation-card">
                <span>Motivation</span>
                <strong>{getMotivationLabel(submittedRegistration)}</strong>
              </div>
              <div className="confirmation-card shared-card">
                <span>Shared with us</span>
                <strong>
                  {renderSharedValue(
                    submittedRegistration.genderIdentity,
                    submittedRegistration.genderSelfDescribe
                  )}{" "}
                  ·{" "}
                  {renderSharedValue(
                    submittedRegistration.sexualOrientation,
                    submittedRegistration.orientationSelfDescribe
                  )}
                </strong>
              </div>
            </div>
            <div className="confirmation-tags" aria-label="Selected interests">
              {getInterestDisplay(submittedRegistration).map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
            <p>
              Thank you for joining with openness. Your responses will be used
              only to help facilitators welcome you into a respectful circle, and
              your identity details will be handled with care and confidentiality.
            </p>
          </div>
        )}
      </section>
      )}

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel prose hover-lift">
          <h2>Ground rules (example)</h2>
          <ul className="nice-list">
            <li>Share only what you are comfortable sharing</li>
            <li>Listen to understand, not to debate identity</li>
            <li>No outing anyone or repeating private stories outside the circle</li>
            <li>Humor is welcome — identity as a punchline is not</li>
            <li>You can pass on any prompt</li>
          </ul>
        </div>
        <div className="panel prose hover-lift">
          <h2>Reflection themes</h2>
          <p>Facilitators deepen conversation across four gender-neutral themes:</p>
          <ul className="check-list">
            <li>Assumptions</li>
            <li>Belonging</li>
            <li>Inclusion</li>
            <li>Values</li>
          </ul>
          <p className="muted" style={{ marginTop: "0.75rem" }}>
            Online, you can practice related choices anytime with the scenario quiz.
          </p>
          <Link to="/quiz" className="text-link">
            Open practice scenarios →
          </Link>
        </div>
      </section>

      <section className="cta-band" style={{ marginTop: "1.5rem" }}>
        <div>
          <h2>Can&apos;t join a circle today?</h2>
          <p>
            Walk the digital bridge: learn, share, practice, and leave a plank
            online.
          </p>
        </div>
        <div className="btn-row">
          <Link className="btn btn-primary" to="/pledge">
            Leave a digital plank
          </Link>
          <Link className="btn btn-ghost-light" to="/about">
            Back to Features 1–5
          </Link>
        </div>
      </section>
    </div>
  );
}
