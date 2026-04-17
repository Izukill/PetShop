/*
  Warnings:

  - You are about to drop the column `publicId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lookupId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lookupId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - The required column `lookupId` was added to the `Cliente` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `lookupId` was added to the `Pet` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Cliente_publicId_key";

-- DropIndex
DROP INDEX "Pet_publicId_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "publicId",
ADD COLUMN     "lookupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "publicId",
ADD COLUMN     "lookupId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_lookupId_key" ON "Cliente"("lookupId");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_lookupId_key" ON "Pet"("lookupId");
