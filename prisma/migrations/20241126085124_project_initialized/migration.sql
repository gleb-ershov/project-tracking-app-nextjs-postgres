/*
  Warnings:

  - Added the required column `deadlineDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deadlineDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
