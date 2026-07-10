from sqlalchemy.orm import Session

from .models import Pledge, QuizScenario, Story

DEFAULT_REFLECTION = (
    "Paano mo kaya masusuportahan ang taong may ganitong karanasan "
    "nang hindi sila pinapahiya o pinipilit mag-share?"
)

SAMPLE_STORIES = [
    {
        "body": (
            "Sa group project, sinabi ng classmate ko na 'baka hindi kaya nung girl "
            "yung coding part, lalaki na lang.' Parang joke lang sa kanila, pero "
            "napaisip ako kung bakit automatic na may assumption."
        ),
        "display_name": "Anonymous student",
        "category": "gender",
        "status": "approved",
        "relate_count": 12,
        "reflection_prompt": (
            "May times ba na automatic assumptions ang naging basehan mo "
            "ng roles sa team? Paano mo ito mababago next time?"
        ),
    },
    {
        "body": (
            "Kapag may nagsasalita ng bakla voice, nagtatawanan yung iba. "
            "Ako na nasa closet, napapatahimik na lang. Hindi nila alam na "
            "hindi biro yung impact sa amin."
        ),
        "display_name": "Anonymous",
        "category": "sexuality",
        "status": "approved",
        "relate_count": 24,
        "reflection_prompt": DEFAULT_REFLECTION,
    },
    {
        "body": (
            "Pinagtripan accent ko nung first year. 'Ang probinsyana mo naman,' "
            "sabi nila habang tumatawa. Since then, nahihiya akong magsalita sa class."
        ),
        "display_name": "M.",
        "category": "language",
        "status": "approved",
        "relate_count": 18,
        "reflection_prompt": (
            "Paano mo masisiguro na safe ang classroom para sa lahat ng "
            "mga mag-aaral, anuman ang accent o background?"
        ),
    },
    {
        "body": (
            "Palaging may comment sa skin ko: 'ang tigas mo, bakit di ka mag-skin care?' "
            "Parang libre lang sabihin, pero araw-araw kong dinadala yun."
        ),
        "display_name": "Anonymous",
        "category": "appearance",
        "status": "approved",
        "relate_count": 9,
        "reflection_prompt": DEFAULT_REFLECTION,
    },
]

SAMPLE_PLEDGES = [
    {
        "display_name": "Kai",
        "message": (
            "I pledge to pause before I joke, listen before I judge, "
            "and choose acceptance over tolerance."
        ),
    },
    {
        "display_name": "Anonymous student",
        "message": (
            "I pledge to call in my friends with kindness when a joke "
            "crosses the line — hindi para mang-bash, kundi para matuto."
        ),
    },
    {
        "display_name": "AJ",
        "message": (
            "I pledge to make our org spaces safer: no slurs, no outing, "
            "and respect for every identity."
        ),
    },
]

QUIZ = [
    {
        "situation": (
            "Your friend makes a joke about someone’s sexuality in class. "
            "Everyone laughs, but the person looks uncomfortable. What would you do?"
        ),
        "option_a": "Laugh along para di awkward",
        "option_b": "Ignore it — baka overthink lang sila",
        "option_c": "Tell your friend privately why it was wrong",
        "option_d": "Ask the person if they are okay (and support them)",
        "correct_option": "d",
        "explanation": (
            "Best response: support the person first if it’s safe, then address the "
            "behavior. Privately talking to your friend (option C) is also solid allyship. "
            "Laughing along or ignoring it normalizes harm. Hindi sapat ang 'biro lang.'"
        ),
        "order_index": 1,
    },
    {
        "situation": (
            "Sa group chat, may nag-post ng meme na may sexist slur. "
            "Marami ang nagtawa. Ano ang mas okay gawin?"
        ),
        "option_a": "Repost with laughing emoji",
        "option_b": "Sabihin nang mahinahon na hindi okay yung slur, even as a joke",
        "option_c": "Leave the group quietly without saying anything",
        "option_d": "I-share sa ibang GC para lalo mapag-usapan bilang chismis",
        "correct_option": "b",
        "explanation": (
            "Calling it out calmly sets a boundary without turning it into more harm. "
            "Leaving can protect you but doesn’t stop the culture. Reposting or "
            "spreading it as chismis multiplies the harm."
        ),
        "order_index": 2,
    },
    {
        "situation": (
            "A classmate keeps 'jokingly' touching someone’s hair or clothes "
            "kahit clear na ayaw nung tao. Ano ang tama?"
        ),
        "option_a": "Sabihin na 'normal lang yan sa tropa'",
        "option_b": "Support the person and remind others that consent matters",
        "option_c": "I-film secretly for content",
        "option_d": "Gayahin din para 'pantay-pantay'",
        "correct_option": "b",
        "explanation": (
            "Unwanted touching is not a joke — consent is required. Support the person "
            "and stop the behavior. Documenting without consent or matching the harm "
            "makes things worse. This can also fall under gender-based harassment."
        ),
        "order_index": 3,
    },
    {
        "situation": (
            "May nagsabi: 'Okay lang sa akin ang LGBTQIA+ friends, basta huwag "
            "sa harapan ko mag-PDA.' Ano ang closer sa acceptance?"
        ),
        "option_a": "Agree — fair naman yun",
        "option_b": "Recognize that equal respect means not setting special rules only for them",
        "option_c": "Sabihin na dapat talaga silang magtago",
        "option_d": "I-change subject always",
        "correct_option": "b",
        "explanation": (
            "Tolerance says 'I allow you to exist (with conditions).' Acceptance means "
            "equal dignity — hindi special restrictions. Double standards are not inclusion."
        ),
        "order_index": 4,
    },
    {
        "situation": (
            "Narinig mong may classmate na tinatawag ng misogynistic o "
            "homophobic slur sa hallway. Ano ang responsible action?"
        ),
        "option_a": "Sumali sa tawa",
        "option_b": "I-ignore forever",
        "option_c": "Humingi ng tulong sa trusted adult/office if needed, and don’t pile on",
        "option_d": "I-viral online with full name for canceling",
        "correct_option": "c",
        "explanation": (
            "Safety first: don’t join the harm. Support the target and use campus "
            "channels (Guidance, Discipline, etc.) when appropriate. Public pile-ons "
            "can retraumatize. Note: repeated gender-based slurs may relate to RA 11313."
        ),
        "order_index": 5,
    },
    {
        "situation": (
            "Sa presentation, may nagsabi: 'Baka di naintindihan kasi accent niya.' "
            "Lahatan natawa. Ikaw?"
        ),
        "option_a": "Tawanan din",
        "option_b": "I-redirect: focus on the content and affirm the speaker",
        "option_c": "Sabihin sa speaker na dapat mag-practice pa ng 'tamang English'",
        "option_d": "Mag-chat sa tabi about the accent",
        "correct_option": "b",
        "explanation": (
            "Mocking accent is a language/culture microaggression. Redirect the room "
            "to respect and content. 'Helpful' comments about 'proper English' often "
            "add shame, not support."
        ),
        "order_index": 6,
    },
]


def seed_if_empty(db: Session) -> None:
    if db.query(Story).count() == 0:
        for item in SAMPLE_STORIES:
            db.add(Story(**item))

    if db.query(Pledge).count() == 0:
        for item in SAMPLE_PLEDGES:
            db.add(Pledge(**item))

    if db.query(QuizScenario).count() == 0:
        for item in QUIZ:
            db.add(QuizScenario(**item))

    db.commit()
