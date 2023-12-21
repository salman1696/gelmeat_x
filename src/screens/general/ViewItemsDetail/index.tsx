import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  VirtualizedList,
  Image,
} from "react-native";
import { AirbnbRating, CheckBox, Icon } from "react-native-elements";
import { CustomText } from "../../../shared/components";
import { GST, RF } from "../../../shared/exporter";
import RadioWithLabel from "../../../shared/components/radioWithLabel";
import CheckBoxWithLabel from "../../../shared/components/checkBoxWithLabel";
import CustomCount from "../../../shared/components/customCount";
import Swiper from "react-native-swiper";
import { warningSign, sliderImage, cartCheckIcon } from "../../../assets/images";
import AddedCartItem from "../../../shared/components/addedCartItem";
import { setCartItems, setRItems } from "../../../shared/redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Overlay } from "react-native-elements";
import { useTranslation } from "react-i18next";
import CartAddedItem from "../../../shared/components/cartAddedItem";
import { log } from "react-native-reanimated";

const optionsListOne = [
  { id: 1, label: "Variants 1", price: "SAR 200", value: "1" },
  { id: 2, label: "Variants 2", price: "SAR 100", value: "2" },
  { id: 3, label: "Variants 3", price: "SAR 300", value: "3" },
];

const optionsListTwo = [
  { id: 1, label: "Modifier 1", price: "SAR 20", value: "1" },
  { id: 2, label: "Modifier 2", price: "SAR 10", value: "2" },
  { id: 3, label: "Modifier 3", price: "SAR 30", value: "3" },
];

const itemsList = [
  { title: "Top Sirlion Steak" },
  { title: "Top Meat Steak" },
];

