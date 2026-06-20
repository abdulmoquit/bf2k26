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
      "RULES: Participants: 7 Time allotted: 4+1 minutes Classes: 8-12",
      "​ Participants must bring their own unconventional instruments.",
      "​ Traditional instruments like guitars, pianos, drums, etc. should not be used.",
      "​ Drum sticks cannot be used.",
      "​ Beatboxing is allowed but singing is not allowed.",
      "​ Time for stage and instrument set up is maximum 1 minute.",
      "​ Use of electronic gadgets is strictly prohibited.",
      "​ All requirements, such as tables, chairs and the number of microphones required should be informed to the host school via the following email id: home.boscofest@gmail.com by 3rd July, 2026.",
      "​ All contestants are required to adhere strictly to the rules and regulations of the competition, failing which they may be disqualified."
    ]
  },
  {
    id: "fusion-music",
    name: "Bosco Jukebox",
    category: "Music",
    shortDesc: "Merge Eastern traditional patterns with modern Western melodies.",
    detail: "​ This is not a safe, by-the-book concert; it is the high-stakes, late-night energy of Karan Aujla vocals hitting a dark Playboi Carti rage beat, or the absolute chaos of an Anirudh-level classical melody getting completely hijacked by a heavy Travis Scott synth bassline. It is an unmapped frontier of pure sonic adventure, where aggressive Western 808s drop the rules to chart a course through traditional Eastern rhythms, and a single smooth transition can completely flip the crowd. There are no safe paths or rehearsed boundaries tonight. Listen close, feel the rhythm shift, and join the ultimate expedition into a soundscape the world has not discovered yet.",
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
      "RULES: Participants: 8+3 Duration: 6+2 minutes (including setup time) Classes: 8-12",
      "​ Participants must perform a fusion of at least ONE song each of Eastern and Western category.",
      "​ Vocals and instruments will both be given equal weightage during evaluation.",
      "​ Only one drum kit with attachments will be provided by the host school, though attachments can be brought by the participants also. All other instruments are to be brought by the participants. Any type of instruments except DJ consoles and MIDI players are allowed.",
      "​ Pre-recorded and pre-programmed music is not allowed. Laptops are permitted for use of VST tones only, but the performance must be entirely live.",
      "​ Addition and alteration of original lyrics is not allowed. The whole song or a part of it may be used.",
      "​ One keyboard stand will be provided to the participants. Usage of objectionable, obscene, vulgar, suggestive or derogatory lyrics or innuendos will lead to immediate disqualification. It should be a uniform fusion rather than a discontinuous performance.",
      "​ The list of selected songs with the portion of the lyrics to be performed has to be emailed to the Fest email ID (home.boscofest@gmail.com) by Friday, 3rd July, 2026. The list of instruments being used by the participants and the number of singers performing must be included as well. The participants are responsible for their own belongings. At least 2 Eastern and 2 Western instruments are to be used.",
      "​ Depiction of the theme in the performance would be appreciated. ​"
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
    stage: "On-stage",
    bounty: "₹6,000 + Vocalist Scroll",
    rules: [
      "RULES: Participants: 6+4 Duration: 12+3 min (including setup time) Classes: 8 - 12 There will be three categories in the event:",
      "1. Rabindra Sangeet Solo (approx 3 mins)",
      "2. Instrumentals (Solo) (1 assist (tabla) is allowed) (4 mins approx.)",
      "3. Group Song - Regional folk song medley or ‘gana sangeet' medley (5 mins approx.) (cannot make the medley of folk and gana sangeet together)",
      "​ There must be a minimum of 4 and a maximum of 6 vocalists per school for the group song.",
      "​ Only Indian classical instruments will be allowed for accompaniment (except violin and keyboard).",
      "​ Maximum number of musicians- 4 (the tabla player may not be a student from the participating school and can be a professional tabla player).",
      "​ In the Instrumental (Solo) round, only eastern (Indian) instruments to be used.",
      "​ Any sort of pre-recorded music should not be used except the electronic tanpura.",
      "​ Dress code: The dresses should be absolutely eastern (or as per the region being portrayed).",
      "​ The host school will not provide any instruments.",
      "​ Participating schools are requested to strictly adhere to the time limit of (12+3 minutes) given to the school.",
      "​ For instrumental solo, only Eastern instruments will be allowed ​"
    ]
  },
  {
    id: "antakshari",
    name: "Bosco Sur Sangam",
    category: "Music",
    shortDesc: "The legendary team-based singing and song recall duel.",
    detail: "Antakshari​\n\nWith the unforgettable soundtrack moments of Guardians of the Galaxy to the musical energy and friendships of Pitch Perfect, this event is all about music, memories, and good vibes. Every lyric is a clue, every song unlocks a new memory, and every team races to keep the rhythm alive. One moment you are hit with nostalgia; the next, you are laughing through the chaos of fierce competition and adventure in every flow. Expect surprise bangers, throwback hits, and nonstop energy - know the track, own the mic, take the Win.",
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
      "RULES: Participants: 3 + 1 (Reserve) Duration: 120 minutes Classes: 9-12",
      "​ Only Hindi songs will be allowed.",
      "​ Singing songs containing vulgar lyrics will lead to disqualification.",
      "​ There will be an elimination round consisting of three",
      "rounds, and the top 8 teams shall be selected for the next level.",
      "​ After the elimination rounds, the participants can choose to interchange with the reserve participant. This can be done only once during the event with the permission of the organisers.",
      "​ All teams will participate in the preliminary round.",
      "​ Further rules specific to the different rounds will be mentioned during the event.",
      "​ Questions will be based on Hindi movies and audio/visual clips. Some of the rounds will also have negative markings. Bonus rounds will also be there.",
      "​ The game master's decision will be final and binding. All participating schools are informed that there will be a retro",
      "round from the 1960s onwards."
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
    stage: "On-stage",
    bounty: "₹7,000 + Gold Microphone Pin",
    rules: [
      "RULES: Participants: 6+4 Duration: 10+3 minutes (including setup time) Classes: 8-12",
      "​ There will be three categories:",
      "○​ (a) Vocals solo (3 mins)",
      "○​ (b) Group song (5 mins)",
      "○​ (c) group instrumentals (2 mins).",
      "​ All participants are to be strictly in school uniform.",
      "​ Songs with objectionable or derogatory lyrics will not be allowed.",
      "​ Pre-recorded music of any form is not allowed, which includes synthesizer accompaniments and drum beats.",
      "​ Laptops are allowed for use of VST tones only, but the performance must be entirely live.",
      "​ A maximum of seven musicians will be allowed.",
      "​ For the group song, there should be more than one vocalist and a minimum of three instruments used.",
      "​ Only the drum kit will be provided by the organising school. Guitar processors, keyboard stands, etc. are to be brought by the respective schools. Participating schools are responsible for their own musical instruments.",
      "​ Points will be deducted for exceeding the time limit. Depiction of the theme in the performance would be appreciated.",
      "​ The Solo Singing must be accompanied by a live musician or band. Karaoke tracks or Keyboard accompaniment beats are not allowed.",
      "​ Timing starts as soon as the first item begins. After the 9th minute (since the start of the performance), a bell will be rung. Participants are required to stop at the 10th minute. Overshooting the time shall result in downmarking.",
      "​ A list of instruments being used by the participants and the number of singers performing has to be emailed to the Fest email ID (home.boscofest@gmail.com) by 3rd July, 2026."
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
      "RULES: Participants: 7+3 Duration: 10 minutes (Empty stage to empty stage) Classes: 6 - 12 The performance must include at least one of the following dance forms:-",
      "1. Bharatnatyam",
      "2. Kathak",
      "3. Semi-Classical",
      "4. Kathakali",
      "5. Odissi",
      "6. Kuchipudi",
      "7. Mohiniattam",
      "8. Bhangra",
      "9. Gidda",
      "10. Creative",
      "​ The entire performance must be ethnic in nature (costumes and music included).",
      "​ Film songs (only instrumentals) are allowed, only if appropriate.",
      "​ A minimum of 4 participants must be onstage throughout the performance.",
      "​ Points will be awarded for the costumes.",
      "​ Vulgarity of any sort will not be entertained and will lead to immediate disqualification.",
      "​ Any use of props or any substance that may damage or leave marks on the stage are strictly prohibited and will lead to immediate penalisation.",
      "​ The music must be emailed to the fest email ID (home.boscofest@gmail.com) by 4th July, 2026.",
      "​ The songs must be submitted in a pen drive, at the registration desk on the day of the fest."
    ]
  },
  {
    id: "western-dance",
    name: "Bosco Tango",
    category: "Dance",
    shortDesc: "High energy, choreographed Western street and contemporary dance.",
    detail: "Western Dance​\n\nWhen the lights cut, you are diving headfirst into a high-velocity blind drop where anything can happen. The execution has to be so razor-sharp that it feels like stepping into a  legendary Michael Jackson music video set, combined with the massive stadium energy of The Weeknd's halftime shows and the chaotic, high-octane synchronization of the IPL 2026 Final dance show. No safe counts, no holding back, just sharp shifts, high stakes, and the risk of leaving everything on the floor. Ditch the manual, take the gamble, and let the ultimate stage adventure begin.",
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
      "RULES: Participants: 7+5 Duration: 5+2 minutes Classes: 8-12",
      "​ There should be a minimum of 5 participants on stage at all times.",
      "​ Points will be deducted for exceeding the prescribed time limit.",
      "​ Any form of vulgarity, inappropriateness, suggestive movements or lyrics will lead to the disqualification of the participating school.",
      "​ The dance track must be emailed to the fest email ID (home.boscofest@gmail.com) by 4th July, 2026. The songs must be submitted in a pen drive, at the registration desk on the day of the Fest.",
      "​ Each participating school must bring their own props for the performance.",
      "​ The decision of the judges will be final and binding.",
      "​ Any inappropriate dress will lead to the cancellation of the performance."
    ]
  },
  {
    id: "dance-faceoff",
    name: "Bosco Overdrive",
    category: "Dance",
    shortDesc: "Own the floor. No rules. Just moves that speak.",
    detail: "When an entire room locks its eyes on the center, a dance battle stops being a casual performance and becomes a massive, collective spectacle. It is the intense, underground crew rivalry of a Step Up 3D battle, the raw, legendary defiance of a ‘You Got Served’ faceoff, and the high-stakes, crowd-pleasing improvisation of a world-class dance arena. It is turning a circle of spectators into an arena of split-second improvisation, where a single clean transition can shut down the music and a flawless counter-move changes everything. Own the center, drop your best combination, and let the ultimate stage adventure begin.",
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
      "RULES: Participants: 2 Classes: 9-12",
      "​ All forms of dance are allowed.",
      "​ Participants dance one by one. Opponents do not dance at the same time.",
      "​ The event will begin with a cipher where each team will have to showcase their skills for a short span of time on any random track played for the first round of selection.",
      "​ This round will be followed by the selection of 8 teams (Judges are free to choose more or less as per convenience).",
      "​ Each time a team faces an opponent, there shall be 2 rounds in which both participants must exhibit their skills.",
      "​ Participants of each school dance in alternative rounds.",
      "​ Commandos are allowed in between. Commandos mean both participants of the school choose to dance together in synchronization. This should not exceed 30 seconds.",
      "​ Participants are expected to be prepared to dance to any of the 20 preset songs mentioned in the email that will be sent on 5th July, 2026.",
      "​ Any obscenity, suggestive movements, insults or vulgarity shall not be tolerated and will lead to immediate disqualification.",
      "​ The judges’ decision is final and binding regarding all cases."
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
      "RULES: Participants: 2 Classes- 9-12",
      "ROUND 1: (30+5) minutes",
      "​ The participants will be given a coding challenge, which is to be solved in 30 minutes.",
      "​ Before that, 5 minutes of brainstorming is allowed after the questions are given.",
      "​ After brainstorming, the participants will be given access to the machines.",
      "​ Both the participants have to participate in this round simultaneously.",
      "​ Contestants have to write the programs in one of the following languages: Python/Java.",
      "​ The program will be considered wrong if it fails to work on one or more of the test cases.",
      "​ It will otherwise be considered correct for the purposes of this contest.",
      "​ A correct program will be awarded the full points.",
      "​ In the event of a tie, programs will be awarded partial credits based on the number of tests correctly passed or the time recorded in ascending order.",
      "​ Sample inputs will be provided to the participants.",
      "​ The coding and the screenshots of the output are to be saved in a folder. Participants will not be allowed to access the internet for any purpose.",
      "​ The method of submission of the code will be provided to the participants on the day of the event.",
      "ROUND 2: 10 minutes",
      "​ Participants will be given a Google form link where they have to solve a quiz related to the historical and technological timeline of Computer Science.",
      "​ Both participants have to brainstorm together.",
      "​ Points will be awarded based on the number of correct replies.",
      "​ Ties will be broken by the total time for each school in ascending order of time.",
      "​ Use of the internet will be strictly prohibited in this round.",
      "ROUND 3: 20 minutes.",
      "​ Participants will be given a block of code and the output desired to be achieved.",
      "​ No coding is to be done in this round.",
      "​ Participants will be given 7 minutes to analyse the problem.",
      "​ The block of code provided will be containing a few syntax/logical/runtime errors which the participants will have to identify the errors",
      "​ The participants will then be given another 15 minutes to correct the errors which they have identified.",
      "​ Participants must use the same block of code, fix the errors they have found, mention what exactly they have changed using comments.",
      "​ If found that participants have changed the logic of the code or created a completely new logic of their own, they will be penalised. Only existing errors are to be rectified, other parts of the code must be the same."
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
      "RULES: Number of Participants: 2 Classes: 9-12",
      "​ Participants will be given Clues based on tech concepts, general knowledge, technology, encryption and basic computer skills.",
      "​ Participants will be allotted two computers wherein they must look for clues and hints to guide them forward through the cyberhunt.",
      "​ Use of the Internet and Artificial Intelligence is strictly prohibited unless stated otherwise by the judges.",
      "​ Each clue leads to the next location or puzzle inside the computer.",
      "​ Participants are not allowed to bring their own gadgets.",
      "​ External help from non-participants is not allowed. If any participant is found taking help from any other person not of their team, they will be penalised severely.",
      "​ One hint token will be given per team and adds a 5-minute time penalty if used. These hints may be a solution to a riddle or might just help them to solve the clues.",
      "​ Clues may be in forms like QR codes, binary, riddles, or tech trivia.",
      "​ All team members must reach the final checkpoint to complete the hunt.",
      "​ The time added due to the use of hint tokens will be added after the participants have finished the hunt.",
      "​ At the end of the game whoever finishes the hunt with the shortest time wins."
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
      "RULES: Number of participants: 1 Classes- 9-12 Time limit: 30+90 mins",
      "Format:",
      "​ The participants will be provided with a theme, related to which they must create a digital artwork.",
      "​ The participants will be required to bring their own equipment that will be required during the duration of the event.",
      "​ The event will be conducted in two phases.",
      "​ PHASE 1 (BRAINSTORMING):",
      "​Participants will be given 30 mins for the ideation of their design.",
      "​During this period, only the use of sketch pads and traditional art materials will be permitted.",
      "​Use of the internet is allowed only during this phase.",
      "​Note that the sketch created in this phase will not be marked. It is only for the participants to get an idea of what they want to create in the following phase.",
      "​ PHASE 2 (DIGITAL ART):",
      "​Participants will be given 90 mins to create their actual design.",
      "​Use of the internet is strictly prohibited during this time.",
      "​A fresh design must be made digitally using a stylus and an ipad that the participant is expected to bring.",
      "​Participants are allowed to refer to the sketch they created in the first phase.",
      "​The final scoring will be based on the artwork created during this phase.",
      "​The use of mobile phones, laptops, AI tools or internet access is strictly prohibited during this time",
      "​ Failing to adhere to the theme will result in reduction of score.",
      "​ Any form of plagiarism or copied content will lead to immediate disqualification.",
      "​ The decision of the judges shall be final and binding.",
      "​ Any form of misconduct or disturbance during the event will result in immediate disqualification."
    ]
  },

  // ─── MULTIMEDIA ───
  {
    id: "short-film",
    name: "Bosco Montage",
    category: "Multimedia",
    shortDesc: "Create, shoot, and compile a short narrative film based on the theme.",
    detail: "From the crazy adventures of Indiana Jones to the cinematic genius of Christopher Nolan, cinema has always been for people bold enough to go all in on their ideas. This event is your chance to lock in and direct your own masterpiece—where every shot gives Interstellar vibes, every twist has the intensity of Mission Impossible, and every scene is an absolute mic-drop moment. This is not just filmmaking—it is your chance to let the creative thoughts win, build entire worlds, and turn random ideas into something that feels straight out of Netflix; after all,  sometimes the biggest flex is not finding the treasure—it is creating a story so peak that nobody can look away from it.",
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
      "RULES: Participants: 5+10 Movie duration: 5 to 10 minutes Classes: 9-12",
      "​ All schools must register as a team, having a minimum of 5 and a maximum of 15 participants, including a director, a scriptwriter, a cinematographer, an editor and the actors.",
      "​ It should be of an appropriate quality, pertaining to the theme given to the schools.",
      "​ The storyline of the film should be an original one and should not be plagiarised from any existing project.",
      "​ Each school must give an introduction to the film, before the film starts.",
      "​ The time duration of the film will include the introduction and the credits.",
      "​ Exceeding the given time limit will result in penalisation.",
      "​ The theme of the film for each school will be given on 27th June, 2026 and the made film must be submitted by 3rd July, 2026 to home.boscofest@gmail.com.",
      "​ No part of the film should endorse any form of vulgarity or obscenity.",
      "​ The script should be predominantly in English. Vernacular phrases might be used. Excessive use of vernacular language as well as visual effects will lead to penalisation.",
      "​ Any appropriate type of music which is available on the internet, or, self-composed, can be included occasionally.",
      "​ Top 8 schools’ submissions shall be screened."
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
      "RULES: Participants: 2 + 1 Classes: 9-12",
      "​ The participants must prepare an infotainment PowerPoint presentation of 4 minutes covering the entire fest.",
      "​ The participants are also required to prepare a short video of 40-50 seconds capturing the best moments of the event (this can be done using any editing software and NOT in MS PowerPoint).",
      "​ The primary language used must be English, with the option to incorporate a limited amount of vernacular language. Vulgarity of any kind will not be tolerated.",
      "​ The participants are allowed to bring any shooting equipment they require like DSLRs, GoPros, Pendrive, tripods, microphones, etc. They can use background music.",
      "​ No equipment shall be provided by the host school. Loss of participants’ belongings shall not be the responsibility of the host school.",
      "​ At least two participants have to be present during the PowerPoint screening.",
      "​ Participants must submit a handwritten report of around 150 words summarizing the fest. They must share their experience and opinions through the report and can even include a short interview of another participant.",
      "​ During the competition, the registered participants are allowed to interview other participants but cannot directly use them for help in the journalistic process, doing so will lead to immediate disqualification.",
      "​ Use of unethical means will lead to immediate disqualification of the participating school.",
      "​ If any material is found uploaded on social media in any form, it shall lead to immediate disqualification. The participants, during the event should strictly not go live on any of the social media platforms.",
      "​ The use of mobile phones is strictly prohibited, participants can use cameras and microphones for recording purposes.",
      "​ The participants are allowed to collect the necessary materials till 11:00 am on the second day, following which they shall edit and prepare their presentations. The final submission should be ready by 12:30 pm, including editing and formatting.",
      "​ The submissions by the participants can include constructive criticism, however no form of insult or mockery will be tolerated against anybody.",
      "​ All submissions are to be made in a pendrive only."
    ]
  },
  {
    id: "photography",
    name: "Bosco Vignette",
    category: "Multimedia",
    shortDesc: "Freeze moments. Tell stories without words.",
    detail: "Peter Parker needs his camera to pay rent. And you? You need to capture the ultimate shot of this school fest. Photography is not just about tapping a screen. It is a high-stakes safari through unpredictable crowds and shifting lights. Think of your camera as a compass. You can chase the neon-drenched atmosphere of Blade Runner, or trek towards a raw, candid moment worthy of a National Geographic cover. Take the adventure past the obvious angles and discover a completely new perspective. ​",
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
      "RULES: Participants: 2 Duration: 90 + 30 minutes Classes: 9-12",
      "​ All cameras, laptops and pen drives must be brought by the participants. The host school will not provide any such equipment required for the event.",
      "​ Participants are responsible for their own belongings.",
      "​ The host school is not responsible for the loss of any such belongings.",
      "​ Photography must strictly be done using DSLRs, SLRs, or Mirrorless cameras.",
      "​ Mobile Phone photography is not permitted and will lead to disqualification.",
      "​ Participants will be given five topics on the day of the event, in the form of one-liners or phrases which have special significance to this year’s theme.",
      "​ Out of the five, one topic will be compulsory, and the participants must decide on any two out of the remaining four.",
      "​ The participants will, in total, submit 3 photographs based on the given themes.",
      "​ All submissions are to be made in a pen drive.",
      "​ A digital copy must also be maintained with the participants.",
      "​ No touch-ups or editing will be allowed.",
      "​ Using presets or filters is also not permitted.",
      "​ The participants must give a one-line caption to each photograph.",
      "​ Participants will be asked questions by the judges on the technical aspects and the relevance of the photographs they present with respect to the theme.",
      "​ The submissions will be judged based on technique, creativity, composition, relevance to the theme, caption, and the responses to the questions given by the participants."
    ]
  },
  {
    id: "ad-wars",
    name: "Bosco Caricature",
    category: "Multimedia",
    shortDesc: "Pitch, market, and perform a live advertisement for a bizarre gadget.",
    detail: "Wait... a bunch of influencers convinced millions of people that a bottle of flavoured water was the coolest thing on the planet? Yep. And that is exactly why advertising is one of the greatest adventures out there. This is not  just about selling a product—it is about turning the ordinary into the unforgettable. One moment you are staring at an object thinking, \"Bro, what am I even supposed to do with this?\" and the next you are building a story, creating hype, and making people believe it is the greatest thing they have seen all day. So lock in, trust the creative chaos, and let your imagination cook because somewhere between the memes, the madness, and the marketing magic, you will discover the secret every advertiser is chasing.",
    icon: "📣",
    difficulty: "Explorer",
    difficultyColor: "#65C466",
    teamSize: "6 + 2 Performers",
    time: "Day 2, 1:30 PM",
    location: "Mini Stage B",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹10,000 + Creative Ad Seal",
    rules: [
      "RULES: No. of Participants - 6+2 Classes - 9-12",
      "Round 1: Time limit- 1 minute+30 seconds",
      "​ Schools shall be randomly allotted the brands that they will represent on 2nd July, 2026 through an online meeting where their competitors shall also be revealed to them. They will have to submit the advertisements on the 6th of July, before 23:59 PM.",
      "​ Teams are required to make a minimum one minute advertisement, highlighting their company and showing that they are “better” than their rival.",
      "​ All teams are required to submit their video files via pen drives during registration on the day of the event as well as via email to home.boscofest@gmail.com before the deadline.",
      "Round 2: Time limit- 30+15 seconds (ad)",
      "​ On the day of the fest, based on the marking of the judges, the top 6 teams shall be required to make another ad, representing a new company by a minimum thirty seconds’ advertisement, once again, highlighting their company and showing that they are “better” than their new rival.",
      "​ The teams shall be given around 4 hours to shoot and edit their ad.",
      "​ The videography shall be done only within school premises during the allotted time. The editing must be done in the assigned venue.",
      "​ Pre-recorded videos and animations shall not be permitted.",
      "​ The participants must bring their own equipment for recording, editing, etc. The host school will not provide any equipment.",
      "​ The host school will not be liable for any loss or damage to the equipment.",
      "General Rules:",
      "​ The first 11 schools to submit their names shall be allowed to participate in the event. They shall be divided into 3 groups of 4 teams each. Each group shall be provided with the same product category, but different brands. Each team shall be paired up with a rival from among the group. The winner shall proceed to",
      "round 2 and will face off against the other winner of the group on the day of the fest. Finally, with 6 teams left, each team shall face off against the opposition that has qualified from their group. The 3 winners shall be awarded 1st, 2nd and 3rd position based on external factors like idea, creativity, and execution.",
      "​ No form of vulgarity or obscenity shall be tolerated and will be dealt with accordingly.",
      "​ The time limit of each round must be respected and failure to meet it shall result in penalisation.",
      "​ All members of all participating teams are required to be present on the day of the fest.",
      "​ Use of vernacular language will not be permitted."
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
      "RULES: Participants: 4 Classes: 9-12",
      "​ The tournament will be of 5 rounds, as per FIDE Swiss League System.",
      "​ All FIDE rules need to be duly followed.",
      "​ National level referees will conduct the event.",
      "​ The participants cannot walk in and out of the rooms where the competition is being held.",
      "​ It is the responsibility of the participants to ensure that when they are participating in chess, they are not expected to report for some other event. There shall be no exceptions in this regard.",
      "​ The faintest hint of aggression or use of unparliamentary language, either towards the opponent or the teachers/organizers of the games shall lead to immediate disqualification of the team.",
      "​ The decision of the organisers will be considered final and binding in all cases."
    ]
  },
  {
    id: "table-tennis",
    name: "Bosco Ricochet",
    category: "Sports",
    shortDesc: "Rapid-fire singles table tennis matches in the recreational camp.",
    detail: "Harry had a wand. You have a paddle. Embark on an adventure where every spin is a plot twist and every rally a battle against the odds. Following the legacy of Ma Long, Fan Zhendong, and Jan-Ove Waldner, you will face unpredictable spins, relentless attacks, and heart-racing moments that demand split-second brilliance and unwavering composure. Every rally is an adventure. ‘They call it a point. We call it a story.’ A story of courage, comebacks, and opportunities seized in the blink of an eye. The table is your stage, the racket your pen, and every shot writes a new chapter.",
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
      "RULES: Participants: 2+2 Duration: 240 minutes Classes: 9 - 12",
      "​ The tournament will be divided into two categories: (a) Boys (b) Girls",
      "​ Co-ed schools may send either a boy’s team or a girl’s team or both.",
      "​ Participating teams have to wear proper sportswear for the event.",
      "​ Participants are advised not to wear white t-shirts.",
      "​ All games will be played in a knockout format.",
      "​ If the number of schools is limited, the Technical Director may make some changes in the format.",
      "​ Every set, whether singles or doubles, will be played in the form of best of three games.",
      "​ All the rules will be strictly followed according to the International Table Tennis Federation (ITTF). Each match consists of three games (all best of 3) - two singles and one doubles.",
      "​ The players playing singles cannot play doubles and vice-versa.",
      "​ No exceptions will be made under any circumstances.",
      "​ The order of players in each game must be mentioned beforehand.",
      "​ If any team wins two separate consecutive singles, then no doubles are to be played and that team will be declared the winner.",
      "​ No equipment apart from the table tennis balls shall be provided by the organising committee.",
      "​ The faintest hint of aggression, or the use of unparliamentary language, either towards the opponent or the teachers/organisers of the games shall lead to immediate disqualification of the team.",
      "​ The Technical Director’s decision regarding any technical matter is final and binding.",
      "​ Every school has to arrive 30 minutes ahead of the scheduled time and report to the Chief Referee."
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
      "RULES: [Separate for Boys and Girls] Participants: 6+6=12",
      "​ The event is a Knock-Out Team Event.",
      "​ Matches will be held according to the FIVB (Fédération Internationale de Volleyball) Rules.",
      "​ All the games will be played in best-of-three-sets. The first two sets will be of 25 points and if the teams are tied then the third set will be of 15 points.",
      "​ All teams should have a team jersey with a number.",
      "​ The referee's decision on any rule/dispute is final and binding on all.",
      "​ Co-ed schools may send either a boys’ team or a girls’ team or both.",
      "​ The faintest hint of aggression, or the use of unparliamentary language, either towards the opponent or the teachers/organisers of the games shall lead to immediate disqualification of the team.",
      "​ Every school has to arrive 30 minutes ahead of the scheduled time and report to the Chief Referee."
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
      "RULES: Participants: 2 per team Classes: 9-12 Number of rounds: 3",
      "Round 1: Tag",
      "​ Participants from opposing teams will be paired randomly on the day of the event.",
      "​ There will be two rounds for each pair. Each round will be 20 seconds long.",
      "​ One participant will be allotted the position of ‘catcher’, while the other will act as the ‘runner’. This position will be reversed in the second round.",
      "​ The game will take place in an area filled with obstacles. If the runner evades capture for the entirety of the round, they are declared the winner for that",
      "round. If they are captured before the time limit, points will be awarded based on the time for which they are able to evade capture.",
      "​ The catcher must ‘tag’ or touch the runner with their hand (not their foot or any other part of their body) before the round ends, to win the round. Bonus points will be awarded depending on the time taken to catch the runner.",
      "Round 2 and 3: Unconventional Games",
      "​ The rules for this round will be declared on the day of the event itself. Note: Points will be calculated cumulatively for each team. The team with maximum points at the end of all 3 rounds shall win."
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
      "RULES: Classes: 9-12 (There shall be separate draws for girls and boys.)",
      "Category:",
      "Doubles: 2 players per team",
      "​ Entries per School:",
      "○​ Maximum 1 team for Doubles",
      "○​ If a school is co-ed, they can either send a boys team or a girls team or both.",
      "​ Court: Adapted court (20 ft x 44 ft), marked for Pickleball.",
      "Event Format:",
      "​ Preliminary Rounds:",
      "○​ Type: Knockout Match",
      "○​ Length: First to 7 points win by 2",
      "​ Semi-Finals:",
      "○​ Length: First to 11 points, win by 2",
      "​ Finals:",
      "○​ Format: Best of 3 sets",
      "○​ Switch Sides: Teams switch sides at the end of each set",
      "○​ Each Set: Played to 11 points, win by 2",
      "Code of Conduct:",
      "1.​ Respect the referee’s decisions at all times.",
      "2.​ Any form of misconduct, arguing, shouting, or unsportsmanlike behaviour will lead to disqualification.",
      "Stipulations:",
      "​ Time-Outs: One 1-minute timeout per match allowed",
      "​ Mandatory sports attire required",
      "​ Caps/sunglasses allowed for outdoor play",
      "​ Referees: PE staff or trained volunteers will officiate all matches",
      "​ Indoor pickleballs will be provided. All matches will be conducted in accordance with the official rules of USA Pickleball. Note to Participants: Participants must report at least 15 minutes before the scheduled match or round. Carry personal water bottles and towels. A schedule of matches/rounds will be released prior to the event day. Players are to carry their own personal paddles."
    ]
  },

  // ─── ART AND LITERATURE ───
  {
    id: "digital-art-literature",
    name: "Bosco Spearhead",
    category: "Sports",
    shortDesc: "Precision and distance javelin throw track and field event.",
    detail: "(Savio) (Pre-determined event) This is not just a javelin throw. It is the opening chapter of a grand adventure. Charge down the runway with Link's determination, Hawkeye's accuracy, and Tanjiro's never-give-up mindset. Like Luffy chasing the One Piece or Indiana Jones hunting the next legendary artifact, you are heading where no one else has gone before. The runway is your questline, the sky is your open world, and the javelin is your final power-up. No respawns. No second chances. Just one throw to make the highlight reel. Take aim, let it fly, and unlock legendary status",
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
      "​ All the Rules of World Athletics will be followed.",
      "​ Each athlete shall be allowed three trials and the eight athletes with the best valid performances shall be allowed three additional trials. In the event of a tie, the winner will be the athlete with the next-best measure.",
      "​ The javelin shall be held at the grip with one hand only. The athlete cannot wear gloves on their throwing hand.",
      "​ It shall be thrown over the shoulder or upper part of the throwing arm and shall not be slung or hurled. Non-orthodox styles are not permitted.",
      "​ The distance is measured from the nearest mark made in contact with the ground when it first lands by the head of the javelin to the inside edge of the throwing arc, along a line to the centre of the circle of which the arc is part.",
      "​ The faintest hint of aggression, or the use of unparliamentary language, either towards the opponent or the teachers/organisers of the games shall lead to immediate disqualification of the team. It shall be considered as a failure:-",
      "​ If the athlete doesn’t start his attempt within the time allowed.",
      "​ If the athlete turns his back to the landing area at any stage during their approach run and throw.",
      "​ If any part of their body touches the lines marking the runway or throwing arc.",
      "​ If the metal head does not contact the ground before any other part of the javelin.",
      "​ If the metal head of the javelin in contact with the ground when it first lands touches the sector line or the ground outside the sector line.",
      "​ If the athlete fails to hold the javelin by the grip or the athlete leaves the runway before the javelin has landed."
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
    stage: "Off-stage",
    bounty: "₹15,000 + Green Leaf Award",
    rules: [
      "RULES: No. of participants: 2 Duration: 120 minutes Classes: 9-12 NO MATERIALS will be provided by the host School. List of materials to be brought by the Participants:",
      "​ Only sustainable/recycled/biodegradable materials to be used.",
      "​ Any substances inflicting harm, injury or obscenity will not be permitted.",
      "General Rules:",
      "​ Participants must submit a hardcopy mentioning items being used for presentation to the judges on the day of the event.",
      "​ Fashion or decoration items having utilitarian value will be appreciated.",
      "​ Participants must bring their own materials required for their item. ITEMS NOT PERMITTED: SUPERGLUE (Fevi kwik), GLUE GUN and MANNEQUIN.",
      "​ Participants must clean their workstation after completion of the event. Participants must take back all unused materials that were brought by them. Littering is not permitted.",
      "​ Late submission will incur a deduction of points.",
      "​ Plagiarised items or ideas will face immediate disqualification.",
      "​ Any kind of Vulgarity depicted through the art work will lead to immediate disqualification. Both participants are required to actively participate in the event for its entire duration.",
      "​ A bell will ring at the end of 120 minutes (2 hours) and all participants MUST stop.",
      "​ The participants must demonstrate the utility of their products and answer questions asked by the judges within a time frame of 3+2 minutes.",
      "​ No digital means of presenting the utility of the product shall be allowed.",
      "​ The judges’ decision will be final and binding on all the participants.",
      "​ The item to be exhibited must be built up from scratch to finesse during the duration of the event only. No predesigned, pre-built structures will be allowed."
    ]
  },
  {
    id: "art-graffiti",
    name: "Bosco Art Attack",
    category: "Art and Literature",
    shortDesc: "Graffiti and mural sketch design on large parchment canvas boards.",
    detail: "From the mind-bending creativity of Picasso to the cartoon chaos of Walt Disney, every legendary artwork started with someone looking at a blank space and thinking, \"Yeah, I can definitely do something cool with this.\" And that is exactly what this event is all about. . One moment you are drawing a simple idea, and the next you are fighting your own creative boss battle, trying to figure out whether you have made a masterpiece or accidentally started a whole new art style. So grab your markers, paints, and spray cans, trust the chaos, and let your imagination carry the map, because here adventures are not found- they are created.",
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
      "RULES: Participants: 2 per category Duration: 120 minutes The event is divided into two categories, schools can participate in one or both categories. Seniors (Classes: 9-12): One participant will draw and paint on the topic on the Canvas. The other participant will create a visual logo and a slogan on an A3 size paper which will impart a strong message on the theme.",
      "Rules:",
      "​ Participants MUST submit a hard copy mentioning items being used to the judges on the day of the event.",
      "​ The paintings MUST correlate with the theme. The participants must carry the following items with them:",
      "​ Boards for mounting A3 size paper for slogan writing.",
      "​ Acrylic Paints (Non-Toxic)",
      "​ Markers",
      "​ Colour Pencils",
      "​ Paintbrushes",
      "​ Toothbrush",
      "​ Palette",
      "​ Cotton Cleaning Cloth (and any other required items).",
      "​ Spray paints are not allowed",
      "​ Only A3 size Canvas and A3 size paper will be provided by the host school.",
      "​ Any sort of tracing or duplicating will lead to immediate disqualification.",
      "​ Any kind of vulgarity depicted through the artwork will lead to immediate disqualification.",
      "​ Participants must clean their workstation after completion of the event.",
      "​ Participants must take back all unused materials that were brought by them.",
      "​ Both participants are required to actively participate in the event for its entire duration.",
      "​ A bell will ring at the end of 120 minutes and all participants MUST stop.",
      "​ Judges will question the participants on their art work and its relevance to the theme (Time: 3+2 minutes).",
      "​ The judges’ decision will be final and binding on all the participants. Littering the campus is strictly prohibited.",
      "​ The final artwork will be retained by the host school Juniors (Classes: 6-8): One participant will do sketching and pencil shading on the topic on an A3 size paper. The other participant will write a slogan on A3 size paper which will impart a strong message on the theme.",
      "Rules:",
      "​ There will be 2 participants from this event",
      "​ The paintings MUST correlate with the theme. The participants must carry the following items with them:",
      "​ Boards for mounting A3 size paper for slogan writing",
      "​ Shading pencils, erasers, etc.",
      "​ Markers for slogan",
      "​ Cotton Cleaning Cloth (and any other required items).",
      "​ Only Two sheets of A3 size paper will be provided by the host school.",
      "​ Any sort of tracing or duplicating will lead to immediate disqualification.",
      "​ Any kind of vulgarity depicted through the artwork will lead to immediate disqualification.",
      "​ Participants must clean their workstation after completion of the event.",
      "​ Participants must take back all unused materials that were brought by them.",
      "​ Both participants are required to actively participate in the event for its entire duration.",
      "​ A bell will ring at the end of 120 minutes and all participants MUST stop.",
      "​ Judges will question the participants on their art work and its relevance to the theme (Time: 3+2 minutes).",
      "​ The judges’ decision will be final and binding on all the participants. Littering the campus is strictly prohibited.",
      "​ The final art work will be retained by the host school."
    ]
  },
  {
    id: "poetry-writing",
    name: "Bosco Magnum Opus",
    category: "Art and Literature",
    shortDesc: "Let your words create a storm that stays.",
    detail: "Forget the dusty stanzas and rigid rhyme schemes of the past. Your words are not meant to sit quietly on a page, they are meant to seize the day, ‘Carpe Diem’ as John Keating said. This is your 3 a.m. notes app breakthroughs thrown into a high stakes, high reward quest for glory. Wednesday did put it right, “It is no wonder Edgar Allan Poe became a drug-addled madman.”, not only because he went to Nevermore, but because he was trying to write a masterpiece that would shake Shakespeare himself. Now it is your turn. Follow the trail of imagination, venture beyond the ordinary, and see where the words lead.",
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
      "RULES: Participants: 2 Duration: 60 mins Classes: 9-12",
      "Rules:",
      "​ Participants will be provided with a theme/topic on the spot, based on which they are expected to write an original poem within the time frame provided.",
      "​ Poems must be written in English only.",
      "​ Any form of plagiarism or copied content will lead to immediate disqualification.",
      "​ Poems should be a maximum of 16 lines.",
      "​ Poems must be divided into stanza of 4 lines each.",
      "​ Poems should follow a rhyme scheme so that the lines sound musical and pleasant.",
      "​ At least 2 figures of speech must be clearly used:-",
      "​Simile",
      "​Metaphor",
      "​Alliteration",
      "​Hyperbole",
      "​ Participants are encouraged to focus on creativity, originality, expression, vocabulary, and relevance to the theme.",
      "​ Participants must bring their own writing materials. Sheets will be provided by the organisers.",
      "​ The use of mobile phones, laptops, AI tools, internet access, or reference materials is strictly prohibited during the competition.",
      "​ Poems will be marked on originality, creativity, use of vocabulary and figures of speech, and for the ability to incorporate the themes in their writing.",
      "​ The decision of the judges shall be final and binding and any form of misconduct or disturbance during the event will result in immediate disqualification."
    ]
  },

  // ─── PERFORMANCE ───
  {
    id: "jam",
    name: "Bosco Minute Mania",
    category: "Performance",
    shortDesc: "Speed speaking challenge without hesitation, deviation, or repetition.",
    detail: "Just A Minute​\n\nThe Doctor had a TARDIS. You have just sixty seconds. That is all you get. In this adventure against the clock, hesitation is your greatest enemy and confidence is your strongest ally. Sounds easier than getting through a single Instagram reel, but the moment you step up to the mic, your brain goes full Seong Gi-Hun. Speak fast, and think faster - a microsecond of silence and you are eliminated faster than a player tripping in ‘Red Light, Green Light’. Lock in, channel your inner Max Verstappen, and prove that you can conquer the clock under sixty seconds of pure, fast-paced adrenaline.",
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
      "RULES: Participants: 1 ​ Duration: 60 seconds + 2 minutes Classes : 9 – 12",
      "Rules:",
      "​ All participants shall be given 60 seconds, i.e., one minute to speak on a given topic. The topic shall be given to them 10 seconds before commencement of the event.",
      "​ During the speech, the use of vulgarity, profanity or unparliamentary language shall be heavily down marked by the judges. Participants should also refrain from any personal attack or any statement that hurts anyone’s cultural, regional or religious identities.",
      "​ If the student exceeds the time limit, 0.5 points shall be deducted for every 10 seconds exceeded.",
      "​ After the initial speech of the participants, an interpellation round shall follow in which they will be asked to defend their respective points on the topic to be asked by the judges present.",
      "​ The judges’ decision will be binding on all the participants.",
      "​ Participants should be present at the venue throughout the duration of the event."
    ]
  },
  {
    id: "improv",
    name: "Bosco Ad-Lib",
    category: "Performance",
    shortDesc: "Impromptu acting rounds based on comical scenarios given on-spot.",
    detail: "Did you know the famous “I am Iron Man” line in Iron Man was completely improvised? Robert Downey Jr. threw out the script, stepped into the unknown, and changed the entire Marvel Cinematic Universe forever. This is not a casual stroll, it is a high-stakes competition. It is an expedition into uncharted comedic territory where there is no safety net. Be spontaneous. Seize the moment. Treat the stage like your own personal adventure, where your sharpest wit is your only compass. Leave your audience on the edge of their seats, or make them fall off in laughter. Will you find the perfect line, the perfect joke to survive the adventure, or will you crumble under the fierce spotlight?",
    icon: "🎭",
    difficulty: "Veteran",
    difficultyColor: "#6EC6FF",
    teamSize: "3 + 2 Actors",
    time: "Day 2, 11:00 AM",
    location: "Mini Stage Auditorium",
    day: "Day 2",
    stage: "Off-stage",
    bounty: "₹10,000 + Improv Mask Trophy",
    rules: [
      "RULES: Participants: 3+2 Classes: 9-12",
      "Round 1- The Suggestion Box Time limit: 1 minute 30 seconds+30 seconds",
      "​ Teams are required to draw a random location and a random scenario from a “hat” and must build a scene around them. Participants get a 30 second interval to understand their tickets and plan their act.",
      "Round 2- The Turnaround Time limit: 1 minute 15 seconds",
      "​ Teams are required to enact a scene from any short film, movie, documentary, video, story, novel, or any source of media and entertainment; with their own take on it, in essence, turning the original scene into a brand new one and giving a different perspective to the original scene. Rules for the round-",
      "​ Teams are required to submit a transcript of the original scene and along with it a script of their own take on it, which they shall perform during the round, by 5th July, 2026.",
      "​ Teams are to make sure that all content does not include any form of vulgarity or any take on religious or political themes.",
      "Round 3- Genre Mashup Time limit: 30+30+30seconds",
      "​ The moderators will give the team a genre and a few introductory lines, and the participants are to enact an original scene based on that within the first 30 seconds.",
      "​ After the first 30 seconds, the moderators will ‘shout’ a genre and the participants have to immediately switch their dialogues and actions to match with the new genre that is given to them.",
      "​ Once the first minute is over, the participants will be expected to include aspects and themes from as many genres as possible and markings will be based on how the participants are able to express the genres they perform.",
      "Ethical Guidelines and Restrictions-",
      "​ No use of fire, sharp objects, or hazardous materials in any form.",
      "​ No obscene gestures, dialogues, or references — verbal or symbolic.",
      "​ No use of regional or local vernacular/slang. The act must be in English or Hindi.",
      "​ No promotion of violence, hate speech, discrimination, or political opinions.",
      "​ Any violation will result in instant disqualification.",
      "​ The act must not be meant to disrespect anyone.",
      "Equipment & Technical Setup:",
      "​ A microphone and basic sound system will be provided.",
      "​ Any other props, instruments, or materials must be brought and managed by the participant.",
      "​ Time required for setup must be kept minimal (ideally under 30 seconds) for round 1."
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
      "RULES: Participants: 4 Duration: 60 seconds per round (for each team) Classes- 9-12 No. of Rounds: 2",
      "General Rules:",
      "​ All actions performed must be entirely silent. Actors are strictly prohibited from speaking, mouthing words, providing verbal cues, or producing any form of sound.",
      "​ Only gestures, facial expressions and body movements are permitted to convey the intended message.",
      "​ Participants are not allowed to write words or letters, spell, point to objects, use props, or draw in any form.",
      "​ Any instance of speaking or mouthing words will result in the forfeiture of the round and no points shall be awarded.",
      "​ Topics for both the rounds will be provided by the organizers.",
      "​ In both the rounds, teams will be allotted a maximum of 60 seconds to provide the correct answer.",
      "​ No team member can perform more than once throughout the competition.",
      "​ While one team is performing, the opposing teams must refrain from causing any form of distraction. Any such behaviour shall be considered unfair and may lead to disqualification.",
      "​ Usage of objectionable, obscene, suggestive or derogatory gestures is strictly prohibited.",
      "​ In the event of a tie at the conclusion of both the rounds, a sudden-death",
      "round may be conducted.",
      "​ The decision of the panel of judges shall be final and binding.",
      "Round 1 :",
      "​ Each team will nominate one member as the actor, while the remaining members will serve as guessers.",
      "​ The nominated actor will choose a topic through a drawing of lots from the pre-written topics that will be provided by the organizers. The topic will either be the title of a Movie or a TV Series which the actor must silently perform for the other team members to guess.",
      "​ Only the performing team is allowed to guess during their turn.",
      "​ All guesses must be made within a 60-second time limit.",
      "​ A correct guess within the time limit will earn the team 10 points.",
      "Round 2:",
      "​ In each turn, a team will nominate one member as the guesser, while the other team members will act out the cues.",
      "​ The guesser must hold a card which has the cue to his/her forehead without looking at it.",
      "​ Each participating school will receive five cards from the organizers through a drawing of lots, covering the topics: Animals, Books, Songs, Famous Personalities and Food.",
      "​ Only the designated guesser may attempt to identify the word or topic on the card. If any particular word or topic on the card is too difficult, the guesser may say “Skip” to move on to the next card.",
      "​ All guesses must be made within a 60-second time limit.",
      "​ The objective is to correctly guess as many words or topics as possible within the allotted time.",
      "​ 10 points will be awarded for each correct guess made within the specified time limit"
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
    stage: "Off-stage",
    bounty: "₹8,000 + GI60 Seal",
    rules: [
      "RULES: Participants: 1+1",
      "​ Primary Performer (Judged)",
      "​ Assistant/Support (Not Judged) Time Limit: 60 seconds Classes: 9-12 Maximum Entries per School: 1 (Only one participant will be judged)",
      "Rules & Regulations: Originality & Creativity: The act must be entirely original and created by the participant(s). Copying well-known routines, copyrighted content, or viral acts will negatively impact scoring. Type of Performance Allowed: The event is open-ended, meaning participants may choose from a wide range of non-violent, non-obscene talents. Acceptable acts include but are not limited to:",
      "​ Miming",
      "​ Mimicry",
      "​ Physical or juggling tricks",
      "​ Artistic expression (live sketching, sand art, speed painting, etc.)",
      "​ Cubing / Speed solving",
      "​ Dance or musical performances",
      "​ Magic tricks",
      "​ Ventriloquism",
      "​ Instrumental solos (non-amplified instruments allowed only if volume permits) Note: The act must conform to the ethics and safety standards set below.",
      "Ethical Guidelines & Restrictions:",
      "​ No use of fire, sharp objects, or hazardous materials in any form.",
      "​ No obscene gestures, dialogues, or references — verbal or symbolic.",
      "​ No use of regional or local vernacular",
      "​ No use of invectives.",
      "​ The act must be in English.",
      "​ No promotion of violence, hate speech, discrimination, or political opinions.",
      "​ Any violation will result in instant disqualification.",
      "​ The act must not be meant to disrespect someone. Time Limit & Stage Protocol:",
      "​ Each act will be timed strictly to 60 seconds.",
      "​ Time will begin the moment the participant starts the act (not during setup).",
      "​ Acts exceeding the limit may be penalized or disqualified.",
      "​ Participants should report backstage at least 20 minutes before their performance slot.",
      "Equipment & Technical Setup:",
      "​ A microphone and basic sound system will be provided.",
      "​ Any other props, instruments, or materials must be brought and managed by the participant.",
      "​ Time required for setup must be kept minimal (ideally under 30 seconds).",
      "​ Only the primary performer will be judged. The supporting participant may assist but will not be considered in scoring.",
      "Judges’ Decision:",
      "​ The judges’ decisions will be final and binding.",
      "​ No appeals, clarifications, or re-performances will be entertained.",
      "​ Any form of misconduct or misbehavior towards judges, volunteers, or audience will result in immediate elimination.",
      "Important Notes for Participants:",
      "​ Respect time and space – keep your act compact and efficient.",
      "​ Use the microphone wisely – clarity and articulation matter.",
      "​ Test your props and materials beforehand; no trial time will be given.",
      "​ Bring all essentials yourself – no borrowing from other teams or schools will be allowed.",
      "​ Avoid overcomplicating the act; simplicity with flair wins."
    ]
  },
  {
    id: "turncoat-debate",
    name: "Bosco Figure-it-out",
    category: "Performance",
    shortDesc: "A quick-thinking deduction and riddle-solving performance challenge.",
    detail: "To be Revealed on the day of the event ​ (YE)\n\nNot every adventure begins with a map. Some begin with a question, a pattern, or a detail that doesn't quite fit. Step into the unknown, think beyond the obvious, and see where curiosity takes you. Channel Sherlock's instinct for the unexpected and L's ability to look past appearances. The path ahead is uncertain, the answers aren't always visible, and that's exactly what makes the journey worth taking.",
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
      "​ Participants are expected to be well versed with the usage of the English language, anagrams, general knowledge and the application of critical thinking to decode problems.",
      "​ The rules of the events will be revealed on the day of the event itself.",
      "​ Best of Luck!"
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
      "RULES: Participants: 5+3 Duration: 8+2 minutes Classes: 9-12 Event Details:",
      "Indirect political references are permitted, however no specific mentions should be made to any political entity.",
      "No use of vulgar, profane or inappropriate language will be tolerated. Violation of this will result in immediate disqualification. No vulgarity will be accepted in regards to attire.",
      "No props of any sort will be provided. No audio equipment is allowed. Each team is required to bring their own props if needed. The host school will not be held responsible for any loss or damage of props.",
      "The act can be in English, Bengali or Hindi. Participants are also permitted to use more than one language in their acts.",
      "The top five schools as per scores will move on to round 2.",
      "The decision of the judges and the organisers will be considered final and binding in all cases.",
      "ROUND I – The Fairy Tale Flip Theme: Remaking of Fairy Tales from Around the World Participants must creatively reinterpret, modernise, parody, or reimagine famous fairy tales from different cultures and countries. Teams may adapt classic stories by changing the setting, perspective, ending, time period, or underlying message while retaining recognisable elements of the original tale. Possible approaches:",
      "Modern retelling of a traditional fairy tale",
      "Fairy tale from a villain’s perspective",
      "Cultural adaptation of an international fairy tale",
      "Humorous parody or satire",
      "Alternative endings or twists",
      "Fairy tales placed in contemporary society Examples:",
      "Cinderella in the digital age",
      "Little Red Riding Hood set in a modern city",
      "The Pied Piper of Hamelin with a contemporary social issue",
      "Snow White reimagined with changing social values",
      "An Indian adaptation of a European fairy tale Schools may choose fairy tales from any country or culture, provided the adaptation remains appropriate for school performance. Script Submission",
      "Soft copy email deadline: 5th July, 2026",
      "Email ID: home.boscofest@gmail.com",
      "Hard copy to be submitted at registration on fest day. Time Limit",
      "Performance: 8 minutes",
      "Grace period: 2 minutes",
      "Negative marking for exceeding time limit",
      "ROUND II – THINK • TWIST • THEATRE Objective: This round aims to assess participants’ spontaneity, creativity, wit, and storytelling abilities through themed improvisation.",
      "Format:",
      "Teams will draw chits containing one situation and two dialogues.",
      "Participants must create and perform an improvised scene incorporating the given prompts.",
      "The performance should present a clear and coherent narrative. Duration:",
      "Preparation Time: 30 seconds",
      "Performance Time: 2 minutes + 1 minute grace period Participants:",
      "2 members from each qualifying school will participate.",
      "The participants must be selected from among the members who performed in Round I.",
      "Teams will receive 30 seconds to organise their plot before performing immediately.",
      "Rules & Restrictions:",
      "No pre-written scripts will be allowed.",
      "No external assistance, including the internet, will be permitted.",
      "Participants are encouraged to build a logical and engaging storyline.",
      "Excessive repetition of actions or dialogues may lead to negative marking.",
      "Creativity, spontaneity, teamwork, and effective execution will be considered during evaluation."
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
      "RULES: Participants: 2 (as a team) Duration: 1hr (including preparation and presentation) Classes: 6-8",
      "​ Participants must bring their own ingredients for the event.",
      "​ Peelers, knives, and other instruments are to be brought by the participants, and the cutting or peeling of the vegetables/fruits is to be done at the venue of the competition.",
      "​ Pre-cooked items like boiled potatoes, vegetables, or chips may be brought, but the entire dish cannot be prepared from such pre-cooked items.",
      "​ Things needed for the presentation, such as plates, trays, tablecloth, etc. are to be brought by the participants.",
      "​ All participants must compulsorily bring a plastic tablecloth.",
      "​ Diameters or the diagonals of the plate or trays should not be more than 16 inches.",
      "​ Accessories worn by the participants, for example, hand gloves, headgear, and aprons will be awarded marks.",
      "​ A chart with the ingredients/calories is to be supplemented along with the display.",
      "​ The Judges’ decision will be final.",
      "​ No electrical gadgets are to be used."
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
      "RULES: Participants: 1 per team Classes: 9-12",
      "Rules:",
      "​ Sudoku is a logic-based number placement puzzle played on a grid, which is divided into a number of 3x3 subgrids.",
      "​ Only pens/pencils and erasers are allowed. Participants must use the official Sudoku sheet and scratch paper provided. Use of personal sheets is prohibited.",
      "​ Mobile phones, smartwatches, calculators, or any digital devices are strictly prohibited. Violation will result in immediate disqualification.",
      "​ Teams must submit their sheets with names and school details clearly mentioned.",
      "Format:",
      "​ The event will be divided into 3 rounds.",
      "​ The scores in each round will be calculated based on the time taken to solve the puzzle.",
      "​ These scores will be added to give the final score of the team.",
      "​ In Round 1, the teams will be given a 6x6 sudoku grid.",
      "​ In Round 2, the teams will be given a 9x9 sudoku grid.",
      "​ In Round 3, the teams will be given a 12x12 sudoku grid.",
      "​ For all rounds, they will be given a time limit of 15 mins."
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
    stage: "Off-stage",
    bounty: "₹15,000 + Quiz Bowl Shields",
    rules: [
      "RULES: Participants: 3+1 (reserve) Classes: 9-12",
      "​ Any discrepancy or conflict regarding spelling or accuracy of answers will be decided by the Quizmaster only. The decisions of the Quizmaster shall be final.",
      "​ The reserve can be substituted after an elimination round (Prelims/Round",
      "1). Note that this change can only be made once throughout the duration of the quiz.",
      "​ For written rounds – Tie breakers will be decided on the following bases, in decreasing order of weight: Starred Questions, Longest continuous streak of correct answers, first correct question, and scores of previous",
      "rounds.",
      "​ The event will have 5 rounds (including the Prelims).",
      "Rounds:",
      "​ Prelims (Written): The top 14 teams will qualify for Round 1. No negative markings for incorrect answers.",
      "​ Round 1: General trivia round. Pounce and Bounce. Negative marking for pounce only. There will be no eliminations in this round.",
      "​ Round 2 (Written): Audio Visual round. The top 9 teams will qualify for",
      "Round 3. No negative marking for incorrect answers.",
      "​ Round 3: Long Connect Round. Seating order determined on the basis of",
      "Round 2 results in reverse order. Points based on the earliness of answers. Answers are to be disclosed privately to the quizmaster. Negative marking for incorrect answers. No elimination after Round 3.",
      "​ Round 4 (Buzzer): Rapid fire round. Teams shall disclose their answers to the Quizmaster only. Negative markings will be given for incorrect answers. Double points will be awarded in this round."
    ]
  },
  {
    id: "scrabble",
    name: "Bosco Wordsmith",
    category: "Others",
    shortDesc: "Assemble high-scoring vocabulary words on the game board.",
    detail: "Ready to turn letters into legends? Scrabble is the ultimate word quest, where every tile is a clue, every bonus square is buried treasure, and every move can change the game. Whether you are spelling like Hermione, deducing like Sherlock, hunting the One Piece with the Straw Hats, or pulling off a comeback worthy of Avengers: Endgame, victory is just one word away. Gather your crew, trust your instincts, and set off on an adventure where strategy, creativity, and a little luck can turn the right word into glory.\n\nFormat: ●​ The event will be conducted in 3 rounds, in which each participant will go up against another competitor chosen by a draw of chits. ●​ Each game will consist of 15 turns per player. ●​ In each turn, the player will be given one minute to form a word using the scrabble tiles provided. ●​ The score for each turn is the sum of the letter values in each word formed or modified on that turn, plus the additional points obtained from placing letters on premium squares. ●​ At the end of each game, the scores of every player will be noted, after which they will be paired with another competitor for the next game until each player has played 3 games. ●​ The awards will be decided by the total cumulative points at the end of the 3 games.",
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
      "Rules:",
      "​ The Collins Scrabble dictionary will be used as a reference for all words.",
      "​ The standard scrabble rules will be followed for formation of words and passing of turns.",
      "​ No plural or archaic words are allowed. Proper nouns, including names or places, are prohibited.",
      "​ The judges’ decision will be final and binding on all the participants."
    ]
  },
  {
    id: "math-marathon",
    name: "Bosco Brainwave",
    category: "Others",
    shortDesc: "Test your mental memory, recall speed, and pattern recognition.",
    detail: "Memory Game ​ (YCS)\n\nMemory is not just about remembering, it is about holding onto details as the journey unfolds. Channel the focus of Sherlock recalling details everyone else missed, the sharp mind of Hermione drawing information from everything she has learned, and the persistence of Senku preserving knowledge across generations. As information flashes by, every detail becomes part of the adventure. Stay alert, trust your gut, and navigate your way through a challenge where the greatest discoveries belong to those who remember.",
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
      "​ There will be 4 rounds. The cumulative scores of all the rounds will decide the winner. In case of a tie, the participants who have scored higher in the rounds where they were asked to correctly remember the order of presentation will be declared the winner.",
      "​ Round 1 : Objects will be presented to the participants and they will have to remember as many as they can.",
      "​ Round 2 : A series of images will be shown, participants need to remember as many as they can in the correct order.",
      "​ Round 3 : A series of audio clips will be played, Participants need to remember as many as they can in the correct order.",
      "​ Round 4 : A series of words will be projected, participants need to remember as many as they can."
    ]
  },
  {
    id: "pointless",
    name: "Bosco Voidix",
    category: "Others",
    shortDesc: "Obscure answer survey quiz. The lowest scoring correct answers win.",
    detail: "You studied all night for the wrong exam. Welcome to Pointless, the only adventure where being too smart can get you eliminated. Think of Indiana Jones bypassing the flashy, gold-plated chalice to choose the humble Holy Grail. Forget the obvious, abandon the safe route and venture into uncharted territory where the weirdest answers are often the best ones. This is not about knowing  more. It is about thinking differently because sometimes, the greatest discoveries are the ones nobody else thought of.",
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
      "RULES: Participants: 2 per team Classes- 9-12",
      "The event will have two rounds with each round based on certain categories, such as sports, finance, history, science, current affairs, etc.",
      "Each question will have a list of ‘correct’ answers which will be decided based on a survey conducted externally prior to the event.",
      "Teams must give what they think is the least popular answer as per the survey. They will get the same number of points as the number of people who had given the same answer in the survey. The goal is to give an answer which has been given by the least number of people, thus earning them the least number of points. The teams with the lowest points shall qualify from each round. For example, The question is “Names of countries starting with the letter R”. Team A answers “Russia”. Similarly, 30 people had answered Russia in the survey. So, Team A gets 30 points. Team B answers “Romania”. If 5 people had answered Romania in the survey, Team B gets 5 points. Team C answers “Rwanda”. If no person had answered Rwanda in the survey, Team C gets zero points (pointless). Team D answers “India”. Since India does not belong to the list of countries starting with the letter R, therefore, the team shall be awarded the maximum points allotted for the question as a penalty.",
      "In case of a tie between two teams, a rapid fire round with limited answers will be held to break the tie.",
      "If a team gives an answer which is not included in the list, then they shall automatically be awarded maximum points allotted for the question as a penalty.",
      "Participants must answer within 15 seconds of the question being asked, otherwise they will be awarded the maximum points allotted for the question as a penalty.",
      "The team which scores the minimum points shall be declared the winner.",
      "The use of mobile phones, laptops, AI tools, internet access, or reference materials is strictly prohibited during the competition.",
      "The decision of the judges shall be final and binding and any form of misconduct or disturbance during the event will result in immediate disqualification."
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
