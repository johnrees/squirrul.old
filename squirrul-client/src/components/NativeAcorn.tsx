import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Link: React.FC<any> = (props) => (
  <Text
    {...props}
    accessibilityRole="link"
    style={StyleSheet.compose(styles.link, props.style)}
  />
);

const NativeAcorn: React.FC = () => (
  <View style={styles.acorn}>
    <Text style={styles.text as any}>
      Acorn!
      <Link href="https://github.com/facebook/create-react-app">
        Create React App
      </Link>{" "}
      and{" "}
      <Link href="https://github.com/necolas/react-native-web">
        React Native for Web
      </Link>
    </Text>
    <Text style={styles.text as any}>
      To get started, edit{" "}
      <Link href="https://codesandbox.io/s/q4qymyp2l6/" style={styles.code}>
        src/App.js
      </Link>
      .
    </Text>
    <Button onPress={() => {}} title="Example button" />
  </View>
);

const styles = StyleSheet.create({
  acorn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  link: {
    color: "#1B95E0",
  },
  code: {
    fontFamily: "monospace, monospace",
  },
});

export default NativeAcorn;
