import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Icon, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomText } from "../../../shared/components";

import { RF } from "../../../shared/exporter";
import LinearGradient from "react-native-linear-gradient";
import { offer1 } from "../../../assets/images";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const ViewProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation()

  const { user } = useSelector((state: any) => state.root.user);
  const [name, setName] = useState(user?.user?.fullname ?? "");
  const [isName, setIsName] = useState(true);
  const [email, setEmail] = useState(user?.user?.email ?? "");
  const [isEmail, setIsEmail] = useState(true);
  const [phone, setPhone] = useState(user?.user?.phone ?? "");
  const [isPhone, setIsPhone] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigation();

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
      <ScrollView>
        <View style={styles.pageWrapper}>
          {/** Header **/}
          <View style={styles.pageHeader}>
            <TouchableOpacity
              style={{
                position: "absolute",
                left: RF(0),
                top: RF(0),
              }}
              onPress={() => navigation.goBack()}
            >
              <Icon

                name={i18n.language !== 'ar' ? "chevron-back" : "chevron-forward"}
                type="ionicon"
                color="#000"
                size={RF(21)}
              />
            </TouchableOpacity>
          </View>

          <CustomText size={28} style={{ marginVertical: RF(20), textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}>
            {t('View Profile')}
          </CustomText>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: RF(10),
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 15,
                marginVertical: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ marginBottom: RF(10) }}>
                <Image
                  source={offer1}
                  style={{ width: RF(80), height: RF(80), borderRadius: 200 }}
                ></Image>
              </View>
              <View>
                <Text style={styles.header_yellow}>{name ?? t("Marvis Ighedosa")}</Text>
                <Text
                  style={{
                    color: "#00000050",
                    fontSize: 16,
                    textAlign: "center",
                    fontFamily: "Outfit",
                    fontWeight: "100",
                  }}
                >
                  {email ?? "dosamarvis@gmail.com"}
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("editProfile")}
                >
                  <LinearGradient
                    colors={["#CA2323", "#9B0328"]}
                    style={styles.gradientButton}
                  >
                    <Icon

                      name="clouduploado"
                      type="antdesign"
                      color="#ffffff"
                      size={RF(14)}
                      style={{ marginRight: RF(4) }}
                    />
                    <CustomText size={12} color="white">
                      {t('Edit Profile')}
                    </CustomText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <View style={styles.userInfoWrapper}>
              <CustomText size={12} color="#b3b3b3" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t('Full Name')}
              </CustomText>
              <CustomText size={15} color="#000000" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {name ?? t('Marvis Ighedosa')}
              </CustomText>
            </View>
            <View style={styles.userInfoWrapper}>
              <CustomText size={12} color="#b3b3b3" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t("Email")}
              </CustomText>
              <CustomText size={15} color="#000000" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {email ?? t("dosamarvis@gmail.com")}
              </CustomText>
            </View>
            <View style={styles.userInfoWrapper}>
              <CustomText size={12} color="#b3b3b3" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t('Date of birth')}
              </CustomText>
              <CustomText size={15} color="#000000" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t('15/02/1994')}
              </CustomText>
            </View>
            <View style={styles.userInfoWrapper}>
              <CustomText size={12} color="#b3b3b3" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t("Contact")}
              </CustomText>
              <CustomText size={15} color="#000000" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {phone ?? t('09130-233-1234')}
              </CustomText>
            </View>

            <View style={styles.userInfoWrapper}>
              <CustomText size={12} color="#b3b3b3" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t('Address')}
              </CustomText>
              <CustomText size={15} color="#000000" style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right', }}>
                {t('Riyadh Al Ta aown Dist')}
              </CustomText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
    marginBottom: RF(30),
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: RF(30),
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
    // alignSelf: 'center'
  },
  cartIconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: RF(15),
  },
  header_white: {
    color: "#9D2731",
    fontSize: 16,
    marginTop: 2,
    marginHorizontal: 2,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  header_yellow: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RF(100),
    paddingHorizontal: RF(10),
    paddingVertical: RF(8),
    marginTop: RF(10),
  },
  userInfoWrapper: {
    backgroundColor: "#fff",
    paddingVertical: RF(15),
    paddingHorizontal: RF(20),
    borderRadius: RF(15),
    marginBottom: RF(10),
  },
});

export default ViewProfile;
