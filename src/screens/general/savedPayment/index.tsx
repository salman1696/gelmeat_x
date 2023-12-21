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
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { deliveryMan } from "../../../assets/images";
import { CustomText } from "../../../shared/components";
import PaymentCardBox from "../../../shared/components/paymentCardBox";
import { GST, RF } from "../../../shared/exporter";
import AddNewCard from "./addNewCard";
import { getCards } from "../../../shared/services/OrderService";


const tabsList = [
  { id: "1", label: "Card", icon: "credit-card" },
  { id: "2", label: "Cash on Delivery", icon: "credit-card" },
];

const itemsList = [{ title: "Top Sirlion Steak" }, { title: "Top Meat Steak" }];
import Toast from 'react-native-simple-toast'

const SavedPayment = ({ navigation }: any) => {
  const { rItems, cartItems } = useSelector((state: any) => state.root.user);

  const insets = useSafeAreaInsets();
  const [allcards, setAllCards] = useState(false);


  const [cardsList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [isShowOrderPlaced, setIsShowOrderPlaced] = useState(false);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);

  useEffect(() => {
    setIsShowOrderPlaced(false);
    setIsShowAddNewCard(false);
    getAllCards();
  }, []);

  const getAllCards = () => {
    const params = {}
    getCards(params).then((res) => {
      console.log(params, 'qqq')
      setCardList(res.data.body)
    })
      .catch((err) => Toast.show(err.response.data.message, Toast.SHORT))
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
                marginBottom: 20,
                left: RF(0),
                top: RF(0),
              }}
              onPress={() => navigation.goBack()}
            >
              <Icon name={"left"} type={"antdesign"} size={22} />
            </TouchableOpacity>
            <CustomText size={24} style={{ textAlign: "center" }}>
              Payment Method
            </CustomText>
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <CustomText color={"#00000045"} size={16}>
              card
            </CustomText>
          </View>

          {activeTabId === "1" && (
            <View>
              {/** Cards List **/}
              <FlatList
                data={cardsList}
                // keyExtractor={(key: any) => key.index}
                renderItem={({ item, index }: any) => {
                  return (
                    <PaymentCardBox
                      id={item.id}
                      item={item}
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
              <View style={styles.deliveryManWrapper}>
                <Image source={deliveryMan} style={styles.deliveryManImg} />
              </View>
              <View style={styles.placeOrderSection}>
                <View style={{ marginBottom: RF(15) }}>
                  <CustomText
                    size={24}
                    style={{ textAlign: "center", marginBottom: RF(15) }}
                  >
                    Place your order
                  </CustomText>

                  <CustomText
                    size={17}
                    color="#9ba0a8"
                    style={{ textAlign: "center" }}
                  >
                    Please ensure that you have the exact amount of cash
                    available at the time of delivery.
                  </CustomText>
                </View>

                <View style={[styles.labelAndButton, styles.totalOrder]}>
                  <CustomText size={15} style={{ textAlign: "center" }}>
                    Total
                  </CustomText>

                  <CustomText
                    size={17}
                    color="#9D2731"
                    style={{ textAlign: "center" }}
                  >
                    SAR 200
                  </CustomText>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/** Page Footer **/}
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          padding: 20,
          paddingVertical: 10,
          backgroundColor: "#fff",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          colors={["#CA2323", "#9B0328"]}
          style={{
            borderRadius: 60,
            alignSelf: "center",
            width: "100%",
            padding: 24,
            marginVertical: 10,
            backgroundColor: "#CA2323",
          }}
        >
          <TouchableOpacity onPress={() => setIsShowAddNewCard(true)}>
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 17 }}>
              Add new card
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {
        // Add New Card
        isShowAddNewCard && (
          <Overlay isVisible={isShowAddNewCard} overlayStyle={GST.OVERLAYSTYLE}>
            <View style={[styles.popupContainerContainer]}>
              <View style={styles.popupHeader}>
                <CustomText size={24}>Add New Card</CustomText>
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
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: RF(10),
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
    flex: 1,
    // alignSelf: 'center'
  },
  cartIconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default SavedPayment;
