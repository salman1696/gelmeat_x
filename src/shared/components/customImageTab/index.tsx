import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { RF } from "../../exporter";
import CustomText from "../customText";

interface CustomImageTabProps {
  id: string;
  label: string;
  url: string;
  onClickTab: Function;
  activeId?: string;
}

const CustomImageTab = ({
  id,
  label,
  url,
  onClickTab,
  activeId,
}: CustomImageTabProps) => {
  const activeTab = activeId;
  return (
    <TouchableOpacity onPress={() => onClickTab(id)}>
      <View
        style={[
          styles.tabMain,
          { backgroundColor: activeTab ? "#9D2731" : "#ffffff" },
          { opacity: activeTab ? RF(1) : RF(0.7) },
          { alignItems: 'center' },
        ]}
      >
        <Image
          style={[
            styles.tabRadiusImage,
            { width: RF(activeTab ? 34 : 30), height: RF(activeTab ? 33 : 29) },
          ]}
          source={{
            uri: url,
          }}
        />
        <CustomText
          size={activeTab ? 18 : 15}
          color={activeTab ? "#ffffff" : "#000000"}
        >
          {label}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: RF(100),
    padding: RF(5),
    paddingRight: RF(15),
    marginRight: RF(8),
  },
  tabRadiusImage: {
    borderRadius: RF(50),
    borderWidth: RF(1),
    borderColor: "#ffffff",
    marginRight: RF(6),
  },
});

export default CustomImageTab;
