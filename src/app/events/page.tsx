"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  X, 
  Calendar, 
  Trophy, 
  Users, 
  Search, 
  BookOpen, 
  ArrowLeft,
  Compass
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Event Categories & Icon Mapping (From Spreadsheet) ────────────────────────
const CATEGORIES = [
  { name: "All Territories",     icon: "🗺️", color: "#E8D7A5" },
  { name: "Music",               icon: "🎵", color: "#65C466" }, // Primary Green
  { name: "Dance",               icon: "💃", color: "#6EC6FF" }, // Primary Sky Blue
  { name: "Cybernetics",         icon: "💻", color: "#65C466" }, // Primary Green
  { name: "Multimedia",          icon: "📸", color: "#6EC6FF" }, // Primary Sky Blue
  { name: "Sports",              icon: "🏆", color: "#65C466" }, // Primary Green
  { name: "Art and Literature",  icon: "🎨", color: "#6EC6FF" }, // Primary Sky Blue
  { name: "Performance",         icon: "🎭", color: "#65C466" }, // Primary Green
  { name: "Others",              icon: "🧩", color: "#E8D7A5" }, // Parchment Gold
];

interface Event {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  detail: string;
  icon: string;
  difficulty: "Legendary" | "Veteran" | "Explorer";
  difficultyColor: string;
  teamSize: string;
  time: string;
  location: string;
  day: "Day 1" | "Day 2";
  stage: "On-stage" | "Off-stage";
  bounty: string;
  rules: string[];
}

