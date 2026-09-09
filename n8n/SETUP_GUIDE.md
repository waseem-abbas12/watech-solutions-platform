# Watech Multi-Sector AI Automation System — Mukammal Setup Guide

Yeh guide aapke multi-sector ecosystem (**Real Estate**, **Chinioti Furniture**, **Events & Banquets**) ke liye **n8n AI Automation System** ko Render.com par deploy karne, Meta WhatsApp Cloud API, Firebase Firestore, OpenAI (GPT-4o-mini), aur Google services ko connect karne ka mukammal step-by-step tareeqa faraham karti hai.

---

## 1. System Architecture & Workflows Overview

Hamare system mein **6 Automated AI Workflows** shamil hain:

```mermaid
graph TD
    subgraph "Inbound Channels"
        WebsiteInquiry["Website Inquiry Form<br/>(Modal Submit)"]
        WhatsAppUser["WhatsApp Inbound Chat<br/>(Customer Message)"]
        FBAds["Meta / FB Lead Ads<br/>(Ad Form Submit)"]
        CronSchedule["Cron Schedule<br/>(Daily 11 AM PKT)"]
        OrderComplete["Orders Collection<br/>(Status: completed)"]
        PrefInquiry["WhatsApp / Web Preference<br/>(Budget & Specs)"]
    end

    subgraph "n8n Automation Engine (Render.com + PostgreSQL)"
        WF1["WF 1: Lead Capture & 8s Auto-Reply"]
        WF2["WF 2: WhatsApp AI Chatbot with Memory"]
        WF3["WF 3: FB Ads to Instant WhatsApp"]
        WF4["WF 4: 24h Inactive Leads Follow-Up"]
        WF5["WF 5: Partner Commission Auto-Calculation"]
        WF6["WF 6: AI Multi-Sector Recommendations"]
    end

    subgraph "External AI & Cloud Integrations"
        OpenAI["OpenAI GPT-4o-mini"]
        MetaCloudAPI["Meta WhatsApp Graph API"]
        FirestoreDB["Firebase Cloud Firestore"]
        OperationsAlert["Partner & Admin Alert (WhatsApp/Email)"]
    end

    WebsiteInquiry --> WF1
    WhatsAppUser --> WF2
    FBAds --> WF3
    CronSchedule --> WF4
    OrderComplete --> WF5
    PrefInquiry --> WF6

    WF1 & WF2 & WF3 & WF4 & WF5 & WF6 <--> OpenAI
    WF1 & WF2 & WF3 & WF4 & WF5 & WF6 <--> FirestoreDB
    WF1 & WF2 & WF3 & WF4 & WF5 & WF6 --> MetaCloudAPI
    WF1 & WF3 & WF5 --> OperationsAlert
```

---

## 2. Step 1: Render.com par n8n + PostgreSQL Deploy Karna (Free Tier)

Render.com par hamari repository mein mojood `render.yaml` blueprint file ke zariye n8n Docker image aur free PostgreSQL database automatic deploy ho jaate hain.

