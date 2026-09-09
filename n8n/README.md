# Watech Multi-Sector n8n Automation Engine

Self-hosted **n8n AI Automation System** for **Watech Solutions Multi-Sector Ecosystem Platform** (Real Estate, Chinioti Handcrafted Furniture, Events & Banquets).

---

## 📁 Directory Structure

```
n8n/
├── .env.n8n.example                     # Full template with documented environment variables
├── SETUP_GUIDE.md                       # Comprehensive step-by-step setup guide (Roman Urdu)
├── meta-setup-guide.md                  # Meta WhatsApp Cloud API credentials setup guide
├── whatsapp-automation-workflow.json    # Base WhatsApp prototype workflow
└── workflows/                           # 6 Production-Ready Importable Workflows:
    ├── workflow-1-lead-capture-autoreply.json
    ├── workflow-2-whatsapp-ai-chatbot.json
    ├── workflow-3-facebook-lead-ads.json
    ├── workflow-4-followup-reminders.json
    ├── workflow-5-partner-commission.json
    └── workflow-6-ai-recommendations.json
```

---

## 🚀 Quick Start

1. **Deploy to Render.com**: Push this repo to GitHub and create a Render Blueprint using the root [`render.yaml`](../render.yaml).
2. **Configure Environment Variables**: Use [`n8n/.env.n8n.example`](.env.n8n.example) to fill in your Render and n8n environment variables.
3. **Import Workflows**: Open your live n8n instance (`https://your-n8n.onrender.com`), go to **Workflows -> Import from File**, and import all 6 files from `n8n/workflows/`.
4. **Follow Detailed Guide**: Read [`n8n/SETUP_GUIDE.md`](SETUP_GUIDE.md) for complete end-to-end testing payloads and instructions.
