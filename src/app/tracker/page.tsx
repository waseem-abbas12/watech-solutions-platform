'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TrackerState {
  date: string;
  oneThing: string;
  distractionAlert: string;
  winCondition: string;
  deepWorkHours: number;
  routineHours: number;
  wastedHours: number;
  pillars: {
    namaz: boolean;
    deepWork: boolean;
    learning: boolean;
    health: boolean;
    discipline: boolean;
  };
  lessonLearned: string;
  tomorrowImprovement: string;
}

const DEFAULT_STATE: TrackerState = {
  date: new Date().toISOString().split('T')[0],
  oneThing: '',
  distractionAlert: '',
  winCondition: '',
  deepWorkHours: 3,
  routineHours: 4,
  wastedHours: 1,
  pillars: {
    namaz: false,
    deepWork: false,
    learning: false,
    health: false,
    discipline: false
  },
  lessonLearned: '',
  tomorrowImprovement: ''
};

export default function DailyGrowthTrackerPage() {
  const [tracker, setTracker] = useState<TrackerState>(DEFAULT_STATE);
  const [streak, setStreak] = useState<number>(1);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const savedData = localStorage.getItem(`watech_tracker_${today}`);
      const savedStreak = localStorage.getItem('watech_tracker_streak');

      if (savedData) {
        setTracker(JSON.parse(savedData));
      } else {
        setTracker((prev) => ({ ...prev, date: today }));
      }

      if (savedStreak) {
        setStreak(Number(savedStreak));
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save to localStorage
  const handleSave = () => {
    try {
      const today = tracker.date;
      localStorage.setItem(`watech_tracker_${today}`, JSON.stringify(tracker));
      localStorage.setItem('watech_tracker_streak', String(Math.max(streak, 1)));
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch {
      // Ignore
    }
  };

  // Productivity Score (0 - 100)
  const totalTrackedHours = tracker.deepWorkHours + tracker.routineHours + tracker.wastedHours;
  const deepWorkRatio = totalTrackedHours > 0 ? (tracker.deepWorkHours / totalTrackedHours) * 50 : 0;
  const completedPillarsCount = Object.values(tracker.pillars).filter(Boolean).length;
  const pillarsScore = (completedPillarsCount / 5) * 50;
  const totalScore = Math.min(100, Math.round(deepWorkRatio + pillarsScore));

  const togglePillar = (key: keyof typeof tracker.pillars) => {
    setTracker((prev) => ({
      ...prev,
      pillars: {
        ...prev.pillars,
        [key]: !prev.pillars[key]
      }
    }));
  };

  // Export to WhatsApp Status
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🔥 My WATECH Daily Growth Report (${tracker.date}):\n\n` +
      `🎯 Top Priority: ${tracker.oneThing || 'Focused Execution'}\n` +
      `⚡ Productivity Score: ${totalScore}/100\n` +
      `⏱️ Deep Work: ${tracker.deepWorkHours} Hours\n` +
      `✅ Core Habits: ${completedPillarsCount}/5 Done\n\n` +
      `Track your daily life & stop wasting time for free:\n` +
      `https://www.waseemabbas.online/tracker`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white py-2 px-4 text-center text-xs md:text-sm font-semibold tracking-wide">
        <span>🚀 100% Free & Private — Data stays on your device | Built for Pakistan's youth & entrepreneurs</span>
      </div>

      {/* Navigation Header */}
      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 flex items-center justify-between flex-wrap gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-white">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-base">
            W
          </span>
          <span>WATECH <span className="text-amber-400">TRACKER</span></span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400 shadow-sm">
            <span>🔥 {streak} Day Streak</span>
          </div>
          <Link
            href="/tools"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition"
          >
            100 Free Tools
          </Link>
          <a
            href="https://api.whatsapp.com/send?phone=923177651230&text=Assalam-o-Alaikum%20Watech!%20I%20want%20to%20join%20the%20Daily%20Growth%20Accountability%20WhatsApp%20Community."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition"
          >
            Join WhatsApp Community
          </a>
        </div>
      </header>

      {/* Hero Headline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <span>Stop Overthinking • Start Tracking • Win Daily</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Rozana Ka Hisaab — Life & Clarity Compass
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Agar aap confusion, low motivation, ya waqt zaya hone se pareshan hain—yeh tool aapka zaati mentor hai. Subah sirf 3 minute dein aur raat ko apna score dekhein.
        </p>
      </div>

      {/* Score Overview Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              Today&apos;s Growth Score ({tracker.date})
            </span>
            <div className="text-4xl md:text-6xl font-black text-white flex items-baseline justify-center md:justify-start gap-1">
              <span>{totalScore}</span>
              <span className="text-lg md:text-xl text-slate-500 font-normal">/100</span>
            </div>
            <p className="text-xs md:text-sm text-slate-400">
              {totalScore >= 75
                ? '🏆 Shandar din! You are in the top 5% of disciplined executors today.'
                : totalScore >= 50
                ? '⚡ Behtar progress! Kuch cheezon par kal mazeed focus karein.'
                : '⚠️ Alert: Waqt zaya ho raha hai. Kal subah pehla kaam zaroor karein.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition active:scale-95 shadow-lg shadow-amber-500/10"
            >
              {savedNotice ? '✓ Saved Successfully!' : 'Save Progress Today'}
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <span>Share WhatsApp Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        {/* SECTION 1: MORNING CLARITY (THE 1 THING) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl font-bold">
              1
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Subah Ka 3-Minute Faisla (The Non-Negotiable)</h2>
              <p className="text-xs text-slate-400">Din shuru karne se pehle dimaagh saaf karein.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                🎯 Aaj Ka Sab Se Ahem 1 Kaam Kya Hai? (The One Thing)
              </label>
              <input
                type="text"
                value={tracker.oneThing}
                placeholder="e.g. 10 clients ko cold message bhejna, ya 2 ghantay video editing seekhna..."
                onChange={(e) => setTracker({ ...tracker, oneThing: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  🛑 Kaun Si Cheez Waqt Zaya Kar Sakti Hai? (Distraction Alert)
                </label>
                <input
                  type="text"
                  value={tracker.distractionAlert}
                  placeholder="e.g. Instagram Reels, be-maqsad doston ki baatein..."
                  onChange={(e) => setTracker({ ...tracker, distractionAlert: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  🏆 Din Kamyab Kab Kehlayega? (Win State)
                </label>
                <input
                  type="text"
                  value={tracker.winCondition}
                  placeholder="e.g. Jab main 3 ghantay baghair phone chhue kaam kar loon..."
                  onChange={(e) => setTracker({ ...tracker, winCondition: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 5 DAILY PILLARS (HABIT CHECKLIST) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl font-bold">
              2
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">5 Core Pillars (Rozana Ki Aadaat)</h2>
              <p className="text-xs text-slate-400">Aik kamyab Pakistani banne ke liye in 5 cheezon ko tick karein.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Pillar 1 */}
            <div
              onClick={() => togglePillar('namaz')}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
                tracker.pillars.namaz
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${tracker.pillars.namaz ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {tracker.pillars.namaz ? '✓' : ''}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Namaz & Spiritual Peace</h4>
                <p className="text-xs text-slate-400">Punctuality aur dil ka sakoon.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              onClick={() => togglePillar('deepWork')}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
                tracker.pillars.deepWork
                  ? 'bg-blue-950/30 border-blue-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${tracker.pillars.deepWork ? 'bg-blue-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {tracker.pillars.deepWork ? '✓' : ''}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Deep Work (2+ Hours)</h4>
                <p className="text-xs text-slate-400">Baghair phone distraction ke skill ya karobaar.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              onClick={() => togglePillar('learning')}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
                tracker.pillars.learning
                  ? 'bg-purple-950/30 border-purple-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${tracker.pillars.learning ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {tracker.pillars.learning ? '✓' : ''}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Skill Learning (30 Mins)</h4>
                <p className="text-xs text-slate-400">Rozana kuch naya seekhna (video/article).</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              onClick={() => togglePillar('health')}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 ${
                tracker.pillars.health
                  ? 'bg-rose-950/30 border-rose-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${tracker.pillars.health ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {tracker.pillars.health ? '✓' : ''}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Physical Walk / Workout</h4>
                <p className="text-xs text-slate-400">20 minute exercise ya tez walk.</p>
              </div>
            </div>

            {/* Pillar 5 */}
            <div
              onClick={() => togglePillar('discipline')}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 sm:col-span-2 ${
                tracker.pillars.discipline
                  ? 'bg-amber-950/30 border-amber-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${tracker.pillars.discipline ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {tracker.pillars.discipline ? '✓' : ''}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Zero Doomscrolling Discipline</h4>
                <p className="text-xs text-slate-400">Social media par be-maqsad scroll na karna.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: TIME & REALITY AUDIT (WAQT KAHAN GAYA?) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl font-bold">
              3
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Time Audit (Waqt Kahan Gaya?)</h2>
              <p className="text-xs text-slate-400">Apne 24 ghanton ka sucha hisaab likhein.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-bold text-emerald-400 uppercase mb-2">
                🟢 Deep Work / Kamai (Hours)
              </label>
              <input
                type="number"
                min="0"
                max="16"
                value={tracker.deepWorkHours}
                onChange={(e) => setTracker({ ...tracker, deepWorkHours: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-bold text-white text-lg"
              />
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-bold text-blue-400 uppercase mb-2">
                🔵 Routine & Family (Hours)
              </label>
              <input
                type="number"
                min="0"
                max="16"
                value={tracker.routineHours}
                onChange={(e) => setTracker({ ...tracker, routineHours: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-bold text-white text-lg"
              />
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <label className="block text-xs font-bold text-rose-400 uppercase mb-2">
                🔴 Zaya / Screen Time (Hours)
              </label>
              <input
                type="number"
                min="0"
                max="16"
                value={tracker.wastedHours}
                onChange={(e) => setTracker({ ...tracker, wastedHours: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-bold text-white text-lg"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: DAILY JOURNAL & SELF REFLECTION */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl font-bold">
              4
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Raat Ka Jaiza (Self-Reflection)</h2>
              <p className="text-xs text-slate-400">Sharmindagi khatam karein, galti se seekhein.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                💡 Aaj Maine Kya Seekha? (Today&apos;s Lesson)
              </label>
              <textarea
                rows={2}
                value={tracker.lessonLearned}
                placeholder="Aaj mujhe samajh aayi ke..."
                onChange={(e) => setTracker({ ...tracker, lessonLearned: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                🚀 Kal Main Kahan Behtar Ho Sakta Hoon?
              </label>
              <textarea
                rows={2}
                value={tracker.tomorrowImprovement}
                placeholder="Kal subah main foran yeh kaam shuru karunga..."
                onChange={(e) => setTracker({ ...tracker, tomorrowImprovement: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Founder & Community Support Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            A Message From Founder & CEO Waseem Abbas
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            &quot;Aap Akele Nahi Hain. Har Bara Insaan Is Dor Se Guzra Hai.&quot;
          </h3>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Sharm ko bhool jayein aur chotay chotay qadam uthayein. Agar aapko career roadmap, digital agency skills, ya direction chahiye, WATECH Community aapke sath hai.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=923177651230&text=Assalam-o-Alaikum%20Waseem%20Bhai!%20Maine%20aapka%20Life%20Tracker%20dekha,%20mujhe%20apne%20career%20aur%20skills%20ke%20hawale%20se%20guidance%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition"
            >
              Direct Talk on WhatsApp
            </a>
            <Link
              href="/tools"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition"
            >
              Explore 100 Free Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
