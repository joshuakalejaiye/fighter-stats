-- CreateTable
CREATE TABLE "accolades" (
    "id" BIGINT NOT NULL,
    "accolade" VARCHAR(50) NOT NULL,

    CONSTRAINT "accolades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "steam_id" BIGINT NOT NULL,
    "players" BIGINT NOT NULL,
    "last_updated" BIGINT NOT NULL,
    "image_link" VARCHAR(100) NOT NULL,
    "accolade" BIGINT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("steam_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accolades_accolade_key" ON "accolades"("accolade");

-- CreateIndex
CREATE INDEX "idx_players" ON "games"("players");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_accolade_fkey" FOREIGN KEY ("accolade") REFERENCES "accolades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
