"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  X,
  FileText,
  Filter,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

// List of Categories
const CATEGORIES = [
  "All",
  "Music",
  "Dance",
  "Technical",
  "Literary",
  "Art",
  "Cultural",
  "Photography",
  "Gaming",
];

interface Coordinator {
  name: string;
  phone: string;
  email: string;
}

interface EventItem {
  id: string;
  name: string;
  originalName: string;
  category: string;
  stageType: "On-Stage" | "Off-Stage";
  shortDesc: string;
  longDesc: string;
  banner: string;
  date: string;
  venue: string;
  rules: string[];
  coordinator: Coordinator;
}

// 35 Boscofest Events Database
const EVENTS_DATABASE: EventItem[] = [
  // PHOTOGRAPHY & FILM
  {
    id: "evt-montage",
    name: "Bosco Montage",
    originalName: "Short Film Making",
    category: "Photography",
    stageType: "Off-Stage",
    shortDesc: "Tell a compelling cinematic story. Shoot, edit, and score a creative short film based on a mystery prompt.",
    longDesc: "Bosco Montage invites student directors and film crews to display their visual storytelling prowess. Teams will have to capture, compile, and output a 3-5 minute narrative cinematic film incorporating specific mystery props and dialogue elements.",
    banner: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 kickoff (Submission Day 3)",
    venue: "Media Center & Campus Grounds",
    rules: [
      "Maximum of 5 members per production crew.",
      "Runtime: 3 to 5 minutes (including titles and credits).",
      "All footage must be shot during the festival days. Stock footage limit is 15 seconds.",
      "Submit output file in MP4 format before Day 3 at 10:00 AM."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.n@boscofest.in" }
  },
  {
    id: "evt-vignette",
    name: "Bosco Vignette",
    originalName: "Photography",
    category: "Photography",
    stageType: "Off-Stage",
    shortDesc: "A theme-based photography sprint. Capture raw emotions and lighting sweeps across the campus.",
    longDesc: "Every corner of Boscofest holds a story. Armed with your DSLR or mirrorless camera, capture the raw emotions, light leaks, and shadows that showcase Boscofest's theme 'Dystopia'.",
    banner: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 9:30 AM",
    venue: "Media Center (Lobby)",
    rules: [
      "Individual participation.",
      "Theme will be announced at 9:30 AM on Day 2.",
      "Submissions must be unedited JPEGs straight from the camera.",
      "Post-processing or filter modifications are strictly prohibited."
    ],
    coordinator: { name: "Kabir Banerjee", phone: "+91 70033 45678", email: "kabir.b@boscofest.in" }
  },

  // ART & DESIGN
  {
    id: "evt-caricature",
    name: "Bosco Caricature",
    originalName: "Ad Wars",
    category: "Art",
    stageType: "Off-Stage",
    shortDesc: "Pitch, draw, and act. Conceptualize and execute a creative print ad and matching jingle on the fly.",
    longDesc: "Ad Wars combines commercial intelligence, graphic illustration, and theatrical pitchcraft. Teams will receive a product prompt and must design a caricature-themed print advertisement alongside a live jingle pitch.",
    banner: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 1:00 PM",
    venue: "Auditorium Annex",
    rules: [
      "Teams of 3 to 4 participants.",
      "Preparation time: 45 minutes. Presentation time: 3 minutes.",
      "Drawing sheet will be provided. Bring your own sketch and paint media.",
      "Judged on humor, visual cartoon structure, and marketing message clarity."
    ],
    coordinator: { name: "Priyam Chatterjee", phone: "+91 89100 55443", email: "priyam.c@boscofest.in" }
  },
  {
    id: "evt-comic-con",
    name: "Bosco Comic Con",
    originalName: "Digital Art",
    category: "Art",
    stageType: "Off-Stage",
    shortDesc: "Draw a futuristic cyberpunk character. Design a custom digital comic strip on drawing tablets.",
    longDesc: "Digital artists assemble! Harness your stylus to sketch and illustrate a 4-panel digital comic strip that builds a character within Boscofest's dystopian universe.",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 10:30 AM",
    venue: "Design Lab 2",
    rules: [
      "Individual participation.",
      "Software allowed: Photoshop, Illustrator, Procreate, or Clip Studio Paint.",
      "Time duration: 3 hours.",
      "Final output must be exported as PNG and PSD/native layer files."
    ],
    coordinator: { name: "Anish Roy", phone: "+91 90510 98765", email: "anish.r@boscofest.in" }
  },
  {
    id: "evt-vogue",
    name: "Bosco Vogue",
    originalName: "Eco Fashion & Interior Decor",
    category: "Art",
    stageType: "On-Stage",
    shortDesc: "Design sustainable fashion and recycle interior elements. Construct outfit modules from waste materials.",
    longDesc: "Fusing eco-awareness with runway couture, Bosco Vogue invites designers to construct a wearable fashion piece and interior model utilizing only recyclable wastes and eco-friendly products.",
    banner: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 11:00 AM",
    venue: "Main Campus Courtyard",
    rules: [
      "Teams of 4 to 6 members (including 1 fashion model).",
      "At least 80% of materials used must be waste/recycled goods.",
      "Outfit construction must take place on-site within 2.5 hours.",
      "Judged on aesthetics, sustainability, and runway presentation."
    ],
    coordinator: { name: "Sarah Sen", phone: "+91 98744 56789", email: "sarah.s@boscofest.in" }
  },
  {
    id: "evt-masterchef",
    name: "Bosco Masterchef",
    originalName: "Non Fire Cooking (6-8)",
    category: "Art",
    stageType: "Off-Stage",
    shortDesc: "Junior culinary challenge. Create gourmet salads, desserts, and mocktails without using fire.",
    longDesc: "Bosco Masterchef introduces young culinary stars (grades 6-8) to the art of cooking without heat. Blend, slice, layer, and present premium culinary delicacies under the clock.",
    banner: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 11:30 AM",
    venue: "Home Science Hall",
    rules: [
      "Open to classes 6 to 8. Teams of 2.",
      "No gas cylinders, hot plates, induction ovens, or open flames allowed.",
      "Prep time: 60 minutes. Presentation: 5 minutes.",
      "Bring all raw ingredients and prep utensils."
    ],
    coordinator: { name: "Mia Watson", phone: "+91 90511 23456", email: "mia.w@boscofest.in" }
  },
  {
    id: "evt-art-attack",
    name: "Bosco Art Attack",
    originalName: "Art and Graffiti",
    category: "Art",
    stageType: "Off-Stage",
    shortDesc: "Spray, sketch, and splash. Transform canvas panels into high-concept street graffiti art.",
    longDesc: "Unleash your creativity on massive canvas partitions. Bosco Art Attack gathers visual designers to paint large-scale street art echoing neon cyberpunk, dystopia, and youth energy.",
    banner: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 1:00 PM",
    venue: "Open Arena Partitions",
    rules: [
      "Teams of 2. Canvas screens will be provided.",
      "Spray paint, stencils, acrylic paints, and markers are allowed.",
      "Duration: 3 hours.",
      "Must incorporate the official Ruby red theme color in the artwork."
    ],
    coordinator: { name: "Priyam Chatterjee", phone: "+91 89100 55443", email: "priyam.c@boscofest.in" }
  },

  // TECHNICAL
  {
    id: "evt-byte-blitz",
    name: "Bosco Byte-Blitz",
    originalName: "Coding and Debugging",
    category: "Technical",
    stageType: "Off-Stage",
    shortDesc: "Compete in algorithmic syntax solving and logic debugging speed sprints.",
    longDesc: "Test your coding skills. Solve complex data structures problems and find logic traps inside Python, Java, or C++ blocks under an intense, ticking clock.",
    banner: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 10:00 AM",
    venue: "Main Computer Laboratory",
    rules: [
      "Individual participation.",
      "Languages: Python 3, Java 17, or C++20.",
      "Time limit: 90 minutes. 6 algorithmic tasks.",
      "No external internet resources, IDE plugins, or AI helpers allowed."
    ],
    coordinator: { name: "Siddharth Sen", phone: "+91 98744 56789", email: "sid.sen@boscofest.in" }
  },
  {
    id: "evt-cipher",
    name: "Bosco Cipher",
    originalName: "Cyberhunt",
    category: "Technical",
    stageType: "Off-Stage",
    shortDesc: "Decipher encrypted keys. Navigate online puzzles, hidden clues, and digital riddles.",
    longDesc: "Enter the virtual grid. Bosco Cipher is a multi-tier cyberhunt where participants decode cryptographic ciphers, analyze files, and follow hidden coordinate strings across the web.",
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 10:00 AM",
    venue: "AV Lab & Online portals",
    rules: [
      "Teams of 2.",
      "Duration: 4 hours. Tiered progression.",
      "First team to crack Level 15 wins.",
      "Browser inspection and search engines allowed. Network sniffing is forbidden."
    ],
    coordinator: { name: "Arjun Mehta", phone: "+91 82400 98765", email: "arjun.m@boscofest.in" }
  },
  {
    id: "evt-gridlock",
    name: "Bosco Gridlock",
    originalName: "Sudoku",
    category: "Technical",
    stageType: "Off-Stage",
    shortDesc: "Logic puzzle championship. Solve standard and variant Sudoku boards at lightning speed.",
    longDesc: "Engage your logical deductions. Bosco Gridlock challenges solvers to tackle standard 9x9 grids alongside diagonal, killer, and irregular Sudoku formats under strict time constraints.",
    banner: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 3:00 PM",
    venue: "Assembly Hall (Tables)",
    rules: [
      "Individual event.",
      "Consists of 3 rounds: Speed, Variant, and Hardcore.",
      "No calculators, phones, or smart watches allowed.",
      "Scoring based on completion speed and accuracy."
    ],
    coordinator: { name: "Rohit Banerjee", phone: "+91 98305 67890", email: "rohit.b@boscofest.in" }
  },
  {
    id: "evt-calcrush",
    name: "Bosco Calcrush",
    originalName: "Math Marathon",
    category: "Technical",
    stageType: "Off-Stage",
    shortDesc: "Solve math challenges. Tackle calculus, number theory, and geometric proofs.",
    longDesc: "A sprint of quantitative analysis and mathematical proofs. Teams will face complex mathematical puzzles, equations, and logic problems that test speed and accuracy.",
    banner: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 11:30 AM",
    venue: "Physics Lecture Theater",
    rules: [
      "Teams of 2.",
      "Calculators are not allowed.",
      "Round 1: MCQ Sprint (30 mins). Round 2: Subjective Proofs (60 mins).",
      "Tiebreaker based on the speed of correct answers."
    ],
    coordinator: { name: "Debashis Sen", phone: "+91 94331 22334", email: "debashis.s@boscofest.in" }
  },

  // CULTURAL (DRAMA/IMPROV/ETC)
  {
    id: "evt-theatricals",
    name: "Bosco Theatricals",
    originalName: "Drama",
    category: "Cultural",
    stageType: "On-Stage",
    shortDesc: "One-act plays. Write, direct, and act in dramatic or comedic stories.",
    longDesc: "Take the stage to capture minds. Bosco Theatricals gathers schools to showcase 15-minute stage dramas containing powerful messages, sound design, and acting excellence.",
    banner: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 2:00 PM",
    venue: "Main Auditorium",
    rules: [
      "Squad size: 8 to 15 members.",
      "Time duration: 12 to 15 minutes.",
      "Language: English, Hindi, or Bengali.",
      "Simple stage props are allowed. No dangerous items."
    ],
    coordinator: { name: "Marshall Mathers", phone: "+91 99033 11223", email: "marshall.m@boscofest.in" }
  },
  {
    id: "evt-ad-lib",
    name: "Bosco Ad-Lib",
    originalName: "Improv",
    category: "Cultural",
    stageType: "On-Stage",
    shortDesc: "On-the-spot improvisational acting. Adapt to situations and props instantly.",
    longDesc: "No script, no rehearsal. Bosco Ad-Lib tests spontaneous acting and witty comebacks as teams face random situations, roles, and props thrown at them on stage.",
    banner: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 2:30 PM",
    venue: "AV Seminar Hall",
    rules: [
      "Teams of 3 members.",
      "Prompt received on stage: 60 seconds prep time.",
      "Performance duration: 3 minutes.",
      "Judged on creativity, comedic timing, and script adaptation."
    ],
    coordinator: { name: "Mia Watson", phone: "+91 90511 23456", email: "mia.w@boscofest.in" }
  },
  {
    id: "evt-jester",
    name: "Bosco Jester",
    originalName: "Dumb Charades",
    category: "Cultural",
    stageType: "Off-Stage",
    shortDesc: "Classical dumb charades. Guess movies, books, and tech terms through gestures.",
    longDesc: "Engage your silent communication. Decode titles of obscure movies, classic books, and complex technical concepts without uttering a single syllable.",
    banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 1:30 PM",
    venue: "Library Seminar Room",
    rules: [
      "Teams of 3.",
      "No writing, lip-syncing, pointing at objects, or whispering.",
      "Maximum time limit per round: 90 seconds.",
      "Tiered tournament bracket structure."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-prodigy",
    name: "Bosco Prodigy",
    originalName: "GI60",
    category: "Cultural",
    stageType: "On-Stage",
    shortDesc: "60-second dramatic acts. Deliver a powerful monologue or performance in one minute.",
    longDesc: "You have exactly 60 seconds to make an impact. Deliver monologues, short standups, or dynamic physical routines in this fast-paced dramatic sprint.",
    banner: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 4:00 PM",
    venue: "Amphitheatre Stage",
    rules: [
      "Individual participation.",
      "Performance must be exactly 60 seconds or less. Timer begins on first word/action.",
      "No elaborate costumes. Simple props are allowed.",
      "Must be original work or performance of a classic script."
    ],
    coordinator: { name: "Anish Roy", phone: "+91 90510 98765", email: "anish.r@boscofest.in" }
  },

  // DANCE
  {
    id: "evt-nritya",
    name: "Bosco Nritya",
    originalName: "Eastern Dance (6-12)",
    category: "Dance",
    stageType: "On-Stage",
    shortDesc: "Classical and semi-classical Indian dance styles. Present expressions and rhythms.",
    longDesc: "Bosco Nritya celebrates the grace and beauty of classical and semi-classical Indian dance forms. Present solo or group performances containing intricate footwork and expressions.",
    banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 2:00 PM",
    venue: "Main Auditorium",
    rules: [
      "Open to classes 6 to 12. Teams of 5 to 10.",
      "Performance time: 5 to 7 minutes.",
      "Allowed styles: Kathak, Bharatanatyam, Odissi, Manipuri, Kathakali, and Semi-Classical.",
      "Bring sound track on a thumb drive in MP3 format."
    ],
    coordinator: { name: "Mia Watson", phone: "+91 90511 23456", email: "mia.w@boscofest.in" }
  },
  {
    id: "evt-tango",
    name: "Bosco Tango",
    originalName: "Western Dance (6-12)",
    category: "Dance",
    stageType: "On-Stage",
    shortDesc: "Western routines, contemporary jazz, hip-hop, and locking group routines.",
    longDesc: "Unleash high-energy synchronized choreography. Bosco Tango presents the best Western dance squads competing across contemporary, hip-hop, and street styles.",
    banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 1:00 PM",
    venue: "Main Auditorium",
    rules: [
      "Open to classes 6 to 12. Teams of 6 to 12.",
      "Performance time: 4 to 6 minutes.",
      "Allowed styles: Hip-hop, Contemporary, Locking, Popping, House, and Jazz.",
      "Bring track in MP3/WAV format."
    ],
    coordinator: { name: "Mia Watson", phone: "+91 90511 23456", email: "mia.w@boscofest.in" }
  },
  {
    id: "evt-overdrive",
    name: "Bosco Overdrive",
    originalName: "Dance Faceoff",
    category: "Dance",
    stageType: "On-Stage",
    shortDesc: "1v1 street battle brackets. Spontaneous locking, popping, and breaking.",
    longDesc: "Step into the cypher ring. Bosco Overdrive is an intense, spontaneous 1v1 street dance battle where dancers adapt to beats dropped live by our DJ.",
    banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 3:00 PM",
    venue: "Open Quadrangle",
    rules: [
      "2 participants allowed per school.",
      "Live DJ drops random hip-hop/break beats.",
      "Brackets: Solo battles. 45 seconds per round.",
      "Judged on musicality, creativity, execution, and stage presence."
    ],
    coordinator: { name: "Mia Watson", phone: "+91 90511 23456", email: "mia.w@boscofest.in" }
  },

  // LITERARY
  {
    id: "evt-minute-mania",
    name: "Bosco Minute Mania",
    originalName: "Just a Minute",
    category: "Literary",
    stageType: "Off-Stage",
    shortDesc: "Speak for 60 seconds without hesitation, repetition, or deviation.",
    longDesc: "The classic test of spontaneous speaking. Bosco Minute Mania challenges orators to speak on a random topic for one full minute while competitors listen closely to challenge deviations, repetitions, or hesitations.",
    banner: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 11:00 AM",
    venue: "Library Seminar Hall",
    rules: [
      "1 participant per school.",
      "Standard JAM rules apply: No hesitation, deviation, or repetition.",
      "Points awarded for speaking time and successful challenges.",
      "The decision of the moderator is final."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-magnum-opus",
    name: "Bosco Magnum Opus",
    originalName: "Theme Poetry Writing",
    category: "Literary",
    stageType: "Off-Stage",
    shortDesc: "Compose a powerful, evocative poem based on a visual prompt.",
    longDesc: "Write your masterpiece. Bosco Magnum Opus invites creative writers to compose an original poem based on a dark dystopian visual theme. Express complex emotions on paper.",
    banner: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 1:00 PM",
    venue: "Senior School Classroom",
    rules: [
      "Individual participation.",
      "Time duration: 60 minutes. Prompt will be shown on screen.",
      "Word count limit: 120 to 250 words.",
      "Must be original work. Plagiarism check will be conducted."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-chronicles",
    name: "Bosco Chronicles",
    originalName: "Journalism",
    category: "Literary",
    stageType: "Off-Stage",
    shortDesc: "Write editorial reviews, take press reports, and compile a newsletter page.",
    longDesc: "Step into the press room. Bosco Chronicles challenges aspiring journalists to cover active Boscofest events, write editorial reports, and build a newsletter page layout.",
    banner: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 kickoff (Submission Day 3)",
    venue: "Press Room (Media Center)",
    rules: [
      "Teams of 2 (1 reporter, 1 designer).",
      "Must cover at least 3 active Boscofest events.",
      "Submit a single-page newsletter in PDF format before Day 3 at 9:00 AM.",
      "Judged on layout aesthetics, copywriting quality, and event coverage."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-synapse",
    name: "Bosco Synapse",
    originalName: "Quiz",
    category: "Literary",
    stageType: "On-Stage",
    shortDesc: "General knowledge quiz championship. Fast-paced buzzer rounds covering history, tech, and pop-culture.",
    longDesc: "Test your general knowledge. Bosco Synapse is a comprehensive general quiz testing trivia from global history, tech development, visual arts, pop culture, and sports.",
    banner: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 10:00 AM",
    venue: "AV Room 1",
    rules: [
      "Teams of 2.",
      "Consists of a written prelims round. Top 6 teams qualify for stage finals.",
      "Stage finals feature buzzer, clockwise, and grid rounds.",
      "Decisions of the Quizmaster are final."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-wordsmith",
    name: "Bosco Wordsmith",
    originalName: "Scrabble",
    category: "Literary",
    stageType: "Off-Stage",
    shortDesc: "Classical board Scrabble championship. Connect high-scoring words under timing clocks.",
    longDesc: "Formulate words to maximize scores. Bosco Wordsmith is a board Scrabble tournament where players duel in spelling, strategy, and lexicon power.",
    banner: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 1:30 PM",
    venue: "Junior Assembly Hall",
    rules: [
      "1 participant per school.",
      "Tournament brackets: 1v1 play. Official Scrabble dictionary applies.",
      "Time control: 25 minutes per player per match (chess clock style).",
      "Scoring tracked via official game cards."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-polaris",
    name: "Bosco Polaris",
    originalName: "Turncoat Debate",
    category: "Literary",
    stageType: "Off-Stage",
    shortDesc: "Debate round. Switch stances (FOR to AGAINST) at the sound of the buzzer.",
    longDesc: "Argue against yourself. Bosco Polaris challenges orators to present a debate on complex prompts, instantly changing their stance between FOR and AGAINST at the moderator's buzzer.",
    banner: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 3:00 PM",
    venue: "AV Seminar Room",
    rules: [
      "1 speaker per school.",
      "Prep time: 10 minutes. Speaking time: 3 minutes total.",
      "Must switch stances instantly when the bell rings (usually every 45-60 seconds).",
      "Judged on logic consistency, speech flow, and argument strength."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },
  {
    id: "evt-voidix",
    name: "Bosco Voidix",
    originalName: "Pointless",
    category: "Literary",
    stageType: "On-Stage",
    shortDesc: "Unique quiz format. Find the most obscure correct answers to pop-culture and history questions.",
    longDesc: "Inspired by the hit television show, Bosco Voidix requires contestants to answer trivia questions, with the goal of selecting the most obscure correct answer that was guessed by the fewest people in a public survey.",
    banner: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 10:30 AM",
    venue: "AV Auditorium",
    rules: [
      "Teams of 2.",
      "The goal is to score as few points as possible. A 'pointless' answer scores 0.",
      "Incorrect answers score maximum penalty points.",
      "Top 4 teams from prelims make it to the main stage finals."
    ],
    coordinator: { name: "Neil D'Souza", phone: "+91 98301 11223", email: "neil.d@boscofest.in" }
  },

  // MUSIC
  {
    id: "evt-remix",
    name: "Bosco Remix",
    originalName: "Unconventional Music",
    category: "Music",
    stageType: "On-Stage",
    shortDesc: "Create music loops using non-traditional instruments, plastic tubs, and metal pipes.",
    longDesc: "Who needs a guitar? Bosco Remix challenges teams to compose an original music arrangement using only everyday non-traditional instruments like buckets, pipes, paper, and metal sheets.",
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 2:30 PM",
    venue: "Campus Amphitheatre",
    rules: [
      "Teams of 4 to 8 members.",
      "Strictly no traditional musical instruments (guitars, keyboards, drums, flutes) allowed.",
      "Performance time: 5 minutes.",
      "Vocal styling and beatboxing are allowed."
    ],
    coordinator: { name: "Rohan Dasgupta", phone: "+91 98300 12345", email: "rohan.d@boscofest.in" }
  },
  {
    id: "evt-jukebox",
    name: "Bosco Jukebox",
    originalName: "Fusion Music (6-12)",
    category: "Music",
    stageType: "On-Stage",
    shortDesc: "Blend Indian classical ragas with Western rock, pop, or jazz beats.",
    longDesc: "Unite musical worlds. Bosco Jukebox invites ensembles (grades 6-12) to blend the patterns of Indian classical ragas with Western rock and roll rhythms.",
    banner: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 1:00 PM",
    venue: "Main Stage Arena",
    rules: [
      "Open to classes 6 to 12. Teams of 5 to 9 members.",
      "Performance duration: 6 to 8 minutes.",
      "Must use at least 1 Indian instrument and 1 Western instrument.",
      "Vocals must feature both Eastern and Western segments."
    ],
    coordinator: { name: "Rohan Dasgupta", phone: "+91 98300 12345", email: "rohan.d@boscofest.in" }
  },
  {
    id: "evt-raag",
    name: "Bosco Raag",
    originalName: "Eastern Music (6-12)",
    category: "Music",
    stageType: "On-Stage",
    shortDesc: "Classical vocal performances and semi-classical ghazals accompanied by Harmonium and Tabla.",
    longDesc: "Experience Indian classical music. Bosco Raag challenges vocalists to perform pure classical ragas, thumris, or ghazals accompanied by acoustic backing.",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 12:30 PM",
    venue: "AV Seminar Hall",
    rules: [
      "Open to classes 6 to 12. Solo vocal event.",
      "Maximum of 2 accompanists allowed (Harmonium/Tabla). No digital key accompaniment.",
      "Performance duration: 4 to 5 minutes.",
      "Must specify the Raag being sung before beginning."
    ],
    coordinator: { name: "Rohan Dasgupta", phone: "+91 98300 12345", email: "rohan.d@boscofest.in" }
  },
  {
    id: "evt-sur-sangam",
    name: "Bosco Sur Sangam",
    originalName: "Antakshari",
    category: "Music",
    stageType: "On-Stage",
    shortDesc: "Classical multi-round Antakshari. Guess Bollywood songs, ragas, and lyric endings.",
    longDesc: "Test your memory of Indian cinema tracks. Bosco Sur Sangam is a competitive Antakshari with audio visual clues, song translation rounds, and rapid-fire lyric guessing.",
    banner: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 11:00 AM",
    venue: "AV Hall 2",
    rules: [
      "Teams of 2.",
      "Consists of a written screening round followed by 5 stage rounds.",
      "Strict time limit (10 seconds) to recall and sing a matching track.",
      "Judged on song recognition, correct lyrics, and tune accuracy."
    ],
    coordinator: { name: "Rohan Dasgupta", phone: "+91 98300 12345", email: "rohan.d@boscofest.in" }
  },
  {
    id: "evt-beat",
    name: "Bosco Beat",
    originalName: "Western Music (6-12)",
    category: "Music",
    stageType: "On-Stage",
    shortDesc: "Western acoustic/electric band performances. Classic rock, pop, and blues covers.",
    longDesc: "Perform classic Western hits. Bosco Beat brings together schools to showcase Western bands performing covers of iconic rock, pop, or blues hits.",
    banner: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 10:00 AM",
    venue: "Main Auditorium",
    rules: [
      "Open to classes 6 to 12. Teams of 4 to 7 members.",
      "Time limit: 6 minutes (including soundcheck).",
      "Only English language tracks are allowed.",
      "Acoustic and electric instruments are allowed. No backing tracks."
    ],
    coordinator: { name: "Rohan Dasgupta", phone: "+91 98300 12345", email: "rohan.d@boscofest.in" }
  },

  // GAMING & SPORTS
  {
    id: "evt-endgame",
    name: "Bosco Endgame",
    originalName: "Chess",
    category: "Gaming",
    stageType: "Off-Stage",
    shortDesc: "Rapid Chess tournament. Double-bracket system played under timing clocks.",
    longDesc: "Engage in mental warfare. Bosco Endgame is a FIDE-rules Chess tournament utilizing a rapid format, putting strategic planning and calculations under time constraints.",
    banner: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 (August 15) - 9:30 AM onwards",
    venue: "Senior School Hall",
    rules: [
      "1 participant per school.",
      "Time control: 10 minutes + 5 seconds increment per move (Rapid).",
      "FIDE rapid guidelines apply. Swiss System pairing.",
      "Illegal moves lead to immediate loss on the second occurrence."
    ],
    coordinator: { name: "Arjun Mehta", phone: "+91 82400 98765", email: "arjun.m@boscofest.in" }
  },
  {
    id: "evt-ricochet",
    name: "Bosco Ricochet",
    originalName: "Table Tennis",
    category: "Gaming",
    stageType: "Off-Stage",
    shortDesc: "Singles and doubles table tennis championship. Fast rallies and spinning smashes.",
    longDesc: "A test of reflexes and control. Bosco Ricochet invites schools to participate in singles and doubles table tennis matches. Knock out competitors through intense matches.",
    banner: "https://images.unsplash.com/photo-1534067783941-51c9c23eccfd?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 10:00 AM",
    venue: "Indoor Sports Room",
    rules: [
      "Teams of 2 (Singles & Doubles matches).",
      "Matches played as best of 3 sets. Final matches are best of 5.",
      "Players must bring their own paddles. Balls will be provided.",
      "International Table Tennis Federation rules apply."
    ],
    coordinator: { name: "Arjun Mehta", phone: "+91 82400 98765", email: "arjun.m@boscofest.in" }
  },
  {
    id: "evt-skybound",
    name: "Bosco Skybound",
    originalName: "Volleyball",
    category: "Gaming",
    stageType: "Off-Stage",
    shortDesc: "Fast-paced volleyball tournament. Dynamic spikes, blocks, and team coordination.",
    longDesc: "Assemble your squad at the net. Bosco Skybound is an outdoor 6v6 volleyball tournament where team power, setting, and defensive blocks earn the cup.",
    banner: "https://images.unsplash.com/photo-1592656094267-764a4506857d?q=80&w=600&auto=format&fit=crop",
    date: "Day 1 & Day 2 - All Day",
    venue: "Main Volleyball Courts",
    rules: [
      "Squad of 6 active players + 2 substitutes.",
      "Standard FIVB rules. Matches are best of 3 sets (25, 25, 15).",
      "Underhand and overhand serves are allowed.",
      "Rotation must be strictly maintained."
    ],
    coordinator: { name: "Arjun Mehta", phone: "+91 82400 98765", email: "arjun.m@boscofest.in" }
  },
  {
    id: "evt-playverse",
    name: "Bosco Playverse",
    originalName: "Tag+ Unconventional Games",
    category: "Gaming",
    stageType: "Off-Stage",
    shortDesc: "Dodgeball, capture the flag, and relay sprints inside a custom playground layout.",
    longDesc: "Engage in fun playground battles. Bosco Playverse brings together schools to compete in nostalgic physical games, including dodgeball, tag, and capture the flag under modified rules.",
    banner: "https://images.unsplash.com/photo-1472152083436-a6eede6efad6?q=80&w=600&auto=format&fit=crop",
    date: "Day 2 (August 16) - 2:30 PM",
    venue: "Basketball Court Area",
    rules: [
      "Teams of 5 players.",
      "Games include: Dodgeball, Capture the Flag, and Obstacle Relay.",
      "Sports shoes are mandatory. No spikes allowed.",
      "Decisions of the referee are final."
    ],
    coordinator: { name: "Arjun Mehta", phone: "+91 82400 98765", email: "arjun.m@boscofest.in" }
  },
  {
    id: "evt-crosscourt",
    name: "Bosco CrossCourt",
    originalName: "Pickleball",
    category: "Gaming",
    stageType: "Off-Stage",
    shortDesc: "Fast-paced pickleball singles and doubles matches. Fuses elements of tennis and badminton.",
    longDesc: "Experience the fastest-growing racquet sport. Bosco CrossCourt challenges players to compete in pickleball matches on the outdoor courts, showcasing control, dinking, and volleys.",
    banner: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop",
    date: "Day 3 (August 17) - 10:00 AM",
    venue: "Outdoor Tennis Court",
    rules: [
      "Teams of 2.",
      "First side to reach 11 points wins (must win by a 2-point margin).",
      "Underhand serves only. Double-bounce rule applies.",
      "No volleys allowed inside the non-volley zone (kitchen)."
    ],
    coordinator: { name: "Arjun Mehta", phone: "+91 82400 98765", email: "arjun.m@boscofest.in" }
  }
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  // Filter events database dynamically
  const filteredEvents = EVENTS_DATABASE.filter((event) => {
    const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
    const stageMatch = selectedStage === "All" || event.stageType === selectedStage;

    let dayMatch = true;
    if (selectedDay !== "All") {
      dayMatch = event.date.toLowerCase().includes(selectedDay.toLowerCase());
    }

    return categoryMatch && stageMatch && dayMatch;
  });

  // Call confetti on registering for an event
  const triggerRegistrationSuccess = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#ff1253", "#7c3aed", "#ffffff"],
    });
  };

  return (
    <>
      <Navbar />
      <ParticleBackground />

      <main className="relative z-10 w-full pt-28 pb-20 min-h-screen">
        {/* ================= EVENTS PAGE HERO ================= */}
        <section className="max-w-7xl mx-auto px-6 mb-12 text-left relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-ruby/10 rounded-full blur-[100px] pointer-events-none" />
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gray-500 hover:text-ruby-glow transition-colors mb-3 group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="font-display text-4xl md:text-7xl font-black tracking-tight uppercase text-white mb-3 leading-none">
            THE <span className="text-glow text-ruby-glow">CATALOG</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Step into the arena. Filter through our 35 premium cultural, technical, and gaming events. Choose your battlefield and study the directives.
          </p>
        </section>

        {/* ================= EDITORIAL LAYOUT SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
            {/* LEFT SIDE COLUMN: Sticky Editorial Category/Day/Format Filters */}
            <aside className="lg:sticky lg:top-24 z-20 flex flex-col gap-3 bg-black/30 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/5 lg:col-span-1">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-1">
                <Filter className="h-4 w-4 text-ruby-glow" />
                <h3 className="font-display font-semibold uppercase text-xs tracking-widest text-white">
                  Categories
                </h3>
              </div>

              {/* Desktop Filters: Stacked Link Style */}
              <div className="hidden lg:flex flex-col gap-1">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`relative text-left px-4 py-2.5 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-between group ${
                        isSelected
                          ? "text-ruby-glow bg-ruby/5"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{category}</span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-all ${
                          isSelected
                            ? "opacity-100 translate-x-0 text-ruby-glow"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      />
                      {/* Side Glowing Line */}
                      {isSelected && (
                        <motion.div
                          layoutId="categoryIndicator"
                          className="absolute left-0 top-2 bottom-2 w-[3px] bg-ruby-glow rounded-r"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* DAYS FILTER (Desktop) */}
              <div className="hidden lg:flex flex-col gap-1">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mt-6 mb-2">
                  <Calendar className="h-3.5 w-3.5 text-ruby-glow" />
                  <h3 className="font-display font-semibold uppercase text-[10px] tracking-widest text-white/70">
                    Days
                  </h3>
                </div>
                {["All", "Day 1", "Day 2", "Day 3"].map((day) => {
                  const isSelected = selectedDay === day;
                  const label = day === "All" ? "All Days" : day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`relative text-left px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-between group ${
                        isSelected
                          ? "text-ruby-glow bg-ruby/5"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{label}</span>
                      {isSelected && (
                        <motion.div
                          layoutId="dayIndicator"
                          className="absolute left-0 top-2 bottom-2 w-[3px] bg-ruby-glow rounded-r"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* STAGE TYPE FILTER (Desktop) */}
              <div className="hidden lg:flex flex-col gap-1">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mt-6 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-ruby-glow" />
                  <h3 className="font-display font-semibold uppercase text-[10px] tracking-widest text-white/70">
                    Format
                  </h3>
                </div>
                {["All", "On-Stage", "Off-Stage"].map((stage) => {
                  const isSelected = selectedStage === stage;
                  const label = stage === "All" ? "All Formats" : stage;
                  return (
                    <button
                      key={stage}
                      onClick={() => setSelectedStage(stage)}
                      className={`relative text-left px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-between group ${
                        isSelected
                          ? "text-ruby-glow bg-ruby/5"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{label}</span>
                      {isSelected && (
                        <motion.div
                          layoutId="stageIndicator"
                          className="absolute left-0 top-2 bottom-2 w-[3px] bg-ruby-glow rounded-r"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile/Tablet Filters: Horizontal Scrolling Bar */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x flex-nowrap w-full">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`shrink-0 px-4 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider transition-all border snap-center ${
                        isSelected
                          ? "bg-ruby text-white border-ruby shadow-[0_0_12px_rgba(255,18,83,0.3)]"
                          : "bg-white/5 text-gray-300 border-white/5 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Mobile/Tablet Days Scrollbar */}
              <div className="lg:hidden flex flex-col gap-1.5 mt-3 border-t border-white/5 pt-3">
                <span className="text-[9px] font-display font-semibold uppercase tracking-wider text-white/50 px-1">
                  Filter by Day:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x flex-nowrap w-full">
                  {["All", "Day 1", "Day 2", "Day 3"].map((day) => {
                    const isSelected = selectedDay === day;
                    const label = day === "All" ? "All Days" : day;
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`shrink-0 px-3.5 py-1.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-wider transition-all border snap-center ${
                          isSelected
                            ? "bg-ruby text-white border-ruby shadow-[0_0_12px_rgba(255,18,83,0.3)]"
                            : "bg-white/5 text-gray-300 border-white/5 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile/Tablet Format Scrollbar */}
              <div className="lg:hidden flex flex-col gap-1.5 mt-2 border-t border-white/5 pt-3">
                <span className="text-[9px] font-display font-semibold uppercase tracking-wider text-white/50 px-1">
                  Filter by Format:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x flex-nowrap w-full">
                  {["All", "On-Stage", "Off-Stage"].map((stage) => {
                    const isSelected = selectedStage === stage;
                    const label = stage === "All" ? "All Formats" : stage;
                    return (
                      <button
                        key={stage}
                        onClick={() => setSelectedStage(stage)}
                        className={`shrink-0 px-3.5 py-1.5 rounded-full font-sans text-[9px] font-bold uppercase tracking-wider transition-all border snap-center ${
                          isSelected
                            ? "bg-ruby text-white border-ruby shadow-[0_0_12px_rgba(255,18,83,0.3)]"
                            : "bg-white/5 text-gray-300 border-white/5 hover:text-white"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* RIGHT SIDE COLUMN: Scrollable Cards Grid (Responsive 1 to 3 Columns) */}
            <div className="lg:col-span-3">
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.35, delay: idx * 0.03 }}
                      key={event.id}
                      className="group flex flex-col justify-between bg-card-bg/60 rounded-3xl overflow-hidden border border-white/5 hover:border-ruby-glow/30 hover:shadow-[0_8px_32px_rgba(255,18,83,0.1)] transition-all duration-500 h-full min-h-[380px]"
                    >
                      {/* Card Image and Top Banner */}
                      <div className="relative h-44 w-full overflow-hidden shrink-0">
                        <Image
                          src={event.banner}
                          alt={event.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-w-768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-black/30" />

                        {/* Floating Category and Format Badges */}
                        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5">
                          <span className="px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-white text-[9px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                            {event.category}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full border text-[8px] font-extrabold uppercase tracking-widest backdrop-blur-md ${
                            event.stageType === "On-Stage"
                              ? "bg-ruby/20 border-ruby-glow/30 text-ruby-glow shadow-[0_0_8px_rgba(255,18,83,0.3)]"
                              : "bg-purple-500/20 border-purple-400/30 text-purple-300"
                          }`}>
                            {event.stageType}
                          </span>
                        </div>
                      </div>

                      {/* Content Box */}
                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div>
                          <span className="text-[9px] font-display font-semibold uppercase tracking-wider text-ruby-glow mb-1 block">
                            {event.originalName}
                          </span>
                          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white mb-2 group-hover:text-ruby-glow transition-colors">
                            {event.name}
                          </h2>
                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                            {event.shortDesc}
                          </p>
                        </div>

                        {/* Bottom Metadata & Trigger Button */}
                        <div className="border-t border-white/5 pt-3">
                          <div className="flex flex-col gap-1.5 mb-4 text-[10px] text-gray-500 font-semibold">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3.5 w-3.5 text-ruby-glow shrink-0" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3.5 w-3.5 text-ruby-glow shrink-0" />
                              <span className="line-clamp-1">{event.venue}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveModalEvent(event)}
                            className="w-full py-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-ruby-glow/30 hover:bg-ruby/5 text-[10px] font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Explore Rules & Register <ChevronRight className="h-3.5 w-3.5 text-ruby-glow" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* No items match backup */}
              {filteredEvents.length === 0 && (
                <div className="py-20 text-center glass-panel rounded-3xl border border-white/5">
                  <p className="text-gray-500 text-sm uppercase tracking-wider">
                    No active events in this category yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ================= DETAIL MODAL DIALOG (FullScreen on Mobile) ================= */}
      <AnimatePresence>
        {activeModalEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalEvent(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-4 cursor-zoom-out"
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full md:h-auto md:max-w-3xl md:max-h-[85vh] overflow-y-auto bg-dark-bg border-t md:border border-ruby-glow/20 rounded-t-3xl md:rounded-3xl cursor-default scrollbar-none flex flex-col"
            >
              {/* Header Close button */}
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-ruby/30 border border-white/10 hover:border-ruby-glow text-white h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Modal Banner */}
              <div className="relative h-48 md:h-56 w-full overflow-hidden shrink-0">
                <Image
                  src={activeModalEvent.banner}
                  alt={activeModalEvent.name}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-black/30" />
                <div className="absolute bottom-4 left-6 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-ruby/20 border border-ruby-glow/30 text-ruby-glow text-[9px] font-bold uppercase tracking-wider inline-block mb-1">
                    {activeModalEvent.category} • {activeModalEvent.originalName}
                  </span>
                  <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-white text-glow leading-none">
                    {activeModalEvent.name}
                  </h2>
                </div>
              </div>

              {/* Modal Content Scroll */}
              <div className="p-6 md:p-8 bg-dark-bg/95 flex-grow overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left content block: Description & Rules */}
                  <div className="md:col-span-2 flex flex-col gap-6">
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-widest text-ruby-glow mb-2 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-ruby-glow" /> Description
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                        {activeModalEvent.longDesc}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-widest text-ruby-glow mb-3 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-ruby-glow" /> Rules & Regulations
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-400">
                        {activeModalEvent.rules.map((rule, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-ruby-glow font-bold shrink-0">{idx + 1}.</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right content block: Logistics & Coordinator */}
                  <div className="flex flex-col gap-6 md:border-l md:border-white/5 md:pl-6">
                    {/* Event Logistics Card */}
                    <div className="bg-white/3 border border-white/5 p-4 rounded-xl flex flex-col gap-3">
                      <div className="flex items-center gap-2.5 text-[10px] text-gray-300 font-semibold">
                        <Calendar className="h-4 w-4 text-ruby-glow" />
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase">Date & Time</p>
                          <p className="font-bold">{activeModalEvent.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 text-[10px] text-gray-300 font-semibold border-t border-white/5 pt-2.5">
                        <MapPin className="h-4 w-4 text-ruby-glow" />
                        <div>
                          <p className="text-[8px] text-gray-500 uppercase">Venue</p>
                          <p className="font-bold">{activeModalEvent.venue}</p>
                        </div>
                      </div>
                    </div>

                    {/* Coordinator Details */}
                    <div>
                      <h4 className="font-display text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                        Coordinator Contacts
                      </h4>
                      <div className="text-xs text-gray-400 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-ruby-glow shrink-0" />
                          <span className="font-semibold text-white">{activeModalEvent.coordinator.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-ruby-glow shrink-0" />
                          <a href={`tel:${activeModalEvent.coordinator.phone}`} className="hover:text-white transition-colors">
                            {activeModalEvent.coordinator.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-ruby-glow shrink-0" />
                          <a href={`mailto:${activeModalEvent.coordinator.email}`} className="hover:text-white transition-colors truncate max-w-[170px]">
                            {activeModalEvent.coordinator.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Glow Register button */}
                    <button
                      onClick={() => {
                        triggerRegistrationSuccess();
                        setActiveModalEvent(null);
                      }}
                      className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-ruby to-purple-600 hover:from-ruby-glow hover:to-purple-500 text-white font-display text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,18,83,0.3)] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" /> Register for Event
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
