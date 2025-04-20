/*
  Warnings:

  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.

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
    "user" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceModelId" INTEGER,
    "networkId" INTEGER,
    "ipAddressId" INTEGER,
    CONSTRAINT "Device_deviceModelId_fkey" FOREIGN KEY ("deviceModelId") REFERENCES "DeviceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_ipAddressId_fkey" FOREIGN KEY ("ipAddressId") REFERENCES "IpAddress" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Device" ("createAt", "deviceModelId", "id", "ipAddressId", "location", "name", "networkId", "remark", "serialNumber", "updateAt", "usage", "user") SELECT "createAt", "deviceModelId", "id", "ipAddressId", "location", "name", "networkId", "remark", "serialNumber", "updateAt", "usage", "user" FROM "Device";
DROP TABLE "Device";
ALTER TABLE "new_Device" RENAME TO "Device";
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");
CREATE UNIQUE INDEX "Device_ipAddressId_key" ON "Device"("ipAddressId");
CREATE TABLE "new_DeviceModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "manufactureDate" TEXT DEFAULT '',
    "manufacturer" TEXT DEFAULT '',
    "shelfLife" TEXT DEFAULT '',
    "category" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeviceModel" ("category", "createAt", "id", "manufactureDate", "manufacturer", "model", "remark", "shelfLife", "updateAt") SELECT "category", "createAt", "id", "manufactureDate", "manufacturer", "model", "remark", "shelfLife", "updateAt" FROM "DeviceModel";
DROP TABLE "DeviceModel";
ALTER TABLE "new_DeviceModel" RENAME TO "DeviceModel";
CREATE UNIQUE INDEX "DeviceModel_model_key" ON "DeviceModel"("model");
CREATE TABLE "new_IpAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "panelNumber" TEXT DEFAULT '',
    "user" TEXT DEFAULT '',
    "remark" TEXT DEFAULT '',
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "networkId" INTEGER,
    CONSTRAINT "IpAddress_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IpAddress" ("createAt", "id", "ip", "networkId", "panelNumber", "remark", "updateAt", "user") SELECT "createAt", "id", "ip", "networkId", "panelNumber", "remark", "updateAt", "user" FROM "IpAddress";
DROP TABLE "IpAddress";
ALTER TABLE "new_IpAddress" RENAME TO "IpAddress";
CREATE TABLE "new_Network" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ipStart" TEXT NOT NULL DEFAULT '',
    "ipEnd" TEXT NOT NULL DEFAULT '',
    "gateway" TEXT NOT NULL DEFAULT '',
    "netmask" TEXT NOT NULL DEFAULT '',
    "vlan" TEXT NOT NULL DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" INTEGER,
    CONSTRAINT "Network_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Network" ("createAt", "gateway", "id", "ipEnd", "ipStart", "name", "netmask", "parentId", "remark", "updateAt", "vlan") SELECT "createAt", "gateway", "id", "ipEnd", "ipStart", "name", "netmask", "parentId", "remark", "updateAt", "vlan" FROM "Network";
DROP TABLE "Network";
ALTER TABLE "new_Network" RENAME TO "Network";
CREATE UNIQUE INDEX "Network_name_key" ON "Network"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account" TEXT NOT NULL,
    "username" TEXT DEFAULT '',
    "password" TEXT,
    "avatar" TEXT DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("account", "avatar", "id", "password", "remark", "updateAt", "username") SELECT "account", "avatar", "id", "password", "remark", "updateAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
