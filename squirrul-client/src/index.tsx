import { mount, route } from "navi";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, View } from "react-navi";
import HelmetProvider from "react-navi-helmet-async";
import api, { Acorn as AcornType } from "./lib/api";
import * as serviceWorker from "./serviceWorker";
import "./style.scss";

// const useForm = (initialState, callback: any) => {
//   const [values, setValues] = useState(initialState);

//   const handleSubmit = (event) => {
//     if (event) event.preventDefault();
//     // console.log({ values });
//     callback(values);
//   };

//   const handleChange = (name) => (event) => {
//     event.persist();

//     setValues((values) => set({ ...values }, name, event.target.value));
//   };

//   const setFieldValue = (field: string, value: any) => {
//     setValues((values) => set({ ...values }, field, value));
//   };

//   return {
//     setFieldValue,
//     handleChange,
//     handleSubmit,
//     values,
//     setValues,
//   };
// };

const Acorn: React.FC<{ acorn: AcornType }> = ({ acorn }) => {
  return (
    <div id="acorn">
      <h1
      //contentEditable onInput={console.log}
      >
        {acorn.name}
      </h1>
      <main
      //contentEditable onInput={console.log}
      >
        {acorn.body}
      </main>
    </div>
  );
};

const TagsList: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div id="tags">
    <ol>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ol>
  </div>
);

const AcornsList: React.FC<{ acorns: AcornType[] }> = ({ acorns }) => (
  <div id="acorns">
    <ol>
      {acorns.map((acorn) => (
        <li key={acorn.id}>
          {acorn.body.slice(0, 50)}
          {/* {acorn.acorns_tags.map(({ tag }) => (
            <span className="tag" key={tag.name}>
              {tag.name}
            </span>
          ))} */}
        </li>
      ))}
    </ol>
  </div>
);

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
