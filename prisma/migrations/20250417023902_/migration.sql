-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT DEFAULT '',
    "serialNumber" TEXT NOT NULL,
    "usage" TEXT DEFAULT '',
    "location" TEXT DEFAULT '',
    "user" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceModelId" INTEGER,
    "networkId" INTEGER,
    "ipAddressId" INTEGER,
    CONSTRAINT "Device_deviceModelId_fkey" FOREIGN KEY ("deviceModelId") REFERENCES "DeviceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "IpAddress" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("createAt", "deviceModelId", "id", "ipAddressId", "location", "name", "networkId", "remark", "serialNumber", "updateAt", "usage") SELECT "createAt", "deviceModelId", "id", "ipAddressId", "location", "name", "networkId", "remark", "serialNumber", "updateAt", "usage" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");
CREATE UNIQUE INDEX "Device_ipAddressId_key" ON "Device"("ipAddressId");
CREATE TABLE "new_IpAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "panelNumber" TEXT DEFAULT '',
    "user" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "networkId" INTEGER,
    CONSTRAINT "IpAddress_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IpAddress" ("createAt", "id", "ip", "networkId", "remark", "updateAt") SELECT "createAt", "id", "ip", "networkId", "remark", "updateAt" FROM "IpAddress";
DROP TABLE "IpAddress";
ALTER TABLE "new_IpAddress" RENAME TO "IpAddress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
