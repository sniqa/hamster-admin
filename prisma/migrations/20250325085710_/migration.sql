/*
  Warnings:

  - You are about to drop the `IpAddrss` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IpAddrss";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "IpAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "networkId" INTEGER,
    CONSTRAINT "IpAddress_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT DEFAULT '',
    "serialNumber" TEXT NOT NULL,
    "usage" TEXT DEFAULT '',
    "location" TEXT DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceModelid" INTEGER,
    "networkid" INTEGER,
    "ipAddressid" INTEGER,
    CONSTRAINT "Device_deviceModelid_fkey" FOREIGN KEY ("deviceModelid") REFERENCES "DeviceModel" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_networkid_fkey" FOREIGN KEY ("networkid") REFERENCES "Network" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Device_ipAddressid_fkey" FOREIGN KEY ("ipAddressid") REFERENCES "IpAddress" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeviceModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "manufactureDate" DATETIME,
    "manufacturer" TEXT NOT NULL DEFAULT '',
    "shelfLife" DATETIME,
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Network" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
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
INSERT INTO "new_Network" ("createAt", "gateway", "id", "ipEnd", "ipStart", "netmask", "parentId", "remark", "type", "updateAt", "vlan") SELECT "createAt", "gateway", "id", "ipEnd", "ipStart", "netmask", "parentId", "remark", "type", "updateAt", "vlan" FROM "Network";
DROP TABLE "Network";
ALTER TABLE "new_Network" RENAME TO "Network";
CREATE UNIQUE INDEX "Network_type_key" ON "Network"("type");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account" TEXT NOT NULL,
    "username" TEXT DEFAULT '',
    "password" TEXT NOT NULL,
    "avatar" TEXT DEFAULT '',
    "remark" TEXT NOT NULL DEFAULT '',
    "updateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("account", "avatar", "createAt", "id", "password", "remark", "updateAt", "username") SELECT "account", "avatar", "createAt", "id", "password", "remark", "updateAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceModel_model_key" ON "DeviceModel"("model");
