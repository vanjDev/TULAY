export default function About() {
  return (
    <div className="page">
      <div className="page-hero-band page-hero-with-art">
        <header className="page-header">
          <span className="pill">About the campaign</span>
          <h1>Project T.U.L.A.Y.</h1>
          <p className="lead">
            Transforming Understanding through Learning, Acceptance, and You
          </p>
          <p className="hero-tag">Bridging Tolerance to Acceptance</p>
        </header>
        <img
          src="/art/hero-bridge.jpg"
          alt="Students united under a bridge representing Project TULAY"
          className="page-hero-art"
        />
      </div>

      <section className="prose panel hover-lift">
        <h2>For students, by students</h2>
        <p>
          Project T.U.L.A.Y. is a student-centered digital campaign that promotes
          awareness, empathy, and action against microaggressions, discrimination,
          and learned prejudice toward women, LGBTQIA+ students, and other
          marginalized groups in campus communities.
        </p>
        <p>
          Discrimination is often learned — from family beliefs, peer culture,
          internet jokes, and everyday habits. True inclusion starts with unlearning
          harmful ideas and creating safer spaces for conversation.
        </p>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel prose hover-lift">
          <h2>Core problem</h2>
          <p>
            Many students may not recognize that casual jokes, stereotypes, comments,
            or dismissive behavior can become microaggressions. These are often
            normalized — and marginalized students may feel unsafe, unheard, or
            invalidated.
          </p>
        </div>
        <div className="panel panel-alt prose hover-lift">
          <h2>Core objective</h2>
          <p>
            Encourage students and youth to unlearn systemic prejudice, recognize
            microaggressions, and promote genuine inclusion — starting from personal
            awareness and everyday behavior.
          </p>
        </div>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel hover-lift">
          <h3 className="panel-title">Sub-objectives</h3>
          <ol className="nice-list">
            <li>Raise awareness about microaggressions</li>
            <li>Differentiate tolerance from acceptance</li>
            <li>Provide a safe digital space for shared experiences</li>
            <li>Promote legal awareness (incl. RA 11313)</li>
            <li>Encourage action through interactive learning</li>
          </ol>
        </div>
        <div className="panel hover-lift">
          <h3 className="panel-title">Who it&apos;s for</h3>
          <ul className="check-list">
            <li>Students &amp; youth</li>
            <li>Campus communities everywhere</li>
            <li>Anyone shaped by online culture &amp; peer influence</li>
          </ul>
        </div>
      </section>

      <section className="grid-2" style={{ marginTop: "1.1rem" }}>
        <div className="panel hover-lift">
          <span className="badge">Campaign 1</span>
          <h3 className="panel-title">K.A.P.W.A.</h3>
          <p>
            A digital wall for stories of microaggression, discrimination, and
            moments of being unheard — with moderation, reactions, and reflection
            prompts.
          </p>
        </div>
        <div className="panel hover-lift">
          <span className="badge badge-alt">Campaign 2</span>
          <h3 className="panel-title">H.I.N.T.O.</h3>
          <p>
            Pause before harm continues. Awareness hub for education, better
            language, tolerance vs acceptance, and careful legal literacy.
          </p>
        </div>
      </section>

      <section className="section banner">
        <p>
          Project T.U.L.A.Y. is not just a website. It is a digital bridge toward more
          inclusive campus cultures — where every student feels respected, heard, and
          accepted.
        </p>
      </section>
    </div>
  );
}
