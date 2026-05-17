/*
  Warnings:

  - You are about to drop the column `estado` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `especie` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoUnitario` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Endereco" DROP COLUMN "estado",
ALTER COLUMN "complemento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "especie" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produto" ALTER COLUMN "ativo" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "precoUnitario" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "dataAgendamento" DROP NOT NULL,
ALTER COLUMN "dataExecucao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TipoServico" ALTER COLUMN "ativo" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'CONCLUIDA';
