import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_Naf8KLRwYW2E@ep-fragrant-bread-apprslrq-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require');

const statements = [
  // Enums
  `CREATE TYPE "UserRole" AS ENUM ('MSME_OWNER', 'INDIVIDUAL', 'ADVOCATE', 'CA', 'ADMIN')`,
  `CREATE TYPE "Language" AS ENUM ('EN', 'HI', 'MR', 'GU', 'TA', 'BN', 'TE', 'KN')`,
  `CREATE TYPE "CaseStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'AWAITING_RESPONSE', 'RESOLVED', 'ESCALATED', 'CLOSED')`,
  `CREATE TYPE "CaseType" AS ENUM ('CONTRACT_REVIEW', 'LEGAL_NOTICE', 'GST_DISPUTE', 'CREDIT_RECOVERY')`,
  `CREATE TYPE "NoticeType" AS ENUM ('DEMAND_NOTICE', 'REPLY_TO_NOTICE', 'CHEQUE_BOUNCE_138', 'EVICTION_NOTICE', 'TERMINATION_NOTICE', 'RECOVERY_NOTICE', 'CUSTOM')`,
  `CREATE TYPE "DisputeStage" AS ENUM ('SHOW_CAUSE', 'REPLY_FILED', 'HEARING_SCHEDULED', 'ORDER_RECEIVED', 'APPEAL_FILED', 'RESOLVED')`,

  // User
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MSME_OWNER',
    "language" "Language" NOT NULL DEFAULT 'HI',
    "businessName" TEXT,
    "gstin" TEXT,
    "udyamNumber" TEXT,
    "state" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone")`,
  `CREATE INDEX IF NOT EXISTS "User_phone_idx" ON "User"("phone")`,
  `CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email")`,

  // Account
  `CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId")`,

  // Session
  `CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken")`,

  // VerificationToken - drop and recreate since it exists but may be wrong
  `DROP TABLE IF EXISTS "VerificationToken"`,
  `CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token")`,

  // Case
  `CREATE TABLE IF NOT EXISTS "Case" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "type" "CaseType" NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "language" "Language" NOT NULL DEFAULT 'HI',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Case_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Case_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "Case_userId_idx" ON "Case"("userId")`,
  `CREATE INDEX IF NOT EXISTS "Case_type_idx" ON "Case"("type")`,
  `CREATE INDEX IF NOT EXISTS "Case_status_idx" ON "Case"("status")`,

  // Document
  `CREATE TABLE IF NOT EXISTS "Document" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "caseId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "storagePath" TEXT NOT NULL,
    "extractedText" TEXT,
    "language" "Language" NOT NULL DEFAULT 'HI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Document_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE SET NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "Document_userId_idx" ON "Document"("userId")`,
  `CREATE INDEX IF NOT EXISTS "Document_caseId_idx" ON "Document"("caseId")`,

  // Analysis
  `CREATE TABLE IF NOT EXISTS "Analysis" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "caseId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "result" JSONB NOT NULL,
    "riskScore" INTEGER,
    "language" "Language" NOT NULL DEFAULT 'HI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Analysis_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "Analysis_caseId_idx" ON "Analysis"("caseId")`,

  // Notice
  `CREATE TABLE IF NOT EXISTS "Notice" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "caseId" TEXT NOT NULL,
    "noticeType" "NoticeType" NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "draftedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),
    "language" "Language" NOT NULL DEFAULT 'HI',
    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Notice_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "Notice_caseId_idx" ON "Notice"("caseId")`,

  // GstDispute
  `CREATE TABLE IF NOT EXISTS "GstDispute" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "caseId" TEXT NOT NULL,
    "gstin" TEXT NOT NULL,
    "assessmentYear" TEXT NOT NULL,
    "disputeAmount" DECIMAL(65,30) NOT NULL,
    "stage" "DisputeStage" NOT NULL DEFAULT 'SHOW_CAUSE',
    "section" TEXT,
    "hearingDate" TIMESTAMP(3),
    "officerName" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GstDispute_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "GstDispute_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "GstDispute_caseId_idx" ON "GstDispute"("caseId")`,
  `CREATE INDEX IF NOT EXISTS "GstDispute_gstin_idx" ON "GstDispute"("gstin")`,

  // CreditRecovery
  `CREATE TABLE IF NOT EXISTS "CreditRecovery" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "caseId" TEXT NOT NULL,
    "debtorName" TEXT NOT NULL,
    "debtorAddress" TEXT,
    "principalAmount" DECIMAL(65,30) NOT NULL,
    "interestRate" DECIMAL(65,30),
    "totalDue" DECIMAL(65,30) NOT NULL,
    "mechanism" TEXT NOT NULL,
    "filingStatus" TEXT NOT NULL DEFAULT 'NOT_FILED',
    "filingDate" TIMESTAMP(3),
    "referenceNumber" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CreditRecovery_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "CreditRecovery_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE
  )`,
  `CREATE INDEX IF NOT EXISTS "CreditRecovery_caseId_idx" ON "CreditRecovery"("caseId")`,

  // LegalTemplate
  `CREATE TABLE IF NOT EXISTS "LegalTemplate" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "category" "CaseType" NOT NULL,
    "subCategory" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameHi" TEXT,
    "description" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'EN',
    "variables" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LegalTemplate_pkey" PRIMARY KEY ("id")
  )`,
  `CREATE INDEX IF NOT EXISTS "LegalTemplate_category_idx" ON "LegalTemplate"("category")`,
  `CREATE INDEX IF NOT EXISTS "LegalTemplate_language_idx" ON "LegalTemplate"("language")`,
];

async function run() {
  for (const stmt of statements) {
    try {
      await sql.query(stmt);
      console.log('OK:', stmt.substring(0, 60).replace(/\n/g, ' '));
    } catch (e) {
      if (e.message?.includes('already exists')) {
        console.log('SKIP (exists):', stmt.substring(0, 60).replace(/\n/g, ' '));
      } else {
        console.error('FAIL:', stmt.substring(0, 60).replace(/\n/g, ' '), '-', e.message);
      }
    }
  }

  const tables = await sql.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename");
  console.log('\nTables:', tables.map(t => t.tablename).join(', '));
}

run();
