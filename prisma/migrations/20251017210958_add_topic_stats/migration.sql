-- CreateTable
CREATE TABLE "public"."topicStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topics" JSONB NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "topicStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."topicStats" ADD CONSTRAINT "topicStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
