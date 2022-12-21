import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../router/RootNavigator";

const Hello = ({}: RootStackScreenProps<"Hello">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.title}>Boilerplate of Cyril</Text>
      <View
        darkColor={"rgba(255,255,255,0.1)"}
        lightColor={"#eee"}
        style={styles.separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Hello;
