/**
 * The Courage Curve. One Courage Quest per week of the 12-week plan.
 * A leadership learning curve in three stages:
 *   Weeks 1–4  · Knowing Me. Feelings, strengths, brave body, growth mindset
 *   Weeks 5–8  · Standing Strong. Boundaries and the full "what to do about
 *                                    unkindness/bullying" toolkit
 *   Weeks 9–12 · Lifting Others. Upstander moves, including others, leading
 *
 * Design rules:
 *  - Scenario stories star the guide ("Remi…", personalized at render time)
 *    or Pip the Duckling, a small friend who is still learning.
 *  - Every choice gets a warm response; the strongest choice gets celebrated,
 *    the others get gentle coaching. No answer is ever wrong or shamed.
 *  - Every path routes back to trusted adults. The app is a practice space
 *    and conversation starter. Never the child's only confidant.
 */

export interface CourageChoice {
  emoji: string;
  label: string;
  response: string;
  best?: boolean;
}

export interface CourageQuest {
  week: number;
  stage: "Knowing Me" | "Standing Strong" | "Lifting Others";
  stageEmoji: string;
  title: string;
  emoji: string;
  story: string;
  question: string;
  choices: CourageChoice[];
  mission: string;
  parentPrompt: string;
  /** Extra safety guidance for grown-ups, shown highlighted. */
  safetyNote?: string;
}

