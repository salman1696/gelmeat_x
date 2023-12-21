import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { RF } from "../../exporter";
import CustomText from "../customText";

interface TabsOptionsProps {
  id: string;
  label: string;
  icon?: any;
  activeTabId: string;
  onSelectTab: Function;
}

const TabsOptions = ({
  id,
  label,
  icon,
  activeTabId,
  onSelectTab
}: TabsOptionsProps) => {
	const isActive = id === activeTabId;
  const bgColor = isActive ? "#9D2731" : "#ffffff";
  return (
    <TouchableOpacity onPress={() => onSelectTab(id)}>
      <View style={[styles.tabWrapper, { backgroundColor: bgColor }]}>
        {icon && (
          <Icon
            name={icon}
            type="fontAwesome"
            size={RF(18)}
            iconStyle={styles.iconStyling}
            color={isActive ? "#ffffff" : "#9D2731"}
          />
        )}

        <View>
          <CustomText size={15} color={isActive ? "#ffffff" : "#000000"}>
            {label}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabWrapper: {
    alignSelf: 'flex-start',
    borderRadius: RF(100),
    padding: RF(15),
    marginBottom: RF(10),
    flexDirection: "row",
    alignItems: "center",
    marginRight: RF(10)
  },
  iconStyling: {
    marginRight: RF(5),
  },
});

export default TabsOptions;
