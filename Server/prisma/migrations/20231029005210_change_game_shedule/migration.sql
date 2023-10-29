/*
  Warnings:

  - You are about to drop the column `hours` on the `Games` table. All the data in the column will be lost.
  - Added the required column `schedule` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "hours",
ADD COLUMN     "schedule" TIMESTAMP(3) NOT NULL;
