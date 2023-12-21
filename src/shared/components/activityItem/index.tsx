import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { masterCard } from "../../../assets/images";
import { RF } from "../../exporter";
import CustomText from "../customText";

interface PaymentCardBoxProps {
  name: string;
  icon: string;
  type: string;
  onPress: any
}

const ActivityItem = ({
  name, icon, type, onPress
}: PaymentCardBoxProps) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.cardBox]}>
        <Icon name={icon} type={type} size={18} color={"#00000040"} />
        <View style={{ marginHorizontal: RF(6) }}>
          <CustomText size={14} color={"#000"}>
            {name}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    borderRadius: RF(20),
    padding: RF(20),
    backgroundColor: '#fff',
    marginBottom: RF(10),
    flexDirection: "row",
    alignItems: "center",
  },
  masterCardIcon: {
    width: RF(40),
    height: RF(32),
    marginRight: RF(15),
  },
});

export default ActivityItem;
