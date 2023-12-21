import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CustomText } from "../../../shared/components";
import { RF } from "../../../shared/exporter";
import { CheckBox } from "react-native-elements";

interface CheckBoxWithLabelProps {
  value: string;
  checked: string;
  setChecked: Function;
  label: string;
  price: string;
}

const CheckBoxWithLabel = ({
  checked,
  setChecked,
  label,
  price,
  value,
}: CheckBoxWithLabelProps) => {
  const [checkBox, setCheckBox] = useState(false);
  return (
    <View style={styles.radio}>
      <CheckBox
        checked={checkBox}
        onPress={() => setCheckBox(!checkBox)}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checkedColor="#9B0328"
      />
      <CustomText style={{ marginLeft: RF(-7) }}>{label}</CustomText>
      <CustomText bold style={{ marginLeft: RF(5) }} color="#9B0328">
        {price}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginLeft: RF(-10),
    marginBottom: RF(-15),
  },
});

export default CheckBoxWithLabel;
