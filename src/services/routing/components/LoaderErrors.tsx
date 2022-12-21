import React, { FunctionComponent } from "react";
import axios from "axios";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import { baseTypos } from "../../../assets/constants/Fonts";
import { dmrYellow } from "../../../assets/constants/Colors";

interface Props {
  reload(): void;
  error: unknown;
}

const LoaderErrors: FunctionComponent<Props> = ({ reload, error }) => {
  if (axios.isAxiosError(error)) {
    return (
      <View style={{ padding: 20 }}>
        <Text
          style={{
            padding: 20,
            textAlign: "center",
            ...baseTypos.button,
          }}
        >
          {`Une erreur est survenue \n${
            error.message === "Network Error"
              ? "Veuillez vous connecter à internet"
              : error.message
          }`}
        </Text>
        <Button
          buttonStyle={{ backgroundColor: dmrYellow }}
          onPress={reload}
          title={"Recharger"}
          titleStyle={baseTypos.button}
        />
      </View>
    );
  }
  return (
    <View>
      <Text>Une erreur est survenue</Text>
      <Button onPress={reload} title={"Recharger"} />
    </View>
  );
};

export default LoaderErrors;
