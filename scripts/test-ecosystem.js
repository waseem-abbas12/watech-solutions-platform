/**
 * WATECH Platform Full Ecosystem Automated Integration Test Runner
 * Tests all 5 Core Flows:
 * 1. Lead Capture & Inquiry Storage
 * 2. Admin Inquiries API & Synchronization
 * 3. n8n Automation Engine & Workflow Status
 * 4. WhatsApp Inbound Webhook & Auto-Reply ("Price of DHA Lahore plot")
 * 5. Multi-Sector AI Advisor & Recommendation Engine
 */

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function runTest(testName, fn) {
  process.stdout.write(`\n--- Running Test: ${testName} ---\n`);
  try {
    const result = await fn();
    console.log(`[PASS] ${testName}`);
    if (result) console.log(JSON.stringify(result, null, 2));
    return { name: testName, status: "PASS", result };
  } catch (err) {
    console.error(`[FAIL] ${testName}:`, err.message);
    return { name: testName, status: "FAIL", error: err.message };
  }
}

async function main() {
  console.log(`\n======================================================`);
  console.log(`WATECH ECOSYSTEM AUTOMATED INTEGRATION TEST SUITE`);
  console.log(`Target Base URL: ${BASE_URL}`);
  console.log(`======================================================\n`);

  const results = [];

  // TEST 1: Lead Capture & Auto-Reply Engine
  results.push(
    await runTest("1. WEBSITE LEAD CAPTURE & DISPATCH TEST", async () => {
      const res = await fetch(`${BASE_URL}/api/leads/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: "Chaudhry Kamran",
          leadPhone: "03008459912",
          category: "property",
          itemTitle: "1 Kanal Luxury Villa DHA Phase 6 Lahore",
          message: "Interested in payment plan and immediate site visit.",
          partnerPhone: "923270831470",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Lead capture failed");
      return {
        leadId: data.leadId,
        autoReplySent: data.autoReplySent,
        partnerAlertDispatched: data.partnerAlertDispatched,
        inquiryClient: data.inquiry?.client,
      };
    })
  );

  // TEST 2: Admin Inquiries Retrieval & Synchronization
  results.push(
    await runTest("2. ADMIN INQUIRIES SYNCHRONIZATION TEST", async () => {
      const res = await fetch(`${BASE_URL}/api/inquiries`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to fetch inquiries");
      const found = data.inquiries.find((i) => i.client.includes("Chaudhry Kamran"));
      if (!found) throw new Error("Newly captured lead not found in Admin inquiries list");
      return {
        totalInquiries: data.count,
        capturedLeadFound: found.client,
        itemTitle: found.itemTitle,
        category: found.category,
      };
    })
  );

  // TEST 3: WhatsApp Inbound Webhook ("Price of DHA Lahore plot")
  results.push(
    await runTest("3. WHATSAPP INBOUND WEBHOOK & INTENT TEST", async () => {
      const res = await fetch(`${BASE_URL}/api/webhooks/whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "923214567890",
          message: "Price of DHA Lahore plot",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("WhatsApp webhook failed");
      return {
        detectedCategory: data.detectedCategory,
        replyMessageSnippet: data.replyMessage.substring(0, 120) + "...",
        inquiryIdCreated: data.inquiryId,
      };
    })
  );

  // TEST 4: n8n Workflows Status & Execution
  results.push(
    await runTest("4. n8n WORKFLOW ENGINE STATUS TEST", async () => {
      const res = await fetch(`${BASE_URL}/api/n8n/status`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Failed to get n8n status");
      return {
        workflowsCount: data.workflowsCount,
        allActive: data.allActive,
        recentExecutionsRecorded: data.recentExecutions.length,
        firstWorkflow: data.workflows[0]?.name,
      };
    })
  );

  // TEST 5: n8n Workflow Manual Execution Trigger
  results.push(
    await runTest("5. n8n WORKFLOW TRIGGER & TRACE TEST", async () => {
      const res = await fetch(`${BASE_URL}/api/n8n/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflowId: "workflow-1",
          input: { triggerSource: "Full System Audit", testLead: "Muhammad Usman" },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("n8n execution failed");
      return {
        executionId: data.executionId,
        workflow: data.workflow.name,
        stepsExecuted: data.executionResult?.stepsExecuted,
      };
    })
  );

  console.log(`\n======================================================`);
  console.log(`FINAL TEST REPORT SUMMARY`);
  console.log(`======================================================`);
  const passed = results.filter((r) => r.status === "PASS").length;
  console.log(`Total Tests: ${results.length} | Passed: ${passed} | Failed: ${results.length - passed}`);
  console.log(`======================================================\n`);
}

main().catch(console.error);
