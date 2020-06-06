import { ApolloProvider } from "@apollo/react-hooks";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";
import HelmetProvider from "react-navi-helmet-async";
import Acorn from "./components/Acorn";
import AcornsList from "./components/AcornsList";
import TagsList from "./components/TagsList";
import { Acorn as AcornType } from "./lib/api";
import { gqlClient } from "./lib/gqlClient";
import routes from "./routes";
import * as serviceWorker from "./serviceWorker";
import "./style.scss";

export const Dashboard: React.FC<{ tags: string[]; acorns: AcornType[] }> = ({
  tags,
  acorns,
}) => (
  <>
    <TagsList tags={tags} />
    <AcornsList />
    <Acorn acorn={acorns[0]} />
  </>
);

const Layout: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  return <>{children}</>;
};

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
    <ApolloProvider client={gqlClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
