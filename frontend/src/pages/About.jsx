export default function About() {
  return (
    <div className="page narrow">
      <header className="page-header">
        <span className="pill">About</span>
        <h1>Project T.U.L.A.Y.</h1>
        <p className="lead">
          Transforming Understanding through Learning, Acceptance, and You
        </p>
      </header>

      <section className="prose panel">
        <h2>Campaign overview</h2>
        <p>
          Project T.U.L.A.Y. is a student-centered digital campaign that promotes
          awareness, empathy, and action against microaggressions, discrimination,
          and learned prejudice toward women, LGBTQIA+ students, and other
          marginalized groups at{" "}
          <strong>Far Eastern University Institute of Technology (FEU Tech)</strong>.
        </p>
        <p>
          Discrimination is often learned — from family beliefs, peer culture,
          internet jokes, and everyday habits. True inclusion starts with unlearning
          harmful ideas and creating safer spaces for conversation.
        </p>
      </section>

      <section className="prose panel">
        <h2>Core problem</h2>
        <p>
          Many students may not recognize that casual jokes, stereotypes, comments,
          or dismissive behavior can become microaggressions. These are often
          normalized — and marginalized students may feel unsafe, unheard, or
          invalidated.
        </p>
      </section>

      <section className="prose panel">
        <h2>Core objective</h2>
        <p>
          Encourage students and youth to unlearn systemic prejudice, recognize
          microaggressions, and promote genuine inclusion — starting from personal
          awareness and everyday behavior.
        </p>
      </section>

      <section className="grid-2">
        <div className="panel">
          <h3>Sub-objectives</h3>
          <ol className="nice-list">
            <li>Raise awareness about microaggressions</li>
            <li>Differentiate tolerance from acceptance</li>
            <li>Provide a safe digital space for shared experiences</li>
            <li>Promote legal awareness (incl. RA 11313)</li>
            <li>Encourage action through interactive learning</li>
          </ol>
        </div>
        <div className="panel panel-alt">
          <h3>Target audience</h3>
          <ul className="check-list">
            <li>Students & youth</li>
            <li>Campus communities</li>
            <li>Young people shaped by online culture & peer influence</li>
          </ul>
        </div>
      </section>

      <section className="grid-2">
        <div className="panel">
          <span className="badge">Campaign 1</span>
          <h3>K.A.P.W.A.</h3>
          <p>
            A digital wall for stories of microaggression, discrimination, and
            moments of being unheard — with moderation, reactions, and reflection
            prompts.
          </p>
        </div>
        <div className="panel">
          <span className="badge badge-alt">Campaign 2</span>
          <h3>H.I.N.T.O.</h3>
          <p>
            Pause before harm continues. Awareness hub for education, better
            language, tolerance vs acceptance, and careful legal literacy.
          </p>
        </div>
      </section>

      <section className="panel banner">
        <h3>Final message</h3>
        <p>
          Project T.U.L.A.Y. is not just a website. It is a digital bridge toward a
          more inclusive campus culture — where everyone feels respected, heard, and
          accepted.
        </p>
      </section>
    </div>
  );
}
