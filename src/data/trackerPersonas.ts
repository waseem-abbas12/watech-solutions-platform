import { UserPersona } from '@/types/tools';

export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'karobaari',
    title: 'Karobaari & E-Commerce',
    urduTitle: 'کاروباری اور ای کامرس',
    tagline: 'Dukaandar, manufacturer, online seller, ya builder.',
    icon: '💼',
    color: 'from-blue-600 to-indigo-700',
    defaultPriorityPlaceholder: 'e.g. 10 pending customer orders dispatch karna aur 5 purani payments ki wasooli call...',
    defaultDistractionWarning: 'Dukan par aane wale be-faida doston ki baatein, WhatsApp status scrolling...',
    pillars: [
      {
        id: 'p_namaz',
        title: 'Namaz & Shukr',
        urduTitle: 'نماز اور شکر گزاری',
        desc: 'Rizq mein barkat aur dimaagh ka sakoon.',
        icon: '🤲'
      },
      {
        id: 'p_sales',
        title: 'Sales & Client Follow-ups',
        urduTitle: 'گاہکوں سے رابطہ اور فالو اپ',
        desc: 'Kam az kam 5 purane ya naye g协同 se direct baat.',
        icon: '📞'
      },
      {
        id: 'p_inventory',
        title: 'Cashflow & Stock Check',
        urduTitle: 'کیش فلو اور مال کی پڑتال',
        desc: 'Khatay ka baqaya hisaab aur delivery challan check.',
        icon: '📦'
      },
      {
        id: 'p_ads',
        title: 'Marketing / Ad Review',
        urduTitle: 'مارکیٹنگ اور تشہیر جائزہ',
        desc: 'Facebook/TikTok ads aur status par nayi posting.',
        icon: '📈'
      },
      {
        id: 'p_discipline',
        title: 'Zero Shop Time Waste',
        urduTitle: 'دکان پر وقت کے ضیاع سے بچاؤ',
        desc: 'Be-faida chitchat aur mobile scrolling se parhez.',
        icon: '🛡️'
      }
    ]
  },
  {
    id: 'freelancer',
    title: 'Freelancer & Agency',
    urduTitle: 'فری لانسر اور ڈیجیٹل ایجنسی',
    tagline: 'Coder, video editor, designer, media buyer, ya agency owner.',
    icon: '👨‍💻',
    color: 'from-purple-600 to-pink-700',
    defaultPriorityPlaceholder: 'e.g. Upwork/Fiverr par 8 customized proposals bhejna aur client project deliver karna...',
    defaultDistractionWarning: 'YouTube tutorials ki rabbit hole mein phansna, notification check karna...',
    pillars: [
      {
        id: 'p_namaz',
        title: 'Namaz & Routine',
        urduTitle: 'نماز اور صبح کا روٹین',
        desc: 'Punctual uthna aur zehni stability.',
        icon: '🤲'
      },
      {
        id: 'p_outreach',
        title: 'Outreach & Pitches (5-10)',
        urduTitle: 'کلائنٹس کو پچ اور پروپوزل',
        desc: 'Upwork, LinkedIn, ya WhatsApp par naye clients ko message.',
        icon: '✉️'
      },
      {
        id: 'p_deepwork',
        title: 'Deep Focus Work (2-3 Hrs)',
        urduTitle: 'بغیر کسی رکاوٹ کے ڈیپ ورک',
        desc: 'Baghair browser tab badle sirf client task mukammal karna.',
        icon: '💻'
      },
      {
        id: 'p_skill',
        title: 'Skill Upgrade (30 Mins)',
        urduTitle: 'نئی اسکل اور ٹولز سیکھنا',
        desc: 'Naye AI tools, coding libraries, ya ads strategies seekhna.',
        icon: '⚡'
      },
      {
        id: 'p_discipline',
        title: 'Zero Doomscrolling',
        urduTitle: 'سوشل میڈیا ضیاع کا خاتمہ',
        desc: 'Kaam ke doran phone doosray kamray mein rakhna.',
        icon: '🚫'
      }
    ]
  },
  {
    id: 'student',
    title: 'Student & Aspirant',
    urduTitle: 'طالب علم اور امتحان کی تیاری',
    tagline: 'Matric, FSc, MDCAT, CSS, ya University student.',
    icon: '🎓',
    color: 'from-emerald-600 to-teal-700',
    defaultPriorityPlaceholder: 'e.g. Physics ke 2 mushkil chapters mukammal karna aur 50 MCQs solve karna...',
    defaultDistractionWarning: 'PubG, TikTok scrolling, WhatsApp status dekhna...',
    pillars: [
      {
        id: 'p_namaz',
        title: 'Namaz & Concentration',
        urduTitle: 'نماز اور ارتکازِ توجہ',
        desc: 'Subah Fajr se din shuru karna taake memory tez ho.',
        icon: '🤲'
      },
      {
        id: 'p_study',
        title: 'Heavy Subject Study (3 Hrs)',
        urduTitle: 'سب سے مشکل مضمون کی پڑھائی',
        desc: 'Subah ke waqt sab se ahem subject par focus.',
        icon: '📚'
      },
      {
        id: 'p_practice',
        title: 'Past Papers / MCQs Solving',
        urduTitle: 'ماضی کے پرچے اور ٹیسٹ پریکٹس',
        desc: 'Ratta lagane ke bajaye active paper practice.',
        icon: '📝'
      },
      {
        id: 'p_fitness',
        title: 'Physical Walk / Sports',
        urduTitle: 'ورزش اور جسمانی سرگرمی',
        desc: 'Dimaagh ko fresh rakhne ke liye 20 minute walk.',
        icon: '🏃'
      },
      {
        id: 'p_discipline',
        title: 'No Late Night Screen Trap',
        urduTitle: 'رات کو موبائل سکرین سے پرہیز',
        desc: 'Raat ko jaldi sona taake agla din fresh guzray.',
        icon: '🌙'
      }
    ]
  },
  {
    id: 'jobseeker',
    title: 'Job Holder & Side Hustler',
    urduTitle: 'ملازم اور سائیڈ بزنس کی تلاش',
    tagline: '9-to-5 job ke sath career switch ya extra income banane wale.',
    icon: '👔',
    color: 'from-amber-600 to-orange-700',
    defaultPriorityPlaceholder: 'e.g. Job ke baad 1.5 ghantay apne online store par kaam karna aur 3 CVs bhejna...',
    defaultDistractionWarning: 'Office ke thakawat ke bahane bed par let kar 3 ghantay phone chalana...',
    pillars: [
      {
        id: 'p_namaz',
        title: 'Namaz & Patience',
        urduTitle: 'نماز اور صبر و استقامت',
        desc: 'Rozana ki mashaqqat mein dil ka sukoon.',
        icon: '🤲'
      },
      {
        id: 'p_sidehustle',
        title: 'Side Hustle / 1 Hr Work',
        urduTitle: 'سائیڈ بزنس پر 1 گھنٹہ کام',
        desc: 'Job ke ilawa apni zaati kamai ke zariye par mehnat.',
        icon: '💡'
      },
      {
        id: 'p_applications',
        title: '3-5 Targeted Applications',
        urduTitle: 'بہتر نوکری کے لیے اپلائی',
        desc: 'LinkedIn aur network ke zariye behtar package ki talash.',
        icon: '📄'
      },
      {
        id: 'p_communication',
        title: 'English & Soft Skills (20m)',
        urduTitle: 'مواصلاتی صلاحیتیں اور اعتماد',
        desc: 'Interview aur professional bol chal ki mashq.',
        icon: '🗣️'
      },
      {
        id: 'p_discipline',
        title: 'Zero Office Gossip',
        urduTitle: 'دفتر کی منفی باتوں سے دوری',
        desc: 'Gile shikway chor kar apni growth par tawajjoh.',
        icon: '🎯'
      }
    ]
  },
  {
    id: 'reset',
    title: 'Restart & Mental Reset Mode',
    urduTitle: 'دوبارہ شروعات اور ذہنی سکون',
    tagline: 'Confused, demotivated, waqt zaya hone ka pachtawa, ya zero se shuruat.',
    icon: '🔄',
    color: 'from-rose-600 to-slate-800',
    defaultPriorityPlaceholder: 'e.g. Apne kamray ki safai karna, 1 zaroori call karna, aur 2 ghantay mobile band rakhna...',
    defaultDistractionWarning: 'Guilt aur sharmindagi mein aakar mazeed phone mein ghus jana...',
    pillars: [
      {
        id: 'p_namaz',
        title: 'Namaz / 5 Mins Silence',
        urduTitle: 'نماز اور خاموشی میں استغفار',
        desc: 'Guzre hue waqt ka pachtawa chor kar Allah se madad mangna.',
        icon: '🤲'
      },
      {
        id: 'p_microtask',
        title: '1 Micro Task Completed',
        urduTitle: 'کوئی 1 چھوٹا کام مکمل کرنا',
        desc: 'Chotay kaam se dimaagh ko kamyabi ka signal milta hai.',
        icon: '✅'
      },
      {
        id: 'p_walk',
        title: '20 Mins Walk in Fresh Air',
        urduTitle: 'تازہ ہوا میں 20 منٹ واک',
        desc: 'Kamray se nikal kar dimaagh ke bojh ko halka karein.',
        icon: '🚶'
      },
      {
        id: 'p_read',
        title: 'Learn 1 Inspiring Idea',
        urduTitle: 'کوئی 1 اچھی کتاب یا ویڈیو',
        desc: 'Positive soch dimaagh mein daalna.',
        icon: '📖'
      },
      {
        id: 'p_noshame',
        title: 'No Guilt / Zero Self-Shame',
        urduTitle: 'خود کو برا بھلا کہنا بند کریں',
        desc: 'Insaan galti karke hi seekhta hai. Aaj se naya safar shuru.',
        icon: '❤️'
      }
    ]
  }
];
