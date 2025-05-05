/*
  Warnings:

  - You are about to drop the `_ChatbotMessageToChatbotSession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[liveChatId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ChatbotMessageToChatbotSession" DROP CONSTRAINT "_ChatbotMessageToChatbotSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatbotMessageToChatbotSession" DROP CONSTRAINT "_ChatbotMessageToChatbotSession_B_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" ADD COLUMN     "isMatchChat" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_ChatbotMessageToChatbotSession";

-- CreateIndex
CREATE UNIQUE INDEX "Match_liveChatId_key" ON "Match"("liveChatId");

-- AddForeignKey
ALTER TABLE "ChatbotMessage" ADD CONSTRAINT "ChatbotMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatbotSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
