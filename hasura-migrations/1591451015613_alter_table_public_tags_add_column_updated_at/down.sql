DROP TRIGGER IF EXISTS "set_public_tags_updated_at" ON "public"."tags";
ALTER TABLE "public"."tags" DROP COLUMN "updated_at";
