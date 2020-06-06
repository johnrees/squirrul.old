import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NativeTagsList: React.FC = () => (
  <View style={styles.tags}>
    <Text style={styles.tag}>something2</Text>
  </View>
);

const styles = StyleSheet.create({
  tags: {
    width: 100,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  tag: {
    color: "white",
  },
});

export default NativeTagsList;
