import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      body = {};
    }
    const mode = (typeof body.mode === 'string' ? body.mode : (typeof body.action === 'string' ? body.action : 'generate_daily_plan'));
    const persona = typeof body.persona === 'string' ? body.persona : 'reset';
    const message = typeof body.message === 'string' ? body.message : '';
    const yesterdayScore = typeof body.yesterdayScore === 'number' ? body.yesterdayScore : 50;
    const currentStruggle = typeof body.currentStruggle === 'string' ? body.currentStruggle : '';

    // 1. GENERATE DAILY PERSONALIZED PLAN
    if (mode === 'generate_daily_plan') {
      const planTemplates: Record<string, { oneThing: string; distractionAlert: string; winCondition: string; coachTip: string }> = {
        karobaari: {
          oneThing: 'Apne top 5 purane ya interested customers ko direct WhatsApp voice note bhejein aur delivery challan check karein.',
          distractionAlert: 'Dukan par doston ki be-faida gup shup aur bar bar notification dekhna.',
          winCondition: 'Jab kam az kam 2 deals mein progress ho jaye aur dukan ka cash hisaab clear ho.',
          coachTip: 'Karobaar mein "speed aur follow-up" hi sab kuch hai. Aaj sharm aur jhijhak ko ek taraf rakh kar customers se rabta karein. Barkat harqut mein hai.'
        },
        freelancer: {
          oneThing: '8 customized proposals ya cold pitches bhejein aur 2.5 ghantay baghair social media ke client project par focus karein.',
          distractionAlert: 'YouTube par naye tutorials ki rabbit hole mein phansna jab ke actual kaam pending ho.',
          winCondition: 'Jab 8 pitches dispatch ho jayein aur project ka agla milestone complete ho.',
          coachTip: 'Bhai, duniya mein client tab milta hai jab aap darwaza khatkhatate hain. Rozana ke 8 pitches aapki zindgi badal sakte hain. Let’s do it today.'
        },
        student: {
          oneThing: 'Sab se mushkil chapter ke 2 main concepts ko dimaagh mein bitha kar 30 MCQs ya past paper questions solve karein.',
          distractionAlert: 'Mobile games, Reels scrolling, aur "kal se parhunga" ka dhoka.',
          winCondition: 'Jab 3 ghantay ki pure study baghair phone chhue mukammal ho jaye.',
          coachTip: 'Imtihan mein kamyabi aakhri raat ki parhai se nahi, rozana ke 3 ghantay ke discipline se aati hai. Aaj apne mustaqbil par invest karein.'
        },
        jobseeker: {
          oneThing: 'Job ke baad 1 ghanta naye portfolio project par lagayein aur 4 targeted companies ko personalized message karein.',
          distractionAlert: 'Office ki thakawat ka bahana bana kar bed par 3 ghantay reels dekhna.',
          winCondition: 'Jab 1 ghanta side-hustle par lag jaye aur 4 jagah apply ho chuka ho.',
          coachTip: 'Aapki 9-to-5 job aapka bill bharti hai, lekin aapka 1 ghante ka side-hustle aapka mustaqbil banata hai. Aaj himmat na haarein.'
        },
        reset: {
          oneThing: 'Guzre hue waqt ka pachtawa chorr kar kamray ko saaf karein aur 1 ahem zaroori call bina dare karein.',
          distractionAlert: 'Guilt aur sharmindagi ke chakkar mein mazeed phone mein ghus kar waqt zaya karna.',
          winCondition: 'Jab aap 1 chota kaam mukammal kar lein aur 20 minute walk kar lein.',
          coachTip: 'Suno bhai! Koi bhi insaan perfect nahi hota. Sharmindagi ko dil se nikaal dein. Allah se madad mangein aur sirf aaj ke din ko jeetein. Naya aaghaz mubarak.'
        }
      };

      const selectedPlan = planTemplates[persona] || planTemplates.reset;

      return NextResponse.json({
        success: true,
        plan: selectedPlan
      });
    }

    // 2. INTERACTIVE MENTOR CHAT
    if (mode === 'mentor_chat') {
      const lowerMsg = (message || '').toLowerCase();
      let responseText = '';

      if (lowerMsg.includes('dil nahi kar raha') || lowerMsg.includes('demotivate') || lowerMsg.includes('sust') || lowerMsg.includes('low')) {
        responseText = 'Main samajh sakta hoon bhai. Insaan ka dil hamesha aasan aur aaram deh rasta dhoondta hai. Is waqt poora pahar dekhne ke bajaye sirf "5 Minute Rule" lagayein: bas 5 minute ke liye kaam shuru karein, uske baad dil khud ba khud lag jayega. Watech Community aapke sath hai, himmat karein!';
      } else if (lowerMsg.includes('freelanc') || lowerMsg.includes('order') || lowerMsg.includes('client') || lowerMsg.includes('upwork')) {
        responseText = 'Freelancing mein pehla rule yeh hai: "Quantity of Outreach brings Quality of Clients". Agar aap rozana sirf 10 serious business owners ko WhatsApp ya Upwork par unka masla hal karne ki pich bhejein, toh 2 hafton ke andar pehla paying client milna 90% guaranteed hai. Aaj se 10 pitches ka rule banayein.';
      } else if (lowerMsg.includes('waqt zaya') || lowerMsg.includes('time waste') || lowerMsg.includes('reels') || lowerMsg.includes('mobile')) {
        responseText = 'Yeh reels aur short videos aapke dimaagh ke dopamine ko loot rahi hain. Iska sab se aasan practical hal yeh hai: Phone ko kisi doosre kamray mein rakh dein ya grayscale (black & white) mode par lagayein. Aankhon se door hoga toh dimaagh khud kaam par lag jayega.';
      } else if (lowerMsg.includes('shuru kahan se') || lowerMsg.includes('confuse') || lowerMsg.includes('kya seekh')) {
        responseText = '2026 mein Pakistan ke andar 3 cheezon ki shadeed demand hai: 1) Meta & TikTok Ads for Local Businesses, 2) Video Editing & UGC Content, 3) AI Chatbots & Automations. Inme se kisi 1 cheez ko pakar lein aur aglay 30 din sirf us par rozana 1 ghanta lagayein. Baqi sab dimaagh se nikaal dein.';
      } else {
        responseText = `Zabardast sawal hai! Ek baat hamesha yaad rakhein: Kamyabi kisi secret formula mein nahi, rozana ke chotay disciplined qadmon mein hai. Aapka current role (${persona.toUpperCase()}) intehai ahem hai. Aaj ka apna 1 non-negotiable kaam mukammal karein aur raat ko apna score dekhein. Main har qadam par aapki rahnumai ke liye tayyar hoon.`;
      }

      return NextResponse.json({
        success: true,
        reply: responseText
      });
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
