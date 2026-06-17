"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Building, Clock, Search, X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface EventItem {
  activity: string;
  floor: string;
  location: string;
  time: string;
}

interface ScheduleData {
  day1: EventItem[];
  day2: EventItem[];
}

const FALLBACK_SCHEDULE = {
  day1: {
    event1: { activity: "Registration", floor: "ground floor", location: "1st floor", time: "10-11" },
    event2: { activity: "Opening Ceremony", floor: "----", location: "----", time: "----" },
    event3: { activity: "Bosco Montage (Short Film Making)", floor: "----", location: "----", time: "----" },
    event4: { activity: "Bosco Byte-Blitz (Coding and Debugging)", floor: "----", location: "----", time: "----" },
    event5: { activity: "Bosco Pixel Craft (Digital Art)", floor: "----", location: "----", time: "----" },
    event6: { activity: "Bosco Nritya (Eastern Dance)", floor: "----", location: "----", time: "----" },
    event7: { activity: "Bosco Minute Mania (Just A Minute)", floor: "----", location: "----", time: "----" },
    event8: { activity: "Bosco Vogue (Eco Fashion and Interior Decor)", floor: "----", location: "----", time: "----" },
    event9: { activity: "Bosco Magnum Opus (Theme Poetry Writing)", floor: "----", location: "----", time: "----" },
    event10: { activity: "Bosco Jester (Dumb Charades)", floor: "----", location: "----", time: "----" },
    event11: { activity: "Bosco Prodigy (GI60)", floor: "----", location: "----", time: "----" },
    event12: { activity: "Bosco Masterchef (Non Fire Cooking)", floor: "----", location: "----", time: "----" },
    event13: { activity: "Bosco Vignette (Photography)", floor: "----", location: "----", time: "----" },
    event14: { activity: "Bosco Chronicles (Journalism)", floor: "----", location: "----", time: "----" },
    event15: { activity: "Bosco Raag (Eastern Music)", floor: "----", location: "----", time: "----" },
    event16: { activity: "Bosco Sur Sangam (Antakshari)", floor: "----", location: "----", time: "----" },
    event17: { activity: "Bosco Overdrive (Dance Faceoff)", floor: "----", location: "----", time: "----" },
    event18: { activity: "Bosco Ricochet (Table Tennis)", floor: "----", location: "----", time: "----" },
    event19: { activity: "Bosco Skybound (Volleyball)", floor: "----", location: "----", time: "----" },
    event20: { activity: "Bosco Beat (Western Music)", floor: "----", location: "----", time: "----" },
    event21: { activity: "Bosco CrossCourt (Pickleball)", floor: "----", location: "----", time: "----" },
    event22: { activity: "Bosco Art Attack (Art and Graffiti)", floor: "----", location: "----", time: "----" },
    event23: { activity: "Bosco Polaris (Turncoat Debate)", floor: "----", location: "----", time: "----" }
  },
  day2: {
    event1: { activity: "Registration", floor: "----", location: "----", time: "----" },
    event2: { activity: "Bosco Caricature (Ad Wars)", floor: "----", location: "----", time: "----" },
    event3: { activity: "Bosco Cipher (Cyberhunt)", floor: "----", location: "----", time: "----" },
    event4: { activity: "Bosco Theatricals (Drama)", floor: "----", location: "----", time: "----" },
    event5: { activity: "Bosco Ad-Lib (Improv)", floor: "----", location: "----", time: "----" },
    event6: { activity: "Bosco Remix (Unconventional Music)", floor: "----", location: "----", time: "----" },
    event7: { activity: "Bosco Jukebox (Fusion Music)", floor: "----", location: "----", time: "----" },
    event8: { activity: "Bosco Chronicles (Journalism)", floor: "----", location: "----", time: "----" },
    event9: { activity: "Bosco Gridlock (Sudoku)", floor: "----", location: "----", time: "----" },
    event10: { activity: "Bosco Tango (Western Dance)", floor: "----", location: "----", time: "----" },
    event11: { activity: "Bosco Synapse (Quiz)", floor: "----", location: "----", time: "----" },
    event12: { activity: "Bosco Endgame (Chess)", floor: "----", location: "----", time: "----" },
    event13: { activity: "Bosco Wordsmith (Scrabble)", floor: "----", location: "----", time: "----" },
    event14: { activity: "Bosco Playverse (Tag+ Unconventional Games)", floor: "----", location: "----", time: "----" },
    event15: { activity: "Bosco Calcrush (Math Marathon)", floor: "----", location: "----", time: "----" },
    event16: { activity: "Bosco Voidix (Pointless)", floor: "----", location: "----", time: "----" },
    event17: { activity: "Closing Ceremony", floor: "----", location: "----", time: "----" }
  }
};

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleData>({ day1: [], day2: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDay, setActiveDay] = useState<"day1" | "day2" | "all">("day1");

  const parseEvents = (dayObj: Record<string, EventItem> | undefined): EventItem[] => {
    if (!dayObj) return [];
    return Object.entries(dayObj)
      .sort(([keyA], [keyB]) => {
        const numA = parseInt(keyA.replace("event", ""), 10) || 0;
        const numB = parseInt(keyB.replace("event", ""), 10) || 0;
        return numA - numB;
      })
      .map(([, value]) => value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://bf26-12ce0-default-rtdb.asia-southeast1.firebasedatabase.app/schedule.json");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        if (data) {
          setSchedule({
            day1: parseEvents(data.day1),
            day2: parseEvents(data.day2),
          });
        } else {
          throw new Error("No data in firebase");
        }
      } catch (err) {
        console.warn("Using local fallback schedule:", err);
        setSchedule({
          day1: parseEvents(FALLBACK_SCHEDULE.day1),
          day2: parseEvents(FALLBACK_SCHEDULE.day2),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterEvents = (events: EventItem[]) => {
    return events.filter(e => 
      e.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.floor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.time.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredDay1 = filterEvents(schedule.day1);
  const filteredDay2 = filterEvents(schedule.day2);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-rest-texture relative flex flex-col pb-0">
      
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-10 relative">
          <span className="font-sans font-bold text-[10px] tracking-[0.3em] text-forest-green uppercase block mb-2">
            Chronometer Log
          </span>
          <h1 className="font-bebas font-black text-4xl md:text-5xl lg:text-6xl text-ink-dark uppercase tracking-wide">
            Event Schedule
          </h1>
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Tab Controls & Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10 w-full">
          {/* Day Tabs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveDay("day1")}
              className={`px-6 py-2.5 rounded-full font-bebas text-xs md:text-sm tracking-wider uppercase border-2 transition-all cursor-pointer ${
                activeDay === "day1"
                  ? "bg-forest-green text-white border-ink-dark shadow-[2px_2px_0px_rgba(43,26,14,1)]"
                  : "bg-transparent text-ink-dark/70 border-ink-dark/20 hover:border-ink-dark/60"
              }`}
            >
              Day One
            </button>
            <button
              onClick={() => setActiveDay("day2")}
              className={`px-6 py-2.5 rounded-full font-bebas text-xs md:text-sm tracking-wider uppercase border-2 transition-all cursor-pointer ${
                activeDay === "day2"
                  ? "bg-forest-green text-white border-ink-dark shadow-[2px_2px_0px_rgba(43,26,14,1)]"
                  : "bg-transparent text-ink-dark/70 border-ink-dark/20 hover:border-ink-dark/60"
              }`}
            >
              Day Two
            </button>
            {activeDay === "all" && (
              <button
                onClick={() => setActiveDay("day1")}
                className="px-4 py-2.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase text-red-600 border border-red-200 bg-[#F7F1D5] hover:bg-red-50 transition-all flex items-center gap-1.5"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Search Bar (parchment-scroll style) */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-light opacity-65" />
            <input
              type="text"
              placeholder="Search events, venues, or times..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-2.5 parchment-scroll text-ink-dark focus:outline-none focus:border-gold-accent transition-all text-xs font-bold placeholder-ink-light/50"
            />
          </div>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-gold-accent" />
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-ink-light">Loading Chronicles...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-12"
            >
              {/* Day 1 Section */}
              {(activeDay === "day1" || activeDay === "all") && (
                <div className="space-y-4">
                  <h2 className="font-bebas font-black text-xl md:text-2xl text-forest-green uppercase tracking-wider text-center md:text-left">
                    Day 1 - (10.07.2026)
                  </h2>
                  <div className="overflow-x-auto parchment-card-light shadow-[4px_4px_0px_rgba(43,26,14,1)]">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="border-b-2 border-ink-dark text-ink-dark font-bebas text-xs md:text-sm tracking-wider uppercase text-left">
                          <th className="px-6 py-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-gold-accent" /> EVENT</th>
                          <th className="px-6 py-4"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-forest-green" /> VENUE</span></th>
                          <th className="px-6 py-4"><span className="flex items-center gap-2"><Building className="h-4 w-4 text-sky-blue" /> FLOOR</span></th>
                          <th className="px-6 py-4"><span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold-accent" /> TIME</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-dark/15 font-sans text-xs md:text-sm font-semibold text-ink-light">
                        {filteredDay1.length > 0 ? (
                          filteredDay1.map((item, idx) => (
                            <tr key={idx} className="hover:bg-black/5 transition-colors">
                              <td className="px-6 py-4.5 font-bold uppercase tracking-wide text-ink-dark">{item.activity}</td>
                              <td className="px-6 py-4.5">{item.location}</td>
                              <td className="px-6 py-4.5">{item.floor}</td>
                              <td className="px-6 py-4.5 font-bold text-forest-green">{item.time}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center py-8 text-ink-light/60 uppercase tracking-widest font-bold">No expeditions match search coordinates</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Day 2 Section */}
              {(activeDay === "day2" || activeDay === "all") && (
                <div className="space-y-4">
                  <h2 className="font-bebas font-black text-xl md:text-2xl text-gold-accent uppercase tracking-wider text-center md:text-left">
                    Day 2 - (11.07.2026)
                  </h2>
                  <div className="overflow-x-auto parchment-card-light shadow-[4px_4px_0px_rgba(43,26,14,1)]">
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr className="border-b-2 border-ink-dark text-ink-dark font-bebas text-xs md:text-sm tracking-wider uppercase text-left">
                          <th className="px-6 py-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-gold-accent" /> EVENT</th>
                          <th className="px-6 py-4"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-forest-green" /> VENUE</span></th>
                          <th className="px-6 py-4"><span className="flex items-center gap-2"><Building className="h-4 w-4 text-sky-blue" /> FLOOR</span></th>
                          <th className="px-6 py-4"><span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold-accent" /> TIME</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-dark/15 font-sans text-xs md:text-sm font-semibold text-ink-light">
                        {filteredDay2.length > 0 ? (
                          filteredDay2.map((item, idx) => (
                            <tr key={idx} className="hover:bg-black/5 transition-colors">
                              <td className="px-6 py-4.5 font-bold uppercase tracking-wide text-ink-dark">{item.activity}</td>
                              <td className="px-6 py-4.5">{item.location}</td>
                              <td className="px-6 py-4.5">{item.floor}</td>
                              <td className="px-6 py-4.5 font-bold text-forest-green">{item.time}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center py-8 text-ink-light/60 uppercase tracking-widest font-bold">No expeditions match search coordinates</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

      </main>

      <Footer />
    </div>
  );
}
