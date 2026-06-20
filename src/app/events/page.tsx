"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  X, 
  Calendar, 
  Users, 
  Search, 
  BookOpen, 
  Compass
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";

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
    name: "Bosco Remix",
    category: "Music",
    shortDesc: "Produce percussion, beats, and melodies using everyday tools and objects.",
    detail: "Forget standard playlist filler. This event is a blind drop into uncharted territory for creators who treat audio like an open-world map. Whether you are dropping a heavy, atmospheric Metro Boomin style beat switch, warping vocals into a glitchy Spider-Man 2099 theme, or layering an aggressive, distorted bassline that hits exactly like the Prowler's siren sound effect, this is your green light to hijack the frequencies. We are skipping the generic audio loops for raw, unfiltered sonic experimentation. If your sound breaks the algorithm, ditch the manual, step up, and let the ultimate musical adventure begin.",
    icon: "🎵",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "7 Performers",
    time: "Day 1, 10:00 AM",
    location: "Acoustic Courtyard",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Custom Medals",
    rules: [
      "Participants must bring their own unconventional instruments.",
      "Traditional instruments like guitars, pianos, drums, etc. must not be used. Drum sticks cannot be used.",
      "Beatboxing is allowed but singing is not allowed.",
      "Time for stage and instrument setup is maximum 1 minute. Performance time: 4+1 minutes.",
      "Use of electronic gadgets is strictly prohibited.",
      "All requirements (tables, chairs, microphones) should be emailed to home.boscofest@gmail.com by 3rd July, 2026.",
      "All contestants must adhere strictly to the rules, failing which they may be disqualified."
    ]
  },
  {
    id: "fusion-music",
    name: "Bosco Jukebox",
    category: "Music",
    shortDesc: "Merge Eastern traditional patterns with modern Western melodies.",
    detail: "This is not a safe, by-the-book concert; it is the high-stakes, late-night energy of Karan Aujla vocals hitting a dark Playboi Carti rage beat, or the absolute chaos of an Anirudh-level classical melody getting completely hijacked by a heavy Travis Scott synth bassline. It is an unmapped frontier of pure sonic adventure, where aggressive Western 808s drop the rules to chart a course through traditional Eastern rhythms, and a single smooth transition can completely flip the crowd. There are no safe paths or rehearsed boundaries tonight. Listen close, feel the rhythm shift, and join the ultimate expedition into a soundscape the world has not discovered yet.",
    icon: "🎸",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "8 + 3 Musicians",
    time: "Day 2, 2:30 PM",
    location: "Main Open-Air Stage",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹15,000 + Band Trophy",
    rules: [
      "Duration: 6+2 minutes (including setup). Must perform a fusion of at least one Eastern and one Western song.",
      "Vocals and instruments given equal weightage. At least 2 Eastern and 2 Western instruments must be used.",
      "Only one drum kit provided by host school. All other instruments brought by participants.",
      "Pre-recorded and pre-programmed music not allowed. Laptops permitted for VST tones only.",
      "Addition and alteration of original lyrics is not allowed. The whole song or a part may be used.",
      "Song list with lyrics must be emailed to home.boscofest@gmail.com by 3rd July, 2026.",
      "Usage of objectionable, obscene, or derogatory lyrics leads to immediate disqualification.",
      "Depiction of the theme in the performance would be appreciated."
    ]
  },
  {
    id: "eastern-music",
    name: "Bosco Raag",
    category: "Music",
    shortDesc: "A solo classical vocal challenge showcasing traditional ragas.",
    detail: "Welcome to an adventure where every beat has aura and every melody leaves the crowd spellbound. Inspired by the legendary artistry of Birju Maharaj and the rhythm wizardry of Ustad Zakir Hussain, this is where tradition does not just perform—it steals the spotlight. From graceful movements that speak louder than words to rhythms that live rent-free in your head, every act is a masterclass in culture, creativity, and pure main-character energy. Ancient art, modern chills, and a stage that refuses to be ignored. No gimmicks. Just goosebumps.",
    icon: "🎤",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "6 + 4 Musicians",
    time: "Day 1, 11:30 AM",
    location: "Senate Hall",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + Vocalist Scroll",
    rules: [
      "Duration: 12+3 minutes (including setup). Three categories: Rabindra Sangeet Solo (~3 min), Instrumentals Solo (~4 min), Group Song (~5 min).",
      "Group Song: Regional folk song medley or 'gana sangeet' medley. Minimum 4, maximum 6 vocalists.",
      "Only Indian classical instruments allowed for accompaniment (except violin and keyboard).",
      "Maximum 4 musicians. Tabla player may be a professional (not from the school).",
      "Instrumental Solo: Only Eastern (Indian) instruments. No pre-recorded music except electronic tanpura.",
      "Dress code must be absolutely Eastern (or as per the region being portrayed).",
      "The host school will not provide any instruments. Strictly adhere to the 12+3 minute time limit."
    ]
  },
  {
    id: "antakshari",
    name: "Bosco Sur Sangam",
    category: "Music",
    shortDesc: "The legendary team-based singing and song recall duel.",
    detail: "With the unforgettable soundtrack moments of Guardians of the Galaxy to the musical energy and friendships of Pitch Perfect, this event is all about music, memories, and good vibes. Every lyric is a clue, every song unlocks a new memory, and every team races to keep the rhythm alive. One moment you are hit with nostalgia; the next, you are laughing through the chaos of fierce competition and adventure in every flow. Expect surprise bangers, throwback hits, and nonstop energy—know the track, own the mic, take the Win.",
    icon: "🎼",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "3 + 1 Reserve",
    time: "Day 1, 4:00 PM",
    location: "Assembly Grounds",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Singing Crowns",
    rules: [
      "Duration: 120 minutes. Only Hindi songs allowed.",
      "Singing songs containing vulgar lyrics will lead to disqualification.",
      "Elimination round consisting of three rounds; top 8 teams advance to the next level.",
      "After elimination rounds, participants can interchange with reserve participant once (with organiser permission).",
      "Questions based on Hindi movies and audio/visual clips. Some rounds have negative markings; bonus rounds included.",
      "There will be a retro round from the 1960s onwards.",
      "The game master's decision will be final and binding."
    ]
  },
  {
    id: "western-music",
    name: "Bosco Beat",
    category: "Music",
    shortDesc: "A battle of voices and verses. Where lyrics hit harder.",
    detail: "Pack your bags, grab your playlist, and get ready for an adventure powered by pure vibes. This is your ticket to a journey where every beat unlocks a new destination. One moment you are cruising through the galaxy with the Guardians of the Galaxy, the next you are sailing the Grand Line with the Straw Hats, or embarking on a quest worthy of a legendary fantasy saga. From Bad Bunny hits and pop bangers to rock classics that never miss, the stage becomes a map and the music becomes your guide. So gather your crew, embrace your main-character arc, and let the adventure begin, one song at a time.",
    icon: "🎙️",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "6 + 4 Performers",
    time: "Day 1, 12:00 PM",
    location: "Acoustic Courtyard",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹7,000 + Gold Microphone Pin",
    rules: [
      "Duration: 10+3 minutes (including setup). Three categories: Vocals Solo (3 min), Group Song (5 min), Group Instrumentals (2 min).",
      "All participants must be in school uniform. Songs with objectionable lyrics not allowed.",
      "Pre-recorded music not allowed (including synthesizer accompaniments). Laptops for VST tones only.",
      "Maximum 7 musicians allowed. Group song needs more than one vocalist and minimum 3 instruments.",
      "Only drum kit provided by host school. Guitar processors, keyboard stands, etc. brought by participants.",
      "Solo Singing must be accompanied by a live musician or band. No karaoke tracks.",
      "Timing starts when first item begins. Bell at 9th minute; stop at 10th minute. Overshooting leads to downmarking.",
      "Instrument list and singer count must be emailed to home.boscofest@gmail.com by 3rd July, 2026."
    ]
  },

  // ─── DANCE ───
  {
    id: "eastern-dance",
    name: "Bosco Nritya",
    category: "Dance",
    shortDesc: "Classical and semi-classical Indian dance storytelling.",
    detail: "Forget predictable choreography and familiar routines. This event is your invitation to step into the unknown and dance beyond the ordinary. Whether your movements flow like sailing into uncharted waters with the Straw Hats in One Piece, weave through rhythm the way Link uncovers hidden paths in Breath of the Wild or lose yourself in the beat just like in ever-shifting worlds of Spirited Away, every step becomes part of an unfolding adventure. Follow the beat into unexplored territory, uncover stories hidden within every melody, and let rhythm become your compass as you journey beyond the familiar.",
    icon: "💃",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "7 + 3 Dancers",
    time: "Day 1, 1:00 PM",
    location: "Main Auditorium",
    day: "Day 1",
    stage: "On-stage",
    bounty: "₹8,000 + Temple Dance Plaque",
    rules: [
      "Duration: 10 minutes (empty stage to empty stage). Minimum 4 participants on stage throughout.",
      "Performance must include at least one Eastern dance form (Bharatnatyam, Kathak, Semi-Classical, Odissi, etc.).",
      "The entire performance must be ethnic in nature (costumes and music included).",
      "Film songs (only instrumentals) are allowed, only if appropriate.",
      "Vulgarity of any sort will lead to immediate disqualification.",
      "Music must be emailed to home.boscofest@gmail.com by 4th July, 2026.",
      "Songs must also be submitted in a pen drive at the registration desk on fest day."
    ]
  },
  {
    id: "western-dance",
    name: "Bosco Tango",
    category: "Dance",
    shortDesc: "High energy, choreographed Western street and contemporary dance.",
    detail: "When the lights cut, you are diving headfirst into a high-velocity blind drop where anything can happen. The execution has to be so razor-sharp that it feels like stepping into a legendary Michael Jackson music video set, combined with the massive stadium energy of The Weeknd's halftime shows and the chaotic, high-octane synchronization of the IPL 2026 Final dance show. No safe counts, no holding back, just sharp shifts, high stakes, and the risk of leaving everything on the floor. Ditch the manual, take the gamble, and let the ultimate stage adventure begin.",
    icon: "🕺",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "7 + 5 Dancers",
    time: "Day 2, 3:00 PM",
    location: "Main Auditorium",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹18,000 + Dance Championship Ledge",
    rules: [
      "Duration: 5+2 minutes. Minimum 5 participants on stage at all times.",
      "Points will be deducted for exceeding the prescribed time limit.",
      "Any form of vulgarity, inappropriateness, or suggestive movements will lead to disqualification.",
      "Dance track must be emailed to home.boscofest@gmail.com by 4th July, 2026.",
      "Songs must be submitted in a pen drive at the registration desk on fest day.",
      "Each participating school must bring their own props.",
      "Any inappropriate dress will lead to the cancellation of the performance.",
      "The decision of the judges will be final and binding."
    ]
  },
  {
    id: "dance-faceoff",
    name: "Bosco Overdrive",
    category: "Dance",
    shortDesc: "Own the floor. No rules. Just moves that speak.",
    detail: "When an entire room locks its eyes on the center, a dance battle stops being a casual performance and becomes a massive, collective spectacle. It is the intense, underground crew rivalry of a Step Up 3D battle, the raw, legendary defiance of a 'You Got Served' faceoff, and the high-stakes, crowd-pleasing improvisation of a world-class dance arena. It is turning a circle of spectators into an arena of split-second improvisation, where a single clean transition can shut down the music and a flawless counter-move changes everything. Own the center, drop your best combination, and let the ultimate stage adventure begin.",
    icon: "🔥",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Dancers",
    time: "Day 2, 3:30 PM",
    location: "Open Arena",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹10,000 + Champion Belt",
    rules: [
      "All forms of dance are allowed. Participants dance one by one; opponents do not dance at the same time.",
      "Event begins with a cipher where each team showcases skills for selection. Top 8 teams advance.",
      "Each matchup consists of 2 rounds where both participants must exhibit their skills.",
      "Commandos (synchronized dancing together) are allowed but must not exceed 30 seconds.",
      "Participants must be prepared to dance to any of 20 preset songs (sent on 5th July, 2026).",
      "Any obscenity, suggestive movements, insults or vulgarity leads to immediate disqualification.",
      "The judges' decision is final and binding."
    ]
  },

  // ─── CYBERNETICS ───
  {
    id: "coding-debugging",
    name: "Bosco Byte-Blitz",
    category: "Cybernetics",
    shortDesc: "Level up your skills in the ultimate gaming showdown.",
    detail: "Frodo had a map to Mordor. You have a screen full of errors. Embark on a digital adventure where every bug is an obstacle, every algorithm is a hidden path and every solution is a step closer to the destination. Venture through tangled loops, cryptic clues, and unexpected dead ends as you navigate the vast landscape of code. Some challenges demand creativity, others demand patience, but all require the courage to keep moving forward. In this quest, writing a code is only half the battle. The journey has begun. Will you conquer the code, or get lost in the maze?",
    icon: "💻",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Players",
    time: "Day 2, 9:30 AM",
    location: "Gaming Zone",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹12,000 + Hacker Kit Bags",
    rules: [
      "Round 1 (30+5 min): Solve a coding challenge in Python or Java. 5 minutes brainstorming, then 30 minutes coding.",
      "Both participants must participate simultaneously. Programs considered wrong if they fail any test case.",
      "Round 2 (10 min): Quiz via Google Form on historical and technological timeline of Computer Science.",
      "Round 3 (20 min): Debug a block of code—identify and fix syntax/logical/runtime errors without changing the logic.",
      "Participants will not be allowed to access the internet for any purpose.",
      "The method of submission will be provided on the day of the event."
    ]
  },
  {
    id: "cyberhunt",
    name: "Bosco Cipher",
    category: "Cybernetics",
    shortDesc: "Solve cryptic logic locks and map routes in a virtual scavenger hunt.",
    detail: "Embark on a thrilling adventure where mystery, strategy, and excitement come together in a race against time! Inspired by the immersive world of Ready Player One and the treasure-hunt brilliance of The Da Vinci Code, this experience will take you through hidden clues, secret codes, and unexpected twists at every turn. Like true explorers venturing into the unknown, participants must rely on sharp thinking, teamwork, and determination to overcome challenges and uncover the final victory. Every step is a new discovery, every puzzle a new path — making this an unforgettable journey filled with suspense, adventure, and the thrill of the chase.",
    icon: "🔍",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "2 Investigators",
    time: "Day 2, 10:00 AM",
    location: "Lab Room Gamma",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹10,000 + Decryption Badge",
    rules: [
      "Clues will be based on tech concepts, general knowledge, encryption and basic computer skills.",
      "Participants will be allotted two computers to look for clues and hints.",
      "Use of the Internet and AI is strictly prohibited unless stated otherwise by the judges.",
      "Participants are not allowed to bring their own gadgets.",
      "One hint token per team adds a 5-minute time penalty if used.",
      "Clues may be in forms like QR codes, binary, riddles, or tech trivia.",
      "All team members must reach the final checkpoint to complete the hunt.",
      "Whoever finishes the hunt with the shortest time wins."
    ]
  },
  {
    id: "digital-art-cyber",
    name: "Bosco Pixelcraft",
    category: "Cybernetics",
    shortDesc: "Vector design and digital painting illustrating the untouched nature.",
    detail: "From charting unexplored fantasy realms to rendering neon cyberpunk frontiers that do not exist yet, digital art is a high-stakes expedition into the unknown. It is Spider-Verse level dimension-hopping, the breathless thrill of an uncharted open-world RPG, and a little chaos when you venture off the map without a backup file. It is turning a blank canvas into a portal of pure discovery, where a single brushstroke opens a wormhole and a massive composition rewrites reality itself. This is where you do not just create, you pioneer. Ready your tools, load your coordinates, plant your flag on undiscovered ground, and let the ultimate creative adventure begin.",
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
      "Phase 1 (30 min): Brainstorming with sketch pads and traditional art materials. Internet allowed only in this phase.",
      "Phase 2 (90 min): Create actual digital artwork using a stylus and iPad. Internet is strictly prohibited.",
      "Participants must bring their own equipment (iPad, stylus, etc.).",
      "Failing to adhere to the theme will result in reduction of score.",
      "Any form of plagiarism or copied content will lead to immediate disqualification.",
      "Use of mobile phones, laptops, AI tools is strictly prohibited during Phase 2.",
      "The decision of the judges shall be final and binding."
    ]
  },

  // ─── MULTIMEDIA ───
  {
    id: "short-film",
    name: "Bosco Montage",
    category: "Multimedia",
    shortDesc: "Create, shoot, and compile a short narrative film based on the theme.",
    detail: "From the crazy adventures of Indiana Jones to the cinematic genius of Christopher Nolan, cinema has always been for people bold enough to go all in on their ideas. This event is your chance to lock in and direct your own masterpiece—where every shot gives Interstellar vibes, every twist has the intensity of Mission Impossible, and every scene is an absolute mic-drop moment. This is not just filmmaking—it is your chance to let the creative thoughts win, build entire worlds, and turn random ideas into something that feels straight out of Netflix; after all, sometimes the biggest flex is not finding the treasure—it is creating a story so peak that nobody can look away from it.",
    icon: "🎥",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "5 - 15 Filmmakers",
    time: "Day 1 & Day 2",
    location: "Outdoor Campus",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹15,000 + Golden Clapperboard Trophy",
    rules: [
      "All schools must register as a team, having a minimum of 5 and a maximum of 15 participants.",
      "The storyline of the film should be an original one and should not be plagiarised from any existing project.",
      "Each school must give an introduction to the film, before the film starts.",
      "The time duration of the film (5-10 minutes) will include the introduction and the credits.",
      "Exceeding the given time limit will result in penalisation.",
      "The theme will be given on 27th June, 2026 and the film must be submitted by 3rd July, 2026 to home.boscofest@gmail.com.",
      "No part of the film should endorse any form of vulgarity or obscenity.",
      "The script should be predominantly in English. Excessive use of vernacular language and visual effects will lead to penalisation.",
      "Top 8 schools' submissions shall be screened."
    ]
  },
  {
    id: "journalism",
    name: "Bosco Chronicles",
    category: "Multimedia",
    shortDesc: "Investigate, write, and layout a digital newspaper newsletter covering the fest.",
    detail: "Like Peter Parker behind a camera or Clark Kent behind a notepad, journalists are superheroes hiding in plain sight. But journalism is not just reporting the news—it is an adventure. It is following trails like Tintin on a globe-trotting investigation, uncovering secrets worthy of Gotham's finest detectives, and diving headfirst into mysteries deeper than Gravity Falls. Armed with nothing but a notebook, a camera, and your curiosity, you will chase leads through uncharted territory, navigate twists worthy of Indiana Jones, and uncover truths hidden in plain sight. Are you ready for the journey?",
    icon: "📰",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "2 + 1 Reporters",
    time: "Day 1 & Day 2",
    location: "Editorial Suite",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Press Badges",
    rules: [
      "Prepare a 4-minute infotainment PowerPoint presentation covering the entire fest.",
      "Prepare a 40-50 second video capturing the best moments (using editing software, NOT PowerPoint).",
      "Submit a handwritten report of around 150 words summarizing the fest with experience and opinions.",
      "Primary language must be English. Vulgarity of any kind will not be tolerated.",
      "Use of mobile phones is strictly prohibited. Cameras and microphones allowed for recording.",
      "Material collection till 11:00 AM Day 2; final submission ready by 12:30 PM including editing.",
      "If any material is found on social media, it leads to immediate disqualification.",
      "All submissions must be made in a pen drive only."
    ]
  },
  {
    id: "photography",
    name: "Bosco Vignette",
    category: "Multimedia",
    shortDesc: "Freeze moments. Tell stories without words.",
    detail: "Peter Parker needs his camera to pay rent. And you? You need to capture the ultimate shot of this school fest. Photography is not just about tapping a screen. It is a high-stakes safari through unpredictable crowds and shifting lights. Think of your camera as a compass. You can chase the neon-drenched atmosphere of Blade Runner, or trek towards a raw, candid moment worthy of a National Geographic cover. Take the adventure past the obvious angles and discover a completely new perspective.",
    icon: "📸",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Photographers",
    time: "Day 1, 10:30 AM",
    location: "Art Courtyard",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹7,000 + Lens Loot Box",
    rules: [
      "Duration: 90 + 30 minutes. Must use DSLR, SLR, or Mirrorless cameras. Mobile photography is not permitted.",
      "Five topics will be given on fest day as one-liners or phrases. One topic is compulsory; choose two more from remaining four.",
      "Submit 3 photographs total based on the given themes. All submissions via pen drive.",
      "No touch-ups, editing, presets, or filters allowed.",
      "Participants must give a one-line caption to each photograph.",
      "Judges will ask questions on technical aspects and relevance of photographs to theme.",
      "All cameras, laptops and pen drives must be brought by participants. Host school provides no equipment."
    ]
  },
  {
    id: "ad-wars",
    name: "Bosco Caricature",
    category: "Multimedia",
    shortDesc: "Pitch, market, and perform a live advertisement for a bizarre gadget.",
    detail: "Wait... a bunch of influencers convinced millions of people that a bottle of flavoured water was the coolest thing on the planet? Yep. And that is exactly why advertising is one of the greatest adventures out there. This is not just about selling a product—it is about turning the ordinary into the unforgettable. One moment you are staring at an object thinking, \"Bro, what am I even supposed to do with this?\" and the next you are building a story, creating hype, and making people believe it is the greatest thing they have seen all day. So lock in, trust the creative chaos, and let your imagination cook because somewhere between the memes, the madness, and the marketing magic, you will discover the secret every advertiser is chasing.",
    icon: "📣",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "6 + 2 Performers",
    time: "Day 2, 1:30 PM",
    location: "Mini Stage B",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹10,000 + Creative Ad Seal",
    rules: [
      "Round 1: Schools will be allotted brands on 2nd July, 2026. Ads must be submitted by 6th July before 23:59 PM.",
      "Teams must make a minimum 1 minute advertisement highlighting their company against their rival.",
      "Round 2: Top 6 teams make another 30+ second ad for a new company on fest day with 4 hours to shoot and edit.",
      "Pre-recorded videos and animations are not permitted in Round 2.",
      "No form of vulgarity or obscenity shall be tolerated.",
      "Use of vernacular language will not be permitted.",
      "The time limit of each round must be respected; failure will result in penalisation.",
      "All members of all participating teams are required to be present on the day of the fest."
    ]
  },

  // ─── SPORTS ───
  {
    id: "chess",
    name: "Bosco Endgame",
    category: "Sports",
    shortDesc: "Outthink and checkmate your opponent on the chessboard grid.",
    detail: "Do you think you have got the IQ of a detective, the strategy of a Marvel mastermind, and the patience of a Jedi? Then chess is your next adventure. Venture into a battlefield where every move shapes the story, every sacrifice unlocks a new path, and every checkmate feels like defeating the final boss. Whether you are channeling your inner Beth Harmon, or playing five moves ahead like a true grandmaster, this is your chance to outwit, outplay, and outlast. Gather your courage, trust your instincts, and embark on an adventure where the greatest weapon is your mind.",
    icon: "♟️",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "4 Players",
    time: "Day 1, 9:30 AM",
    location: "Quiet Study Library",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Wooden Knight Trophy",
    rules: [
      "Tournament of 5 rounds as per FIDE Swiss League System. All FIDE rules must be followed.",
      "National level referees will conduct the event.",
      "Participants cannot walk in and out of the competition rooms.",
      "Participants must ensure they are not expected to report for other events during chess.",
      "Any hint of aggression or unparliamentary language leads to immediate disqualification.",
      "The decision of the organisers is final and binding."
    ]
  },
  {
    id: "table-tennis",
    name: "Bosco Ricochet",
    category: "Sports",
    shortDesc: "Rapid-fire singles table tennis matches in the recreational camp.",
    detail: "Harry had a wand. You have a paddle. Embark on an adventure where every spin is a plot twist and every rally a battle against the odds. Following the legacy of Ma Long, Fan Zhendong, and Jan-Ove Waldner, you will face unpredictable spins, relentless attacks, and heart-racing moments that demand split-second brilliance and unwavering composure. Every rally is an adventure. 'They call it a point. We call it a story.' A story of courage, comebacks, and opportunities seized in the blink of an eye. The table is your stage, the racket your pen, and every shot writes a new chapter.",
    icon: "🏓",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 + 2 Players",
    time: "Day 1, 11:00 AM",
    location: "Indoors Gym Room",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + TT Paddle Box",
    rules: [
      "Duration: 240 minutes. Separate categories for Boys and Girls. Co-ed schools may send either or both.",
      "All games played in knockout format. Each match: two singles and one doubles (best of 3 games each).",
      "Players playing singles cannot play doubles and vice-versa. Order must be mentioned beforehand.",
      "If a team wins two consecutive singles, no doubles are played and that team wins.",
      "All ITTF rules strictly followed. Proper sportswear required; avoid white t-shirts.",
      "No equipment apart from table tennis balls provided by organisers.",
      "Every school must arrive 30 minutes ahead and report to the Chief Referee."
    ]
  },
  {
    id: "volleyball",
    name: "Bosco Skybound",
    category: "Sports",
    shortDesc: "High-flying 6v6 volleyball matches on the sand court.",
    detail: "Step into a high-energy battle where passion, teamwork, and determination take center stage! Inspired by the adventurous spirit of Around the World in Eighty Days and the breathtaking action of Pirates of the Caribbean, this event promises thrilling rallies, fearless dives, and unforgettable moments of glory. Every serve and spike brings a rush of excitement as teams push their limits and chase victory with unstoppable spirit. Why stay on the sidelines when the adventure begins with every serve and every point?",
    icon: "🏐",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "6 + 6 Players",
    time: "Day 2, 9:30 AM",
    location: "Outdoor Court",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹18,000 + Volleyball Shield",
    rules: [
      "Knock-Out Team Event. Separate for Boys and Girls. Co-ed schools may send either or both.",
      "Matches held according to FIVB rules. Best-of-three-sets format.",
      "First two sets to 25 points; third decider set to 15 points.",
      "All teams should have a team jersey with a number.",
      "The referee's decision on any rule/dispute is final and binding.",
      "Any aggression or unparliamentary language leads to immediate disqualification.",
      "Every school must arrive 30 minutes ahead and report to the Chief Referee."
    ]
  },
  {
    id: "tag-games",
    name: "Bosco Playverse",
    category: "Sports",
    shortDesc: "Team obstacle relays and physical survival challenges.",
    detail: "You are not ready! Think again. You are still not ready for the adventure! Percy Jackson had monsters. Nathan Drake had lost treasures. You have obstacles, surprises and absolute chaos. This is not just a game but a journey through twists, turns, and unpredictable challenges. Run, dodge, adapt and conquer the unknown. Expect the unexpected, trust your team and keep moving, because only the boldest explorers make it to the finish.",
    icon: "🏃",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Players",
    time: "Day 2, 11:30 AM",
    location: "Main Playground",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹8,000 + Survivalist Medals",
    rules: [
      "3 rounds total. Points calculated cumulatively; team with maximum points wins.",
      "Round 1 - Tag: Participants paired randomly. Two 20-second rounds per pair (catcher vs runner, then swap).",
      "Runner must evade capture for the full round to win. Catcher must 'tag' with hand only (not foot).",
      "Bonus points awarded depending on time taken to catch the runner.",
      "Rounds 2 and 3: Unconventional Games—rules will be declared on the day of the event.",
      "The team with the maximum cumulative points at the end of all 3 rounds wins."
    ]
  },
  {
    id: "pickleball",
    name: "Bosco CrossCourt",
    category: "Sports",
    shortDesc: "Fast paddle rallies on the courtyard pickleball grid.",
    detail: "Step into a world of excitement and adventure where every rally feels like a journey into the unknown, whether you dream of adventure like The Hunger Games or teamwork like Percy Jackson. With heart-racing action, fierce competition, and moments that keep everyone on the edge of their seats, this event is all about courage, teamwork, and chasing victory against all odds. From powerful smashes to unforgettable comebacks, every match promises energy, passion, and the spirit of adventure that turns every player into a hero of their own story. Will you rise to the challenge and make every point part of your adventure?",
    icon: "🎾",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "2 Players (Doubles)",
    time: "Day 1, 2:00 PM",
    location: "Courtyard TT Hall",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹6,000 + Carbon Paddle Set",
    rules: [
      "Separate draws for girls and boys. Maximum 1 doubles team per school.",
      "Preliminary Rounds: Knockout, first to 7 points win by 2.",
      "Semi-Finals: First to 11 points, win by 2.",
      "Finals: Best of 3 sets, each set to 11 points win by 2. Teams switch sides after each set.",
      "One 1-minute timeout per match. Mandatory sports attire required.",
      "All matches conducted per official USA Pickleball rules. Indoor pickleballs provided.",
      "Report at least 15 minutes before scheduled match. Carry personal paddles, water bottles, and towels."
    ]
  },

  // ─── ART AND LITERATURE ───
  {
    id: "digital-art-literature",
    name: "Bosco Spearhead",
    category: "Sports",
    shortDesc: "Precision and distance javelin throw track and field event.",
    detail: "This is not just a javelin throw. It is the opening chapter of a grand adventure. Charge down the runway with Link's determination, Hawkeye's accuracy, and Tanjiro's never-give-up mindset. Like Luffy chasing the One Piece or Indiana Jones hunting the next legendary artifact, you are heading where no one else has gone before. The runway is your questline, the sky is your open world, and the javelin is your final power-up. No respawns. No second chances. Just one throw to make the highlight reel. Take aim, let it fly, and unlock legendary status.",
    icon: "🎯",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "Max 4 Athletes (Boys)",
    time: "Day 1, 1:30 PM",
    location: "Main Playground",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Custom Trophy",
    rules: [
      "All Rules of World Athletics will be followed.",
      "Each athlete gets three trials; top eight get three additional trials.",
      "In the event of a tie, the athlete with the next-best measure wins.",
      "The javelin must be held at the grip with one hand only. No gloves on throwing hand.",
      "It must be thrown over the shoulder or upper part of the throwing arm. Non-orthodox styles not permitted.",
      "Failure if: time limit exceeded, back turned to landing area, touching runway lines, or metal head not landing first.",
      "Any aggression or unparliamentary language leads to immediate disqualification."
    ]
  },
  {
    id: "eco-fashion",
    name: "Bosco Vogue",
    category: "Art and Literature",
    shortDesc: "Build and model clothing items using raw recyclable elements.",
    detail: "Inspired by the zero-waste vision of Wall-E and the rugged resourcefulness of Mad Max, this adventure challenges you to look at a pile of discarded junk and see a high-end runway collection. This is not just upcycling, it is your chance to play the role of Greta Thunberg and Picasso simultaneously, turning plastic bottles, weathered newspapers, and forgotten fabrics into sleek, avant-garde design statements. The clock is ticking, raw materials are your only currency, and the ultimate flex is not buying the future, it is inventing it out of what the world left behind. Grab your toolkit, brave the elements of design, and embark on the ultimate upcycling safari.",
    icon: "👗",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "2 Designers",
    time: "Day 2, 2:00 PM",
    location: "Main Stage Area",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹15,000 + Green Leaf Award",
    rules: [
      "Duration: 120 minutes. No materials provided by the host school.",
      "Only sustainable/recycled/biodegradable materials to be used.",
      "Items NOT permitted: Superglue (Fevi kwik), Glue Gun, and Mannequin.",
      "The item must be built from scratch during the event. No predesigned or pre-built structures allowed.",
      "Participants must demonstrate the utility of their products and answer judges' questions (3+2 minutes).",
      "No digital means of presenting the utility of the product shall be allowed.",
      "Late submission will incur deduction of points. Plagiarised items face immediate disqualification.",
      "Participants must clean their workstation after completion. A bell rings at 120 minutes—all must stop."
    ]
  },
  {
    id: "art-graffiti",
    name: "Bosco Art Attack",
    category: "Art and Literature",
    shortDesc: "Graffiti and mural sketch design on large parchment canvas boards.",
    detail: "From the mind-bending creativity of Picasso to the cartoon chaos of Walt Disney, every legendary artwork started with someone looking at a blank space and thinking, \"Yeah, I can definitely do something cool with this.\" And that is exactly what this event is all about. One moment you are drawing a simple idea, and the next you are fighting your own creative boss battle, trying to figure out whether you have made a masterpiece or accidentally started a whole new art style. So grab your markers, paints, and spray cans, trust the chaos, and let your imagination carry the map, because here adventures are not found—they are created.",
    icon: "🖌️",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Artists per category",
    time: "Day 1, 2:30 PM",
    location: "Creative Courtyard",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Graffiti Marker Box",
    rules: [
      "Duration: 120 minutes. Two categories: Seniors (9-12) and Juniors (6-8). Schools can participate in one or both.",
      "Seniors: One paints on canvas, one creates a visual logo and slogan on A3 paper. Acrylic paints, markers, brushes allowed.",
      "Juniors: One does sketching and pencil shading on A3 paper, the other writes a slogan on A3 paper.",
      "Spray paints are not allowed. Canvas and A3 paper provided by host school.",
      "Any tracing, duplicating, or vulgarity leads to immediate disqualification.",
      "Participants must clean their workstation after completion. A bell rings at 120 minutes—all must stop.",
      "Judges will question participants on their art and its relevance to the theme (3+2 minutes).",
      "The final artwork will be retained by the host school."
    ]
  },
  {
    id: "poetry-writing",
    name: "Bosco Magnum Opus",
    category: "Art and Literature",
    shortDesc: "Let your words create a storm that stays.",
    detail: "Forget the dusty stanzas and rigid rhyme schemes of the past. Your words are not meant to sit quietly on a page, they are meant to seize the day, 'Carpe Diem' as John Keating said. This is your 3 a.m. notes app breakthroughs thrown into a high stakes, high reward quest for glory. Wednesday did put it right, \"It is no wonder Edgar Allan Poe became a drug-addled madman.\", not only because he went to Nevermore, but because he was trying to write a masterpiece that would shake Shakespeare himself. Now it is your turn. Follow the trail of imagination, venture beyond the ordinary, and see where the words lead.",
    icon: "✍️",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Writers",
    time: "Day 1, 10:30 AM",
    location: "Literary Lounge",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Fountain Pen Set",
    rules: [
      "Duration: 60 minutes. Theme/topic will be provided on the spot.",
      "Poems must be written in English only. Maximum 16 lines, divided into stanzas of 4 lines each.",
      "Poems should follow a rhyme scheme. At least 2 figures of speech must be clearly used (Simile, Metaphor, Alliteration, or Hyperbole).",
      "Any form of plagiarism or copied content will lead to immediate disqualification.",
      "Participants must bring their own writing materials. Sheets will be provided by organisers.",
      "Use of mobile phones, laptops, AI tools, or internet is strictly prohibited.",
      "Poems will be marked on originality, creativity, vocabulary, and relevance to theme."
    ]
  },

  // ─── PERFORMANCE ───
  {
    id: "jam",
    name: "Bosco Minute Mania",
    category: "Performance",
    shortDesc: "Speed speaking challenge without hesitation, deviation, or repetition.",
    detail: "The Doctor had a TARDIS. You have just sixty seconds. That is all you get. In this adventure against the clock, hesitation is your greatest enemy and confidence is your strongest ally. Sounds easier than getting through a single Instagram reel, but the moment you step up to the mic, your brain goes full Seong Gi-Hun. Speak fast, and think faster - a microsecond of silence and you are eliminated faster than a player tripping in 'Red Light, Green Light'. Lock in, channel your inner Max Verstappen, and prove that you can conquer the clock under sixty seconds of pure, fast-paced adrenaline.",
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
      "Participants will be given 60 seconds to speak on a given topic, revealed 10 seconds before commencement.",
      "Use of vulgarity, profanity, or unparliamentary language will be heavily downmarked.",
      "If the student exceeds the time limit, 0.5 points will be deducted for every 10 seconds exceeded.",
      "After the speech, an interpellation round follows where participants defend their points to judges.",
      "Participants should be present at the venue throughout the duration of the event.",
      "The judges' decision will be binding on all participants."
    ]
  },
  {
    id: "improv",
    name: "Bosco Ad-Lib",
    category: "Performance",
    shortDesc: "Impromptu acting rounds based on comical scenarios given on-spot.",
    detail: "Did you know the famous \"I am Iron Man\" line in Iron Man was completely improvised? Robert Downey Jr. threw out the script, stepped into the unknown, and changed the entire Marvel Cinematic Universe forever. This is not a casual stroll, it is a high-stakes competition. It is an expedition into uncharted comedic territory where there is no safety net. Be spontaneous. Seize the moment. Treat the stage like your own personal adventure, where your sharpest wit is your only compass. Leave your audience on the edge of their seats, or make them fall off in laughter. Will you find the perfect line, the perfect joke to survive the adventure, or will you crumble under the fierce spotlight?",
    icon: "🎭",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "3 + 2 Actors",
    time: "Day 2, 11:00 AM",
    location: "Mini Stage Auditorium",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹10,000 + Improv Mask Trophy",
    rules: [
      "Round 1 - The Suggestion Box (1min 30sec + 30sec): Draw random location and scenario, build a scene around them.",
      "Round 2 - The Turnaround (1min 15sec): Reenact a scene from any media with your own twist. Submit transcript by 5th July.",
      "Round 3 - Genre Mashup (30+30+30sec): Perform a scene, then switch genres on command from moderators.",
      "No use of fire, sharp objects, or hazardous materials. No obscene gestures or references.",
      "The act must be in English or Hindi. No promotion of violence, hate speech, or political opinions.",
      "Any violation will result in instant disqualification.",
      "A microphone and basic sound system will be provided. All other props must be brought by participants."
    ]
  },
  {
    id: "dumb-charades",
    name: "Bosco Jester",
    category: "Performance",
    shortDesc: "Translate cryptic explorer terms or movie titles through gestures.",
    detail: "From the absolute chaos of Jumanji to the mind-bending madness of Inception, this event is a full-on rollercoaster of creativity, quick thinking, and pure adventure. Words are off the table, so every gesture, expression, and move has to do the talking. One wrong signal can send your team into confusion, while one brilliant act can change the game in seconds. No dialogues. No second chances. Just vibes, instincts, and the clock ticking.",
    icon: "🤫",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "4 Players",
    time: "Day 1, 2:00 PM",
    location: "Assembly Room 2",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹5,000 + Charades Scroll",
    rules: [
      "Round 1: One actor performs; others guess a Movie or TV Series title. 60 seconds per turn. 10 points for correct guess.",
      "Round 2: One guesser holds a card to forehead; others act out cues. Topics: Animals, Books, Songs, Famous Personalities, Food.",
      "All actions must be entirely silent. No speaking, mouthing words, verbal cues, or sounds.",
      "No writing, spelling, pointing to objects, using props, or drawing in any form.",
      "No team member can perform more than once throughout the competition.",
      "While one team performs, opposing teams must not cause distractions.",
      "In the event of a tie, a sudden-death round may be conducted. Judges' decision is final."
    ]
  },
  {
    id: "gi60",
    name: "Bosco Prodigy",
    category: "Performance",
    shortDesc: "Perform a complete, self-contained theatrical play in exactly 60 seconds.",
    detail: "From mimicking Charlie Chaplin turning moments into pure comical chaos to solving rubix cubes in seconds, GI60 is all about stepping out of the ordinary and making sixty seconds feel unforgettable. Every performance feels like jumping into a new quest where anything can happen before the timer hits zero. This is where one minute turns into a wild energy where spontaneity takes over and every second feels like a new twist waiting to happen.",
    icon: "⏳",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "1 + 1 Performer",
    time: "Day 2, 1:30 PM",
    location: "Theatre Lounge A",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹8,000 + GI60 Seal",
    rules: [
      "Primary Performer is judged; Assistant/Support is not judged. Time Limit: 60 seconds.",
      "The act must be entirely original. Copying well-known routines or copyrighted content will negatively impact scoring.",
      "Acceptable acts: Miming, Mimicry, Juggling, Live sketching, Speed solving, Dance, Magic tricks, Ventriloquism, etc.",
      "No use of fire, sharp objects, or hazardous materials. No obscene gestures or references.",
      "The act must be in English. No promotion of violence, hate speech, or political opinions.",
      "Time begins when the participant starts the act. Acts exceeding the limit may be penalized.",
      "Props, instruments, or materials must be brought by the participant. Setup must be under 30 seconds.",
      "The judges' decisions will be final and binding. No appeals or re-performances."
    ]
  },
  {
    id: "turncoat-debate",
    name: "Bosco Figure-it-out",
    category: "Performance",
    shortDesc: "A quick-thinking deduction and riddle-solving performance challenge.",
    detail: "Not every adventure begins with a map. Some begin with a question, a pattern, or a detail that does not quite fit. Step into the unknown, think beyond the obvious, and see where curiosity takes you. Channel Sherlock's instinct for the unexpected and L's ability to look past appearances. The path ahead is uncertain, the answers are not always visible, and that is exactly what makes the journey worth taking.",
    icon: "🧩",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "2 Solvers",
    time: "Day 1, 3:00 PM",
    location: "Senate Chamber",
    day: "Day 1",
    stage: "Off-stage",
    bounty: "₹8,000 + Riddlemaster Shield",
    rules: [
      "Participants are expected to be well versed with English language, anagrams, general knowledge, and critical thinking.",
      "The rules of the event will be revealed on the day of the event itself.",
      "Best of Luck!"
    ]
  },
  {
    id: "drama",
    name: "Bosco Theatricals",
    category: "Performance",
    shortDesc: "One-act theatre plays exploring local folklore or explorer histories.",
    detail: "This is not a predictable script; it is the absolute tension of a cold Cillian Murphy style split-screen faceoff, the room-silencing suspense of a Kanye Runaway piano intro, and the pure, desperate panic of a high-stakes Project Hail Mary survival scenario where the lines go out the window and you have to improvise to stay alive. It is a ruthless arena where alliances shatter in seconds, and a single whisper completely resets the room's aura. Lock in, back your squad up, and let us turn this stage into our own playground. Toss out the script entirely, dive headfirst into the unknown, and let us turn this moment into our ultimate, unchartered cinematic adventure.",
    icon: "🎭",
    difficulty: "Legendary",
    difficultyColor: "#D9B24C",
    teamSize: "5 + 3 Actors",
    time: "Day 2, 4:00 PM",
    location: "Main Auditorium Stage",
    day: "Day 2",
    stage: "On-stage",
    bounty: "₹25,000 + Best Play & Best Actor Awards",
    rules: [
      "Round 1 - The Fairy Tale Flip: Creatively reinterpret or reimagine famous fairy tales. Duration: 8+2 minutes.",
      "Script must be emailed by 5th July, 2026 to home.boscofest@gmail.com. Hard copy submitted at registration.",
      "Round 2 - Think Twist Theatre: Draw chits with a situation and two dialogues, improvise a scene in 2+1 minutes.",
      "The act can be in English, Bengali or Hindi. No vulgar, profane or inappropriate language tolerated.",
      "No props provided. Each team brings their own. No audio equipment allowed.",
      "Indirect political references permitted, but no specific mentions of any political entity.",
      "The decision of the judges and organisers is final and binding."
    ]
  },

  // ─── OTHERS ───
  {
    id: "non-fire-cooking",
    name: "Bosco Masterchef",
    category: "Others",
    shortDesc: "Prepare delicious explorer snacks and dishes without using heat.",
    detail: "Remy from Ratatouille proved that anyone can cook, but only a true adventurer can create a masterpiece with no flame to guide the way. Think of this as MasterChef meets Man vs. Wild, a culinary expedition where raw ingredients are your resources, creativity is your compass and time is your greatest challenge. Whether you are chasing for the meticulous perfection of The Bear or crafting a bold fusion that breaks every rule in the cookbook, every dish is a step into the unknown. The kitchen is your uncharted territory where imagination reigns supreme and ordinary ingredients become extraordinary discoveries. So trust your instincts, embrace the adventure and serve up a creation worthy of legend.",
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
      "Duration: 1 hour (including preparation and presentation). Classes: 6-8.",
      "Participants must bring their own ingredients, peelers, knives, plates, trays, tablecloth, etc.",
      "Pre-cooked items (boiled potatoes, vegetables, chips) may be brought, but the entire dish cannot be pre-made.",
      "All participants must compulsorily bring a plastic tablecloth. Plate/tray diameter must not exceed 16 inches.",
      "Accessories (hand gloves, headgear, aprons) will be awarded marks.",
      "A chart with ingredients/calories must be supplemented along with the display.",
      "No electrical gadgets are to be used. The judges' decision will be final."
    ]
  },
  {
    id: "sudoku",
    name: "Bosco Gridlock",
    category: "Others",
    shortDesc: "Solve complex numerical logic grid puzzles under speed rounds.",
    detail: "Each grid presents its own unique and challenging task that requires concentration and determination on your part to overcome it. Built with the calm intensity of Magnus Carlsen when he plays chess and strategy calls are made for Formula One races, it is an adventure that entails the use of reason, perseverance, and wit. Each number holds a clue and takes you one step nearer to solving the next. What starts out as a puzzle quickly turns into an adventurous journey of reasoning and strategy.",
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
      "Only pens/pencils and erasers allowed. Must use the official Sudoku sheet and scratch paper provided.",
      "Mobile phones, smartwatches, calculators, or any digital devices are strictly prohibited.",
      "The event is divided into 3 rounds with a 15-minute time limit per round.",
      "Round 1: 6x6 Sudoku grid. Round 2: 9x9 Sudoku grid. Round 3: 12x12 Sudoku grid.",
      "Scores in each round calculated based on the time taken to solve the puzzle.",
      "Teams must submit sheets with names and school details clearly mentioned."
    ]
  },
  {
    id: "quiz",
    name: "Bosco Synapse",
    category: "Others",
    shortDesc: "The grand general knowledge quiz. Speed, buzzer, and memory rounds.",
    detail: "This is not a boring classroom test; it is the elite, lightning-fast trivia clashing of a Jeopardy! Mastermind showdown, the chaotic, brilliant plot twists of a Brooklyn Nine-Nine Halloween Heist, and the intense, pulse-pounding strategy of a Squid Game tactical choice. It is a battlefield of instant decisions where a single clutch buzz can completely flip the leaderboard upside down. No safe passes, no holding back, just raw intellect, sharp instinct, and the thrill of outsmarting the room. Ditch the manual, trust your gut, and let the ultimate strategic adventure begin.",
    icon: "❓",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "3 + 1 Quizzers",
    time: "Day 1 & Day 2",
    location: "Main Auditorium",
    day: "Day 1",
    stage: "On-stage",
    bounty: "₹15,000 + Quiz Bowl Shields",
    rules: [
      "The event will have 5 rounds including Prelims. The reserve can be substituted after an elimination round (once only).",
      "Prelims (Written): Top 14 teams qualify. No negative markings.",
      "Round 1: General trivia, Pounce and Bounce. Negative marking for pounce only. No eliminations.",
      "Round 2 (Written): Audio Visual round. Top 9 teams qualify for Round 3. No negative marking.",
      "Round 3: Long Connect Round. Points based on earliness of answers. Negative marking for incorrect answers.",
      "Round 4 (Buzzer): Rapid fire. Double points awarded. Negative markings for incorrect answers.",
      "The decisions of the Quizmaster shall be final."
    ]
  },
  {
    id: "scrabble",
    name: "Bosco Wordsmith",
    category: "Others",
    shortDesc: "Assemble high-scoring vocabulary words on the game board.",
    detail: "Ready to turn letters into legends? Scrabble is the ultimate word quest, where every tile is a clue, every bonus square is buried treasure, and every move can change the game. Whether you are spelling like Hermione, deducing like Sherlock, hunting the One Piece with the Straw Hats, or pulling off a comeback worthy of Avengers: Endgame, victory is just one word away. Gather your crew, trust your instincts, and set off on an adventure where strategy, creativity, and a little luck can turn the right word into glory.",
    icon: "🔠",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "2 Players",
    time: "Day 2, 9:30 AM",
    location: "Lounge Boardroom",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹5,000 + Scrabble Board Kit",
    rules: [
      "3 rounds. Each participant goes against another competitor chosen by draw of chits.",
      "Each game consists of 15 turns per player. 1 minute per turn to form a word.",
      "Score per turn = sum of letter values in each word + bonus from premium squares.",
      "Awards decided by total cumulative points at the end of 3 games.",
      "Collins Scrabble dictionary used as reference. Standard scrabble rules followed.",
      "No plural or archaic words allowed. Proper nouns (names, places) are prohibited.",
      "The judges' decision will be final and binding."
    ]
  },
  {
    id: "math-marathon",
    name: "Bosco Brainwave",
    category: "Others",
    shortDesc: "Test your mental memory, recall speed, and pattern recognition.",
    detail: "Memory is not just about remembering, it is about holding onto details as the journey unfolds. Channel the focus of Sherlock recalling details everyone else missed, the sharp mind of Hermione drawing information from everything she has learned, and the persistence of Senku preserving knowledge across generations. As information flashes by, every detail becomes part of the adventure. Stay alert, trust your gut, and navigate your way through a challenge where the greatest discoveries belong to those who remember.",
    icon: "🧠",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "2 Participants",
    time: "Day 2, 11:00 AM",
    location: "Lecture Hall Beta",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹7,000 + Brainwave Scroll",
    rules: [
      "4 rounds total. Cumulative scores of all rounds decide the winner.",
      "Round 1: Objects presented—remember as many as you can.",
      "Round 2: Series of images shown—remember as many as you can in correct order.",
      "Round 3: Series of audio clips played—remember as many as you can in correct order.",
      "Round 4: Series of words projected—remember as many as you can.",
      "In case of a tie, participants who scored higher in order-based rounds are declared the winner."
    ]
  },
  {
    id: "pointless",
    name: "Bosco Voidix",
    category: "Others",
    shortDesc: "Obscure answer survey quiz. The lowest scoring correct answers win.",
    detail: "You studied all night for the wrong exam. Welcome to Pointless, the only adventure where being too smart can get you eliminated. Think of Indiana Jones bypassing the flashy, gold-plated chalice to choose the humble Holy Grail. Forget the obvious, abandon the safe route and venture into uncharted territory where the weirdest answers are often the best ones. This is not about knowing more. It is about thinking differently because sometimes, the greatest discoveries are the ones nobody else thought of.",
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
      "Two rounds, each based on categories like sports, finance, history, science, current affairs, etc.",
      "Each question has 'correct' answers decided by a pre-event survey. Give the least popular survey answer to score lowest.",
      "An incorrect answer (not in the list) earns maximum penalty points. A 'pointless' answer (0 survey responses) is ideal.",
      "Teams must answer within 15 seconds or receive maximum penalty points.",
      "The team with the minimum total points is declared the winner.",
      "In case of a tie, a rapid fire round with limited answers will break the tie.",
      "Use of mobile phones, laptops, AI tools, or internet is strictly prohibited. Judges' decision is final."
    ]
  }
];

