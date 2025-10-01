-- CreateTable
CREATE TABLE "public"."LeetcodeHistory" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "totalSolved" INTEGER NOT NULL,
    "easySolved" INTEGER NOT NULL,
    "mediumSolved" INTEGER NOT NULL,
    "hardSolved" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeetcodeHistory_pkey" PRIMARY KEY ("id")
);
