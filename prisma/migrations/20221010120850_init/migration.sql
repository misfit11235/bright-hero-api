-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "is_hero" BOOLEAN NOT NULL DEFAULT false,
    "health" INTEGER NOT NULL,
    "strength" INTEGER NOT NULL,
    "defence" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "luck" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "name" TEXT NOT NULL,
    "params" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_name_key" ON "Settings"("name");
