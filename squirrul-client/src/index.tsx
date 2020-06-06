import { mount, route } from "navi";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";
import HelmetProvider from "react-navi-helmet-async";
import Acorn from "./components/Acorn";
import AcornsList from "./components/AcornsList";
import TagsList from "./components/TagsList";
import api, { Acorn as AcornType } from "./lib/api";
import * as serviceWorker from "./serviceWorker";
import "./style.scss";

const Dashboard: React.FC<{ tags: string[]; acorns: AcornType[] }> = ({
  tags,
  acorns,
}) => (
  <>
    <TagsList tags={tags} />
    <AcornsList acorns={acorns} />
    <Acorn acorn={acorns[0]} />
  </>
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
