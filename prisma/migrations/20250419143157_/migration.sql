-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("account", "avatar", "id", "password", "remark", "updateAt", "username") SELECT "account", "avatar", "id", coalesce("password", '') AS "password", "remark", "updateAt", coalesce("username", '') AS "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
