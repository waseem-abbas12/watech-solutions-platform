# Meta WhatsApp Cloud API + n8n Automation Setup Guide

Yeh guide aapko **Meta WhatsApp Cloud API (Free Tier: 1,000 monthly conversations)** aur **Self-Hosted n8n (Render.com Free Tier: 750 hrs/month)** ko step-by-step connect karne ka mukammal tareeqa batati hai.

---

## Step 1: Meta for Developers Account & WhatsApp App Setup

1. [developers.facebook.com](https://developers.facebook.com) par jayein aur apne Facebook account se login karein.
2. **"My Apps"** par click karein aur **"Create App"** button dabayein.
3. App Type mein **"Other"** select karein aur agle step par **"Business"** choose karein.
4. App Name daalein (e.g. `Watech Solutions WhatsApp Bot`) aur create karein.
5. Dashboard par **"Add products to your app"** ke andar **WhatsApp** dhoondhein aur **"Set Up"** par click karein.
6. Aapko ek **Test WhatsApp Phone Number** aur **1,000 Free Service Conversations per month** mil jayenge.

---

## Step 2: Credentials Copy Karein

WhatsApp > API Setup page se yeh 3 cheezein copy karein:

1. **Phone Number ID:** (e.g. `104829102938102`)
2. **Temporary Access Token** (testing ke liye) ya **Permanent System User Token**:
   - Permanent token ke liye: *Meta Business Settings > Users > System Users > Add System User (Admin role) > Generate Token* > Scopes select karein: `whatsapp_business_messaging` aur `whatsapp_business_management`.
3. **Verify Token:** Koi bhi secure random string choose karein (e.g. `watech_secure_verify_token_2026`).

---

## Step 3: Self-Hosted n8n Deploy Karein (Render.com Free Tier)

Hamare workspace mein pehle se **`render.yaml`** file banayi gayi hai:

1. [Render.com](https://render.com) par free account banayein.
2. **New + > Blueprint** par click karein aur apna Watech Git repository connect karein.
3. Render automatically `render.yaml` detect karega aur official `docker.n8n.io/n8nio/n8n:latest` container deploy kar dega.
4. Deployment ke baad aapko free URL milega:
   `https://watech-n8n-automation.onrender.com`
5. Is URL ko open karein, apna admin account create karein aur n8n dashboard mein login ho jayein.

---

## Step 4: n8n Workflow Import Karein

1. n8n Dashboard mein **Workflows > Add Workflow** par jayein.
2. Top-right menu (three dots `...`) par click karke **"Import from File"** karein.
3. Hamari file **`n8n/whatsapp-automation-workflow.json`** select karein.
4. Workflow canvas par tamam nodes automatically load ho jayenge:
   - `Webhook: Incoming WhatsApp`
   - `Parse Meta Payload`
   - `Firestore: Check User Exists`
   - `Firestore: Create Buyer Lead`
   - `NLP: Intent & Auto-Reply Generator`
   - `Firestore: Log Conversation`
   - `Meta API: Send WhatsApp Reply`
   - `Meta API: Notify Partner`
5. **Environment Variables:** n8n Settings > Environment ya Render environment variables mein add karein:
   - `WHATSAPP_PHONE_NUMBER_ID`
   - `WHATSAPP_ACCESS_TOKEN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_AUTH_TOKEN`
   - `PARTNER_ALERT_PHONE_NUMBER` (e.g. `923001234567`)
6. Workflow ko **"Active"** toggle switch ON kar dein.

---

## Step 5: Meta Webhook Configure Karein

1. Meta Developer Console > WhatsApp > **Configuration** tab par jayein.
2. **Webhook** section mein **"Edit"** click karein:
   - **Callback URL:** 
     `https://watech-n8n-automation.onrender.com/webhook/watech-whatsapp-webhook-01`
     *(Ya hamara Next.js webhook proxy: `https://your-domain.com/api/webhooks/whatsapp`)*
   - **Verify Token:** `watech_secure_verify_token_2026`
3. **"Verify and Save"** par click karein (Green tick ✅ appear hoga).
4. **Webhook Fields** mein **"messages"** event ke samne **"Subscribe"** click karein.

---

## Step 6: End-to-End Live Testing

Apne mobile WhatsApp se Meta ke test number par message bhejein:

| Aapka Message | Expected Auto-Reply | Background Action |
|---|---|---|
| *"Ghar ke baare mein poochhna hai"* | Real Estate listings list with DHA & Bahria pricing | Firestore user check + Partner WhatsApp lead alert |
| *"Chinioti sofa chahiye"* | Authentic Sheesham sofa sets & dining suite specs | Firestore user check + Partner WhatsApp lead alert |
| *"Wedding hall booking chahiye"* | Banquet halls, catering per-head rates & date prompt | Firestore user check + Partner WhatsApp lead alert |
| *"Price list kya hai?"* | All 3 sectors price breakdown | Logged to Firebase 'messages' |
| *"Assalam-o-Alaikum"* | Friendly guidance: "Type Property, Furniture, ya Event" | New buyer created in Firestore 'users' |
