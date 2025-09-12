-- CreateTable
CREATE TABLE "public"."LeetcodeStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "statsJson" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeetcodeStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeetcodeStats_userId_key" ON "public"."LeetcodeStats"("userId");

-- AddForeignKey
ALTER TABLE "public"."LeetcodeStats" ADD CONSTRAINT "LeetcodeStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
