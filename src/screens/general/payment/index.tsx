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
import { cartCheckIcon, deliveryMan, cashWallet } from "../../../assets/images";
import { CustomText } from "../../../shared/components";
import AddedCartItem from "../../../shared/components/addedCartItem";
import PaymentCardBox from "../../../shared/components/paymentCardBox";
import TabsOptions from "../../../shared/components/tabsOptions";
import { GST, RF } from "../../../shared/exporter";
import AddNewCard from "./addNewCard";
import { useTranslation } from "react-i18next";
import CartAddedItem from "../../../shared/components/cartAddedItem";
import { placeOrder } from "../../../shared/services/OrderService";
import Toast from 'react-native-simple-toast'

const cardsList = [
  { id: "1", cardNumber: "1234" },
  { id: "2", cardNumber: "5678" },
  { id: "3", cardNumber: "9101" },
  { id: "4", cardNumber: "1213" },
];

const itemsList = [{ title: "Top Sirlion Steak" }, { title: "Top Meat Steak" }];

const Payment = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { user, rItems, cartItems, currentRoute } = useSelector((state: any) => state.root.user);

  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTabId, setActiveTabId] = useState("1");
  const [isShowOrderPlaced, setIsShowOrderPlaced] = useState(false);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);

  const tabsList = [
    { id: "1", label: t("Card"), icon: "credit-card" },
    { id: "2", label: currentRoute === "pickup" ? t("Cash") : t("Cash on Delivery"), icon: "credit-card" },
  ];

  useEffect(() => {
    () => {
      setIsShowOrderPlaced(false);
      setIsShowAddNewCard(false);
    };
  }, []);


  // const { user, rItems, cartItems } = useSelector((state: any) => state.root.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [isShowPromoCode, setIsShowPromoCode] = useState(false);
  const [promoValue, setPromoValue] = useState({ promocode: null });




  const PlaceOrder = () => {

    let params =

    {
      table_id: null,
      type: "applepay",
      discount: 12,
      sub_total: cartItems?.length !== 0
        ? cartItems?.reduce(
          (a: any, b: any) => a + b.price * b.count,
          0
        )
        : 0,
      products: cartItems,
      payment_status: 'pending',
      payment_method: 'Apple Pay'
    }
    console.log(params);


    placeOrder(params)
      .then((res) => {
        Toast.show('Order placed successfully', Toast.SHORT);
        navigation.navigate("payment")
      })
      .catch((err) => Toast.show(err.response.data.message, Toast.SHORT))

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
              onPress={() => navigation.navigate("deliverDetails")}
            >
              <Icon
                name="left"
                type="antdesign"
                size={RF(20)}
                iconStyle={styles.backIcon}
              />
            </TouchableOpacity>
            <CustomText size={17} style={{ textAlign: "center" }}>
              {t("Payment")}
            </CustomText>
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <CustomText size={16}>{t("Choose Payment Method")}</CustomText>
          </View>

          <View style={styles.horizontalTabs}>
            <FlatList
              data={tabsList}
              contentContainerStyle={styles.horizontalTabs}
              renderItem={({ item, index }: any) => {
                return (
                  <TabsOptions
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    activeTabId={activeTabId}
                    onSelectTab={setActiveTabId}
                  />
                );
              }}
            />
          </View>

          {activeTabId === "1" && (
            <View>
              <View style={styles.labelAndButton}>
                <CustomText size={17} style={{ textAlign: "center" }}>
                  {t("Choose Card")}
                </CustomText>

                <TouchableOpacity onPress={() => setIsShowAddNewCard(true)}>
                  <CustomText
                    size={15}
                    color="#9D2731"
                    style={{ textAlign: "center" }}
                  >
                    {t("Add New Card")}
                  </CustomText>
                </TouchableOpacity>
              </View>

              {/** Cards List **/}
              <FlatList
                data={cardsList}
                // keyExtractor={(key: any) => key.index}
                renderItem={({ item, index }: any) => {
                  return (
                    <PaymentCardBox
                      id={item.id}
                      cardNumber={item.cardNumber}
                      selectedCardId={selectedCard}
                      onSelectCard={setSelectedCard}
                    />
                  );
                }}
              />
            </View>
          )}

          {activeTabId === "2" && (
            <View>
              <View
                style={[
                  styles.deliveryManWrapper,
                  {
                    marginBottom: RF(currentRoute === "pickup" ? 100 : -20),
                  },
                ]}
              >
                <Image
                  source={currentRoute === "pickup" ? cashWallet : deliveryMan}
                  style={{
                    height: RF(currentRoute === "pickup" ? 330 : 510),
                    width: RF(currentRoute === "pickup" ? 300 : 260),
                  }}
                />
              </View>
              <View style={styles.placeOrderSection}>
                <View style={{ marginBottom: RF(15) }}>
                  <CustomText
                    size={24}
                    style={{ textAlign: "center", marginBottom: RF(15) }}
                  >
                    {t("Place your order")}
                  </CustomText>

                  <CustomText
                    size={17}
                    color="#9ba0a8"
                    style={{ textAlign: "center" }}
                  >
                    {t(
                      "Please ensure that you have the exact amount of cash available at the time of delivery."
                    )}
                  </CustomText>
                </View>

                <View style={[styles.labelAndButton, styles.totalOrder]}>
                  <CustomText size={15} style={{ textAlign: "center" }}>
                    {t("Total")}
                  </CustomText>

                  <CustomText
                    size={17}
                    color="#9D2731"
                    style={{ textAlign: "center" }}
                  >
                    {t("SAR")} 200
                  </CustomText>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>


      {/** Page Footer **/}
      <View style={styles.footerWrapperPayment}>
        <TouchableOpacity style={[styles.buttonStyle, styles.firstButton]}>
          <Text style={styles.get_started}>{t("Cancel")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.secondButtons]}
          onPress={() => setIsShowOrderPlaced(true)}
        >
          <Text style={[styles.get_started, { color: "white" }]}>
            {t("Place Order")}
          </Text>
        </TouchableOpacity>
      </View>

      {
        // Cart added item
        isShowOrderPlaced && (
          <Overlay
            isVisible={isShowOrderPlaced}
            overlayStyle={GST.OVERLAYSTYLE}
          >
            <View
              style={[
                styles.popupContainerContainer,
                {
                  shadowRadius: RF(3),
                  shadowOffset: {
                    width: RF(10),
                    height: RF(10),
                  },
                  elevation: 20,
                  shadowColor: "#000000",
                },
              ]}
            >
              <View style={styles.popupHeader}>
                <CustomText />
                <Icon
                  onPress={() => setIsShowOrderPlaced(false)}
                  name="cross"
                  type="entypo"
                  color="#000"
                />
              </View>

              <View style={styles.popupText}>
                <View style={styles.cartIconWrapper}>
                  <Image
                    source={cartCheckIcon}
                    style={{
                      width: RF(42),
                      height: RF(42),
                    }}
                  />
                </View>

                <CustomText
                  size={24}
                  style={{ textAlign: "center", marginBottom: RF(15) }}
                >
                  {t("Order Placed")}
                </CustomText>

                <CustomText
                  size={15}
                  color="#000000"
                  style={{ marginBottom: RF(15), textAlign: "center" }}
                >
                  {t(
                    "Your order was successfully placed and will be delivered within 45 minutes."
                  )}
                </CustomText>

                <View style={{ flex: 1 }}>
                  <FlatList
                    data={cartItems}
                    renderItem={({ item, index }: any) => {
                      return <CartAddedItem item={item} />;
                    }}
                  />
                </View>
              </View>

              <View style={styles.footerWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("delivery")}
                  style={[styles.buttonStyle, styles.firstButton]}
                >
                  <Text style={styles.get_started}>{t("Explore Items")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.secondButtons]}
                  onPress={() => {
                    setIsShowOrderPlaced(false);
                    navigation.navigate("Orders");
                  }}
                >
                  <Text style={[styles.get_started, { color: "white" }]}>
                    {t("View Orders")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )
      }

      {
        // Add New Card
        isShowAddNewCard && (
          <Overlay isVisible={isShowAddNewCard} overlayStyle={GST.OVERLAYSTYLE}>
            <View style={[styles.popupContainerContainerPlaced]}>
              <View style={styles.popupHeader}>
                <CustomText size={24}>{t("Add New Card")}</CustomText>
                <Icon
                  onPress={() => setIsShowAddNewCard(false)}
                  name="cross"
                  type="entypo"
                  color="#000"
                />
              </View>

              <View style={styles.popupText}>
                <AddNewCard onCloseCard={setIsShowAddNewCard} />
              </View>
            </View>
          </Overlay>
        )
      }
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
    // marginBottom: RF(48),
    backgroundColor: "#ffffff",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
  },
  footerWrapperPayment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: RF(48),
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
    height: "80%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#F2F2F2",
    zIndex: 1000,
  },
  popupContainerContainerPlaced: {
    position: "absolute",
    bottom: 0,
    width: "102%",
    height: "50%",
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

export default Payment;
