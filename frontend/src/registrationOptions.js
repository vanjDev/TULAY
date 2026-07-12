/** Shared Bridge Circle profile options — single source of truth for Register, Bridge, Settings. */

export const INTERESTS = [
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

export const COURSES = [
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

export const GENDER_IDENTITIES = [
  "Woman",
  "Man",
  "Non-binary",
  "Transgender Woman",
  "Transgender Man",
  "Genderqueer/Gender Non-conforming",
  "Self-describe",
  "Prefer not to say",
];

export const SEXUAL_ORIENTATIONS = [
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

export const MOTIVATIONS = [
  "Meet new people",
  "Learn more about LGBTQIA+",
  "Support inclusivity",
  "Curious",
  "Friend invited me",
  "Others",
];

export const EMPTY_PROFILE_FORM = {
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

export function getCourseLabel(courseValue) {
  return COURSES.find((course) => course.value === courseValue)?.label || courseValue;
}

export function getInterestLabel(interest, otherInterest) {
  if (interest === "Others" && otherInterest) {
    return `Others: ${otherInterest}`;
  }
  return interest;
}

export function getDisplayValue(value, selfDescribeValue) {
  if (value === "Self-describe" && selfDescribeValue?.trim()) {
    return selfDescribeValue.trim();
  }
  return value;
}

export function getMotivationLabel(form) {
  if (form.motivation === "Others" && form.motivationOther) {
    return `Others: ${form.motivationOther}`;
  }
  return form.motivation;
}

/** Map participant API record → form state */
export function participantToProfileForm(participant) {
  if (!participant) return { ...EMPTY_PROFILE_FORM };

  const interests = [participant.interest_1, participant.interest_2, participant.interest_3]
    .map((value) => (value || "").trim())
    .filter(Boolean);

  let motivation = participant.motivation || "";
  let motivationOther = "";
  if (motivation.startsWith("Others:")) {
    motivationOther = motivation.slice(7).trim();
    motivation = "Others";
  } else if (motivation && !MOTIVATIONS.includes(motivation)) {
    motivationOther = motivation;
    motivation = "Others";
  }

  let genderIdentity = participant.gender_identity || "";
  let genderSelfDescribe = "";
  if (genderIdentity && !GENDER_IDENTITIES.includes(genderIdentity)) {
    genderSelfDescribe = genderIdentity;
    genderIdentity = "Self-describe";
  }

  let sexualOrientation = participant.sexual_orientation || "";
  let orientationSelfDescribe = "";
  if (sexualOrientation && !SEXUAL_ORIENTATIONS.includes(sexualOrientation)) {
    orientationSelfDescribe = sexualOrientation;
    sexualOrientation = "Self-describe";
  }

  return {
    name: participant.full_name || "",
    course: participant.course || "",
    age: participant.age != null && participant.age !== "" ? String(participant.age) : "",
    interests,
    otherInterest: participant.other_interest || "",
    mainInterest: participant.main_interest || "",
    genderIdentity,
    genderSelfDescribe,
    sexualOrientation,
    orientationSelfDescribe,
    motivation,
    motivationOther,
  };
}

/** Validate form; returns error string or "" */
export function validateProfileForm(form) {
  if (!form.name?.trim()) return "Please enter your name or nickname.";
  if (!form.course) return "Please select your course.";
  const age = String(form.age || "").trim();
  if (!/^\d+$/.test(age) || Number(age) < 1 || Number(age) > 120) {
    return "Please enter a valid age.";
  }
  if (!Array.isArray(form.interests) || form.interests.length !== 3) {
    return "Please select exactly 3 interests for grouping.";
  }
  if (form.interests.includes("Others") && !form.otherInterest?.trim()) {
    return "Please describe your other interest.";
  }
  if (!form.mainInterest) return "Please choose which interest you most enjoy discussing.";
  if (!form.interests.includes(form.mainInterest)) {
    return "Main interest must be one of your top 3.";
  }
  if (!form.genderIdentity) return "Please select a gender identity option.";
  if (form.genderIdentity === "Self-describe" && !form.genderSelfDescribe?.trim()) {
    return "Please self-describe your gender identity.";
  }
  if (!form.sexualOrientation) return "Please select a sexual orientation option.";
  if (form.sexualOrientation === "Self-describe" && !form.orientationSelfDescribe?.trim()) {
    return "Please self-describe your sexual orientation.";
  }
  if (!form.motivation) return "Please select what motivated you to join.";
  if (form.motivation === "Others" && !form.motivationOther?.trim()) {
    return "Please describe what motivated you to join.";
  }
  return "";
}

/** Map form → API body for profile update */
export function profileFormToPayload(form) {
  const interests = form.interests.slice(0, 3);
  return {
    full_name: form.name.trim(),
    course: form.course,
    age: Number(String(form.age).trim()),
    interest_1: interests[0],
    interest_2: interests[1],
    interest_3: interests[2],
    other_interest: form.interests.includes("Others") ? form.otherInterest.trim() : "",
    main_interest: form.mainInterest,
    gender_identity: getDisplayValue(form.genderIdentity, form.genderSelfDescribe),
    sexual_orientation: getDisplayValue(form.sexualOrientation, form.orientationSelfDescribe),
    motivation:
      form.motivation === "Others"
        ? `Others: ${form.motivationOther.trim()}`
        : form.motivation,
  };
}

export function isProfileComplete(participant) {
  if (!participant) return false;
  if (typeof participant.profile_complete === "boolean") {
    return participant.profile_complete;
  }
  return Boolean(
    participant.full_name?.trim() &&
      participant.course &&
      participant.age != null &&
      participant.interest_1?.trim() &&
      participant.interest_2?.trim() &&
      participant.interest_3?.trim() &&
      participant.main_interest?.trim() &&
      participant.motivation?.trim()
  );
}
