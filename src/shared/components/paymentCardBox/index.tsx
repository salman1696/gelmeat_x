import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { masterCard } from "../../../assets/images";
import { RF } from "../../exporter";
import CustomText from "../customText";

interface PaymentCardBoxProps {
  id: string;
  item: any;
  selectedCardId?: any;
  onSelectCard: Function;
}

const PaymentCardBox = ({
  id,
  item,
  selectedCardId,
  onSelectCard,
}: PaymentCardBoxProps) => {
  const isActive = id === selectedCardId;
  const bgColor = isActive ? "#9D2731" : "#ffffff";

  console.log(item, 'itemitem');

  return (
    <TouchableOpacity onPress={() => onSelectCard(id)}>
      <View style={[styles.cardBox, { backgroundColor: bgColor }]}>
        <Image source={masterCard} style={styles.masterCardIcon} />
        <View>
          <CustomText
            size={17}
            color={isActive ? "#ffffff" : "#000000"}
            style={{ marginBottom: RF(5) }}
          >
            **** **** ****{item?.card_number.slice(-4) ?? ""}
          </CustomText>
          <CustomText size={14} color={isActive ? "#ffffff" : "#9D2731"}>
            Valid Thru: {item?.expire_date ?? ""}
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

export default PaymentCardBox;
