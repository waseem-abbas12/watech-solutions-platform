'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { USER_PERSONAS } from '@/data/trackerPersonas';
import { UserPersonaId, MentorMessage, DailyHistoryRecord } from '@/types/tools';

interface TrackerState {
  date: string;
  persona: UserPersonaId;
  oneThing: string;
  distractionAlert: string;
  winCondition: string;
  deepWorkHours: number;
  routineHours: number;
  wastedHours: number;
  pillars: { [pillarId: string]: boolean };
  lessonLearned: string;
  tomorrowImprovement: string;
  coachTip?: string;
}

const DEFAULT_STATE: TrackerState = {
  date: new Date().toISOString().split('T')[0],
  persona: 'reset',
  oneThing: '',
  distractionAlert: '',
  winCondition: '',
  deepWorkHours: 3,
  routineHours: 4,
  wastedHours: 1,
  pillars: {},
  lessonLearned: '',
  tomorrowImprovement: '',
  coachTip: ''
};

export default function DailyGrowthTrackerPage() {
  const [tracker, setTracker] = useState<TrackerState>(DEFAULT_STATE);
  const [streak, setStreak] = useState<number>(1);
  const [history, setHistory] = useState<DailyHistoryRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'mentor'>('today');

  // AI Generation & Chat state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isMentorDrawerOpen, setIsMentorDrawerOpen] = useState(false);
  const [mentorInput, setMentorInput] = useState('');
  const [isMentorThinking, setIsMentorThinking] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([
    {
      id: 'm-1',
      sender: 'mentor',
      text: 'Assalam-o-Alaikum bhai! Main WATECH AI Mentor hoon. Agar aap confuse hain, waqt zaya ho raha hai, ya koi roadmap chahiye, baghair kisi jhijhak ke yahan poochein.',
      timestamp: 'Just now'
    }
  ]);

  // Current active persona config
  const currentPersona = useMemo(() => {
    return USER_PERSONAS.find((p) => p.id === tracker.persona) || USER_PERSONAS[0];
  }, [tracker.persona]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const savedData = localStorage.getItem(`watech_tracker_${today}`);
      const savedStreak = localStorage.getItem('watech_tracker_streak');
      const savedHistory = localStorage.getItem('watech_tracker_history');

      if (savedData) {
        setTracker(JSON.parse(savedData));
      } else {
        setTracker((prev) => ({ ...prev, date: today }));
      }

      if (savedStreak) {
        setStreak(Number(savedStreak));
      }

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        // Mock seed for 7-day consistency visualization
        setHistory([
          { date: 'Day -4', score: 65, oneThing: '10 Proposals Sent', persona: 'freelancer', deepWorkHours: 3 },
          { date: 'Day -3', score: 80, oneThing: 'Client Website Built', persona: 'freelancer', deepWorkHours: 4 },
          { date: 'Day -2', score: 45, oneThing: 'Distracted by Reels', persona: 'reset', deepWorkHours: 1 },
          { date: 'Yesterday', score: 75, oneThing: 'Inventory Audit Done', persona: 'karobaari', deepWorkHours: 3 },
        ]);
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

      // Update 7-day history list
      const updatedHistory = [...history.filter((h) => h.date !== today), {
        date: today,
        score: totalScore,
        oneThing: tracker.oneThing || 'Daily Growth',
        persona: tracker.persona,
        deepWorkHours: tracker.deepWorkHours
      }].slice(-7);

      setHistory(updatedHistory);
      localStorage.setItem('watech_tracker_history', JSON.stringify(updatedHistory));

      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    } catch {
      // Ignore
    }
  };

  // Switch persona
  const handleSelectPersona = (pId: UserPersonaId) => {
    const selected = USER_PERSONAS.find((p) => p.id === pId);
    if (!selected) return;

    setTracker((prev) => ({
      ...prev,
      persona: pId,
      oneThing: prev.oneThing || selected.defaultPriorityPlaceholder,
      distractionAlert: prev.distractionAlert || selected.defaultDistractionWarning
    }));
  };

  // Toggle dynamic pillar
  const togglePillar = (pillarId: string) => {
    setTracker((prev) => ({
      ...prev,
      pillars: {
        ...prev.pillars,
        [pillarId]: !prev.pillars[pillarId]
      }
    }));
  };

  // 1-Click AI Daily Plan Generator
  const handleGenerateAiPlan = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/tracker/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'generate_daily_plan',
          persona: tracker.persona,
          yesterdayScore: totalScore
        })
      });
      const data = await res.json();
      if (data.success && data.plan) {
        setTracker((prev) => ({
          ...prev,
          oneThing: data.plan.oneThing,
          distractionAlert: data.plan.distractionAlert,
          winCondition: data.plan.winCondition,
          coachTip: data.plan.coachTip
        }));
      }
    } catch {
      // Offline fallback
      setTracker((prev) => ({
        ...prev,
        oneThing: currentPersona.defaultPriorityPlaceholder,
        distractionAlert: currentPersona.defaultDistractionWarning,
        coachTip: 'Bhai galti aur mushkilat se darna nahi hai. Bas aaj ke din ka 1 kaam poora karein aur raat ko sukoon ki neend soyein.'
      }));
    } finally {
      setIsAiGenerating(false);
    }
  };

  // Send message to AI Mentor
  const handleSendMentorMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorInput.trim() || isMentorThinking) return;

    const userText = mentorInput.trim();
    const newMsg: MentorMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMentorMessages((prev) => [...prev, newMsg]);
    setMentorInput('');
    setIsMentorThinking(true);

    try {
      const res = await fetch('/api/tracker/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'mentor_chat',
          persona: tracker.persona,
          message: userText
        })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setMentorMessages((prev) => [
          ...prev,
          {
            id: `m-${Date.now() + 1}`,
            sender: 'mentor',
            text: data.reply,
            timestamp: 'Just now'
          }
        ]);
      }
    } catch {
      setMentorMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: 'mentor',
          text: 'Bhai himmat na haarein! Har mushkil ke baad aasaani hai. Apne aaj ke kaam ko chotay hisson mein baantein aur shuru karein.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsMentorThinking(false);
    }
  };

  // Productivity Score (0 - 100)
  const totalTrackedHours = tracker.deepWorkHours + tracker.routineHours + tracker.wastedHours;
  const deepWorkRatio = totalTrackedHours > 0 ? (tracker.deepWorkHours / totalTrackedHours) * 50 : 0;
  const completedPillarsCount = currentPersona.pillars.filter((p) => tracker.pillars[p.id]).length;
  const pillarsScore = (completedPillarsCount / currentPersona.pillars.length) * 50;
  const totalScore = Math.min(100, Math.round(deepWorkRatio + pillarsScore));

  // WhatsApp Progress Exporter
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🔥 My WATECH AI Daily Growth Report (${tracker.date}):\n\n` +
      `👤 Persona: ${currentPersona.title} (${currentPersona.urduTitle})\n` +
      `🎯 Top Priority: ${tracker.oneThing || 'Focused Execution'}\n` +
      `⚡ Growth Score: ${totalScore}/100\n` +
      `⏱️ Deep Work: ${tracker.deepWorkHours} Hours\n` +
      `✅ Core Habits: ${completedPillarsCount}/${currentPersona.pillars.length} Done\n\n` +
      `Try Pakistan's first personalized AI Life Tracker for free:\n` +
      `https://www.waseemabbas.online/tracker`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white py-2 px-4 text-center text-xs md:text-sm font-semibold tracking-wide flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-2">
          <span>🇵🇰 Pakistan&apos;s 1st AI-Personalized Life &amp; Growth OS</span>
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-200">🔥 {streak} Day Streak</span>
            <button
              onClick={() => setIsMentorDrawerOpen(true)}
              className="px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1"
            >
              <span>💬 AI Mentor Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Navigation / Persona Selector Card */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                Step 1: Choose Your Persona / Role
              </span>
              <h2 className="text-lg font-bold text-white">Aapka Current Focus / Role Kya Hai?</h2>
            </div>
            <span className="text-xs text-slate-400">
              System aapke role ke mutabiq khud ko adapt karega.
            </span>
          </div>

          {/* Persona Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {USER_PERSONAS.map((p) => {
              const isSelected = tracker.persona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPersona(p.id)}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? `bg-gradient-to-br ${p.color} text-white border-transparent shadow-lg shadow-blue-500/10 scale-[1.02]`
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl mb-2">{p.icon}</span>
                  <div>
                    <h3 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {p.title}
                    </h3>
                    <p className={`text-[10px] mt-0.5 font-urdu ${isSelected ? 'text-white/90' : 'text-slate-500'}`} dir="rtl">
                      {p.urduTitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1-Click AI Assistant Banner */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-3xl p-6 md:p-8 border border-indigo-800/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center sm:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
              <span>✨ AI Smart Assistant Active</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white">
              AI Mentor Se Aaj Ka Customized Action Plan Lein
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-lg">
              Aapke role (<strong className="text-amber-400 capitalize">{currentPersona.title}</strong>) ke mutabiq AI aapka aaj ka non-negotiable task aur distraction shield generate karega.
            </p>
          </div>

          <button
            onClick={handleGenerateAiPlan}
            disabled={isAiGenerating}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs md:text-sm tracking-wide uppercase transition shadow-lg shadow-amber-500/20 flex-shrink-0 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAiGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Generating AI Plan...</span>
              </>
            ) : (
              <>
                <span>✨ Generate Today&apos;s AI Plan</span>
              </>
            )}
          </button>
        </div>

        {/* AI Coach Tip Card (If generated) */}
        {tracker.coachTip && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs md:text-sm leading-relaxed flex items-start gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <strong className="text-amber-400 font-bold block mb-0.5">WATECH AI Mentor Advice:</strong>
              {tracker.coachTip}
            </div>
          </div>
        )}

        {/* Real-time Growth Scorecard */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
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

        {/* SECTION 1: MORNING NON-NEGOTIABLE (CUSTOMIZED BY PERSONA) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl font-bold">
              1
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Subah Ka 3-Minute Faisla (The 1 Thing)</h2>
              <p className="text-xs text-slate-400">Tailored for: <strong className="text-white capitalize">{currentPersona.title}</strong></p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                🎯 Aaj Ka Sab Se Ahem 1 Kaam Kya Hai? (Non-Negotiable)
              </label>
              <input
                type="text"
                value={tracker.oneThing}
                placeholder={currentPersona.defaultPriorityPlaceholder}
                onChange={(e) => setTracker({ ...tracker, oneThing: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  🛑 Kaun Si Cheez Waqt Zaya Kar Sakti Hai? (Distraction Shield)
                </label>
                <input
                  type="text"
                  value={tracker.distractionAlert}
                  placeholder={currentPersona.defaultDistractionWarning}
                  onChange={(e) => setTracker({ ...tracker, distractionAlert: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  🏆 Din Kamyab Kab Kehlayega? (Win Condition)
                </label>
                <input
                  type="text"
                  value={tracker.winCondition}
                  placeholder="Jab main 3 ghantay baghair phone chhue kaam mukammal kar loon..."
                  onChange={(e) => setTracker({ ...tracker, winCondition: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PERSONA-SPECIFIC HABIT PILLARS */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl font-bold">
              2
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Daily Habit Pillars ({currentPersona.title})</h2>
              <p className="text-xs text-slate-400">Har completed aadat par click karke tick karein.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPersona.pillars.map((pillar) => {
              const isChecked = !!tracker.pillars[pillar.id];
              return (
                <div
                  key={pillar.id}
                  onClick={() => togglePillar(pillar.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3.5 select-none ${
                    isChecked
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isChecked ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isChecked ? '✓' : pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: TIME & REALITY AUDIT */}
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

        {/* SECTION 4: 7-DAY CONSISTENCY VISUALIZER */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl font-bold">
                4
              </span>
              <div>
                <h2 className="text-xl font-bold text-white">7-Day Consistency Analytics</h2>
                <p className="text-xs text-slate-400">Pichlay 7 dinon ka consistency graph.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-400">🔥 Streak: {streak} Days</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-2">
            {history.map((h, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-3 text-center flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 truncate">{h.date}</span>
                <div className={`text-xl font-black my-2 ${h.score >= 70 ? 'text-emerald-400' : h.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {h.score}
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${h.score >= 70 ? 'bg-emerald-500' : h.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    style={{ width: `${h.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: DAILY JOURNAL & SELF REFLECTION */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center text-xl font-bold">
              5
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

        {/* Cross-Sector Growth Funnel Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-blue-900/40 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">🚀 High-ROAS Growth</span>
              <h4 className="text-lg font-bold text-white">WATECH Digital Agency</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Meta & TikTok Ads, custom CRM, and sales funnels built to scale your business revenue.
              </p>
            </div>
            <Link
              href="/agency"
              className="mt-4 inline-block text-center py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
            >
              Scale with Agency →
            </Link>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-emerald-900/40 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🏡 Verified Property</span>
              <h4 className="text-lg font-bold text-white">WATECH Real Estate</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Invest your business profits into verified plots & installment schemes across Lahore & Islamabad.
              </p>
            </div>
            <Link
              href="/real-estate"
              className="mt-4 inline-block text-center py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
            >
              Explore Properties →
            </Link>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-amber-900/40 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🪵 Pure Sheesham Wood</span>
              <h4 className="text-lg font-bold text-white">Chinioti Furniture</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authentic handcrafted bridal bedroom sets & luxury living furniture at direct factory prices.
              </p>
            </div>
            <Link
              href="/furniture"
              className="mt-4 inline-block text-center py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition"
            >
              View Woodcraft →
            </Link>
          </div>
        </div>

        {/* Bottom CTA for Community & Founder Mentorship */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            A Message From Founder & CEO Waseem Abbas
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            &quot;Har Bara Insaan Is Dor Se Guzra Hai. Consistency Se Taqdeer Badalti Hai.&quot;
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Agar aapko business start karne, digital marketing agency chalane ya personal growth guidance ki zaroorat hai, CEO Waseem Abbas se direct baat karein.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=923177651230&text=Assalam-o-Alaikum%20Waseem%20Bhai!%20Maine%20aapka%20AI%20Life%20Tracker%20dekha,%20mujhe%20apne%20business%20aur%20agency%20growth%20ke%20hawale%20se%20guidance%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition"
            >
              Direct WhatsApp with CEO Waseem Abbas
            </a>
            <button
              onClick={() => setIsMentorDrawerOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition flex items-center gap-2"
            >
              <span>Open AI Mentor Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* =======================================================
          SLIDING AI MENTOR CHAT DRAWER ("WATECH AI USTAAD")
          ======================================================= */}
      {isMentorDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-slate-900 h-full flex flex-col border-l border-slate-800 shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-base">
                  🤖
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white">WATECH AI Mentor</h3>
                  <p className="text-[10px] text-emerald-400 font-semibold">Online • Roman Urdu Life Coach</p>
                </div>
              </div>
              <button
                onClick={() => setIsMentorDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {mentorMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}

              {isMentorThinking && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs text-slate-400 w-fit">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-[10px]">AI Mentor soch raha hai...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMentorMessage} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
              <input
                type="text"
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                placeholder="Poochhein (e.g. 'aaj dil nahi lag raha kya karoon?')..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isMentorThinking || !mentorInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          APP-READY MOBILE BOTTOM NAVIGATION BAR
          ======================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-2.5 sm:hidden flex items-center justify-around text-center">
        <button
          onClick={() => {
            setActiveTab('today');
            setIsMentorDrawerOpen(false);
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'today' ? 'text-amber-400' : 'text-slate-400'}`}
        >
          <span className="text-base">🎯</span>
          <span>Today</span>
        </button>

        <button
          onClick={() => setIsMentorDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-indigo-400"
        >
          <span className="text-base">🤖</span>
          <span>AI Mentor</span>
        </button>

        <Link
          href="/tools"
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-blue-400"
        >
          <span className="text-base">⚡</span>
          <span>100 Tools</span>
        </Link>

        <a
          href="https://api.whatsapp.com/send?phone=923177651230&text=Assalam-o-Alaikum%20Watech!%20I%20want%20to%20join%20the%20Daily%20Growth%20Accountability%20Community."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-emerald-400"
        >
          <span className="text-base">💬</span>
          <span>Community</span>
        </a>
      </div>
    </div>
  );
}
