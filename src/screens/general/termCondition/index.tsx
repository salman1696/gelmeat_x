import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { Icon, Image, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { cartCheckIcon, deliveryMan } from "../../../assets/images";
import { CustomText } from "../../../shared/components";
import AddedCartItem from "../../../shared/components/addedCartItem";
import PaymentCardBox from "../../../shared/components/paymentCardBox";
import TabsOptions from "../../../shared/components/tabsOptions";
import { GST, RF } from "../../../shared/exporter";

import { useTranslation } from 'react-i18next';



const TermsCondition = ({ navigation }: any) => {

  const { rItems, cartItems } = useSelector((state: any) => state.root.user);

  const insets = useSafeAreaInsets();

  const { t, i18n } = useTranslation()



  return (
    <View
      style={[
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          height: "100%",
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.pageWrapper}>
          {/** Header **/}
          <View style={styles.pageHeader}>
            <TouchableOpacity
              style={styles.backIconWrapper}
              onPress={() => navigation.goBack()}
            >
              <Icon
                name={i18n.language !== 'ar' ? "left" : 'right'}
                type="antdesign"
                size={RF(20)}
                iconStyle={styles.backIcon}
              />
            </TouchableOpacity>
            <CustomText size={17} style={{ textAlign: "center" }}>
              {t('Terms & conditions')}
            </CustomText>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>

            <View>
              <View style={{ marginBottom: RF(10) }}>
                <CustomText size={14} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>{t('1. Types data we collect')}</CustomText>
                <CustomText size={11} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
                  {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.')}</CustomText>
              </View>
              <View style={{ marginBottom: RF(10) }}>
                <CustomText size={14} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>{t('1. Types data we collect')}</CustomText>
                <CustomText size={11} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
                  {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.')}</CustomText>
              </View>
              <View style={{ marginBottom: RF(10) }}>
                <CustomText size={14} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>{t('1. Types data we collect')}</CustomText>
                <CustomText size={11} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
                  {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.')}</CustomText>
              </View>
              <View style={{ marginBottom: RF(10) }}>
                <CustomText size={14} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>{t('1. Types data we collect')}</CustomText>
                <CustomText size={11} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
                  {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.')}</CustomText>
              </View>
              <View style={{ marginBottom: RF(10) }}>
                <CustomText size={14} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>{t('1. Types data we collect')}</CustomText>
                <CustomText size={11} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
                  {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.')}</CustomText>
              </View>
              <View style={{ marginBottom: RF(10) }}>
                <CustomText size={14} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>{t('1. Types data we collect')}</CustomText>
                <CustomText size={11} style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
                  {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.')}</CustomText>
              </View>

            </View>
          </ScrollView>
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
    flex: 1,

  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: RF(25),

  },
  backIconWrapper: {
    position: "absolute",
    left: RF(0),
    top: RF(0),
  },
  backIcon: {
    color: "#000000",
  },
  labelAndButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RF(20),
  },
  get_started: {
    color: "#9D2731",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",

    backgroundColor: "#ffffff",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
  },
  buttonStyle: {
    justifyContent: "center",
    height: RF(55),
    alignSelf: "center",
    width: "48%",
    paddingVertical: 20,
    borderRadius: 30,
    borderColor: "#CA2323",
    borderWidth: 1.5,
  },
  firstButton: {
    backgroundColor: "white",
    // marginRight: RF(10),
  },
  secondButtons: {
    backgroundColor: "#CA2323",
  },
  horizontalTabs: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RF(10),
  },
  deliveryManWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: RF(-20),
  },
  deliveryManImg: {
    height: RF(510),
    width: RF(260),
  },
  placeOrderSection: {
    backgroundColor: "#fafafa",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
    position: "absolute",
    bottom: RF(-20),
    marginLeft: RF(-20),
    marginRight: RF(-20),
  },
  totalOrder: {
    marginBottom: RF(0),
    marginTop: RF(10),
    paddingTop: RF(10),
    borderTopColor: "#9ba0a8",
    borderTopWidth: RF(1),
  },
  popupContainerContainer: {
    position: "absolute",
    bottom: 0,
    width: "102%",
    height: "70%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#F2F2F2",
    zIndex: 1000,
  },
  popupHeader: {
    flexDirection: "row",
    width: "100%",
    marginTop: RF(20),
    alignItems: "center",
    justifyContent: "space-between",
    padding: RF(20),
    paddingTop: RF(5),
  },
  popupText: {
    padding: RF(20),
    paddingTop: RF(0),
    flex: 1
    // alignSelf: 'center'
  },
  cartIconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default TermsCondition;
