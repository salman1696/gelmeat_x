import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RF } from "../../exporter";
import CustomText from "../customText";

interface customSimpleTabProps {
  id: string;
  label: string;
  url: string;
  onClickTab: Function;
  activeId?: string;
}

const customSimpleTab = ({
  id,
  label,
  url,
  onClickTab,
  activeId,
}: customSimpleTabProps) => {
  const activeTab = activeId;
  return (
    <TouchableOpacity onPress={() => onClickTab(id)}>
      <View>
        <CustomText
          style={[activeTab ? styles.activeSimpleTab : styles.simpleTab]}
        >
          {label}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  simpleTab: {
    paddingRight: RF(10),
    paddingLeft: RF(5),
    borderBottomWidth: RF(4),
    borderBottomColor: "transparent",
    color: "#A0A0A0",
    fontSize: RF(16),
  },

  activeSimpleTab: {
    color: "#9D2731",
    borderBottomColor: "#9D2731",
    paddingRight: RF(20),
    paddingLeft: RF(15),
    borderBottomWidth: RF(4),
    fontSize: RF(16),
  },
});

export default customSimpleTab;
