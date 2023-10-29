/*
  Warnings:

  - You are about to drop the column `address` on the `Teams` table. All the data in the column will be lost.
  - Added the required column `campusAddress` to the `Teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teams" DROP COLUMN "address",
ADD COLUMN     "campusAddress" TEXT NOT NULL;