### Option A: Blueprint se Automatic Deploy (Recommended)
1. [Render.com](https://render.com) par account banayein aur login karein.
2. Dashboard mein ja kar **"New +"** par click karein aur **"Blueprint"** select karein.
3. Apni GitHub repository (`my plan platforn watech solutions`) connect karein.
4. Render automatic tor par `render.yaml` ko detect karega:
   - **Service 1:** `watech-n8n-automation` (Docker Web Service, Free tier)
   - **Service 2:** `watech-n8n-db` (PostgreSQL Database, Free tier)
5. **"Apply"** par click karein.
6. 3 se 5 minutes mein n8n compile aur deploy ho kar live ho jaye ga:
   `https://watech-n8n-automation.onrender.com`

### Option B: Render PostgreSQL Database ko Renewable Rakhna
- Render ka free PostgreSQL 90 days ke liye active rehta hai.
- 90 days baad Render dashboard mein ek button click se new database assign ho jata hai ya free tier refresh ho jata hai.
- n8n ke tamam workflows ka JSON backup hamare local codebase (`n8n/workflows/`) mein hamesha safe hai!

### Option C: Render Free Tier Cold-Start Fix (UptimeRobot)
- Render free tier par agar 15 minute koi request na aaye to service sleep mode mein chali jati hai.
- Is ko 24/7 active rakhne ke liye [UptimeRobot.com](https://uptimerobot.com) (Free) par free HTTP monitor lagayein:
  - **Monitor Type:** HTTP(s)
  - **URL:** `https://watech-n8n-automation.onrender.com/healthz`
  - **Interval:** Every 5 minutes

---

## 3. Step 2: Meta WhatsApp Cloud API Setup (1,000 Free Convs/Month)

Meta har business account ko har maah **1,000 Free Service Conversations** faraham karta hai.

### 1. Meta Developer Portal par App Banayein:
1. [Meta for Developers](https://developers.facebook.com) par jayein aur login karein.
2. **"My Apps"** $\rightarrow$ **"Create App"** par click karein.
3. Use case mein **"Other"** $\rightarrow$ **"Business"** select karein.
4. App banne ke baad dashboard mein **"WhatsApp"** product add karein (**Set up** click karein).

### 2. WhatsApp API Setup & Credentials:
1. WhatsApp $\rightarrow$ **API Setup** page par jayein.
2. Wahan aapko yeh details milengi:
   - **Temporary Access Token** (Testing ke liye)
   - **Phone Number ID** (e.g. `104829102938475`)
   - **WhatsApp Business Account ID** (e.g. `982736451029384`)
3. **Permanent Access Token Hasil Karein:**
   - Meta Business Suite $\rightarrow$ **Business Settings** $\rightarrow$ **System Users** par jayein.
   - Ek naya System User banayein (Role: `Admin`).
   - **"Generate Token"** par click karein, apni App select karein, aur yeh permissions tick karein:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`
   - Token ko copy kar ke mehfooz jagah save kar lein.

### 3. Webhook Configuration:
1. WhatsApp $\rightarrow$ **Configuration** par jayein.
2. **Callback URL** mein apna Render n8n webhook URL dalein:
   - Agar Next.js backend ke zariye forward karna ho: `https://your-domain.vercel.app/api/webhooks/whatsapp`
   - Ya Direct n8n URL: `https://watech-n8n-automation.onrender.com/webhook/whatsapp-inbound`
3. **Verify Token:** `watech_secure_verify_token_2026`
4. **"Verify and Save"** par click karein.
5. **Webhook Fields** mein **"messages"** ko **Subscribe** karein.

---

## 4. Step 3: Firebase Firestore Service Account Credentials

n8n ko Firestore se connect karne ke liye:
1. [Firebase Console](https://console.firebase.google.com) par apna project open karein.
2. Project settings (gear icon) $\rightarrow$ **"Service accounts"** tab par jayein.
3. **"Generate new private key"** par click karein. Ek JSON file download hogi.
4. Us JSON file se yeh values note karein:
   - `project_id`: (e.g. `watech-solutions`)
   - `client_email`: (e.g. `firebase-adminsdk-xxx@watech-solutions.iam.gserviceaccount.com`)
   - `private_key`: (`-----BEGIN PRIVATE KEY-----\n...-----END PRIVATE KEY-----\n`)
5. Render ke Environment Variables mein ya n8n ke andar credentials mein yeh daal dein.

---

## 5. Step 4: OpenAI API Setup (GPT-4o-mini)

1. [OpenAI Platform](https://platform.openai.com) par login karein.
2. **API Keys** section mein naya key generate karein (`sk-proj-...`).
3. Model: `gpt-4o-mini` use ho raha hai jo fast bhi hai aur GPT-4 ke muqablay mein 90% sasta hai.
4. n8n mein `OPENAI_API_KEY` set kar dein.

---

## 6. Step 5: Gmail & Google Calendar Setup

### Gmail Notifications:
1. Apne Google Account security settings mein jayein: [App Passwords](https://myaccount.google.com/apppasswords).
2. App name: `Watech Automation` likh kar **Create** karein.
3. 16-character ka app password copy kar ke `GMAIL_APP_PASSWORD` mein set karein.

### Google Calendar Scheduling:
- Jab buyer property visit ya venue viewing book karta hai, n8n ka Google Calendar node automatically partner aur buyer ke calendar mein event create kar deta hai.

---

## 7. Step 6: Tamam 6 Workflows ko n8n mein Import Karna

Codebase ke folder `n8n/workflows/` mein tamam 6 workflows ki JSON files tayyar hain:

| Workflow File | Purpose | Trigger | Key Integrations |
| :--- | :--- | :--- | :--- |
| [`workflow-1-lead-capture-autoreply.json`](file:///d:/my%20plan%20platforn%20watech%20solutions/n8n/workflows/workflow-1-lead-capture-autoreply.json) | Web inquiry $\rightarrow$ AI greeting $\rightarrow$ 8s delay $\rightarrow$ WhatsApp reply $\rightarrow$ Partner alert | Webhook: `/webhook/lead-inquiry` | OpenAI, Meta WhatsApp, Firestore |
| [`workflow-2-whatsapp-ai-chatbot.json`](file:///d:/my%20plan%20platforn%20watech%20solutions/n8n/workflows/workflow-2-whatsapp-ai-chatbot.json) | 24/7 Multi-Sector AI Chatbot with Memory (Properties, Furniture, Events) | Webhook: `/webhook/whatsapp-inbound` | OpenAI GPT-4o-mini, Firestore Memory, Meta Graph API |
| [`workflow-3-facebook-lead-ads.json`](file:///d:/my%20plan%20platforn%20watech%20solutions/n8n/workflows/workflow-3-facebook-lead-ads.json) | Instant WhatsApp outreach to FB/IG Lead Ads submitters | Webhook: `/webhook/facebook-lead-ads` | Meta Graph API, OpenAI, Firestore |
| [`workflow-4-followup-reminders.json`](file:///d:/my%20plan%20platforn%20watech%20solutions/n8n/workflows/workflow-4-followup-reminders.json) | 24-hour inactive leads auto follow-up | Cron (Daily 11:00 AM PKT) | Firestore runQuery, OpenAI, WhatsApp API |
| [`workflow-5-partner-commission.json`](file:///d:/my%20plan%20platforn%20watech%20solutions/n8n/workflows/workflow-5-partner-commission.json) | Automatic commission calculation & voucher dispatch | Webhook: `/webhook/order-completed` | Math Engine, Firestore Transactions, WhatsApp Voucher |
| [`workflow-6-ai-recommendations.json`](file:///d:/my%20plan%20platforn%20watech%20solutions/n8n/workflows/workflow-6-ai-recommendations.json) | User budget & preference $\rightarrow$ Top 3 matched items formatted dispatch | Webhook: `/webhook/ai-recommendations` | OpenAI Extraction, Catalog Matcher, WhatsApp |

### Import Karne Ka Tareeqa:
1. Apna n8n dashboard open karein (`https://watech-n8n-automation.onrender.com`).
2. Left menu se **"Workflows"** par jayein.
3. Top right par **"Add Workflow"** ya dots par click kar ke **"Import from File"** choose karein.
4. `n8n/workflows/` se pehli file (`workflow-1-lead-capture-autoreply.json`) select karein.
5. Workflow screen par aate hi top-right par **"Active"** toggle ko **ON** kar dein.
6. Isi tarah baqi 5 workflows ko baari baari import aur active karein.

---

## 8. Step 7: Testing & Verification Payloads

Aap in sample cURL commands se har workflow ko test kar sakte hain:

### Test Workflow 1 (Lead Capture & 8s Auto-Reply):
```bash
curl -X POST "https://watech-n8n-automation.onrender.com/webhook/lead-inquiry" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Hamza Tariq",
    "phone": "03001234567",
    "email": "hamza@example.com",
    "category": "property",
    "itemTitle": "1 Kanal Luxury Villa DHA Phase 6 Lahore",
    "message": "Is this villa still available for site visit?",
    "budget": "PKR 8.5 Crore",
    "city": "Lahore"
  }'
```

### Test Workflow 2 (WhatsApp Chatbot Inbound Message):
```bash
curl -X POST "https://watech-n8n-automation.onrender.com/webhook/whatsapp-inbound" \
  -H "Content-Type: application/json" \
  -d '{
    "entry": [{
      "changes": [{
        "value": {
          "contacts": [{ "profile": { "name": "Bilal Sheikh" } }],
          "messages": [{
            "from": "923001234567",
            "id": "wamid.TEST_001",
            "text": { "body": "Chinioti bed sets ki kya prices hain?" }
          }]
        }
      }]
    }]
  }'
```

### Test Workflow 5 (Partner Commission Auto-Calculation):
```bash
curl -X POST "https://watech-n8n-automation.onrender.com/webhook/order-completed" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-2026-9901",
    "partnerId": "PARTNER-CHINIOT-WOODS",
    "partnerName": "Chiniot Royal Crafts",
    "partnerPhone": "03270831470",
    "category": "furniture",
    "orderAmount": 345000
  }'
```

### Test Workflow 6 (AI Multi-Sector Recommendations):
```bash
curl -X POST "https://watech-n8n-automation.onrender.com/webhook/ai-recommendations" \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Ali Raza",
    "phone": "03270831470",
    "text": "Mujhe DHA Phase 6 mein 1 kanal ka luxury ghar chahiye under 9 crore"
  }'
```

---

## 9. Error Auto-Fix & Best Practices Guide

| Masla / Error | Waja | Hal (Resolution) |
| :--- | :--- | :--- |
| **Meta 400: Message Undeliverable** | 24-hour service window close ho chuki hai | User ko initiate karne dein ya approved Meta utility template send karein. |
| **Render Webhook Timeout** | n8n workflow ka response 30 seconds se zyada le raha hai | Webhook node ki setting `Response Mode: On Received` rakhein (jo hamare JSONs mein already set hai). |
| **PostgreSQL Connection Drops** | Render free database sleep ho gaya | Free tier refresh karein ya environment variable `DB_POSTGRESDB_PORT=5432` check karein. |
| **Firestore Permission Denied** | Firestore Rules allow nahi kar rahay | Admin Service Account use karein jo rules ko bypass karta hai. |
| **OpenAI 429 Rate Limit** | API credits khatam hain ya tier 1 limit exceed ho gayi | OpenAI dashboard mein minimum \$5 credit add karein. |

---
**Watech Solutions AI Automation Engine is 100% Production Ready!**
