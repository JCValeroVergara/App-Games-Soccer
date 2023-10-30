/*
  Warnings:

  - Made the column `image` on table `Fields` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Players` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Teams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Fields" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Players" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Teams" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "image" SET DATA TYPE TEXT;
