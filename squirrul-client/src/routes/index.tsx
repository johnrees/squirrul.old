import { mount, route } from "navi";
import React from "react";
import api from "../lib/api";
import { Dashboard } from "../oldindex";

const routes = mount({
  "/:username": route({
    async getView(req) {
      const API = api(req.params.username);

      const [tags, acorns] = await Promise.all([
        API.getTags(),
        API.getAcorns(),
      ]);

      return <Dashboard tags={tags} acorns={acorns} />;
    },
  }),
});

export default routes;
