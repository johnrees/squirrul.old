CREATE TABLE "public"."acorns_tags"("acorn_id" uuid NOT NULL, "tag_id" uuid NOT NULL, "creator_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("acorn_id","tag_id","creator_id") , FOREIGN KEY ("acorn_id") REFERENCES "public"."acorns"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_acorns_tags_updated_at"
BEFORE UPDATE ON "public"."acorns_tags"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_acorns_tags_updated_at" ON "public"."acorns_tags" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
