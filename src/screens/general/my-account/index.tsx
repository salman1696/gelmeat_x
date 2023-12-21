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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
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
import AddNewCard from "./myAccount";
import { useTranslation } from "react-i18next";
import { Button } from "@rneui/themed";
import Toast from 'react-native-simple-toast'

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

const MyAccount = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const { user, rItems, cartItems } = useSelector((state: any) => state.root.user);

  const [name, setName] = useState(user?.user?.fullname ?? "");
  const [email, setEmail] = useState(user?.user?.email ?? "");

  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTabId, setActiveTabId] = useState("1");
  const [isShowOrderPlaced, setIsShowOrderPlaced] = useState(false);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
  const [langCheck, setLangCheck] = useState(false);

  useEffect(() => {
    () => {
      setIsShowOrderPlaced(false);
      setIsShowAddNewCard(false);
    };
  }, []);


  const [lang, setLang] = useState([
    { langName: 'العربية', selected: true },
    { langName: 'English', selected: false }
  ])

  const toggleSelection = (i: { langName: string; } | undefined) => {
    setLang(
      lang.map((item) => {
        if (item.langName === i?.langName) {

          return {
            ...item,
            selected: !item.selected
          }
        } else {
          return {
            ...item,
            selected: !item.selected
          }
        }

      })
    )
  }


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
              style={{
                position: "absolute",
                left: RF(0),
                top: RF(0),
              }}
              onPress={() => navigation.toggleDrawer()}
            >
              <Image source={menu} style={{ width: 20, height: 20 }}></Image>
            </TouchableOpacity>
            <CustomText size={17} style={{ textAlign: "center" }}>
              {t("My Account")}
            </CustomText>
          </View>

          <View style={{ backgroundColor: "#fff", borderRadius: 10 }}>
            <View
              style={{
                flex: 1,
                padding: 15,
                flexDirection: "row",
                marginVertical: 15,
              }}
            >
              <View style={{ flex: 0.2 }}>
                <Image
                  source={offer1}
                  style={{ width: RF(55), height: RF(55), borderRadius: 40 }}
                ></Image>
              </View>
              {user ? <View
                style={{
                  flex: 0.8,
                  alignItems: "flex-start",
                  marginLeft: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={styles.header_yellow}>{user?.user?.fullname ?? "Marvis Ighedosa"}</Text>
                <Text
                  style={{
                    color: "#00000050",
                    fontSize: 16,
                    textAlign: "center",
                    fontFamily: "Outfit",
                    fontWeight: "100",
                  }}
                >
                  {user?.user?.email ?? "Dosamarvis@gmail.com"}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    // backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("viewProfile")}
                  >
                    <Text style={styles.header_white}>{t("View Profile")}</Text>
                  </TouchableOpacity>
                  <Icon
                    name="chevron-right"
                    type="entypo"
                    color="#9D2731"
                    size={RF(19)}
                    iconStyle={{
                      transform: [
                        {
                          rotateY: i18n.language === "ar" ? "180deg" : "0deg",
                        },
                      ],
                    }}
                  />
                </View>
              </View> :
                <View style={{
                  flex: 0.8,
                  alignItems: "flex-start",
                  marginLeft: 10,
                  justifyContent: "center",
                }}>
                  <Button onPress={() => navigation.navigate("loginMain")} style={{ backgroundColor: 'red' }} title={"Login"} color={"#9D2731"} />
                </View>
              }

            </View>
          </View>

          <View>
            <View style={styles.labelAndButton}>
              <CustomText size={13} style={{ textAlign: "center" }}>
                {t("General Settings")}
              </CustomText>
            </View>

            <ActivityItem
              name={t("Language")}
              icon={"cards-heart-outline"}
              type={"material-community"}
              onPress={() => setLangCheck(true)}
            />

            <ActivityItem
              name={t("Notification")}
              icon={"settings"}
              type={"simple-line-icon"}
              onPress={() => navigation.navigate("notificationSettings")}
            />

            <ActivityItem
              name={t("Saved Address")}
              icon={"my-location"}
              type={"material"}
              onPress={() => {
                user ? navigation.navigate("SavedAddress") : Toast.show("Please login", Toast.SHORT)
              }}
            />

            <View style={styles.labelAndButton}>
              <CustomText size={13} style={{ textAlign: "center" }}>
                {t("General Settings")}
              </CustomText>
            </View>

            <ActivityItem
              name={t("Change Password")}
              icon={"lock"}
              type={"material-community"}
              onPress={() => user ? navigation.navigate("ChangePassword") : Toast.show("Please login", Toast.SHORT)}
            />

            <ActivityItem
              icon={"creditcard"}
              type={"antdesign"}
              onPress={() => user ? navigation.navigate("SavedPayment") : Toast.show("Please login", Toast.SHORT)}
              name={t("Payment Method")}
            />

            <View style={styles.labelAndButton}>
              <CustomText size={13} style={{ textAlign: "center" }}>
                {t("Resources")}
              </CustomText>
            </View>

            <ActivityItem
              icon={"questioncircleo"}
              type={"antdesign"}
              onPress={() => navigation.navigate("Privacy")}
              name={t("Help")}
            />

            <ActivityItem
              icon={"message-reply-text-outline"}
              type={"material-community"}
              // onPress={() => navigation.navigate('Privacy')}
              onPress={() => navigation.navigate("TermsCondition")}
              name={t("Terms & Conditions")}
            />

            <ActivityItem
              icon={"message-reply-text-outline"}
              type={"material-community"}
              onPress={() => user ? navigation.navigate("favorites") : Toast.show("Please login", Toast.SHORT)}
              name={t("Favorites")}
            />
          </View>
        </View>
      </ScrollView>

      {langCheck && (
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.languageText}>{t("Language")}</Text>
            <Icon
              onPress={() => {
                setLangCheck(false)
              }}
              name="cross"
              type="entypo"
              color="#000"
            />
          </View>
          {lang.map((i) => {

            return (
              <TouchableOpacity
                onPress={() => toggleSelection(i)}
                style={{
                  backgroundColor: "#F5F5F8",
                  alignItems: "center",
                  marginTop: RFValue(5),
                  width: "87%",
                  height: RFValue(65),
                }}
                key={i.langName}
              >
                <View
                  style={{
                    borderRadius: 20,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: RFValue(55),
                    backgroundColor: i.selected ? "#9B0328" : "#FFFFFF",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: !i.selected ? "#9B0328" : "#fff",
                      fontSize: 24,
                      marginHorizontal: RFValue(20),
                      fontFamily: "Outfit-Regular",
                      fontWeight: "400",
                    }}
                  >
                    {i.langName}
                  </Text>
                  {i.selected && (
                    <Text style={styles.languageTextDefault}>
                      {t("Default")}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              width: "100%",
              bottom: 0,
              borderTopLeftRadius: 25,
              paddingTop: 18,
              borderTopRightRadius: 25,
              backgroundColor: "#fff",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                // marginHorizontal: 10,
                borderColor: "#CA2323",
                borderWidth: 1.5,
                height: RF(55),
                borderRadius: 30,
                alignSelf: "center",
                marginBottom: RF(20),
                width: "48%",
                paddingVertical: 20,
                backgroundColor: "white",
              }}
            >
              <Text style={styles.get_started}>{t("Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("pickAddress")}
              // onPress={() => dispatch(setUser({ name: 'ahmed' }))}
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                height: RF(55),
                borderRadius: 30,
                alignSelf: "center",
                marginBottom: RF(20),
                width: "48%",
                paddingVertical: 20,
                backgroundColor: "#CA2323",
              }}
            >
              <Text style={[styles.get_started, { color: "white" }]}>
                {t("Save")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
    marginBottom: RF(30),
  },
  contentContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: RFValue(290),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
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
    marginVertical: RF(10),
  },
  langContainer: {
    borderRadius: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: RFValue(55),
    backgroundColor: '#9B0328',
    alignItems: 'center',
  },
  langButton: {
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
    marginVertical: RFValue(5),
    width: '87%',
    height: RFValue(65),
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    marginTop: RFValue(100),
    justifyContent: 'center',

  },
  textContainer: {
    flexDirection: 'row',
    width: '87%',
    marginTop: RF(20),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff',
    fontSize: 55,
    textAlign: 'left',
    lineHeight: 55,
    fontFamily: 'Outfit-Bold',
    marginHorizontal: 50,
    fontWeight: '500'

  },
  languageText: {
    color: '#000',
    fontSize: 28,
    textAlign: 'left',
    marginBottom: 8,
    fontFamily: 'Outfit-Bold',
    fontWeight: '400'

  },
  languageTextSelection: {
    color: '#fff',
    fontSize: 24,
    marginHorizontal: RFValue(20),
    fontFamily: 'Outfit-Regular',
    fontWeight: '400'

  },
  languageTextDefault: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: RFValue(20),
    fontFamily: 'Outfit-Regular',
    fontWeight: '400'

  },
  text3: {
    color: '#fff',
    fontSize: 55,
    textAlign: 'left',
    lineHeight: 55,
    fontFamily: 'Outfit-Bold',
    marginHorizontal: 50,
    fontWeight: '500'

  },
  get_started: {
    color: '#9D2731',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '400'

  },
  linearGradient: {
    flex: 1,
    borderRadius: 5

  },
  image: {
    width: '80%',
    height: "40%",
    marginTop: RFValue(80),
    alignSelf: 'center',
  },
  image2: {
    width: '100%',
    height: RFPercentage(50),
    marginTop: RFValue(40),
    alignSelf: 'center',
  },
  image3: {
    width: '100%', top: 18,
    height: RFPercentage(71),
    alignSelf: 'center',
  },
  logo_image: {
    alignSelf: 'center',
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
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "100",
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

  // get_started: {
  //   color: "#9D2731",
  //   fontSize: 17,
  //   textAlign: "center",
  //   fontWeight: "400",
  // },
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

export default MyAccount;
