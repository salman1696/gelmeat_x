import React from "react";
import {
  Linking,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CustomText from "../../../shared/components/customText";
import { RF } from "../../../shared/exporter";
// import styles from './styles';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import i18n from "../../../shared/utils/i18";

const PickupAddress = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Icon
                name={
                  i18n.language !== "ar" ? "chevron-back" : "chevron-forward"
                }
                type="ionicon"
                color="#000"
                size={RF(21)}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.header}>Pickup Time & Address </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <View style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 15 }}>
                <Icon name='g-translate' type='materialIcons' color='#CA2323' size={RF(16)} />
              </View> */}
            </View>
          </View>

          {/** Change Location Option **/}
          <View style={styles.changeLocation}>
            <CustomText size={16} style={{ textAlign: "center" }}>
              Date
            </CustomText>

            <View
              style={{
                backgroundColor: "#fff",
                marginHorizontal: RFValue(5),
                alignItems: "center",
                marginVertical: 20,
                paddingVertical: 18,
                paddingHorizontal: 20,
                borderRadius: 65,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <TextInput
                placeholder="23/11/2002"
                placeholderTextColor={"#00000050"}
                underlineColorAndroid={"rgba(0,0,0,0)"}
                style={{ fontSize: 19, padding: 5, width: "90%" }}
              />
              <Icon
                name="date-range"
                type="material-icons"
                size={28}
                color={"#000"}
              />
            </View>
          </View>
          <View style={styles.changeLocation}>
            <CustomText size={16} style={{ textAlign: "center" }}>
              Time
            </CustomText>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  marginHorizontal: RFValue(5),
                  alignItems: "center",
                  marginVertical: 20,
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 65,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <CustomText
                  size={16}
                  style={{ textAlign: "center", marginHorizontal: 15 }}
                >
                  11
                </CustomText>
                <Icon
                  name="chevron-down"
                  type="material-community"
                  size={28}
                  color={"#000"}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  marginHorizontal: RFValue(5),
                  alignItems: "center",
                  marginVertical: 20,
                  paddingVertical: 18,
                  paddingHorizontal: 20,
                  borderRadius: 65,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <CustomText
                  size={16}
                  style={{ textAlign: "center", marginHorizontal: 15 }}
                >
                  43
                </CustomText>
                <Icon
                  name="chevron-down"
                  type="material-community"
                  size={28}
                  color={"#000"}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#fff",
                  marginHorizontal: RFValue(5),
                  alignItems: "center",
                  marginVertical: 20,
                  paddingVertical: 18,
                  paddingHorizontal: 15,
                  borderRadius: 65,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <CustomText
                  size={16}
                  style={{ textAlign: "center", marginHorizontal: 15 }}
                >
                  AM
                </CustomText>
                <Icon
                  name="chevron-down"
                  type="material-community"
                  size={28}
                  color={"#000"}
                />
              </View>
            </View>
          </View>

          {/** Address Box **/}
          <View style={styles.addressBox}>
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
        </View>
      </ScrollView>

      {/** Page Footer **/}
      <View style={styles.footerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("checkout")}
          style={styles.buttonStyle}
        >
          <Text style={[styles.get_started, { color: "white" }]}>
            Proceed to Checkout
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
    width: "100%",
  },
  backIconWrapper: {
    // position: "absolute",
    left: RF(0),
    top: RF(0),
  },
  backIcon: {
    color: "#000000",
  },

  header: {
    color: "#000000",
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "400",
  },
  changeLocation: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: RF(10),
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
    // flexDirection: "row",
    backgroundColor: "#fff",
    padding: RF(2),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
    // position: "absolute",
    bottom: 0,
  },
  buttonStyle: {
    backgroundColor: "#CA2323",
    justifyContent: "center",
    height: RF(55),
    width: "100%",
    alignSelf: "center",
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
    height: RF(180),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default PickupAddress;
