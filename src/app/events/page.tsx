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
    detail: "Forget standard playlist filler. This event is a blind drop into uncharted territory for creators who treat audio like an open-world map. Whether you're dropping a heavy, atmospheric Metro Boomin style beat switch, warping vocals into a glitchy Spider-Man 2099 theme, or layering an aggressive, distorted bassline that hits exactly like the Prowler's siren sound effect, this is your green light to hijack the frequencies. We are skipping the generic audio loops for raw, unfiltered sonic experimentation. If your sound breaks the algorithm, ditch the manual, step up, and let the ultimate musical adventure begin.",
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
    detail: "This isn't a safe, by-the-book concert; it's the high-stakes, late-night energy of Karan Aujla vocals hitting a dark Playboi Carti rage beat, or the absolute chaos of an Anirudh-level classical melody getting completely hijacked by a heavy Travis Scott synth bassline. It's an unmapped frontier of pure sonic adventure, where aggressive Western 808s drop the rules to chart a course through traditional Eastern rhythms, and a single smooth transition can completely flip the crowd. There are no safe paths or rehearsed boundaries tonight. Listen close, feel the rhythm shift, and join the ultimate expedition into a soundscape the world hasn't discovered yet.",
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
    detail: "Welcome to an adventure where every beat has aura and every melody leaves the crowd spellbound. Inspired by the legendary artistry of Birju Maharaj and the rhythm wizardry of Ustad Zakir Hussain, this is where tradition doesn't just perform—it steals the spotlight. From graceful movements that speak louder than words to rhythms that live rent-free in your head, every act is a masterclass in culture, creativity, and pure main-character energy. Ancient art, modern chills, and a stage that refuses to be ignored. No gimmicks. Just goosebumps.",
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
    detail: "With the memorable road trips from Zindagi Na Milegi Dobara to the spontaneous fun and friendships of Yeh Jawaani Hai Deewani, this event is all about music, memories, and good vibes. Every lyric is a clue, every song unlocks a new memory, and every team races to keep the rhythm alive. One moment you're hit with nostalgia, the next you're laughing through the chaos of fierce competition, adventure in every flow. Expect surprise bangers, throwback hits, and nonstop energy—know the track, own the mic, take the W.",
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
    detail: "Pack your bags, grab your playlist, and get ready for an adventure powered by pure vibes. This is your ticket to a journey where every beat unlocks a new destination. One moment you're cruising through the galaxy with the Guardians of the Galaxy, the next you're sailing the Grand Line with the Straw Hats, or embarking on a quest worthy of a legendary fantasy saga. From Bad Bunny hits and pop bangers to rock classics that never miss, the stage becomes a map and the music becomes your guide. So gather your crew, embrace your main-character arc, and let the adventure begin, one song at a time.",
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
    detail: "Forget predictable choreography and familiar routines. This event is your invitation to step into the unknown and dance beyond the ordinary. Whether your movements flow like sailing into uncharted waters with the Straw Hats in One Piece, weave through rhythm the way Link uncovers hidden paths in Breath of the Wild or lose yourself in the beat just like in ever-shifting worlds of Spirited Away, every step becomes part of an unfolding adventure. Follow the beat into unexplored territory, uncover stories hidden within every melody, and let rhythm become your compass as you journey beyond the familiar.",
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
    detail: "When the lights cut, you're diving headfirst into a high-velocity blind drop where anything can happen. We're talking about execution so razor-sharp it hits like a legendary Michael Jackson music video set, combined with the massive stadium energy of The Weeknd's halftime shows, and the chaotic, high-octane synchronization of the IPL 2026 Final dance show. No safe counts, no holding back, just sharp shifts, high stakes, and the risk of leaving everything on the floor. Ditch the manual, take the gamble, and let the ultimate stage adventure begin.",
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
    detail: "When an entire room locks its eyes on the center, a dance battle stops being a casual performance and becomes a massive, collective spectacle. It's the intense, underground crew rivalry of a Step Up 3D battle, the raw, legendary defiance of a 'You Got Served' faceoff, and the high-stakes, crowd-pleasing improvisation of a Red Bull Dance Your Style arena. It's turning a circle of spectators into an arena of split-second improvisation, where a single clean transition can shut down the music and a flawless counter-move changes everything. Own the center, drop your best combination, and let the ultimate stage adventure begin.",
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
    detail: "Frodo had a map to Mordor. You have a screen full of errors. Embark on digital adventure where every bug is an obstacle, every algorithm is a hidden path and every solution is a step closer to the destination. Venture through tangled loops, cryptic clues, and unexpected dead ends as you navigate the vast landscape of code. Some challenges demand creativity, others demand patience, but all require the courage to keep moving forward. In this quest, writing code is only half the battle. The journey has begun. Will you conquer the code, or get lost in the maze?",
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
    detail: "Embark on a thrilling adventure where mystery, strategy, and excitement come together in a race against time! Inspired by the immersive world of Ready Player One and the treasure-hunt brilliance of The Da Vinci Code, this experience will take you through hidden clues, secret codes, and unexpected twists at every turn. Like true explorers venturing into the unknown, participants must rely on sharp thinking, teamwork, and determination to overcome challenges and uncover the final victory. Every step is a new discovery, every puzzle a new path — making this an unforgettable journey filled with suspense, adventure, and the thrill of the chase.",
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
    detail: "From charting unexplored fantasy realms to rendering neon cyberpunk frontiers that don't exist yet, digital art is a high-stakes expedition into the unknown. It's Spider-Verse level dimension-hopping, the breathless thrill of an uncharted open-world RPG, and a little chaos when you venture off the map without a backup file. It's turning a blank canvas into a portal of pure discovery, where a single brushstroke opens a wormhole and a massive composition rewrites reality itself. This is where you don't just create, you pioneer. Ready your tools, load your coordinates, plant your flag on undiscovered ground, and let the ultimate creative adventure begin.",
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
    detail: "From the crazy adventures of Indiana Jones to the cinematic genius of Christopher Nolan, cinema has always been for people bold enough to go all in on their ideas. This event is your chance to lock in and direct your own masterpiece—where every shot gives Interstellar vibes, every twist has the intensity of Mission Impossible, and every scene is an absolute mic-drop moment. This isn't just filmmaking—it's your chance to let the creative thoughts win, build entire worlds, and turn random ideas into something that feels straight out of Netflix. Because sometimes the biggest flex isn't finding the treasure—it's creating a story so peak that nobody can look away from it.",
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
    detail: "Like Peter Parker behind a camera or Clark Kent behind a notepad, journalists are superheroes hiding in plain sight. But journalism isn't just reporting the news—it's an adventure. It's following trails like Tintin on a globe-trotting investigation, uncovering secrets worthy of Gotham's finest detectives, and diving headfirst into mysteries deeper than Gravity Falls. Armed with nothing but a notebook, a camera, and your curiosity, you'll chase leads through uncharted territory, navigate twists worthy of Indiana Jones, and uncover truths hidden in plain sight. Are you ready for the journey?",
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
    detail: "Peter Parker needs his camera to pay rent. And you? You need to capture the ultimate shot of this school fest. Photography isn't just about tapping a screen. It's a high-stakes safari through unpredictable crowds and shifting lights. Think of your camera as a compass. You can chase the neon-drenched atmosphere of Blade Runner, or trek toward a raw, candid moment worthy of a National Geographic cover. Take the adventure past the obvious angles and discover a completely new perspective.",
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
    detail: "Wait... a bunch of influencers convinced millions of people that a bottle of flavored water was the coolest thing on the planet? Yep. And that's exactly why advertising is one of the greatest adventures out there. This isn't just about selling a product—it's about turning the ordinary into the unforgettable. One moment you're staring at an object thinking, \"Bro, what am I even supposed to do with this?\" and the next you're building a story, creating hype, and making people believe it's the greatest thing they've seen all day. So lock in, trust the creative chaos, and let your imagination cook because somewhere between the memes, the madness, and the marketing magic, you'll discover the secret every advertiser is chasing.",
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
    detail: "Think you've got the IQ of a detective, the strategy of a Marvel mastermind, and the patience of a Jedi? Then chess is your next adventure. Venture into a battlefield where every move shapes the story, every sacrifice unlocks a new path, and every checkmate feels like defeating the final boss. Whether you're channeling your inner Beth Harmon, or playing five moves ahead like a true grandmaster, this is your chance to outwit, outplay, and outlast. Gather your courage, trust your instincts, and embark on an adventure where the greatest weapon is your mind.",
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
    detail: "Harry had a wand. You have a paddle. Embark on an adventure where every spin is a plot twist and every rally a battle against the odds. Following the legacy of Ma Long, Fan Zhendong, and Jan-Ove Waldner, you'll face unpredictable spins, relentless attacks, and heart-racing moments that demand split-second brilliance and unwavering composure. Every rally is an adventure. \"They call it a point. We call it a story.\" A story of courage, comebacks, and opportunities seized in the blink of an eye. The table is your stage, the racket your pen, and every shot writes a new chapter.",
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
    detail: "Step into a high-energy battle where passion, teamwork, and determination take center stage! Inspired by the adventurous spirit of Around the World in Eighty Days and the breathtaking action of Pirates of the Caribbean, this event promises thrilling rallies, fearless dives, and unforgettable moments of glory. Every serve and spike brings a rush of excitement as teams push their limits and chase victory with unstoppable spirit. Why stay on the sidelines when the adventure begins with every serve and every point?",
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
    detail: "You are not ready! Think again. You are still not ready for the adventure! Percy Jackson had monsters. Nathan Drake had lost treasures. You have obstacles, surprises and absolute chaos. This isn't just a game but a journey through twists, turns, and unpredictable challenges. Run, dodge, adapt and conquer the unknown. Expect the unexpected, trust your team and keep moving, because only the boldest explorers make it to the finish.",
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
    detail: "Step into a world of excitement and adventure where every rally feels like a journey into the unknown, whether you dream of adventure like The Hunger Games or teamwork like Percy Jackson. With heart-racing action, fierce competition, and moments that keep everyone on the edge of their seats, this event is all about courage, teamwork, and chasing victory against all odds. From powerful smashes to unforgettable comebacks, every match promises energy, passion, and the spirit of adventure that turns every player into a hero of their own story. Will you rise to the challenge and make every point part of your adventure?",
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
    detail: "From charting unexplored fantasy realms to rendering neon cyberpunk frontiers that don't exist yet, digital art is a high-stakes expedition into the unknown. It's Spider-Verse level dimension-hopping, the breathless thrill of an uncharted open-world RPG, and a little chaos when you venture off the map without a backup file. It's turning a blank canvas into a portal of pure discovery, where a single brushstroke opens a wormhole and a massive composition rewrites reality itself. This is where you don't just create, you pioneer. Ready your tools, load your coordinates, plant your flag on undiscovered ground, and let the ultimate creative adventure begin.",
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
    detail: "Inspired by the zero-waste vision of Wall-E and the rugged resourcefulness of Mad Max, this adventure challenges you to look at a pile of discarded junk and see a high-end runway collection. This isn't just upcycling, it's your chance to play the role of Greta Thunberg and Picasso simultaneously, turning plastic bottles, weathered newspapers, and forgotten fabrics into sleek, avant-garde design statements. The clock is ticking, raw materials are your only currency, and the ultimate flex isn't buying the future, it's inventing it out of what the world left behind. Grab your toolkit, brave the elements of design, and embark on the ultimate upcycling safari.",
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
    detail: "From the mind-bending creativity of Picasso to the cartoon chaos of Walt Disney, every legendary artwork started with someone looking at a blank space and thinking, \"Yeah, I can definitely do something cool with this.\" And that's exactly what this event is all about. One moment you're drawing a simple idea, and the next you're fighting your own creative boss battle, trying to figure out whether you've made a masterpiece or accidentally started a whole new art style. So grab your markers, paints, and spray cans, trust the chaos, and let your imagination carry the map. Because here adventures are not found- they are created.",
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
    detail: "Forget the dusty stanzas and rigid rhyme schemes of the past. Your words aren't meant to sit quietly on a page, they are meant to seize the day, 'Carpe Diem' as John Keating said. This is your 3 a.m. notes app breakthroughs thrown into a high stakes, high reward quest for glory. Wednesday did put it right, \"It's no wonder Edgar Allan Poe became a drug-addled madman.\", not only because he went to Nevermore, but because he was trying to write a masterpiece that would shake Shakespeare himself. Now it's your turn. Follow the trail of imagination, venture beyond the ordinary, and see where the words lead.",
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
    detail: "The Doctor had a TARDIS. You have just sixty seconds. That's all you get. In this adventure against the clock, hesitation is your greatest enemy and confidence is your strongest ally. Sounds easier than getting through a single Instagram reel, but the moment you step up to the mic, your brain goes full Seong Gi-Hun. Speak fast, and think faster - a microsecond of silence and you're eliminated faster than a player tripping in 'Red Light, Green Light'. Lock in, channel your inner Max Verstappen, and prove that you can conquer the clock under sixty seconds of pure, fast-paced adrenaline.",
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
    detail: "Did you know the famous \"I am Iron Man\" line in Iron Man was completely improvised? Robert Downey Jr. threw out the script, stepped into the unknown, and changed the entire Marvel Cinematic Universe forever. This isn't a casual stroll, it's a high-stakes competition. It's an expedition into uncharted comedic territory where there is no safety net. Be spontaneous. Seize the moment. Treat the stage like your own personal adventure, where your sharpest wit is your only compass. Leave your audience on the edge of their seats, or make them fall off in laughter. Will you find the perfect line, the perfect joke to survive the adventure, or will you crumble under the fierce spotlight?",
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
    detail: "From the absolute chaos of Hera Pheri to the mind-bending madness of Bhool Bhulaiyaa, this event is a full-on rollercoaster of creativity, quick thinking, and pure adventure. Words are off the table, so every gesture, expression, and move has to do the talking. One wrong signal can send your team into confusion, while one brilliant act can change the game in seconds. No dialogues. No second chances. Just vibes, instincts, and the clock ticking.",
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
    detail: "From mimicking Charlie Chaplin turning moments into pure comical chaos to solving rubix cubes in seconds, GI60 is all about stepping out of the ordinary and making sixty seconds feel unforgettable. Every performance feels like jumping into a new quest where anything can happen before the timer hits zero. This is where one minute turns into a wild energy where spontaneity takes over and every second feels like a new twist waiting to happen.",
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
    detail: "The Turncoat Debate, just as Harvey Specter takes control with his undeniably commanding presence and Mike Ross manages to win even the toughest situations, is an exercise of tactics, rhetoric, and surprises. The speakers clash like Louis Litt defends his dignity, and each statement carries the weight of a Jessica Pearson negotiating a contract. Being lost in foreign territory, the debaters should keep their wits about them with each adventure because only those who have quick retorts and winning big moments make the W.",
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
    detail: "This isn't a predictable script; it's the absolute tension of a cold Cillian Murphy style split-screen faceoff, the room-silencing suspense of a Kanye Runaway piano intro, and the pure, desperate panic of a high-stakes Project Hail Mary survival scenario where the lines go out the window and you have to improvise to stay alive. It's a ruthless arena where alliances shatter in seconds, and a single whisper completely resets the room's aura. Lock in, back your squad up, and let's turn this stage into our own playground. Toss out the script entirely, dive headfirst into the unknown, and let's turn this moment into our ultimate, unchartered cinematic adventure.",
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
    detail: "Remy from Ratatouille proved that anyone can cook, but only a true adventurer can create a masterpiece with no flame to guide the way. Think of this as MasterChef meets Man vs. Wild, a culinary expedition where raw ingredients are your resources, creativity is your compass and time is your greatest challenge. Whether you are chasing for the meticulous perfection of The Bear or crafting a bold fusion that breaks every rule in the cookbook, every dish is a step into the unknown. The kitchen is your uncharted territory where imagination reigns supreme and ordinary ingredients becomes extraordinary discoveries. So trust your instincts, embrace the adventure and serve up a creation worthy of legend.",
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
    detail: "Each grid presents its own unique and challenging task that requires concentration and determination on your part to overcome it. Built with the calm intensity of Magnus Carlsen when he plays chess and strategy calls are made for Formula One races, it is an adventure that entails the use of reason, perseverance, and wit. Each number holds a clue and takes you one step nearer to solving the next. What starts out as a puzzle quickly turns into an adventurous journey into reasoning and strategy.",
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
    detail: "This isn't a boring classroom test; it's the elite, lightning-fast trivia clashing of a Jeopardy! Mastermind showdown, the chaotic, brilliant plot twists of a Brooklyn Nine-Nine Halloween Heist, and the intense, pulse-pounding strategy of a Squid Game tactical choice. It's a battlefield of instant decisions where a single clutch buzz can completely flip the leaderboard upside down. No safe passes, no holding back, just raw intellect, sharp instinct, and the thrill of outsmarting the room. Ditch the manual, trust your gut, and let the ultimate strategic adventure begin.",
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
    detail: "Ready to turn letters into legends? Scrabble is the ultimate word quest, where every tile is a clue, every bonus square is buried treasure, and every move can change the game. Whether you're spelling like Hermione, deducing like Sherlock, hunting the One Piece with the Straw Hats, or pulling off a comeback worthy of Avengers: Endgame, victory is just one word away. Gather your crew, trust your instincts, and set off on an adventure where strategy, creativity, and a little luck can turn the right word into glory.",
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
    detail: "What starts as a simple equation quickly turns into an adventure where numbers fly faster than race cars and every second feels like a boss battle. Think the high-stakes tension of an F1 final lap, the genius-level problem solving of Tony Stark, and the relentless pace of a speedrun where there's no pause button. Every answer unlocks a new path, every mistake becomes a detour, and the clock keeps getting louder. This is not just a test of calculation—it's a race between your brain and time itself. Think fast. Stay cool. Beat the clock.",
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
    detail: "You studied all night for the wrong exam. Welcome to Pointless, the only adventure where being too smart can get you eliminated. Think of Indiana Jones bypassing the flashy, gold-plated chalice to choose the humble Holy Grail. Forget the obvious, abandon the safe route and venture into uncharted territory where the weirdest answers are often the best ones. This isn't about knowing more. It's about thinking differently because sometimes, the greatest discoveries are the ones nobody else thought of.",
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
  const [isMobile, setIsMobile] = useState(false);

  // Load registration state and URL search params on mount
  useEffect(() => {
    const saved = localStorage.getItem("boscofest_registered_events");
    if (saved) {
      try {
        setRegisteredEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load registrations", e);
      }
    }

    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) {
        const matched = CATEGORIES.find(c => c.name.toLowerCase() === cat.toLowerCase() || (cat.toLowerCase() === "digital" && c.name.toLowerCase() === "cybernetics"));
        if (matched) {
          setSelectedCategory(matched.name);
        }
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
    <div className="min-h-screen bg-rest-texture relative flex flex-col pb-0">
      
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-20 flex flex-col">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bebas tracking-wider text-gold-accent hover:text-white transition-colors mb-6 max-w-max"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Adventure Map</span>
        </Link>

        {/* Page Title Header */}
        <div className="text-center mb-10">
          <span className="font-sans font-extrabold text-[12px] tracking-[0.2em] text-map-green uppercase block mb-1.5">
            Territories and Logbook
          </span>
          <h1 className="font-bebas font-black text-4xl md:text-5xl text-parchment-light uppercase tracking-wide">
            KNOWN TERRITORIES
          </h1>
          <p className="font-sans font-bold text-[12px] tracking-[0.1em] text-[#ebdcb9] mt-2.5 max-w-lg mx-auto leading-relaxed uppercase">
            Select your expedition route, inspect the challenges, and sign the charters.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full mb-5 relative">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="h-4 w-4" style={{ color: "#F4ECC8" }} />
          </div>
          <input
            type="text"
            placeholder="SEARCH TERRITORY / KEYWORD..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-3 text-[11px] font-bold uppercase tracking-wider focus:outline-none transition-all placeholder:text-[#F4ECC8]/50"
            style={{
              background: "#2B1A0E",
              border: "2px solid #A37F3E", // Gold accent border
              borderRadius: 4,
              boxShadow: "3px 3px 0px rgba(43,26,14,0.8)",
              color: "#F4ECC8",
            }}
          />
        </div>

        {/* Expedition Filters Panel — dark leather bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 16 }}
          className="w-full mb-4 flex flex-col md:flex-row gap-0 overflow-hidden"
          style={{
            background: "#1E1208",
            border: "2px solid #2B1A0E",
            borderRadius: 6,
            boxShadow: "4px 4px 0px rgba(43,26,14,0.9)",
          }}
        >
          {/* Day Filter */}
          <div className="flex-1 flex flex-col gap-2 p-4" style={{ borderRight: "1px solid rgba(235,220,185,0.1)" }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-1.5" style={{ color: "rgba(235,220,185,0.85)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#65C466]" />
              Expedition Day
            </span>
            <div className="flex gap-2">
              {(["All Days", "Day 1", "Day 2"] as const).map((day) => {
                const isSel = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className="flex-1 py-2 font-bebas text-[11px] tracking-wider uppercase cursor-pointer transition-all"
                    style={{
                      background: isSel ? "#37532A" : "rgba(235,220,185,0.07)",
                      color: isSel ? "#ffffff" : "rgba(235,220,185,0.7)",
                      border: `1.5px solid ${isSel ? "#2B1A0E" : "rgba(235,220,185,0.15)"}`,
                      borderRadius: 3,
                      boxShadow: isSel ? "2px 2px 0 rgba(0,0,0,0.5)" : "none",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage Filter */}
          <div className="flex-1 flex flex-col gap-2 p-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-1.5" style={{ color: "rgba(235,220,185,0.85)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6EC6FF]" />
              Event Venue (Stage)
            </span>
            <div className="flex gap-2">
              {(["All Stages", "On-stage", "Off-stage"] as const).map((stg) => {
                const isSel = selectedStage === stg;
                return (
                  <button
                    key={stg}
                    onClick={() => setSelectedStage(stg)}
                    className="flex-1 py-2 font-bebas text-[11px] tracking-wider uppercase cursor-pointer transition-all"
                    style={{
                      background: isSel ? "#3B5E8C" : "rgba(235,220,185,0.07)",
                      color: isSel ? "#ffffff" : "rgba(235,220,185,0.7)",
                      border: `1.5px solid ${isSel ? "#2B1A0E" : "rgba(235,220,185,0.15)"}`,
                      borderRadius: 3,
                      boxShadow: isSel ? "2px 2px 0 rgba(0,0,0,0.5)" : "none",
                    }}
                  >
                    {stg}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Category Strip — flat tabbed buttons */}
        <div
          className="w-full mb-8 overflow-x-auto scrollbar-none"
          style={{
            background: "#2B1A0E",
            border: "2px solid #1E1208",
            borderRadius: 6,
            boxShadow: "4px 4px 0px rgba(43,26,14,0.9)",
          }}
        >
          <div className="flex min-w-max">
            {CATEGORIES.filter(c => c.name !== "All Territories").map((cat, idx) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(isSelected ? "All Territories" : cat.name)}
                  className="flex items-center gap-2 px-5 py-3 font-sans font-extrabold text-[12px] tracking-[0.08em] uppercase cursor-pointer transition-all shrink-0"
                  style={{
                    background: isSelected ? "rgba(235,220,185,0.12)" : "transparent",
                    color: isSelected ? "#F4ECC8" : "rgba(235,220,185,0.8)",
                    borderRight: idx < CATEGORIES.length - 2 ? "1px solid rgba(235,220,185,0.08)" : "none",
                    borderBottom: isSelected ? "2px solid #A37F3E" : "2px solid transparent",
                  }}
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid of Events */}
        {filteredEvents.length > 0 ? (
          <motion.div layout={!isMobile} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <AnimatePresence mode={isMobile ? "wait" : "popLayout"}>
              {filteredEvents.map((evt) => {
                const isRegistered = registeredEvents.includes(evt.id);
                const diffBg   = evt.difficulty === "Legendary" ? "#A37F3E" : evt.difficulty === "Veteran" ? "#3B5E8C" : "#37532A";
                const diffText = "#F4ECC8";
                return (
                  <motion.div
                    key={evt.id}
                    layout={!isMobile}
                    initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                    whileHover={isMobile ? {} : { y: -2 }}
                    transition={isMobile ? { duration: 0.15 } : { type: "spring", stiffness: 200, damping: 22 }}
                    onClick={() => setActiveEvent(evt)}
                    className="parchment-card group relative flex flex-col overflow-hidden cursor-pointer"
                  >
                    {/* Card body — sits above grain ::before overlay */}
                    <div className="relative z-10 p-5 flex flex-col gap-3 flex-1">

                      {/* Row 1: icon box + difficulty badge */}
                      <div className="flex items-start justify-between">
                        {/* Green icon box */}
                        <div
                          className="flex items-center justify-center text-xl"
                          style={{
                            width: 44,
                            height: 44,
                            background: "#37532A",
                            border: "2px solid #2B1A0E",
                            borderRadius: 6,
                            boxShadow: "2px 2px 0 rgba(43,26,14,0.8)",
                            flexShrink: 0,
                          }}
                        >
                          {evt.icon}
                        </div>

                        {/* Difficulty badge */}
                        <span
                          className="font-bebas text-[12px] tracking-[0.12em] uppercase px-3.5 py-1"
                          style={{
                            background: diffBg,
                            color: diffText,
                            border: "1.5px solid #2B1A0E",
                            borderRadius: 3,
                            boxShadow: "2px 2px 0 rgba(43,26,14,0.7)",
                            letterSpacing: "0.12em",
                          }}
                        >
                          {evt.difficulty}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="mt-1">
                        <h3
                          className="font-bebas uppercase leading-tight"
                          style={{ fontSize: 22, color: "#1A0E05", letterSpacing: "0.04em" }}
                        >
                          {evt.name}
                        </h3>
                        <span
                          className="font-sans font-extrabold uppercase tracking-[0.12em]"
                          style={{ fontSize: 11, color: "#2B1A0E" }}
                        >
                          {evt.category}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="font-sans font-semibold leading-relaxed line-clamp-3"
                        style={{ fontSize: 13.5, color: "#2B1A0E" }}
                      >
                        {evt.shortDesc}
                      </p>

                      {/* Metadata row */}
                      <div className="flex items-center gap-3 flex-wrap mt-auto pt-2" style={{ borderTop: "1px solid rgba(43,26,14,0.18)" }}>
                        <span className="flex items-center gap-1.5 font-sans" style={{ fontSize: 11, color: "#2B1A0E", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          <Users className="h-3.5 w-3.5" style={{ color: "#2B1A0E" }} />
                          {evt.teamSize}
                        </span>
                        <span style={{ color: "rgba(43,26,14,0.45)", fontSize: 12 }}>•</span>
                        <span className="flex items-center gap-1.5 font-sans" style={{ fontSize: 11, color: "#2B1A0E", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          <MapPin className="h-3.5 w-3.5" style={{ color: "#2B1A0E" }} />
                          {evt.location}
                        </span>
                        <span style={{ color: "rgba(43,26,14,0.45)", fontSize: 12 }}>•</span>
                        {/* Day pill */}
                        <span
                          className="font-bebas tracking-widest uppercase"
                          style={{
                            fontSize: 11,
                            padding: "3px 9px",
                            background: "#37532A",
                            color: "#ffffff",
                            borderRadius: 3,
                            border: "1px solid #2B1A0E",
                          }}
                        >
                          {evt.day}
                        </span>
                        {/* Stage pill */}
                        <span
                          className="font-bebas tracking-widest uppercase"
                          style={{
                            fontSize: 11,
                            padding: "3px 9px",
                            background: "#3B5E8C",
                            color: "#ffffff",
                            borderRadius: 3,
                            border: "1px solid #2B1A0E",
                          }}
                        >
                          {evt.stage}
                        </span>
                      </div>
                    </div>

                    {/* Full-width footer CTA */}
                    <button
                      onClick={(e) => handleRegister(evt.id, e)}
                      className="relative z-10 w-full flex items-center justify-center gap-2 font-bebas uppercase tracking-[0.15em] cursor-pointer transition-all"
                      style={{
                        fontSize: 13,
                        padding: "13px 0",
                        background: isRegistered ? "#1E3A1A" : "#2B3D1C",
                        color: "#F4ECC8",
                        borderTop: "2px solid #2B1A0E",
                      }}
                    >
                      <span>{isRegistered ? "Charter Signed" : "Charter Signed"}</span>
                      <span style={{ fontSize: 16 }}>📜</span>
                    </button>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty state */
          <div className="w-full py-16 px-6 text-center flex flex-col items-center gap-3 mt-4"
            style={{ border: "2px dashed rgba(43,26,14,0.2)", borderRadius: 8, background: "rgba(244,236,200,0.08)" }}
          >
            <Compass className="h-8 w-8 opacity-30" style={{ color: "#5C4331", animationDuration: "12s" }} />
            <h3 className="font-bebas text-sm uppercase tracking-wider" style={{ color: "#2B1A0E" }}>
              Unexplored Grid Coordinates
            </h3>
            <p className="text-xs font-semibold leading-relaxed max-w-xs" style={{ color: "#5C4331" }}>
              No expeditions match your parameters. Adjust your search or choose another territory.
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Content Drawer Box */}
            <motion.div 
              initial={{ y: "100%", opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 24, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#ebdcb9] bg-radial-[rgba(43,26,14,0.03)_1px,transparent_0] bg-[size:8px_8px] rounded-t-3xl sm:rounded-2xl border-t-2 border-x-2 sm:border-2 border-ink-dark px-6 pt-5 pb-8 shadow-[0_-8px_30px_rgba(43,26,14,0.3)] sm:shadow-[6px_6px_0px_rgba(43,26,14,1)] z-10 overflow-y-auto max-h-[85vh] sm:max-h-[80vh]"
            >
              {/* Handlebar drag indicator for mobile */}
              <div className="w-12 h-1 bg-ink-dark/15 rounded-full mx-auto mb-5 sm:hidden" />

              {/* Close Button */}
              <button 
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 h-11 w-11 flex items-center justify-center text-ink-dark hover:text-gold-accent transition-colors"
                aria-label="Close quest details"
              >
                <X className="h-5.5 w-5.5" />
              </button>

              {/* Header title */}
              <div className="flex items-center gap-3.5 mt-2">
                <span className="text-3xl">{activeEvent.icon}</span>
                <div>
                  <h2 className="font-bebas text-xl text-ink-dark uppercase tracking-wide">
                    {activeEvent.name}
                  </h2>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-ink-dark/30 rounded-full text-ink-dark inline-block mt-1">
                    {activeEvent.category}
                  </span>
                </div>
              </div>

              <hr className="border-ink-dark/15 my-4" />

              {/* Quest Specs */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-parchment-light/40 border border-ink-dark/15 rounded-xl flex items-center gap-2.5">
                  <Users className="h-4.5 w-4.5 text-forest-green shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase text-ink-dark/70 tracking-wider">Party Size</span>
                    <span className="text-[12px] font-extrabold text-ink-dark uppercase tracking-wide mt-0.5">{activeEvent.teamSize}</span>
                  </div>
                </div>
                <div className="p-3 bg-parchment-light/40 border border-ink-dark/15 rounded-xl flex items-center gap-2.5">
                  <Calendar className="h-4.5 w-4.5 text-gold-accent shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase text-ink-dark/70 tracking-wider">Schedule</span>
                    <span className="text-[12px] font-extrabold text-ink-dark uppercase tracking-wide mt-0.5">{activeEvent.time}</span>
                  </div>
                </div>
                {/* Day Spec */}
                <div className="p-3 bg-forest-green/10 border border-forest-green/20 rounded-xl flex items-center gap-2.5">
                  <span className="text-base">📅</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase text-forest-green tracking-wider">Festival Day</span>
                    <span className="text-[12px] font-extrabold text-ink-dark uppercase tracking-wide mt-0.5">{activeEvent.day}</span>
                  </div>
                </div>
                {/* Stage Spec */}
                <div className="p-3 bg-sky-blue/10 border border-[#2181C4]/20 rounded-xl flex items-center gap-2.5">
                  <span className="text-base">🎭</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase text-[#2181C4] tracking-wider">Event Venue</span>
                    <span className="text-[12px] font-extrabold text-ink-dark uppercase tracking-wide mt-0.5">{activeEvent.stage}</span>
                  </div>
                </div>
                <div className="p-3 bg-parchment-light/40 border border-ink-dark/15 rounded-xl flex items-center gap-2.5 col-span-2">
                  <MapPin className="h-4.5 w-4.5 text-[#E53E3E] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase text-ink-dark/70 tracking-wider">Coordinates Location</span>
                    <span className="text-[12px] font-extrabold text-ink-dark uppercase tracking-wide mt-0.5">{activeEvent.location}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-ink-dark mb-1.5 flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-gold-accent" />
                  <span>Expedition Overview</span>
                </h4>
                <p className="text-sm text-ink-dark font-medium leading-relaxed">
                  {activeEvent.detail}
                </p>
              </div>

              {/* Rules List */}
              <div className="mb-6">
                <h4 className="text-[12px] font-bold uppercase tracking-wider text-ink-dark mb-2 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-forest-green" />
                  <span>Rules of Engagement</span>
                </h4>
                <ul className="space-y-1.5 pl-4 list-disc text-xs text-ink-dark font-medium leading-relaxed">
                  {activeEvent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Prize Bounty */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl border-2 border-ink-dark bg-[#D9B24C]/10 mb-6">
                <Trophy className="h-5.5 w-5.5 text-gold-accent shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[7.5px] font-black uppercase text-ink-light tracking-wider">Discovered Bounty</span>
                  <span className="text-xs font-black text-ink-dark uppercase tracking-wide mt-0.5">{activeEvent.bounty}</span>
                </div>
              </div>

              {/* Primary Action Button (Sign Charter) */}
              <button
                onClick={(e) => {
                  handleRegister(activeEvent.id, e);
                }}
                className={`w-full py-3.5 flex items-center justify-center gap-2 font-bebas text-sm tracking-wider uppercase border-2 border-ink-dark transition-all cursor-pointer bg-forest-green text-white shadow-[3px_3px_0px_rgba(43,26,14,1)] active:translate-y-[1px] active:translate-x-[1px] active:shadow-[2px_2px_0px_rgba(43,26,14,1)]`}
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
