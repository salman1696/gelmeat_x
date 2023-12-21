import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { Icon, Image, Overlay } from "react-native-elements";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  cartCheckIcon,
  deliveryMan,
  menu,
  offer1,
} from "../../../assets/images";
import { CustomText } from "../../../shared/components";
import ActivityItem from "../../../shared/components/activityItem";
import AddedCartItem from "../../../shared/components/addedCartItem";
import PaymentCardBox from "../../../shared/components/paymentCardBox";
import TabsOptions from "../../../shared/components/tabsOptions";
import { GST, RF } from "../../../shared/exporter";

const cardsList = [
  { id: "1", cardNumber: "1234" },
  { id: "2", cardNumber: "5678" },
  { id: "3", cardNumber: "9101" },
  { id: "4", cardNumber: "1213" },
];

const tabsList = [
  { id: "1", label: "Card", icon: "credit-card" },
  { id: "2", label: "Cash on Delivery", icon: "credit-card" },
];

const itemsList = [{ title: "Top Sirlion Steak" }, { title: "Top Meat Steak" }];

const ChangePassword = ({ navigation }: any) => {
  const { rItems, cartItems } = useSelector((state: any) => state.root.user);

  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTabId, setActiveTabId] = useState("1");
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
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          height: "100%",
        },
      ]}
    >
      <View style={styles.pageWrapper}>
        {/** Header **/}
        <View style={styles.pageHeader}>
          <TouchableOpacity
            style={{
              marginBottom: 20,
              left: RF(0),
              top: RF(0),
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name={"left"} type={"antdesign"} size={22} />
          </TouchableOpacity>
          <CustomText size={24} style={{ textAlign: "center" }}>
            Change Password
          </CustomText>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flex: 1, marginTop: 20 }}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 55,
                padding: 25,
                flexDirection: "row",
                marginVertical: 5,
              }}
            >
              <TextInput
                placeholderTextColor={'#888'}

                style={{ width: "100%", fontSize: 19 }}
                placeholder={"Current passowrd"}
              />
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 55,
                padding: 25,
                flexDirection: "row",
                marginVertical: 5,
              }}
            >
              <TextInput
                placeholderTextColor={'#888'}

                style={{ width: "100%", fontSize: 19 }}
                placeholder={"New passowrd"}
              />
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 55,
                padding: 25,
                flexDirection: "row",
                marginVertical: 5,
              }}
            >
              <TextInput
                placeholderTextColor={'#888'}

                style={{ width: "100%", fontSize: 19 }}
                placeholder={"Confirm passowrd"}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={[styles.footerWrapper]}>
        <TouchableOpacity style={[styles.buttonStyle, styles.firstButton]}>
          <Text style={styles.get_started}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.secondButtons]}>
          <Text style={[styles.get_started, { color: "white" }]}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
    marginBottom: RF(30),
  },
  pageHeader: {
    alignItems: "flex-start",
    justifyContent: "center",
    // marginBottom: RF(30),
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
    color: "#000000",
    fontSize: 20,
    marginHorizontal: 6,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "500",
  },
  header1: {
    color: "#9D2731",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "500",
  },
  sub_total: {
    color: "#05112640",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "500",
  },
  toatl_price_text: {
    color: "#9B0328",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "500",
  },
  header_yellow: {
    color: "#000",
    fontSize: 19,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "600",
  },
  header_white: {
    color: "#9D2731",
    fontSize: 16,
    marginTop: 2,
    marginHorizontal: 2,
    textAlign: "left",
    fontFamily: "Outfit",
    fontWeight: "500",
  },
  price_text: {
    color: "#000",
    fontSize: 16,
    marginTop: 2,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    fontWeight: "800",
  },
  sub_price_text: {
    color: "#051126",
    fontSize: 15,
    marginTop: 2,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "500",
  },
  swipe_text: {
    color: "#000",
    fontSize: 11,
    marginBottom: 10,
    marginHorizontal: 8,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "400",
  },
  item: {
    backgroundColor: "#f9c2ff",
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
    justifyContent: "center",
  },
  centeredView: {
    width: "100%",
    height: "35%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%",
    height: "100%",
    // backgroundColor: '#000',
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
    position: "absolute",
    bottom: 0,
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

export default ChangePassword;
