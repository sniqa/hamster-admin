/*
  Warnings:

  - You are about to drop the column `type` on the `Network` table. All the data in the column will be lost.
  - Added the required column `name` to the `Network` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Network" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ipStart" TEXT NOT NULL DEFAULT '',
    "ipEnd" TEXT NOT NULL DEFAULT '',
    "gateway" TEXT NOT NULL DEFAULT '',
    "netmask" TEXT NOT NULL DEFAULT '',
    "vlan" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" INTEGER,
    CONSTRAINT "Network_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Network" ("createAt", "gateway", "id", "ipEnd", "ipStart", "netmask", "parentId", "remark", "updateAt", "vlan") SELECT "createAt", "gateway", "id", "ipEnd", "ipStart", "netmask", "parentId", "remark", "updateAt", "vlan" FROM "Network";
DROP TABLE "Network";
ALTER TABLE "new_Network" RENAME TO "Network";
CREATE UNIQUE INDEX "Network_name_key" ON "Network"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
