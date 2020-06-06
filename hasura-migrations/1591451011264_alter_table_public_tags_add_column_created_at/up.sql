ALTER TABLE "public"."tags" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
