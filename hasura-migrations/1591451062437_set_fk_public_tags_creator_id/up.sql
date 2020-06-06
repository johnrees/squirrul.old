alter table "public"."tags"
           add constraint "tags_creator_id_fkey"
           foreign key ("creator_id")
           references "public"."users"
           ("id") on update restrict on delete restrict;
