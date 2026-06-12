import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function cleanConnectionString(raw: string): string {
  let s = raw.replace(/^﻿/, "").trim();
  try {
    const url = new URL(s);
    url.searchParams.delete("channel_binding");
    return url.toString();
  } catch {
    return s;
  }
}

function createPrismaClient() {
  const raw = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
  const connectionString = cleanConnectionString(raw);

  if (connectionString.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: connectionString });
  }

  const adapter = new PrismaNeonHttp(connectionString, { fullResults: false });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