function CircularEventLogo({ id, icon, name }: { id: string; icon: string; name: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const logoPath = `/event-logos/${id}.avif`;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-full flex items-center justify-center">
      {!imgFailed ? (
        <img
          src={logoPath}
          alt={name}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center text-4xl select-none rounded-full"
          style={{
            background: "radial-gradient(circle at center, #2B1A0E 0%, #0c0502 100%)",
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Territories");
  const [selectedDay, setSelectedDay] = useState<"All Days" | "Day 1" | "Day 2">("All Days");
  const [selectedStage, setSelectedStage] = useState<"All Stages" | "On-stage" | "Off-stage">("All Stages");
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Lock scroll when event sheet/modal is open
  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeEvent]);

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
      
      const eventId = params.get("event");
      if (eventId) {
        const foundEvent = EVENTS_DATA.find(e => e.id === eventId);
        if (foundEvent) {
          setActiveEvent(foundEvent);
          const matchedCat = CATEGORIES.find(c => c.name.toLowerCase() === foundEvent.category.toLowerCase());
          if (matchedCat) {
            setSelectedCategory(matchedCat.name);
          }
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

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-20 flex flex-col">
        


        {/* Page Title Header */}
        <div className="text-center mb-10">
          <h1 className="font-bebas font-black text-4xl md:text-5xl lg:text-6xl text-[#F4ECC8] uppercase tracking-wide">
            EVENTS & RULES
          </h1>
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mt-4" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt) => {
                const isRegistered = registeredEvents.includes(evt.id);
                const diffBg   = evt.difficulty === "Legendary" ? "#A37F3E" : evt.difficulty === "Veteran" ? "#3B5E8C" : "#37532A";
                const diffText = "#F4ECC8";
                return (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    whileHover={isMobile ? {} : { y: -4, boxShadow: "6px 6px 0px rgba(43,26,14,0.95), 0 0 20px rgba(163,127,62,0.15)" }}
                    onClick={() => setActiveEvent(evt)}
                    className="parchment-card group relative flex flex-col overflow-hidden cursor-pointer rounded-lg px-4 pt-5 pb-4"
                  >
                    {/* Stage tag (top right) */}
                    <div
                      className="absolute top-3 right-3 z-20 font-sans font-black uppercase text-[8px] tracking-wider px-2 py-0.5"
                      style={{
                        background: evt.stage === "On-stage" ? "#3B5E8C" : "#37532A",
                        color: "#F4ECC8",
                        border: "1.5px solid #2B1A0E",
                        borderRadius: "3px",
                        boxShadow: "1.5px 1.5px 0 rgba(43,26,14,1)",
                      }}
                    >
                      {evt.stage.toUpperCase()}
                    </div>

                    {/* Circular Logo */}
                    <div className="flex justify-center mb-3 relative z-20">
                      <div
                        className="w-[120px] h-[120px] rounded-full border-[3px] border-[#2B1A0E] overflow-hidden bg-[#1E1208] flex items-center justify-center relative"
                        style={{
                          boxShadow: "0 4px 12px rgba(0,0,0,0.4), 2.5px 2.5px 0 rgba(43,26,14,0.95)",
                        }}
                      >
                        <CircularEventLogo id={evt.id} icon={evt.icon} name={evt.name} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-bebas uppercase leading-none font-bold text-center relative z-20"
                      style={{ fontSize: 20, color: "#2B1A0E", letterSpacing: "0.04em" }}
                    >
                      {evt.name}
                    </h3>

                    {/* Day Badge */}
                    <div className="flex justify-center mt-1.5 relative z-20">
                      <span
                        className="font-sans font-black uppercase tracking-[0.14em] text-[9px] px-4 py-1 rounded-sm"
                        style={{
                          background: "#3B5E8C",
                          color: "#F4ECC8",
                          border: "1.5px solid #2B1A0E",
                          boxShadow: "1.5px 1.5px 0 rgba(43,26,14,0.8)",
                        }}
                      >
                        {evt.day.toUpperCase()}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-auto pt-3 relative z-20">
                      <span
                        className="block w-full text-center font-bebas text-[13px] tracking-wider uppercase py-1.5 text-white"
                        style={{
                          background: "#37532A",
                          border: "2px solid #2B1A0E",
                          borderRadius: "4px",
                          boxShadow: "2px 2px 0 rgba(43,26,14,1)",
                        }}
                      >
                        VIEW DETAILS
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
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
              className="relative w-full max-w-md bg-[#ebdcb9] bg-radial-[rgba(43,26,14,0.03)_1px,transparent_0] bg-[size:8px_8px] rounded-t-3xl sm:rounded-2xl border-t-2 border-x-2 sm:border-2 border-ink-dark px-6 pt-5 pb-8 shadow-[0_-8px_30px_rgba(43,26,14,0.3)] sm:shadow-[6px_6px_0px_rgba(43,26,14,1)] z-10 overflow-y-auto"
              style={{ maxHeight: isMobile ? "85vh" : "80vh" }}
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
                <div className="w-14 h-14 rounded-full border-2 border-[#2B1A0E] overflow-hidden bg-[#1E1208] flex items-center justify-center shrink-0">
                  <CircularEventLogo id={activeEvent.id} icon={activeEvent.icon} name={activeEvent.name} />
                </div>
                <div>
                  <h2 className="font-bebas text-xl text-ink-dark uppercase tracking-wide">
                    {activeEvent.name}
                  </h2>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-ink-dark/30 rounded-full text-ink-dark inline-block mt-1">
                    {activeEvent.category === "Cybernetics" ? "Gaming" : activeEvent.category === "Art and Literature" ? "Literary" : activeEvent.category === "Multimedia" ? "Photography" : activeEvent.category}
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

              {/* Spacer at the bottom since bounty is removed */}
              <div className="h-2" />


            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
