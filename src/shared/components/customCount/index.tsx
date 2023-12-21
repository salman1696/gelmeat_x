import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { CustomText } from "../../../shared/components";
import { RF } from "../../../shared/exporter";

interface CustomCountProps {
  size?: string,
  item: any,
  setItem: any,
}

const CustomCount = ({ item, size, setItem }: CustomCountProps) => {
  const [count, setCount] = useState(item?.count);

  const iconSize = size === "small" ? 25 : 35;
  const buttonSize = size === "small" ? 28 : 40;
  useEffect(() => {

    setItem({ ...item, count: count })
  }, [count])

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <CustomText
        size={iconSize}
        onPress={() => {
          setCount(count === 0 ? count : count - 1);
        }}
        style={[
          styles.quantity,
          {
            color: "#9B0328",
            width: RF(buttonSize),
            height: RF(buttonSize),
          },
        ]}
        light
      >
        -
      </CustomText>
      <CustomText
        size={size === "small" ? 16 : 20}
        style={{ marginLeft: RF(15), marginRight: RF(15) }}
      >
        {count}
      </CustomText>
      <CustomText
        size={iconSize}
        light
        style={[
          styles.quantity,
          {
            color: "#000000",
            width: RF(buttonSize),
            height: RF(buttonSize),
          },
        ]}
        onPress={() => {
          setCount(count + 1);
        }}
      >
        +
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  quantity: {
    backgroundColor: "#3535351A",
    borderRadius: RF(30),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlign: "center",
  },
});

export default CustomCount;
