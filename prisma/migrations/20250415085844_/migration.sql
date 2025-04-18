-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeviceModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "manufactureDate" TEXT DEFAULT '',
    "manufacturer" TEXT DEFAULT '',
    "shelfLife" TEXT DEFAULT '',
    "category" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeviceModel" ("category", "createAt", "id", "manufactureDate", "manufacturer", "model", "remark", "shelfLife", "updateAt") SELECT "category", "createAt", "id", "manufactureDate", "manufacturer", "model", "remark", "shelfLife", "updateAt" FROM "DeviceModel";
DROP TABLE "DeviceModel";
ALTER TABLE "new_DeviceModel" RENAME TO "DeviceModel";
CREATE UNIQUE INDEX "DeviceModel_model_key" ON "DeviceModel"("model");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
