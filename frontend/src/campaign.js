/** Project T.U.L.A.Y. — Approach A: core journey as Features 1–5 */

export const campaign = {
  name: "Project T.U.L.A.Y.",
  expansion:
    "Transforming Understanding through Learning, Acceptance, and You",
  subtitle:
    "A Campus Campaign Bridging the Gap Between Tolerance and True Inclusion",
  tagline: "Bridge to Belonging — Building Connections Beyond Labels",
  shortTagline: "Bridge to Belonging",
  purpose:
    "A campus campaign that uses shared interests and guided reflection as entry points to help students connect across differences in identity and background — moving beyond surface-level tolerance toward genuine inclusion and belonging.",
  progression: ["Tolerance", "Acceptance", "Inclusion", "Belonging"],
};

/** Core product features (public-facing) */
export const features = [
  {
    n: 1,
    title: "See the Gap",
    subtitle: "Tolerance ≠ Inclusion",
    body: "Name the problem clearly: legal protection and “okay lang sila” tolerance do not automatically mean lived inclusion. Project T.U.L.A.Y. starts by making the gap between tolerance and true inclusion visible.",
    to: "/about",
    icon: "🌉",
    stage: "Tolerance",
  },
  {
    n: 2,
    title: "Name the Quiet Harm",
    subtitle: "Microaggressions",
    body: "Surface the everyday jokes, traditions, and “preferences” that quietly signal LGBTQIA+ students and other marginalized peers are outsiders — even in spaces that claim to be accepting.",
    to: "/learn",
    icon: "🔍",
    stage: "Acceptance",
  },
  {
    n: 3,
    title: "Hear Each Other",
    subtitle: "Stories & Bridge Circles",
    body: "Create structured spaces for connection: moderated campus stories online, and in-person Bridge Circles grouped by shared interests so first conversations feel lower-pressure and more human.",
    to: "/kapwa",
    icon: "💬",
    stage: "Inclusion",
  },
  {
    n: 4,
    title: "Practice Belonging",
    subtitle: "Guided reflection",
    body: "Move past small talk with gender-neutral reflection themes — Assumptions, Belonging, Inclusion, and Values — plus interactive campus scenarios that teach without shaming.",
    to: "/quiz",
    icon: "🪞",
    stage: "Inclusion",
  },
  {
    n: 5,
    title: "Leave Your Mark",
    subtitle: "Commitment & belonging",
    body: "Turn insight into a public commitment: physical planks on a bridge display at events, and digital pledges on this site — a growing symbol of collective choice for inclusion.",
    to: "/pledge",
    icon: "✍️",
    stage: "Belonging",
  },
];

/** Live activity steps (how Features 3–5 happen in person) */
export const bridgeCircleSteps = [
  {
    n: 1,
    title: "Registration",
    subtitle: "Choose Your Path",
    body: "Participants sign up via Google Form or the website, with optional basic info, top 3 interests, optional demographic details (including self-describe), and what motivated them to join.",
  },
  {
    n: 2,
    title: "Interest-Based Grouping",
    subtitle: "Form the Bridge Circles",
    body: 'Participants are grouped into Bridge Circles of about five based on shared interests (e.g. Gaming, Music, Books), making initial conversations easier and lower-pressure.',
  },
  {
    n: 3,
    title: "Guided Interaction",
    subtitle: "Build the Bridge",
    body: "Groups interact freely, sharing only what they're comfortable with. Ground rules and agreements are set upfront so the experience feels safe and non-forcing.",
  },
  {
    n: 4,
    title: "Reflection Prompts",
    subtitle: "Strengthen the Bridge",
    body: "Facilitators pose gender-neutral discussion questions across four themes: Assumptions, Belonging, Inclusion, and Values — deepening conversation beyond small talk.",
  },
  {
    n: 5,
    title: "Commitment Planks",
    subtitle: "Leave Your Plank",
    body: 'Participants write a personal commitment to inclusion on a sticky note ("plank"), attached to a large bridge display — a visual symbol of collective commitment.',
  },
  {
    n: 6,
    title: "Closing",
    subtitle: "Cross the Bridge",
    body: "A wrap-up segment ends the activity and ties the experience together — from first hello to a shared step toward belonging.",
  },
];
