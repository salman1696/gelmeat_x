import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomText } from "../../../shared/components";
import { RF } from "../../../shared/exporter";
import { useTranslation } from "react-i18next";

const DeliveryDetails = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const onCallNumber = (number: string) => {
    Linking.openURL(number);
  };

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.pageWrapper}>
          {/** Header **/}
          <View style={styles.pageHeader}>
            <TouchableOpacity
              style={styles.backIconWrapper}
              onPress={() => navigation.goBack()}
            >
              <Icon
                name="left"
                type="antdesign"
                size={RF(20)}
                iconStyle={styles.backIcon}
              />
            </TouchableOpacity>
            <CustomText size={17} style={{ textAlign: "center" }}>
              {t("Delivery Details")}
            </CustomText>
          </View>

          {/** Change Location Option **/}
          <View style={styles.changeLocation}>
            <CustomText size={17} style={{ textAlign: "center" }}>
              {t("Address")}
            </CustomText>

            <TouchableOpacity>
              <CustomText
                size={15}
                color="#9D2731"
                style={{ textAlign: "center" }}
              >
                {t("Change Location")}
              </CustomText>
            </TouchableOpacity>
          </View>

          {/** Address Box **/}
          <View style={styles.addressBox}>
            <CustomText size={18} bold style={{ marginBottom: RF(10) }}>
              Marvis Kparobo
            </CustomText>

            <CustomText size={13} style={{ marginBottom: RF(10) }}>
              Km 5 refinery road oppsite re public road, effurun, delta state
            </CustomText>

            <TouchableOpacity onPress={() => onCallNumber("+966 12-345-6789")}>
              <CustomText size={13} color="#9D2731">
                +966 12-345-6789
              </CustomText>
            </TouchableOpacity>
          </View>
          {/** Address Box **/}
          <View style={styles.mapWrapper}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            ></MapView>
          </View>
        </View>
      </ScrollView>

      {/** Page Footer **/}
      <View style={styles.footerWrapper}>
        <TouchableOpacity style={[styles.buttonStyle, styles.firstButton]}>
          <Text style={styles.get_started}>{t("Cancel")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.secondButtons]}
          onPress={() => navigation.navigate("checkout")}
        >
          <Text style={[styles.get_started, { color: "white" }]}>
            {t("Order Summary")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
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
  changeLocation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RF(20),
  },
  changeLocationBtn: {
    color: "#9D2731",
  },
  addressBox: {
    backgroundColor: "#ffffff",
    borderRadius: RF(20),
    padding: RF(20),
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
    // position: "absolute",
    bottom: 0,
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
  mapWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: RF(20),
    overflow: "hidden",
    height: RF(300),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DeliveryDetails;
