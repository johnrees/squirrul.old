alter table "public"."acorns_tags"
           add constraint "acorns_tags_acorn_id_fkey"
           foreign key ("acorn_id")
           references "public"."acorns"
           ("id") on update restrict on delete restrict;
