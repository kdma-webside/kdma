-- Run these SQL commands in Prisma Studio or Turso Console
-- to add the missing date columns

-- Add endDate to Event table
ALTER TABLE "Event" ADD COLUMN "endDate" TEXT;

-- Add startDate and endDate to Training table
ALTER TABLE "Training" ADD COLUMN "startDate" TEXT;
ALTER TABLE "Training" ADD COLUMN "endDate" TEXT;

-- Optional: Add sample dates to existing trainings
-- UPDATE "Training" SET startDate = '2026-03-09T00:00:00.000Z', endDate = '2026-06-09T00:00:00.000Z' WHERE startDate IS NULL;