export const COURAGE_QUESTS: CourageQuest[] = [
  /* ---------------- Stage 1 · Knowing Me ---------------- */
  {
    week: 1,
    stage: "Knowing Me",
    stageEmoji: "💛",
    title: "The Feelings Weather Report",
    emoji: "🌦️",
    story:
      "Before the big swim, Remi's tummy felt fizzy. Like storm clouds rumbling inside! Coach said something clever: “Feelings are like weather. They visit… and then they pass.”",
    question: "When a big feeling visits, what's a super first move?",
    choices: [
      {
        emoji: "🙈",
        label: "Hide the feeling away",
        response:
          "Hidden feelings grow bigger in the dark! Naming them out loud. “I feel nervous”. Makes them shrink. Try it!",
      },
      {
        emoji: "🌦️",
        label: "Name the weather: “I feel nervous”",
        best: true,
        response:
          "YES! Naming a feeling is like opening an umbrella. The weather is still there, but now YOU'RE in charge!",
      },
      {
        emoji: "🏃",
        label: "Run away from it",
        response:
          "A little break can help! And naming the feeling first. “I'm frustrated”. Makes the break work twice as well.",
      },
    ],
    mission: "Hold a Feelings Weather Report at dinner: everyone shares their weather. Sunny, stormy, foggy, rainbow…",
    parentPrompt: "Share your own weather first. Kids open up when grown-ups go first.",
  },
  {
    week: 2,
    stage: "Knowing Me",
    stageEmoji: "💛",
    title: "My Strengths Treasure",
    emoji: "💎",
    story:
      "Pip the Duckling missed the ball and quacked, “I'll never be good at ANYTHING!” Remi opened an imaginary treasure chest: “Pip. Fastest swimmer in the pond, kindest friend on the team, and the best tryer I know. That's treasure!”",
    question: "What's the treasure-chest truth?",
    choices: [
      {
        emoji: "💭",
        label: "One miss means you're not good at it",
        response:
          "One miss is just one wave 🌊. Every champion has missed a thousand times. The treasure truth is “I'm still learning!”",
      },
      {
        emoji: "💎",
        label: "Everyone has strengths. Name three!",
        best: true,
        response:
          "YES! A sporty one, a kind one, a just-you one. That treasure belongs to you forever, and nobody can take it.",
      },
      {
        emoji: "🤐",
        label: "Better not to think about it",
        response:
          "Thinking about strengths is like polishing treasure. It makes them shine brighter. Name one right now, out loud!",
      },
    ],
    mission: "Make a Strengths Treasure list of three things: one sporty, one kind, one that's just-you.",
    parentPrompt: "Add one strength YOU see in them. Kids remember those words forever.",
  },
  {
    week: 3,
    stage: "Knowing Me",
    stageEmoji: "💛",
    title: "Brave Body, Strong Voice",
    emoji: "🦁",
    story:
      "Remi stood at the top of the big slide with wobbly knees. Then he remembered the Lion Stance: back tall, chin up, paws steady, one deep breath. Wobbly knees… gone!",
    question: "What does brave look like on the outside?",
    choices: [
      {
        emoji: "🧍",
        label: "Head down, tiny voice",
        response:
          "Even lions feel small sometimes! Try the Lion Stance. Tall back, chin up. And feel how your body teaches your heart.",
      },
      {
        emoji: "🦁",
        label: "Stand tall, chin up, steady voice",
        best: true,
        response:
          "That's the Lion Stance! Your body can teach your heart to feel brave. It works even when your tummy has butterflies.",
      },
      {
        emoji: "😤",
        label: "Puff up and act tough",
        response:
          "Brave isn't loud or tough. It's tall, calm and steady. Quiet lions are still lions!",
      },
    ],
    mission: "Practice the Lion Stance in the mirror: tall body, deep breath, then say “I've got this!” three times.",
    parentPrompt: "Do it together. Silly versions and serious versions both count.",
  },
  {
    week: 4,
    stage: "Knowing Me",
    stageEmoji: "💛",
    title: "The Magic Word: YET",
    emoji: "✨",
    story:
      "Pip flopped onto the grass: “I can't do a cartwheel.” Remi grinned and added one tiny magic word: “You can't do a cartwheel… YET.” Pip's eyes went wide. YET changes everything.",
    question: "Pip says “I can't skip rope.” What's the magic fix?",
    choices: [
      {
        emoji: "✨",
        label: "Add the magic word: “…YET!”",
        best: true,
        response:
          "YES! YET turns a wall into a door. Every skipper on Earth started as a tripper.",
      },
      {
        emoji: "🚪",
        label: "Give up. Skipping isn't for Pip",
        response:
          "Every skill ever learned started with “can't.” YET keeps the door open. And doors are for walking through!",
      },
      {
        emoji: "😠",
        label: "Try harder and get mad",
        response:
          "Big effort is brilliant. But big frustration makes wobbly hands. Breathe, say YET, try again slowly.",
      },
    ],
    mission: "Catch one “can't” this week and add YET out loud. Grown-ups' cants count too!",
    parentPrompt: "Model it: “I can't fold fitted sheets… yet.” Let them catch YOUR cants.",
  },

  /* ---------------- Stage 2 · Standing Strong ---------------- */
  {
    week: 5,
    stage: "Standing Strong",
    stageEmoji: "🛡️",
    title: "My Safety Team",
    emoji: "🛡️",
    story:
      "Every hero has a team! Remi's Safety Team is Mama Otter, Coach, and Grandpa River. When anything feels wrong, scary or unkind. The team ALWAYS wants to know. That's what teams are for.",
    question: "Who belongs on a Safety Team?",
    choices: [
      {
        emoji: "🛡️",
        label: "Trusted grown-ups who listen. Name three!",
        best: true,
        response:
          "YES! Say their names out loud so they're ready in your pocket. Telling your team is a hero move. Every single time.",
      },
      {
        emoji: "🤖",
        label: "Nobody. Heroes handle everything alone",
        response:
          "Even the mightiest heroes call for backup! Telling your team makes you stronger, never smaller.",
      },
      {
        emoji: "🎲",
        label: "Anyone at all",
        response:
          "Your team is special: grown-ups who listen AND help. Let's pick the exact three. One at home, one at school, one more.",
      },
    ],
    mission: "Build your Safety Team: name (or draw!) three trusted grown-ups. Home, school, and one more.",
    parentPrompt: "Make the list real together: “Yes. You can always, always tell Ms. Lee.”",
    safetyNote:
      "Grown-ups: if unkindness or bullying is happening right now, please loop in school and your trusted adults directly. These quests support those conversations. They never replace them.",
  },
  {
    week: 6,
    stage: "Standing Strong",
    stageEmoji: "🛡️",
    title: "The Strong Stop",
    emoji: "✋",
    story:
      "At practice, a kid kept grabbing Remi's ball and calling him “slowpoke.” Remi's cheeks went hot. Coach taught him the Strong Stop: stand tall, hand up, calm voice. “Stop. I don't like that.”",
    question: "What could Remi do?",
    choices: [
      {
        emoji: "😤",
        label: "Grab it back and shout",
        response:
          "Feeling angry is completely okay! But grabbing back can tangle things worse. The Strong Stop. Tall, calm, clear. Is the real power move.",
      },
      {
        emoji: "✋",
        label: "Stand tall: “Stop. I don't like that.”",
        best: true,
        response:
          "YES! Tall body, calm voice, clear words. That's courage you can practice. And it surprises unkindness every time.",
      },
      {
        emoji: "🤫",
        label: "Stay quiet and hope it stops",
        response:
          "Wanting peace is kind. And you deserve help too. A Strong Stop plus telling your Safety Team works even better.",
      },
    ],
    mission: "Practice the Strong Stop at home: tall stance, hand up, calm voice. “Stop. I don't like that.”",
    parentPrompt: "Play the silly villain so they can practice on you. Laugh together, then run it once seriously.",
  },
  {
    week: 7,
    stage: "Standing Strong",
    stageEmoji: "🛡️",
    title: "Walk Tall, Tell Tall",
    emoji: "🚶",
    story:
      "The Strong Stop didn't work. The unkind words kept coming. So Remi used move two: he walked tall (no running, no crying needed, though crying is always allowed) straight to Coach, and told.",
    question: "Is telling a grown-up “tattling”?",
    choices: [
      {
        emoji: "🚶",
        label: "No. Telling keeps someone safe. That's brave.",
        best: true,
        response:
          "Exactly! Tattling is trying to get someone INTO trouble. Telling is getting someone OUT of trouble. Heroes tell.",
      },
      {
        emoji: "🤐",
        label: "Yes. Better to stay quiet",
        response:
          "Quiet lets unkindness grow in the dark. Telling your Safety Team turns the lights on. It's a hero move, every time.",
      },
      {
        emoji: "😡",
        label: "No. But yelling back works better",
        response:
          "Your voice matters! And your Safety Team has grown-up powers you don't have yet. Walk tall, tell tall. Let the team do the heavy lifting.",
      },
    ],
    mission: "Practice the two-step with a grown-up: Strong Stop → Walk tall & tell. Make it a game!",
    parentPrompt:
      "Say this promise out loud: “If you tell me, I will listen and help. And you will never be in trouble for telling.”",
  },
  {
    week: 8,
    stage: "Standing Strong",
    stageEmoji: "🛡️",
    title: "The Buddy Shield",
    emoji: "🤝",
    story:
      "Remi noticed something magic: unkindness goes quiet around buddies. At the new class, he found one friendly face, said “hi, I'm Remi!”. And suddenly the room felt twice as safe.",
    question: "First day somewhere new and feeling wobbly. What's the move?",
    choices: [
      {
        emoji: "🤝",
        label: "Find one friendly face and stick together",
        best: true,
        response:
          "YES! One buddy is a shield, a cheer squad and a friend all at once. And your hello might be THEIR buddy shield too!",
      },
      {
        emoji: "🧍",
        label: "Stay alone in the corner",
        response:
          "Corners feel safe but lonely. One small “hi” to one kind face changes the whole room. And you only need one.",
      },
      {
        emoji: "🎭",
        label: "Act like someone else to fit in",
        response:
          "You being YOU is the best teammate anyone could get. One real buddy beats ten pretend ones.",
      },
    ],
    mission: "Say hi first to one kid at school or practice this week. Just one “hi”. That's the whole mission.",
    parentPrompt: "Afterwards ask: “Who did you play with today?” Celebrate the trying, whatever happened.",
  },

  /* ---------------- Stage 3 · Lifting Others ---------------- */
  {
    week: 9,
    stage: "Lifting Others",
    stageEmoji: "🌟",
    title: "The Upstander Move",
    emoji: "🦸",
    story:
      "At the park, Remi saw a kid being called names. His tummy went tight. It wasn't even happening to HIM, but it hurt to watch. Then he remembered: heroes don't watch. Heroes get backup.",
    question: "You SEE someone being treated unkindly. What's the Upstander Move?",
    choices: [
      {
        emoji: "🦸",
        label: "Get a grown-up, then be a friend to the kid",
        best: true,
        response:
          "That's the Upstander Move! Bring grown-up backup first, then bring your kindness: “Want to play with us?” changes someone's whole day.",
      },
      {
        emoji: "👀",
        label: "Watch and do nothing",
        response:
          "Watching feels safer. But the kid feels all alone. Even the smallest move, like fetching help or a kind word after, changes everything.",
      },
      {
        emoji: "🥊",
        label: "Jump in and fight",
        response:
          "Your brave heart is showing! But grown-up backup beats fists every time. Heroes bring help, not more storm.",
      },
    ],
    mission: "Make a family Upstander Plan: talk through exactly what you'd do if you SAW unkindness happen.",
    parentPrompt: "Tell them about a time you stood up for someone. Or a time you wish you had. Real stories stick.",
  },
  {
    week: 10,
    stage: "Lifting Others",
    stageEmoji: "🌟",
    title: "The Includer",
    emoji: "🌈",
    story:
      "Remi spotted a kid sitting alone at break, hugging their knees. Remi walked over and used the five magic words every leader knows: “Want to play with us?”",
    question: "What are the five magic words?",
    choices: [
      {
        emoji: "🌈",
        label: "“Want to play with us?”",
        best: true,
        response:
          "That's them! Five words, three seconds, and someone's whole day turns around. Includers are the real team captains.",
      },
      {
        emoji: "🙈",
        label: "Someone else will invite them",
        response:
          "Everyone thinks that. So often nobody does! Leaders go first. And going first gets easier every time.",
      },
      {
        emoji: "👑",
        label: "Only invite the best players",
        response:
          "The best teams aren't the best players. They're the ones where everyone gets to play. That's what makes people follow a leader.",
      },
    ],
    mission: "Use the five magic words once this week: “Want to play with us?”",
    parentPrompt: "At dinner, ask: “Did anyone look left out today?” Noticing is the first leadership skill.",
  },
  {
    week: 11,
    stage: "Lifting Others",
    stageEmoji: "🌟",
    title: "Captain Kindness",
    emoji: "👑",
    story:
      "Coach picked Remi to lead the warm-up game! Remi explained the rules slowly, gave everyone a turn, and cheered the loudest for the kid who came last. Afterwards, everyone wanted Remi as captain again.",
    question: "What makes a captain everyone wants to follow?",
    choices: [
      {
        emoji: "👑",
        label: "Fair turns, big cheers, everyone plays",
        best: true,
        response:
          "YES! Captains aren't the loudest or the fastest. They're the ones who make everyone else feel ten feet tall.",
      },
      {
        emoji: "📢",
        label: "Bossing everyone loudly",
        response:
          "Loud gets attention, kind gets followers. Try swapping one order for one cheer and watch what happens!",
      },
      {
        emoji: "🥇",
        label: "Winning at any cost",
        response:
          "Winning feels great. But a captain who cheers the last-place kid wins something bigger: the whole team's heart.",
      },
    ],
    mission: "Lead one family game start to finish: explain the rules, give fair turns, cheer everyone.",
    parentPrompt: "Be a player, not the boss. Let them run the whole thing, wobbles and all.",
  },
  {
    week: 12,
    stage: "Lifting Others",
    stageEmoji: "🌟",
    title: "My Courage Story",
    emoji: "📖",
    story:
      "Remi looked back down the trail: feelings named, Lion Stances, a Safety Team, Strong Stops, buddy shields, upstander moves, magic words… “Whoa,” said Remi. “That's not a trail. That's a courage story. And it's YOURS.”",
    question: "What's the biggest courage truth of all?",
    choices: [
      {
        emoji: "📖",
        label: "Courage grows every time you use it",
        best: true,
        response:
          "That's the one! Courage is a muscle. Twelve weeks of tiny brave moves made yours stronger. And it keeps growing forever.",
      },
      {
        emoji: "🦸",
        label: "Courage means never feeling scared",
        response:
          "Here's the hero secret: heroes feel scared AND do the kind, brave thing anyway. That's the whole trick!",
      },
      {
        emoji: "🏆",
        label: "Courage is only for big moments",
        response:
          "Courage lives in tiny moments. A hello, a stop, a “want to play?” You've been doing it for twelve whole weeks!",
      },
    ],
    mission: "Tell your Courage Story: teach a grown-up your three favorite moves from the last 12 weeks.",
    parentPrompt: "Write their answer down somewhere special. Future-them will love reading it.",
  },
];

export const COURAGE_STAGES = [
  { name: "Knowing Me", emoji: "💛", weeks: "Weeks 1–4", blurb: "Feelings, strengths and brave body language" },
  { name: "Standing Strong", emoji: "🛡️", weeks: "Weeks 5–8", blurb: "Boundaries, the Strong Stop and the Safety Team" },
  { name: "Lifting Others", emoji: "🌟", weeks: "Weeks 9–12", blurb: "Upstander moves, including everyone, leading with heart" },
] as const;
