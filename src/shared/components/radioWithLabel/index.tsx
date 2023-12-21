import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomText } from "../../../shared/components";
import { RF } from "../../../shared/exporter";
import { RadioButton } from "react-native-paper";

interface RadioWithLabelProps {
  value: string,
  checked: string;
  setChecked: Function;
  label: string,
  price: string
}

const RadioWithLabel = ({ checked, setChecked, label, price, value }: RadioWithLabelProps) => {
  return (
    <View
      style={styles.radio}
      onStartShouldSetResponder={() => setChecked(value)}
    >
      <RadioButton
        value={value}
        color="#9B0328"
        status={checked === value ? "checked" : "unchecked"}
        onPress={() => setChecked(value)}
      />
      <CustomText>{label}</CustomText>
      <CustomText bold style={{ marginLeft: RF(5) }} color="#9B0328">
        ({price})
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export default RadioWithLabel;
