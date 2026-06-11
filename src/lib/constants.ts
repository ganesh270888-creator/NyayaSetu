export const NOTICE_TYPES = [
  { value: "DEMAND_NOTICE", label: "Demand Notice", labelHi: "मांग नोटिस" },
  { value: "REPLY_TO_NOTICE", label: "Reply to Notice", labelHi: "नोटिस का जवाब" },
  { value: "CHEQUE_BOUNCE_138", label: "Cheque Bounce (Sec 138)", labelHi: "चेक बाउंस (धारा 138)" },
  { value: "EVICTION_NOTICE", label: "Eviction Notice", labelHi: "बेदखली नोटिस" },
  { value: "TERMINATION_NOTICE", label: "Termination Notice", labelHi: "समाप्ति नोटिस" },
  { value: "RECOVERY_NOTICE", label: "Recovery Notice", labelHi: "वसूली नोटिस" },
  { value: "CUSTOM", label: "Custom Notice", labelHi: "कस्टम नोटिस" },
] as const;

export const GST_NOTICE_TYPES = [
  { value: "SCN_73", label: "Show Cause Notice (Sec 73)", labelHi: "कारण बताओ नोटिस (धारा 73)" },
  { value: "SCN_74", label: "Show Cause Notice (Sec 74)", labelHi: "कारण बताओ नोटिस (धारा 74)" },
  { value: "DRC_01", label: "DRC-01 (Demand Notice)", labelHi: "DRC-01 (मांग नोटिस)" },
  { value: "DRC_07", label: "DRC-07 (Order)", labelHi: "DRC-07 (आदेश)" },
  { value: "ASMT_10", label: "ASMT-10 (Scrutiny)", labelHi: "ASMT-10 (जांच)" },
  { value: "REG_17", label: "REG-17 (Cancellation)", labelHi: "REG-17 (रद्दीकरण)" },
  { value: "OTHER", label: "Other", labelHi: "अन्य" },
] as const;

export const GST_SECTIONS = [
  "Section 73 - Tax short paid (no fraud)",
  "Section 74 - Tax short paid (fraud)",
  "Section 75 - General provisions",
  "Section 107 - Appeal to Appellate Authority",
  "Section 112 - Appeal to Tribunal",
  "Section 16 - ITC eligibility",
  "Section 17 - ITC restrictions",
  "Section 29 - Cancellation of registration",
] as const;

export const DISPUTE_STAGES = [
  { value: "SHOW_CAUSE", label: "Show Cause Notice Received", labelHi: "कारण बताओ नोटिस प्राप्त" },
  { value: "REPLY_FILED", label: "Reply Filed", labelHi: "उत्तर दायर" },
  { value: "HEARING_SCHEDULED", label: "Hearing Scheduled", labelHi: "सुनवाई निर्धारित" },
  { value: "ORDER_RECEIVED", label: "Order Received", labelHi: "आदेश प्राप्त" },
  { value: "APPEAL_FILED", label: "Appeal Filed", labelHi: "अपील दायर" },
  { value: "RESOLVED", label: "Resolved", labelHi: "हल हो गया" },
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
] as const;

export const RISK_COLORS = {
  LOW: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  MEDIUM: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  HIGH: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  CRITICAL: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
} as const;
