-- CreateTable
CREATE TABLE "_SharedToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SharedToUsers_AB_unique" ON "_SharedToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedToUsers_B_index" ON "_SharedToUsers"("B");

-- AddForeignKey
ALTER TABLE "_SharedToUsers" ADD CONSTRAINT "_SharedToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedToUsers" ADD CONSTRAINT "_SharedToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