const EVENTS_DATA: Event[] = [
  // ─── MUSIC ───
  {
    id: "unconventional-music",
    name: "Unconventional Music",
    category: "Music",
    shortDesc: "Produce percussion, beats, and melodies using everyday tools and objects.",
    detail: "Step into the explorer's laboratory. Participants must compose and perform a musical piece using only non-conventional, non-instrumental items found on the island. Bottles, buckets, metal chains, and wooden chests become your ensemble.",
    icon: "🎵",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "3 - 5 Performers",
    time: "Day 1, 10:00 AM",
    location: "Acoustic Courtyard",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Custom Medals",
    rules: [
      "No standard instruments (guitar, piano, drums, flute, etc.) allowed.",
      "Vocal hums and singing are permitted, but core instrumentation must be unconventional.",
      "Performance duration: 3 - 5 minutes.",
      "Setup time must not exceed 2 minutes."
    ]
  },
  {
    id: "fusion-music",
    name: "Fusion Music (8-12) - Jukebox",
    category: "Music",
    shortDesc: "Merge Eastern traditional patterns with modern Western melodies.",
    detail: "Build a bridge of sound across hemispheres. Teams of musicians must create a performance that blends Eastern traditional styles with Western rock/pop patterns. Harmony and creative fusion are key.",
    icon: "🎸",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "4 - 8 Musicians",
    time: "Day 2, 2:30 PM",
    location: "Main Open-Air Stage",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹15,000 + Band Trophy",
    rules: [
      "Must feature at least one Eastern and one Western instrument.",
      "Vocal and instrumental elements must be balanced.",
      "Maximum performance time: 6 minutes (including soundcheck).",
      "Backing tracks are not allowed; all sounds must be live."
    ]
  },
  {
    id: "eastern-music",
    name: "Eastern Music (6-12) - Raag",
    category: "Music",
    shortDesc: "A solo classical vocal challenge showcasing traditional ragas.",
    detail: "Let your voice echo the ragas of antiquity. Vocalists will perform Indian classical compositions. Precision of notes, swara control, and emotional depth will guide you to victory.",
    icon: "🎤",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Solo",
    time: "Day 1, 11:30 AM",
    location: "Senate Hall",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + Vocalist Scroll",
    rules: [
      "Time limit: 4 - 6 minutes.",
      "Accompaniment limited to a maximum of 2 instruments (e.g. Harmonium, Tabla, Tanpura).",
      "No film music or pop songs allowed; must be classical or semi-classical.",
      "Raga must be announced prior to the performance."
    ]
  },
  {
    id: "antakshari",
    name: "Antakshari",
    category: "Music",
    shortDesc: "The legendary team-based singing and song recall duel.",
    detail: "Fast thinking, quick singing. Teams must match the ending consonants of previous songs and sing live. The ultimate test of song memory and team sync.",
    icon: "🎼",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "3 Explorers per Team",
    time: "Day 1, 4:00 PM",
    location: "Assembly Grounds",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Singing Crowns",
    rules: [
      "Recall time: 15 seconds after the cue.",
      "Must sing at least 2 full lines of the song correctly.",
      "No repetitions of songs previously sung in the same round.",
      "Buzzer rounds apply in intermediate stages."
    ]
  },
  {
    id: "western-music",
    name: "Western Music (8-12) - Beat",
    category: "Music",
    shortDesc: "A solo or duet vocal showcase featuring Western contemporary genres.",
    detail: "Belting out chords of pop, rock, country, and blues. Candidates will deliver solo or duet vocal performances with high stage presence and vocal texture.",
    icon: "🎙️",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "1 - 2 Vocalists",
    time: "Day 2, 12:00 PM",
    location: "Auditorium West",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹7,000 + Gold Microphone Pin",
    rules: [
      "Time limit: 4 minutes.",
      "Accompaniment allowed (1 instrument or backing track).",
      "No lyrics sheet or devices permitted on stage.",
      "Grading based on vocal range, pitch accuracy, and stage projection."
    ]
  },

  // ─── DANCE ───
  {
    id: "eastern-dance",
    name: "Eastern Dance (6-12) - Nritya",
    category: "Dance",
    shortDesc: "Classical and semi-classical Indian dance storytelling.",
    detail: "A tapestry of expressions. Dancers perform classical routines (Kathak, Bharatnatyam, Odissi, etc.) or semi-classical sequences translating ancient scripts through mudras.",
    icon: "💃",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Solo",
    time: "Day 1, 1:00 PM",
    location: "Main Auditorium",
    day: "Day 1",
    stage: "On-stage",
    bounty: "₹8,000 + Temple Dance Plaque",
    rules: [
      "Time limit: 4 - 5 minutes.",
      "Classical costumes and ankle bells (ghungroo) are encouraged.",
      "Audio track must be uploaded in MP3 format 24 hours prior.",
      "No cinematic/Bollywood elements allowed."
    ]
  },
  {
    id: "western-dance",
    name: "Western Dance (8-12) - Tango",
    category: "Dance",
    shortDesc: "High energy, choreographed Western street and contemporary dance.",
    detail: "Move with style and synchronization. Group choreography displaying modern Western genres, including hip-hop, locking, contemporary, and tango styles.",
    icon: "🕺",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "5 - 10 Dancers",
    time: "Day 2, 3:00 PM",
    location: "Main Auditorium",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹18,000 + Dance Championship Ledge",
    rules: [
      "Stage time: 5 - 7 minutes.",
      "Props must be verified by the organizers before use.",
      "Use of fire, water, or hazardous elements is strictly prohibited.",
      "Judging based on choreography, sync, costumes, and expression."
    ]
  },
  {
    id: "dance-faceoff",
    name: "Dance Faceoff",
    category: "Dance",
    shortDesc: "On-the-spot street dance battles. Show your rhythm and impromptu styles.",
    detail: "The battle arena is set. Dancers enter the center ring. The DJ spins random tracks, and players must immediately adapt and outperform their opponent in rounds of faceoffs.",
    icon: "🔥",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "Individual Duelist",
    time: "Day 1, 3:30 PM",
    location: "Underground Plaza",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹10,000 + Champion Belt",
    rules: [
      "Matches are 1v1 formats.",
      "Each round consists of 2 entries of 45 seconds per dancer.",
      "No choreography prep; performance must be completely freestyle.",
      "Physical contact results in immediate disqualification."
    ]
  },

  // ─── CYBERNETICS ───
  {
    id: "coding-debugging",
    name: "Coding and Debugging",
    category: "Cybernetics",
    shortDesc: "A high-speed sprint to write clean algorithms and resolve errors.",
    detail: "Code with coordinates. Solve mathematical problems, logic riddles, and fix broken loops. A race against the clock where clean runs count.",
    icon: "💻",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "2 Programmers",
    time: "Day 1, 9:30 AM",
    location: "Main Tech Lab",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹12,000 + Hacker Kit Bags",
    rules: [
      "Supported languages: C++, Java, Python, Go.",
      "Total duration: 2 hours.",
      "No internet search or generative AI systems allowed.",
      "Grading based on test cases passed and execution speed."
    ]
  },
  {
    id: "cyberhunt",
    name: "Cyberhunt",
    category: "Cybernetics",
    shortDesc: "Solve cryptic logic locks and map routes in a virtual scavenger hunt.",
    detail: "Decryption meets digital tracking. Crack passwords, inspect page source coordinates, and solve OSINT challenges to trace the map nodes of the hidden island vault.",
    icon: "🔍",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "3 Investigators",
    time: "Day 2, 10:00 AM",
    location: "Lab Room Gamma",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹10,000 + Decryption Badge",
    rules: [
      "Teams can use search engines, but no team-to-team sharing of clues.",
      "Flag format must match the specified regex patterns.",
      "Time limit: 3 hours.",
      "Any DDoS or exploit targeting the hunt servers will lead to ban."
    ]
  },
  {
    id: "digital-art-cyber",
    name: "Digital Art",
    category: "Cybernetics",
    shortDesc: "Vector design and digital painting illustrating the untouched nature.",
    detail: "Illustrate the concept of Boscofest's uncharted frontiers using high-end design software. Masters of layers, paths, and gradients will win the guild prize.",
    icon: "🖥️",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Artist",
    time: "Day 1, 1:30 PM",
    location: "Graphics Studio Beta",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Graphics Tablet",
    rules: [
      "Time limit: 2 hours.",
      "Adobe Suite, Figma, or CorelDraw allowed.",
      "Must submit the raw layered file (.psd, .ai, or .fig) alongside final export.",
      "AI art generators are strictly forbidden."
    ]
  },

  // ─── MULTIMEDIA ───
  {
    id: "short-film",
    name: "Short Film Making",
    category: "Multimedia",
    shortDesc: "Create, shoot, and compile a short narrative film based on the theme.",
    detail: "Action, cut. Teams receive a theme on spot. They must write the script, shoot footage within Boscofest campus, edit and submit a finished short film.",
    icon: "🎥",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "3 - 5 Filmmakers",
    time: "Day 1 & Day 2",
    location: "Outdoor Campus",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹15,000 + Golden Clapperboard Trophy",
    rules: [
      "All filming must take place during the festival hours.",
      "Final video duration: 2 - 3 minutes.",
      "Must submit raw footage snippets for validation.",
      "Standard software (Premiere, FCP, DaVinci) allowed."
    ]
  },
  {
    id: "journalism",
    name: "Journalism",
    category: "Multimedia",
    shortDesc: "Investigate, write, and layout a digital newspaper newsletter covering the fest.",
    detail: "A reporter's trail. Run between events, take interviews, snap photos, and draft articles. Build a layout that encapsulates the spirit of the day's expedition.",
    icon: "📰",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "2 Reporters",
    time: "Day 1 & Day 2",
    location: "Editorial Suite",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Press Badges",
    rules: [
      "Newsletter must be submitted in PDF layout format.",
      "Must include at least 2 photos and 3 interviews.",
      "Plagiarism check will run on all submitted text.",
      "Must cover both success stories and competitive clashes."
    ]
  },
  {
    id: "photography",
    name: "Photography",
    category: "Multimedia",
    shortDesc: "On-spot candid photography highlighting emotions and action.",
    detail: "Capture the uncharted spark. Spot photographers search the camps to snap raw photos showing intense reactions, teamwork, or architectural details.",
    icon: "📸",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "Individual Photographer",
    time: "Day 1, 10:30 AM",
    location: "Spot Assignment",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹7,000 + Lens Loot Box",
    rules: [
      "Must use DSLR or Mirrorless camera (no phone photography).",
      "Can submit up to 3 candid photos.",
      "No retouching, composition blending, or filters allowed.",
      "Must submit raw file format alongside JPG."
    ]
  },
  {
    id: "ad-wars",
    name: "Ad Wars",
    category: "Multimedia",
    shortDesc: "Pitch, market, and perform a live advertisement for a bizarre gadget.",
    detail: "Unleash your inner merchant. Teams get an item and must create a branding pitch and enact a hilarious commercial live on stage to sway the merchant council.",
    icon: "📣",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "3 - 5 Performers",
    time: "Day 2, 1:30 PM",
    location: "Mini Stage B",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹10,000 + Creative Ad Seal",
    rules: [
      "Preparation time: 20 minutes; Performance time: 2 minutes.",
      "Must highlight key features of the item given.",
      "Prop crafting on-the-spot is encouraged.",
      "Humor and clarity are highly rewarded."
    ]
  },

  // ─── SPORTS ───
  {
    id: "chess",
    name: "Chess",
    category: "Sports",
    shortDesc: "Outthink and checkmate your opponent on the chessboard grid.",
    detail: "The grandmaster's expedition. Compete in blitz matches to prove logic, strategy, and mental resilience under tight timing clocks.",
    icon: "♟️",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Player",
    time: "Day 1, 9:30 AM",
    location: "Quiet Study Library",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Wooden Knight Trophy",
    rules: [
      "Standard FIDE rules apply.",
      "Time control: 10 minutes per player (Blitz).",
      "Touch-move rule strictly enforced.",
      "Single-elimination bracket format."
    ]
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    category: "Sports",
    shortDesc: "Rapid-fire singles table tennis matches in the recreational camp.",
    detail: "Quick reflexes, spin control, and tactical placement. Lock horns in singles table tennis brackets to see who claims the title of racket master.",
    icon: "🏓",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "Individual Singles",
    time: "Day 1, 11:00 AM",
    location: "Indoors Gym Room",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + TT Paddle Box",
    rules: [
      "ITTF tournament scoring applies.",
      "Best-of-3 sets; 11 points per set.",
      "Players must bring their own rackets if possible (standard ones provided).",
      "Service faults will be called by referee."
    ]
  },
  {
    id: "volleyball",
    name: "Volleyball",
    category: "Sports",
    shortDesc: "High-flying 6v6 volleyball matches on the sand court.",
    detail: "Spike, block, and dig. Teams battle in outdoor matches of volleyball. Coordinate sets, execute slams, and defend your territory.",
    icon: "🏐",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "6 - 8 Players",
    time: "Day 2, 9:30 AM",
    location: "Outdoor Court",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹18,000 + Volleyball Shield",
    rules: [
      "Knockout brackets; first set to 25 points, third decider set to 15.",
      "Maximum of 3 hits per side before crossing.",
      "Net touch results in point for opponent.",
      "Substitution rules apply."
    ]
  },
  {
    id: "tag-games",
    name: "Tag+Games",
    category: "Sports",
    shortDesc: "Team obstacle relays and physical survival challenges.",
    detail: "Speed, agility, and quick transfers. Teams navigate a winding track with obstacle hurdles, tag exchanges, and strength trials.",
    icon: "🏃",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "4 Players",
    time: "Day 2, 11:30 AM",
    location: "Main Playground",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹8,000 + Survivalist Medals",
    rules: [
      "Relay rules apply; batons must be exchanged inside markers.",
      "Obstacles must be crossed sequentially; skipping yields penalty times.",
      "Sports shoes are mandatory.",
      "Fastest cumulative time wins."
    ]
  },
  {
    id: "pickleball",
    name: "Pickleball",
    category: "Sports",
    shortDesc: "Fast paddle rallies on the courtyard pickleball grid.",
    detail: "Enter the dink zone. A rapid singles format tournament combining elements of tennis, badminton, and ping-pong.",
    icon: "🎾",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Singles",
    time: "Day 1, 2:00 PM",
    location: "Courtyard TT Hall",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + Carbon Paddle Set",
    rules: [
      "Underhand serves only.",
      "Rallies must clear the non-volley zone (dink area) on drop shots.",
      "Single-elimination match format; 11 point cap.",
      "Referees decision is final."
    ]
  },

  // ─── ART AND LITERATURE ───
  {
    id: "digital-art-literature",
    name: "Digital Art",
    category: "Art and Literature",
    shortDesc: "Creative layout and typography poster compiling fest narratives.",
    detail: "Make words come to life. Paint a layout balancing custom vectors, rich typography, and literature assets that echo 'Untold, Unfazed, Uncharted.'",
    icon: "🎨",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Designer",
    time: "Day 1, 1:30 PM",
    location: "Graphics Studio Beta",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Cartographer Pen set",
    rules: [
      "Must balance graphical illustrations with typography details.",
      "No templates or pre-designed layouts.",
      "Must output layered design file.",
      "Originality in thematic representation is paramount."
    ]
  },
  {
    id: "eco-fashion",
    name: "Eco Fashion and Decor (6-12)",
    category: "Art and Literature",
    shortDesc: "Build and model clothing items using raw recyclable elements.",
    detail: "Nature's attire. Teams must craft a complete fashion costume and model it on stage, using only paper, cardboard, leaves, twine, and waste bottles.",
    icon: "👗",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "3 - 5 Designers & Model",
    time: "Day 2, 2:00 PM",
    location: "Main Stage Area",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹15,000 + Green Leaf Award",
    rules: [
      "No plastic or non-biodegradable raw materials permitted.",
      "Costume construction must be completed within 3 hours on campus.",
      "Designers must explain their resource cycle during the stage walk.",
      "Glue and thread are permitted bindings."
    ]
  },
  {
    id: "art-graffiti",
    name: "Art and Graffiti (6-8)",
    category: "Art and Literature",
    shortDesc: "Graffiti and mural sketch design on large parchment canvas boards.",
    detail: "Tag the walls. Teams of middle school artists get a large canvas panel to paint graffiti that channels local history or future coordinates.",
    icon: "🖌️",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 - 3 Artists",
    time: "Day 1, 2:30 PM",
    location: "Creative Courtyard",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Graffiti Marker Box",
    rules: [
      "Canvas board size: A1.",
      "Supported materials: Acrylics, sprays, chalk markers.",
      "Must not contain any text-based vandalism.",
      "Grading based on coloring, theme representation, and layout balance."
    ]
  },
  {
    id: "poetry-writing",
    name: "Theme Poetry Writing",
    category: "Art and Literature",
    shortDesc: "Pen down an original poem inspired by the uncharted borders.",
    detail: "Whisper of the parchment. Draft an original poem using keywords assigned on the spot. Express courage, mysteries, and unexplored horizons.",
    icon: "✍️",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "Individual Writer",
    time: "Day 2, 10:30 AM",
    location: "Seminar Room A",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹5,000 + Fountain Pen Set",
    rules: [
      "Time limit: 1 hour.",
      "On-spot keyword prompts must be integrated into the stanza.",
      "Poem must not exceed 32 lines.",
      "Language: English only."
    ]
  },

  // ─── PERFORMANCE ───
  {
    id: "jam",
    name: "Just a Minute",
    category: "Performance",
    shortDesc: "Speed speaking challenge without hesitation, deviation, or repetition.",
    detail: "Hold the floor. Speakers tackle challenging prompts, speaking continuously for 60 seconds. Opponents flag hesitation, grammatical faults, or topic slipups.",
    icon: "⏱️",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Speaker",
    time: "Day 1, 10:30 AM",
    location: "Lecture Hall Alpha",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + Speaker Medal",
    rules: [
      "Moderator has absolute authority over points and penalty flags.",
      "Speak for exactly 60 seconds; no notes or digital sheets allowed.",
      "Standard JAM guidelines apply (no hesitation, repetition, deviation).",
      "Points awarded for speaking time and successful challenges."
    ]
  },
  {
    id: "improv",
    name: "Improv",
    category: "Performance",
    shortDesc: "Impromptu acting rounds based on comical scenarios given on-spot.",
    detail: "No script, no delay. Acting crews get scenarios (e.g. stranded explorers finding a fast food shop on the moon) and must act out the story instantly.",
    icon: "🎭",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "3 Actors",
    time: "Day 2, 11:00 AM",
    location: "Mini Stage Auditorium",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹10,000 + Improv Mask Trophy",
    rules: [
      "Preparation time: 0 seconds after topic ring.",
      "Performance time: 3 minutes.",
      "Must incorporate a physical prop given by judges.",
      "Humor, plot structure, and performance sync are primary metrics."
    ]
  },
  {
    id: "dumb-charades",
    name: "Dumb Charades",
    category: "Performance",
    shortDesc: "Translate cryptic explorer terms or movie titles through gestures.",
    detail: "Silence is golden. Direct your team to discover the name of obscure adventure books, movies, or historical figures using only expressions and body language.",
    icon: "🤫",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "3 Players",
    time: "Day 1, 2:00 PM",
    location: "Assembly Room 2",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Charades Scroll",
    rules: [
      "No sound, mouthing words, or air writing allowed.",
      "Time limit: 90 seconds per movie code.",
      "Speller must choose cards from the deck.",
      "Fastest solving teams qualify to finals."
    ]
  },
  {
    id: "gi60",
    name: "GI60",
    category: "Performance",
    shortDesc: "Perform a complete, self-contained theatrical play in exactly 60 seconds.",
    detail: "Every second counts. Deliver an entire monologue, comedy sketch, or dramatic performance with high impact before the 60 seconds alarm sounds.",
    icon: "⏳",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "1 - 3 Performers",
    time: "Day 2, 1:30 PM",
    location: "Theatre Lounge A",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹8,000 + GI60 Seal",
    rules: [
      "Strict 60-second time limit. Alarm rings at 60s; any action after is cut.",
      "Play must have a self-contained plot with structural markers.",
      "Setup and exit time limit: 15 seconds.",
      "Scripts must be submitted for screening pre-event."
    ]
  },
  {
    id: "turncoat-debate",
    name: "Turncoat Debate",
    category: "Performance",
    shortDesc: "Debate switch format: present FOR and AGAINST on bell ring.",
    detail: "The ultimate dual mind debate. Deliver an argument, and switch your stance from FOR to AGAINST instantly when the moderator rings the bell.",
    icon: "🔄",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "Individual Debater",
    time: "Day 1, 3:00 PM",
    location: "Senate Chamber",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Debater's Shield",
    rules: [
      "Switch cue: Moderator's bell rings randomly (usually every 30-45 seconds).",
      "Total debate duration: 3 minutes.",
      "Transition must be grammatically cohesive.",
      "Strict grading on logical flow despite switching."
    ]
  },
  {
    id: "drama",
    name: "Drama",
    category: "Performance",
    shortDesc: "One-act theatre plays exploring local folklore or explorer histories.",
    detail: "Bring the narrative of adventure to the stage. Teams present fully rehearsed theatrical plays featuring dynamic scripts, lighting, and sound direction.",
    icon: "🎭",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "5 - 12 Actors",
    time: "Day 2, 4:00 PM",
    location: "Main Auditorium Stage",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹25,000 + Best Play & Best Actor Awards",
    rules: [
      "Stage time: 10 - 15 minutes.",
      "Must submit stage layout and lighting requirements 48 hours prior.",
      "Original scripts are highly encouraged.",
      "Judging based on script quality, acting, block movement, and direction."
    ]
  },

  // ─── OTHERS ───
  {
    id: "non-fire-cooking",
    name: "Non Fire Cooking (6-8)",
    category: "Others",
    shortDesc: "Prepare delicious explorer snacks and dishes without using heat.",
    detail: "Survival rations made premium. Craft high-quality gourmet salads, sandwiches, and mocktails using raw ingredients without fire, gas, or electrical stoves.",
    icon: "🥗",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Chefs",
    time: "Day 1, 10:30 AM",
    location: "Refectory Dining",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + Chef Hat Trophies",
    rules: [
      "No matches, lighters, hot plates, or microwaves allowed.",
      "Prep time: 1 hour.",
      "Must maintain maximum cleanliness and present items with clear titles.",
      "Ingredients must be brought by the team."
    ]
  },
  {
    id: "sudoku",
    name: "Sudoku",
    category: "Others",
    shortDesc: "Solve complex numerical logic grid puzzles under speed rounds.",
    detail: "Logic and digits. A grid solving tournament where players tackle standard 9x9 Sudoku puzzles of high complexity.",
    icon: "🔢",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "Individual Solver",
    time: "Day 1, 1:00 PM",
    location: "Seminar Room B",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Logic Master Medal",
    rules: [
      "Pencils only; no digital helpers allowed.",
      "Rounds consist of 3 puzzles (Easy, Medium, Hard).",
      "Fastest solver with correct grid entries wins.",
      "Incomplete or wrong numbers incur severe time penalty."
    ]
  },
  {
    id: "quiz",
    name: "Quiz",
    category: "Others",
    shortDesc: "The grand general knowledge quiz. Speed, buzzer, and memory rounds.",
    detail: "Test your library coordinates. Trivia quiz spanning explorer history, maps, science, pop culture, and sports in buzzer stages.",
    icon: "❓",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "3 Quizzers",
    time: "Day 1 & Day 2",
    location: "Main Auditorium",
    day: "Day 1",
    stage: "On-stage",
    bounty: "₹15,000 + Quiz Bowl Shields",
    rules: [
      "Written prelim rounds filter down to 6 teams for stage.",
      "Buzzer rounds: Incorrect buzzer answers deduct points.",
      "Quizmaster's ruling is binding.",
      "No gadgets allowed inside the hall."
    ]
  },
  {
    id: "scrabble",
    name: "Scrabble",
    category: "Others",
    shortDesc: "Assemble high-scoring vocabulary words on the game board.",
    detail: "Wordsmith's expedition. Build valid words, capture double/triple score tiles, and block opponent paths in timed Scrabble matches.",
    icon: "🔠",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "Individual Player",
    time: "Day 2, 9:30 AM",
    location: "Lounge Boardroom",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹5,000 + Scrabble Board Kit",
    rules: [
      "Standard tournament dictionaries apply for checking word validity.",
      "Each player has 15 minutes cumulative game time.",
      "Word challenges must be made before service.",
      "Tile drawing is random."
    ]
  },
  {
    id: "math-marathon",
    name: "Math Marathon",
    category: "Others",
    shortDesc: "A speed run of mental math arithmetic and puzzle solving.",
    detail: "Conquer equations at pace. Players solve rapid mental math problems, geometric puzzles, and logical sequences in multiple knockout rounds.",
    icon: "➕",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Individual Solver",
    time: "Day 2, 11:00 AM",
    location: "Lecture Hall Beta",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹7,000 + Math Scroll",
    rules: [
      "No calculators, phones, or slide rules permitted.",
      "Only rough sheets provided for calculations.",
      "Time per answer: 30 seconds max in speed round.",
      "Knockout formats after each tier."
    ]
  },
  {
    id: "pointless",
    name: "Pointless",
    category: "Others",
    shortDesc: "Obscure answer survey quiz. The lowest scoring correct answers win.",
    detail: "Find the hidden treasures of trivia. The goal is to provide correct answers that were given by the fewest people in our pre-festival survey. Seek the pointless gold.",
    icon: "🎯",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Players",
    time: "Day 2, 2:30 PM",
    location: "Theatre Hall B",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹8,000 + Survey Trophy",
    rules: [
      "An incorrect answer yields maximum penalty points (100).",
      "Goal is to score as close to 0 as possible.",
      "Questions cover survey sets.",
      "Standard Pointless format applies."
    ]
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Territories");
  const [selectedDay, setSelectedDay] = useState<"All Days" | "Day 1" | "Day 2">("All Days");
  const [selectedStage, setSelectedStage] = useState<"All Stages" | "On-stage" | "Off-stage">("All Stages");
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  // Load registration state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("boscofest_registered_events");
    if (saved) {
      try {
        setRegisteredEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load registrations", e);
      }
    }
  }, []);

  const handleRegister = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (registeredEvents.includes(eventId)) {
      const updated = registeredEvents.filter(id => id !== eventId);
      setRegisteredEvents(updated);
      localStorage.setItem("boscofest_registered_events", JSON.stringify(updated));
      return;
    }

    const updated = [...registeredEvents, eventId];
    setRegisteredEvents(updated);
    localStorage.setItem("boscofest_registered_events", JSON.stringify(updated));

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#6EC6FF", "#65C466", "#D9B24C", "#E8D7A5"]
    });
  };

  // Filtered list
  const filteredEvents = EVENTS_DATA.filter(evt => {
    const matchesCategory = selectedCategory === "All Territories" || evt.category === selectedCategory;
    const matchesDay = selectedDay === "All Days" || evt.day === selectedDay;
    const matchesStage = selectedStage === "All Stages" || evt.stage === selectedStage;
    const matchesSearch = evt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          evt.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDay && matchesStage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-parchment-texture relative flex flex-col pb-0">
      


      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-5 pt-24 pb-16 relative z-20 flex flex-col">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2B1A0E] hover:text-[#6EC6FF] transition-colors mb-6 max-w-max"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Adventure Map</span>
        </Link>

        {/* Page Title Header */}
        <div className="text-center mb-10">
          <span className="font-display font-black text-[10px] tracking-[0.3em] text-[#65C466] uppercase block mb-1.5">
            Territories and Logbook
          </span>
          <h1 className="font-display font-black text-3xl md:text-4xl text-[#2B1A0E] uppercase tracking-wide">
            KNOWN TERRITORIES
          </h1>
          <p className="text-xs text-[#5C4331] font-bold uppercase tracking-wider mt-2.5 max-w-sm mx-auto leading-relaxed">
            Select your expedition route, inspect the challenges, and sign the charters.
          </p>
        </div>

        {/* Search & Coordinate Input with sky-blue and green accents */}
        <div className="w-full max-w-md mx-auto mb-6 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#5C4331]/60">
            <Search className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <input 
            type="text"
            placeholder="SEARCH TERRITORY / KEYWORD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#F7F1D5]/80 border-2 border-[#2B1A0E] text-xs font-display font-black tracking-widest text-[#2B1A0E] placeholder-[#5C4331]/40 uppercase focus:outline-none focus:bg-[#E8D7A5]/30 focus:border-[#65C466] shadow-[3px_3px_0px_rgba(43,26,14,1)] focus:shadow-[3px_3px_0px_rgba(110,198,255,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            style={{ borderRadius: "14px 6px 12px 6px / 6px 12px 6px 14px" }}
          />
        </div>

        {/* Advanced Expedition Filters Panel (Days & Stage Locations) with loading animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 16 }}
          className="w-full bg-[#E8D7A5]/30 border-2 border-[#2B1A0E] p-4.5 mb-8 flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between"
          style={{ borderRadius: "16px 8px 14px 8px / 8px 14px 8px 16px" }}
        >
          
          {/* Day Filter Segment */}
          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[8px] font-black uppercase text-[#5C4331]/80 tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65C466] animate-pulse" />
              <span>Expedition Day</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(["All Days", "Day 1", "Day 2"] as const).map((day) => {
                const isSel = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`py-2 text-[9px] font-black uppercase tracking-wider border border-[#2B1A0E] transition-all cursor-pointer ${
                      isSel ? "bg-[#65C466] text-white shadow-sm" : "bg-[#F7F1D5]/60 text-[#2B1A0E]/70 hover:bg-[#E8D7A5]/40"
                    }`}
                    style={{ borderRadius: "6px 3px 5px 3px / 3px 5px 3px 6px" }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage Filter Segment */}
          <div className="flex-1 flex flex-col gap-1.5">
            <span className="text-[8px] font-black uppercase text-[#5C4331]/80 tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6EC6FF] animate-pulse" />
              <span>Event Venue (Stage)</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(["All Stages", "On-stage", "Off-stage"] as const).map((stg) => {
                const isSel = selectedStage === stg;
                return (
                  <button
                    key={stg}
                    onClick={() => setSelectedStage(stg)}
                    className={`py-2 text-[9px] font-black uppercase tracking-wider border border-[#2B1A0E] transition-all cursor-pointer ${
                      isSel ? "bg-[#6EC6FF] text-[#2B1A0E] shadow-sm" : "bg-[#F7F1D5]/60 text-[#2B1A0E]/70 hover:bg-[#E8D7A5]/40"
                    }`}
                    style={{ borderRadius: "6px 3px 5px 3px / 3px 5px 3px 6px" }}
                  >
                    {stg}
                  </button>
                );
              })}
            </div>
          </div>

        </motion.div>

        {/* Scrollable Categories Navigation Strip with staggered load */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.04
              }
            }
          }}
          initial="hidden"
          animate="visible"
          className="w-full overflow-x-auto pb-4 mb-8 scrollbar-none -mx-5 px-5 flex gap-2.5 select-none justify-start md:justify-center"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <motion.button
                key={cat.name}
                variants={{
                  hidden: { y: 15, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
                }}
                onClick={() => setSelectedCategory(cat.name)}
                className={`shrink-0 px-4.5 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider border-2 border-[#2B1A0E] transition-all cursor-pointer shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)] ${
                  isSelected ? "text-[#2B1A0E]" : "bg-[#F7F1D5]/70 text-[#2B1A0E]/70 hover:bg-[#E8D7A5]/40"
                }`}
                style={{ 
                  borderRadius: "10px 4px 8px 4px / 6px 8px 4px 6px",
                  backgroundColor: isSelected ? cat.color : undefined
                }}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Main Grid of Quests with layout transition */}
        {filteredEvents.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mt-4">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt) => {
                const isRegistered = registeredEvents.includes(evt.id);
                return (
                  <motion.div
                    key={evt.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.015 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 220, 
                      damping: 24 
                    }}
                    onClick={() => setActiveEvent(evt)}
                    className="group relative flex flex-col p-5 bg-[#F7F1D5] border-2 border-[#2B1A0E] shadow-[4px_4px_0px_rgba(43,26,14,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)] hover:border-[#6EC6FF] hover:shadow-[4px_4px_0px_rgba(101,196,102,1)] transition-[border-color,box-shadow] duration-200 cursor-pointer overflow-hidden min-h-[260px] justify-between"
                    style={{ borderRadius: "20px 8px 18px 10px / 12px 18px 10px 14px" }}
                  >
                    
                    {/* Faded category background watermark */}
                    <div className="absolute -right-6 -bottom-6 text-7xl opacity-[0.06] select-none pointer-events-none group-hover:scale-110 transition-transform duration-300">
                      {evt.icon}
                    </div>

                    <div>
                      {/* Header: Icon and Difficulty badge */}
                      <div className="flex items-center justify-between w-full">
                        <div className="text-2xl w-10 h-10 rounded-lg bg-[#E8D7A5]/50 flex items-center justify-center border border-[#2B1A0E]/20">
                          {evt.icon}
                        </div>
                        
                        {/* Difficulty badge */}
                        <span 
                          className="text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: `${evt.difficultyColor}18`,
                            borderColor: evt.difficultyColor,
                            color: evt.difficultyColor === "#D9B24C" ? "#9A731C" : evt.difficultyColor
                          }}
                        >
                          {evt.difficulty}
                        </span>
                      </div>

                      {/* Quest Title */}
                      <h3 className="font-display font-black text-base uppercase tracking-wide text-[#2B1A0E] mt-4">
                        {evt.name}
                      </h3>
                      
                      {/* Category Label */}
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#5C4331]/60 block mt-0.5">
                        {evt.category}
                      </span>

                      {/* Description */}
                      <p className="text-[11.5px] leading-relaxed text-[#5C4331] font-medium mt-3.5 line-clamp-3">
                        {evt.shortDesc}
                      </p>
                    </div>

                    {/* Footing detail and Action Button */}
                    <div className="mt-6 flex flex-col gap-3">
                      
                      {/* Core Specs */}
                      <div className="flex items-center gap-2.5 text-[8.5px] font-bold text-[#5C4331]/80 uppercase flex-wrap">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-[#65C466]" />
                          {evt.teamSize}
                        </span>
                        <span className="w-0.5 h-0.5 rounded-full bg-[#2B1A0E]/25" />
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-[#6EC6FF]" />
                          {evt.location}
                        </span>
                        <span className="w-0.5 h-0.5 rounded-full bg-[#2B1A0E]/25" />
                        <span className="px-1.5 py-0.5 rounded-md bg-[#65C466]/12 text-[#2E7A30] border border-[#65C466]/30 font-black">
                          {evt.day}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-[#6EC6FF]/12 text-[#2181C4] border border-[#6EC6FF]/30 font-black">
                          {evt.stage}
                        </span>
                      </div>

                      {/* CTA Register Button */}
                      <button
                        onClick={(e) => handleRegister(evt.id, e)}
                        className={`w-full py-2.5 text-[10px] font-black tracking-widest uppercase border border-[#2B1A0E] transition-all flex items-center justify-center gap-1.5 ${
                          isRegistered 
                            ? "bg-[#65C466] text-white shadow-[2px_2px_0px_rgba(43,26,14,1)] active:shadow-none active:translate-y-[1px]" 
                            : "bg-[#E8D7A5] text-[#2B1A0E] hover:bg-[#6EC6FF] shadow-[2px_2px_0px_rgba(43,26,14,1)] active:shadow-none active:translate-y-[1px]"
                        }`}
                        style={{ borderRadius: "10px 4px 8px 4px / 6px 8px 4px 6px" }}
                      >
                        {isRegistered ? (
                          <>
                            <span>Charter Signed</span>
                            <span>📜</span>
                          </>
                        ) : (
                          <>
                            <span>Sign Charter</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>

                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty territory state */
          <div className="w-full py-16 px-6 text-center border-2 border-dashed border-[#2B1A0E]/20 bg-[#E8D7A5]/10 rounded-2xl flex flex-col items-center justify-center gap-3 mt-4">
            <Compass className="h-8 w-8 text-[#5C4331] opacity-40 animate-spin" style={{ animationDuration: "12s" }} />
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#2B1A0E] mt-2">
              Unexplored Grid Coordinates
            </h3>
            <p className="text-xs text-[#5C4331] max-w-xs leading-relaxed">
              No expeditions match your parameters. Adjust your search or choose another region in the navigation compass above.
            </p>
          </div>
        )}

      </main>

      {/* ─── ZOOM SHEET DETAILS MODAL (Slide-up Bottom Sheet on mobile, modal on desktop) ─── */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            
            {/* Backdrop backing cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEvent(null)}
              className="absolute inset-0 bg-[#2B1A0E]/40 backdrop-blur-sm"
            />

            {/* Content Drawer Box */}
            <motion.div 
              initial={{ y: "100%", opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#F7F1D5] rounded-t-3xl sm:rounded-2xl border-t-2 border-x-2 sm:border-2 border-[#2B1A0E] px-6 pt-5 pb-8 shadow-[0_-8px_30px_rgba(43,26,14,0.18)] sm:shadow-[6px_6px_0px_rgba(43,26,14,1)] z-10 overflow-y-auto max-h-[85vh] sm:max-h-[80vh]"
            >
              {/* Handlebar drag indicator for mobile */}
              <div className="w-12 h-1 bg-[#2B1A0E]/15 rounded-full mx-auto mb-5 sm:hidden" />

              {/* Close Button */}
              <button 
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center text-[#2B1A0E] hover:text-[#6EC6FF] transition-colors"
                aria-label="Close quest details"
              >
                <X className="h-5.5 w-5.5" />
              </button>

              {/* Header title */}
              <div className="flex items-center gap-3.5 mt-2">
                <span className="text-3xl">{activeEvent.icon}</span>
                <div>
                  <h2 className="font-display font-black text-lg text-[#2B1A0E] uppercase tracking-wide">
                    {activeEvent.name}
                  </h2>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 border border-[#2B1A0E]/20 rounded-full text-[#5C4331] inline-block mt-1">
                    {activeEvent.category}
                  </span>
                </div>
              </div>

              <hr className="border-[#2B1A0E]/12 my-4" />

              {/* Quest Specs */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-[#E8D7A5]/20 border border-[#2B1A0E]/15 rounded-xl flex items-center gap-2.5">
                  <Users className="h-4.5 w-4.5 text-[#65C466] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase text-[#5C4331]/70 tracking-wider">Party Size</span>
                    <span className="text-[10px] font-bold text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeEvent.teamSize}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#E8D7A5]/20 border border-[#2B1A0E]/15 rounded-xl flex items-center gap-2.5">
                  <Calendar className="h-4.5 w-4.5 text-[#6EC6FF] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase text-[#5C4331]/70 tracking-wider">Schedule</span>
                    <span className="text-[10px] font-bold text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeEvent.time}</span>
                  </div>
                </div>
                {/* Day Spec */}
                <div className="p-3 bg-[#65C466]/8 border border-[#65C466]/20 rounded-xl flex items-center gap-2.5">
                  <span className="text-base">📅</span>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase text-[#2E7A30] tracking-wider">Festival Day</span>
                    <span className="text-[10px] font-bold text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeEvent.day}</span>
                  </div>
                </div>
                {/* Stage Spec */}
                <div className="p-3 bg-[#6EC6FF]/8 border border-[#6EC6FF]/20 rounded-xl flex items-center gap-2.5">
                  <span className="text-base">🎭</span>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase text-[#2181C4] tracking-wider">Event Venue</span>
                    <span className="text-[10px] font-bold text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeEvent.stage}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#E8D7A5]/20 border border-[#2B1A0E]/15 rounded-xl flex items-center gap-2.5 col-span-2">
                  <MapPin className="h-4.5 w-4.5 text-[#E53E3E] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[7px] font-black uppercase text-[#5C4331]/70 tracking-wider">Coordinates Location</span>
                    <span className="text-[10px] font-bold text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#2B1A0E] mb-1.5 flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-[#6EC6FF]" />
                  <span>Expedition Overview</span>
                </h4>
                <p className="text-xs text-[#5C4331] font-medium leading-relaxed">
                  {activeEvent.detail}
                </p>
              </div>

              {/* Rules List */}
              <div className="mb-6">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#2B1A0E] mb-2 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[#65C466]" />
                  <span>Rules of Engagement</span>
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-[11px] text-[#5C4331] font-medium leading-relaxed">
                  {activeEvent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Prize Bounty */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-[#2B1A0E] bg-[#D9B24C]/10 mb-6">
                <Trophy className="h-5.5 w-5.5 text-[#D9B24C] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[7.5px] font-black uppercase text-[#5C4331] tracking-wider">Discovered Bounty</span>
                  <span className="text-xs font-black text-[#2B1A0E] uppercase tracking-wide mt-0.5">{activeEvent.bounty}</span>
                </div>
              </div>

              {/* Primary Action Button (Sign Charter) */}
              <button
                onClick={(e) => {
                  handleRegister(activeEvent.id, e);
                }}
                className={`w-full py-3.5 flex items-center justify-center gap-2 font-display text-xs font-black tracking-widest uppercase border-2 border-[#2B1A0E] transition-all cursor-pointer ${
                  registeredEvents.includes(activeEvent.id)
                    ? "bg-[#65C466] text-white shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)]"
                    : "bg-[#6EC6FF] text-[#2B1A0E] shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)]"
                }`}
                style={{ borderRadius: "12px 6px 10px 6px / 6px 10px 6px 12px" }}
              >
                {registeredEvents.includes(activeEvent.id) ? (
                  <>
                    <span>Charter Signed</span>
                    <span>📜</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Sign Expedition Charter</span>
                  </>
                )}
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
