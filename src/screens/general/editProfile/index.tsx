import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomText } from "../../../shared/components";

import { RF } from "../../../shared/exporter";
import i18n from "../../../shared/utils/i18";
import EditProfileForm from "./editProfileForm";
import { useTranslation } from "react-i18next";

const EditProfile = ({ navigation }: any) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [isShowOrderPlaced, setIsShowOrderPlaced] = useState(false);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);

  useEffect(() => {
    () => {
      setIsShowOrderPlaced(false);
      setIsShowAddNewCard(false);
    };
  }, []);

  return (
    <View
      style={[
        {
          flex: 1,
          // Paddings to handle safe area
          paddingTop: insets.top,
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
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
                name={
                  i18n.language !== "ar" ? "chevron-back" : "chevron-forward"
                }
                type="ionicon"
                color="#000"
                size={RF(21)}
              />
            </TouchableOpacity>
          </View>

          <CustomText size={28} style={{ marginVertical: RF(20) }}>
            {t("Edit Profile")}
          </CustomText>

          <EditProfileForm goBackScreen={() => navigation.goBack()} />
        </View>
      </ScrollView>
      <View
        style={[
          styles.footerWrapper,
          {
            bottom: 0,
            position: 'absolute',
            // marginBottom: RF(-20),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.buttonStyle, styles.firstButton]}
        >
          <Text style={styles.get_started}>{t("Discard")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.secondButtons]}
        // onPress={() => handleSubmit()}
        // disabled={!isValid}
        >
          <Text style={[styles.get_started, { color: "white" }]}>
            {t("Save Changes")}
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
    marginBottom: RF(30),
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
    marginVertical: RF(10),
  },
  header: {
    color: '#000000',
    fontSize: 20,
    marginHorizontal: 6,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'

  },
  header1: {
    color: '#9D2731',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  sub_total: {
    color: '#05112640',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  toatl_price_text: {
    color: '#9B0328',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  price_text: {
    color: '#000',
    fontSize: 16,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontWeight: '800'
  },
  sub_price_text: {
    color: '#051126',
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  swipe_text: {
    color: '#000',
    fontSize: 11,
    marginBottom: 10,
    marginHorizontal: 8,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '400'

  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    flex: 1,
    padding: 95,
    marginBottom: 12,
    justifyContent: 'center',
  },
  centeredView: {
    width: '100%',
    height: '35%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});

export default EditProfile;
