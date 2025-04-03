/*
  Warnings:

  - You are about to drop the column `deviceModelid` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddressid` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `networkid` on the `Device` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT DEFAULT '',
    "serialNumber" TEXT NOT NULL,
    "usage" TEXT DEFAULT '',
    "location" TEXT DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceModelId" INTEGER,
    "networkId" INTEGER,
    "ipAddressId" INTEGER,
    CONSTRAINT "Device_deviceModelId_fkey" FOREIGN KEY ("deviceModelId") REFERENCES "DeviceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "IpAddress" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("createAt", "id", "location", "name", "remark", "serialNumber", "updateAt", "usage") SELECT "createAt", "id", "location", "name", "remark", "serialNumber", "updateAt", "usage" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
