import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Acorn, GET_ACORNS } from "../lib/api";

const NativeAcornsList: React.FC = () => {
  const { data } = useQuery<{ acorns: Acorn[] }>(GET_ACORNS, {
    variables: {
      username: "john",
    },
  });

  return (
    <View style={styles.acorns}>
      {data &&
        data.acorns.map((acorn) => (
          <Text key={acorn.id} style={styles.acorn}>
            {/* {acorn.name && <h3>{acorn.name}</h3>} */}
            {acorn.body.slice(0, 50)}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  acorns: {
    width: 300,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  acorn: {
    color: "white",
  },
});

export default NativeAcornsList;
