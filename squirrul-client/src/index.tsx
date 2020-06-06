import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { AppRegistry, StyleSheet, View } from "react-native";
import NativeAcorn from "./components/NativeAcorn";
import NativeAcornsList from "./components/NativeAcornsList";
import NativeTagsList from "./components/NativeTagsList";
import { gqlClient } from "./lib/gqlClient";
// import "./native.scss";

const App: React.FC = () => (
  <ApolloProvider client={gqlClient}>
    <View style={styles.app}>
      <NativeTagsList />
      <NativeAcornsList />
      <NativeAcorn />
    </View>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    backgroundColor: "#222",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "row",
  },
});

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});
