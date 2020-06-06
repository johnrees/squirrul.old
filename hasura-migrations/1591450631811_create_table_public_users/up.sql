CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."users"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "username" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("username"));
