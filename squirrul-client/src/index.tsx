import { mount, route } from "navi";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";
import HelmetProvider from "react-navi-helmet-async";
import api, { Acorn } from "./lib/api";
import * as serviceWorker from "./serviceWorker";

const Dashboard: React.FC<{ tags: string[]; acorns: Acorn[] }> = ({
  tags,
  acorns,
}) => (
  <div>
    {JSON.stringify(tags)} {JSON.stringify(acorns)}
  </div>
);

const Layout: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  return <>{children}</>;
};

const routes = mount({
  "/": route({
    async getView() {
      const [tags, acorns] = await Promise.all([
        api.getTags(),
        api.getAcorns(),
      ]);

      return <Dashboard tags={tags} acorns={acorns} />;
    },
  }),
});

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router routes={routes}>
        <Layout>
          <Suspense fallback={null}>
            <View />
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