const ViewItemsDetail = ({ route, navigation }: any) => {
  const [ratingValue, setRatingValue] = useState(5);
  const [checkedOne, setCheckedOne] = useState(0);
  const [checkedTwo, setCheckedTwo] = useState("1");
  const [value, onChangeText] = useState("");
  const [valueTwo, onChangeTextTwo] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isShowAlertCart, setIsShowAlertCart] = useState(false);
  const [isShowCartAddedItems, setIsShowCartAddedItems] = useState(false);

  const { t, i18n } = useTranslation();

  const { rItems, cartItems } = useSelector((state: any) => state.root.user);

  const dispatch = useDispatch();

  const ratingCompleted = useCallback((rating: any) => {
    setRatingValue(rating);
  }, []);

  const { elm } = route.params;
  const [item, setItem] = useState(elm ?? {});

  useEffect(() => {
    () => {
      setIsShowDetails(false);
      setIsShowAlertCart(false);
      setIsShowCartAddedItems(false)
    }
  }, []);

  useEffect(() => { }, [item])
  return (
    <View style={styles.containerStyle}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Swiper
          style={{ height: 400 }}
          showsButtons={false}
          dotColor={"#CA2323"}
          activeDotColor={"#fff"}
        >
          <View style={{ justifyContent: "flex-start" }}>
            <Image source={{ uri: item?.img_url }} style={{ height: 400 }} />
          </View>
          <View style={{ justifyContent: "flex-start" }}>
            <Image source={{ uri: item?.img_url }} style={{ height: 400 }} />
          </View>

          <View style={{ justifyContent: "flex-start" }}>
            <Image source={{ uri: item?.img_url }} style={{ height: 400 }} />
          </View>
        </Swiper>

        <View
          style={{
            position: "absolute",
            top: RF(30),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingLeft: RF(20),
              paddingRight: RF(20),
            }}
          >
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Icon
                name="left"
                type="antdesign"
                color="#f50"
                size={RF(20)}
                onPress={() => navigation.goBack()}
                iconStyle={{
                  color: "#ffffff",
                  transform: [
                    { rotateY: i18n.language === "ar" ? "180deg" : "0deg" },
                  ],
                }}
              />
            </View>
            <View
              style={[
                styles.likeIconWrapper,
                {
                  width: "50%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Icon
                name={isLike ? "heart" : "hearto"}
                type="antdesign"
                color="#f50"
                size={RF(20)}
                onPress={() => setIsLike(!isLike)}
                iconStyle={{
                  backgroundColor: "#ffffffb8",
                  width: RF(50),
                  height: RF(50),
                  padding: RF(14.6),
                  borderRadius: RF(100),
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ padding: RF(20) }}>
          <View style={styles.titles}>
            <CustomText size={20}>{item?.title}</CustomText>
            <CustomText color="#9B0328" onPress={() => setIsShowDetails(true)}>
              {t("Detail & Reviews")}
            </CustomText>
          </View>
          <CustomText
            style={{ marginBottom: RF(10) }}
            size={16}
            bold
            color="#9B0328"
          >
            {`${t("SAR")} ` + item?.price}
          </CustomText>
          <CustomText color="#00000080">
            {t("Estimated Delivery Time")}:{" "}
            <CustomText>45 {t("mins")}</CustomText>
          </CustomText>
          <View style={styles.rating}>
            <CustomText style={{ marginRight: RF(4), alignItems: "center" }}>
              {ratingValue}
            </CustomText>
            <AirbnbRating
              onFinishRating={ratingCompleted}
              reviewSize={0}
              count={5}
              defaultRating={5}
              size={15}
            />
          </View>
          {item?.Variants?.length > 0 && (
            <View style={styles.variants}>
              <CustomText size={15}>{t("Choose Variants")}</CustomText>
              <CustomText style={{ marginBottom: RF(10) }} color="#808080">
                {t("Choose at least one")}
              </CustomText>


              {/* 
            {item.map((i: { count: number; }, index: any) => {
              if (i.count > 0) {
                return (
                  <RadioWithLabel
                    value={item.value}
                    checked={checkedOne}
                    setChecked={setCheckedOne}
                    label={item.label}
                    price={item.price}
                  />

                );
              }
            })} */}


              <FlatList
                data={item?.Variants}
                // keyExtractor={(key: any) => key.index}
                renderItem={({ item, index }: any) => {

                  return (
                    <RadioWithLabel
                      value={index}
                      checked={checkedOne}
                      setChecked={setCheckedOne}
                      label={item.title}
                      price={item.price}
                    />
                  );
                }}
              />
            </View>)}

          <View style={styles.variants}>
            <View style={{ marginBottom: RF(20) }}>
              <CustomText size={15}>{t("Choose Add-ons")}</CustomText>
              <CustomText color="#808080">
                {t("Modifiers will be same for all the orders (quantity).")}
              </CustomText>
            </View>

            <View style={{ marginBottom: RF(10) }}>
              <CustomText size={15} color="#9B0328">
                {t("Modifier Heading")}
              </CustomText>
              <CustomText style={{ marginBottom: RF(10) }} color="#808080">
                {t("Choose at least one")}
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: RF(15),
              }}
            >
              <View>
                <FlatList
                  data={optionsListTwo}
                  // keyExtractor={(key: any) => key.index}
                  renderItem={({ item, index }: any) => {
                    return (
                      <RadioWithLabel
                        value={item.value}
                        checked={checkedTwo}
                        setChecked={setCheckedTwo}
                        label={item.label}
                        price={item.price}
                      />
                    );
                  }}
                />
              </View>
              <CustomCount size="small" item={item} setItem={setItem} />
            </View>

            <View style={{ marginBottom: RF(10), marginTop: RF(10) }}>
              <CustomText size={15} color="#9B0328">
                {t("Modifier Heading")}
              </CustomText>
              <CustomText style={{ marginBottom: RF(7) }} color="#808080">
                {t("Choose at least one")}
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: RF(15),
              }}
            >
              <View>
                <FlatList
                  data={optionsListTwo}
                  // keyExtractor={(key: any) => key.index}
                  renderItem={({ item, index }: any) => {
                    return (
                      <CheckBoxWithLabel
                        value={item.value}
                        checked={checkedTwo}
                        setChecked={setCheckedTwo}
                        label={item.label}
                        price={item.price}
                      />
                    );
                  }}
                />
              </View>
              <CustomCount size="small" item={item} setItem={setItem} />
            </View>

            <View style={{ marginBottom: RF(10), marginTop: RF(20) }}>
              <CustomText size={15} color="#9B0328">
                {t("Modifier Heading")}
              </CustomText>
              <CustomText style={{ marginBottom: RF(7) }} color="#808080">
                {t("Choose at least one")}
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: RF(15),
              }}
            >
              <View>
                <FlatList
                  data={optionsListTwo}
                  // keyExtractor={(key: any) => key.index}
                  renderItem={({ item, index }: any) => {
                    return (
                      <CheckBoxWithLabel
                        value={item.value}
                        checked={checkedTwo}
                        setChecked={setCheckedTwo}
                        label={item.label}
                        price={item.price}
                      />
                    );
                  }}
                />
              </View>
              <CustomCount size="small" item={item} setItem={setItem} />
            </View>
          </View>
          <View>
            <CustomText
              style={{
                marginBottom: RF(10),
              }}
              size={15}
            >
              {t("Special Instructions")}
            </CustomText>
            <View
              style={{
                backgroundColor: "white",
                marginBottom: RF(10),
                borderRadius: RF(10),
              }}
            >
              <TextInput
                editable
                multiline
                placeholderTextColor={'#888'}
                placeholder={t("Add Notes")}
                numberOfLines={4}
                maxLength={40}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                style={{ padding: 15 }}
              />
            </View>

          </View>
        </View>
      </ScrollView>

      {isShowDetails && (
        <Overlay isVisible={isShowDetails} overlayStyle={GST.OVERLAYSTYLE}>
          <View style={styles.popupContainerContainer}>
            <View style={styles.popupHeader}>
              <CustomText size={24}>{t("Detail & Reviews")}</CustomText>
              <Icon
                onPress={() => setIsShowDetails(false)}
                name="cross"
                type="entypo"
                color="#000"
              />
            </View>

            <View style={styles.popupText}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 30,
                    alignSelf: "center",
                    marginBottom: RF(20),
                    padding: RF(15),
                    backgroundColor: "#9d2731",
                    marginRight: RF(10),
                  }}
                >
                  <Text style={[styles.get_started, { color: "white" }]}>
                    {t("Details")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 30,
                    alignSelf: "center",
                    marginBottom: RF(20),
                    padding: RF(15),
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Text style={[styles.get_started, { color: "#000000" }]}>
                    {t("Ratings & Reviews")}
                  </Text>
                </TouchableOpacity>
              </View>

              <CustomText
                size={16}
                color="#000000"
                style={{ marginBottom: RF(5) }}
              >
                {t("Description")}
              </CustomText>

              <CustomText
                size={14}
                color="#797979"
                style={{ marginBottom: RF(15) }}
              >
                A sagittis orci lectus justo amet commodo. Ut blandit lectus
                nibh libero. Vestibulum suspendisse sed ut at augue ut
                tincidunt. Sollicitudin netus eleifend dis pellentesque
                habitasse. A sagittis orci lectus justo amet commodo. Ut blandit
                lectus nibh libero. Vestibulum suspendisse sed ut at augue ut
                tincidunt.
              </CustomText>

              <CustomText size={14} color="#797979">
                A sagittis orci lectus justo amet commodo. Ut blandit lectus
                nibh libero. Vestibulum suspendisse sed ut at augue ut
                tincidunt. Sollicitudin netus eleifend dis pellentesque
                habitasse.A sagittis orci lectus justo amet commodo. Ut blandit
                lectus nibh libero. Vestibulum suspendisse sed ut at augue ut
                tincidunt. Sollicitudin netus eleifend dis pellentesque
                habitasse.
              </CustomText>
            </View>
          </View>
        </Overlay>
      )}

      {isShowAlertCart && (
        <Overlay isVisible={isShowAlertCart} overlayStyle={GST.OVERLAYSTYLE}>
          <View style={[styles.popupContainerContainer]}>
            <View style={styles.popupHeader}>
              <CustomText size={24}>{t("Add to Cart")}</CustomText>
              <Icon
                onPress={() => setIsShowAlertCart(false)}
                name="cross"
                type="entypo"
                color="#000"
              />
            </View>

            <View style={styles.popupText}>
              <Image
                source={warningSign}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: RF(15),
                }}
              />

              <CustomText
                size={17}
                color="#000000"
                style={{ marginBottom: RF(15), textAlign: "center" }}
              >
                {t("ARE YOU SURE?")}
              </CustomText>

              <CustomText
                size={17}
                color="#000000"
                style={{ marginBottom: RF(15), textAlign: "center" }}
              >
                {t("Adding this")}{" "}
                <CustomText color="#9D2731">{t("DELIVERY ITEM")}</CustomText>{" "}
                {t("will remove")}
                <CustomText color="#9D2731">
                  {" "}
                  {t("PICKUP ITEMS")}
                </CustomText>{" "}
                {t("from cart")}.
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: "#ffffff",
                padding: RF(20),
                borderTopStartRadius: RF(17),
                borderTopEndRadius: RF(17),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsShowAlertCart(false);
                  navigation.goBack();
                }}
                style={{
                  justifyContent: "center",
                  // marginHorizontal: 10,
                  borderColor: "#CA2323",
                  borderWidth: 1.5,
                  height: RF(55),
                  borderRadius: 30,
                  alignSelf: "center",
                  width: "48%",
                  paddingVertical: 20,
                  backgroundColor: "white",
                  marginRight: RF(25),
                }}
              >
                <Text style={styles.get_started}>{t("View Cart")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("cart")}
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  height: RF(55),
                  borderRadius: 30,
                  alignSelf: "center",
                  width: "48%",
                  paddingVertical: 20,
                  backgroundColor: "#CA2323",
                }}
              >
                <Text style={[styles.get_started, { color: "white" }]}>
                  {t("Add Anyway")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      )}

      {
        // Cart added item
        isShowCartAddedItems && (
          <Overlay
            isVisible={isShowCartAddedItems}
            overlayStyle={GST.OVERLAYSTYLE}
          >
            <View style={[styles.popupContainerContainer]}>
              <View style={styles.popupHeader}>
                <CustomText />
                <Icon
                  onPress={() => setIsShowCartAddedItems(false)}
                  name="cross"
                  type="entypo"
                  color="#000"
                />
              </View>

              <View style={styles.popupText}>
                <Image
                  source={cartCheckIcon}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: RF(15),
                  }}
                />

                <CustomText
                  size={24}
                  style={{ textAlign: "center", marginBottom: RF(15) }}
                >
                  {t("Added to Cart")}
                </CustomText>

                <CustomText
                  size={15}
                  color="#000000"
                  style={{ marginBottom: RF(15), textAlign: "center" }}
                >
                  {t("Your item was successfully added to Cart")}.
                </CustomText>
              </View>

              <FlatList
                data={cartItems}
                keyExtractor={(item, index) => item.id + index.toString()}
                renderItem={({ item, index }: any) => {
                  return <CartAddedItem item={item} />;
                }}
                style={{
                  maxHeight: RF(300),
                  overflow: "scroll"
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  backgroundColor: "#ffffff",
                  padding: RF(20),
                  borderTopStartRadius: RF(17),
                  borderTopEndRadius: RF(17),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setIsShowCartAddedItems(false);
                    navigation.goBack();
                  }}
                  style={{
                    justifyContent: "center",
                    // marginHorizontal: 10,
                    borderColor: "#CA2323",
                    borderWidth: 1.5,
                    height: RF(55),
                    borderRadius: 30,
                    alignSelf: "center",
                    width: "48%",
                    paddingVertical: 20,
                    backgroundColor: "white",
                    marginRight: RF(25),
                  }}
                >
                  <Text style={styles.get_started}>{t("Explore Items")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowCartAddedItems(false);

                    navigation.navigate("cart", { login: false });
                  }}
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    height: RF(55),
                    borderRadius: 30,
                    alignSelf: "center",
                    width: "48%",
                    paddingVertical: 20,
                    backgroundColor: "#CA2323",
                  }}
                >
                  <Text style={[styles.get_started, { color: "white" }]}>
                    {t("View Cart")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )
      }

      <View
        style={{
          position: "absolute",
          bottom: RF(70),
          borderTopLeftRadius: RF(25),
          paddingTop: RF(18),
          paddingBottom: RF(20),
          borderTopRightRadius: RF(25),
          backgroundColor: "#fff",
          paddingHorizontal: RF(20),
          width: '100%',
          shadowRadius: RF(2),
          shadowOffset: {
            width: RF(10),
            height: RF(10),
          },
          elevation: 20,
          shadowColor: "#393939",
          left: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: RF(15),
          }}
        >
          <View>
            <CustomText size={16}>{t("Total")}</CustomText>
            <CustomText color="#9B0328" size={20}>
              {`${t("SAR")} ` + item?.price}
            </CustomText>
          </View>
          <CustomCount item={item} setItem={setItem} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {

              dispatch(
                setCartItems(
                  cartItems && cartItems.length > 0
                    ? [...cartItems, item]
                    : [item]
                )
              );
              setIsShowCartAddedItems(true);
            }}
            style={{
              justifyContent: "center",
              // marginHorizontal: 10,
              borderColor: "#CA2323",
              borderWidth: 1.5,
              height: RF(55),
              borderRadius: 30,
              alignSelf: "center",
              width: "48%",
              // paddingVertical: 20,
              backgroundColor: "white",
              // marginRight: RF(25),
            }}
          >
            <Text style={styles.get_started}>{t("Add to Cart")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("deliverDetails", { nav: "buy now" })
            }
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              height: RF(55),
              borderRadius: 30,
              alignSelf: "center",
              width: "48%",
              paddingVertical: 20,
              backgroundColor: "#CA2323",
            }}
          >
            <Text style={[styles.get_started, { color: "white" }]}>
              {t("Buy Now")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    // padding: RF(20),
    paddingBottom: RF(150),
    flex: 1,
  },

  titles: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RF(10),
  },
  rating: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    marginTop: RF(-10),
    marginBottom: RF(20),
  },
  variants: {
    backgroundColor: "#FFFFFF",
    padding: RF(20),
    borderRadius: RF(10),
    marginBottom: RF(20),
  },
  wrapper: {
    height: RF(400),
  },
  get_started: {
    color: "#9D2731",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
  sliderImage: {
    height: RF(100),
  },
  likeIconWrapper: {
    width: RF(50),
    height: RF(50),
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
  },
});

export default ViewItemsDetail;
