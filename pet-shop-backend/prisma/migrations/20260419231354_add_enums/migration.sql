/*
  Warnings:

  - The `status` column on the `Servico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Venda` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ServicoStatus" AS ENUM ('CONCLUIDO', 'CANCELADO', 'AGENDADO', 'ANDAMENTO');

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "status",
ADD COLUMN     "status" "ServicoStatus" NOT NULL DEFAULT 'ANDAMENTO';

-- AlterTable
ALTER TABLE "Venda" DROP COLUMN "status",
ADD COLUMN     "status" "VendaStatus" NOT NULL DEFAULT 'CONCLUIDA';
