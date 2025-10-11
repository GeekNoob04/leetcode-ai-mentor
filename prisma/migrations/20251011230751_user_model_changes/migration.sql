/*
  Warnings:

  - You are about to drop the column `emailVerfied` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "emailVerfied",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
