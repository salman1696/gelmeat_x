import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import {
  c_log,
  menu,
  cartIconImg,
  calendarIconImg,
} from "../../../assets/images";
import CustomText from "../../../shared/components/customText";
import ProductListItem from "../../../shared/components/productListItem";
import TabsOptions from "../../../shared/components/tabsOptions";
import Wrapper from "../../../shared/components/wrapper";
import { RF } from "../../../shared/exporter";
import FilterForm from "./filterForm";
import styles from "./styles";
import EmptyScreen from "../../../shared/components/empty";
import { useTranslation } from "react-i18next";
import {
  getOrderById,
  createOrder,
  updateOrder,
  downloadInvoice,
  orderReport,
  areaOrder,
  getOrder,
} from "../../../shared/services/OrderService";
import { useSelector } from "react-redux";

const tabsList = [
  { id: "1", label: "In Progress" },
  { id: "2", label: "History" },
];

const processList = [
  {
    label: "Order Information Received",
    status: "received",
    complete: true,
    active: false,
  },
  {
    label: "Order Preparing",
    status: "preparing",
    complete: true,
    active: false,
  },

  { label: "Ready", status: "ready", complete: false, active: true },

  { label: "Completed", status: "completed", complete: false, active: false },
];

const orderProducts = [
  {
    name: "Beaf Karahi",
    weight: "1 Kg",
    price: "200",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Chicken Karahi",
    weight: "1 Kg",
    price: "300",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Mutton Karahi",
    weight: "1 Kg",
    price: "600",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
];

const completedOrderProducts = [
  {
    name: "Beaf Karahi",
    weight: "1 Kg",
    price: "200",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Chicken Karahi",
    weight: "1 Kg",
    price: "300",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Mutton Karahi",
    weight: "1 Kg",
    price: "600",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Beaf Karahi",
    weight: "1 Kg",
    price: "200",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Chicken Karahi",
    weight: "1 Kg",
    price: "300",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
  {
    name: "Mutton Karahi",
    weight: "1 Kg",
    price: "600",
    url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
  },
];

const Orders = ({ navigation }: any) => {
  const { t } = useTranslation();

  const { rItems, user } = useSelector((state: any) => state.root.user);

  const [activeTabId, setActiveTabId] = useState("1");
  const [viewAllFirst, setViewAllFirst] = useState(false);
  const [viewAllSecond, setViewAllSecond] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const onSubmitFilter = (values: any) => {
    setIsShowFilter(false);
  };
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getUserOrder();
  }, []);

  const getUserOrder = () => {
    getOrder({ userId: user?.user?.id }, null).then((res) => {
      setOrder(res?.data?.body);
      console.log('order', res?.data?.body);

    }).catch((e) => console.log(e)
    );
  };

  return (
    <Wrapper>
      <SafeAreaView style={{ backgroundColor: "#F2F2F2" }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#F2F2F2"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            marginHorizontal: 15,
            backgroundColor: "#F2F2F2",
            height: "100%",
            marginTop: Platform.OS === "ios" ? 0 : 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: RF(15),
            }}
          >
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image source={menu} style={{ width: 20, height: 20 }}></Image>
              </TouchableOpacity>
            </View>

            <CustomText size={18} color="#000000">
              {t("Orders")}
            </CustomText>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  marginVertical: 5,
                  padding: 7,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                }}
              >
                <Icon
                  name="bells"
                  type="antdesign"
                  color="#353535"
                  size={RF(16)}
                />
              </View>
              <View
                style={{
                  marginVertical: 5,
                  padding: 7,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginHorizontal: 8,
                }}
              >
                <Icon
                  name="g-translate"
                  type="materialIcons"
                  color="#CA2323"
                  size={RF(16)}
                />
              </View>
            </View>
          </View>

          <View style={styles.tabsWrapper}>
            <FlatList
              data={tabsList}
              contentContainerStyle={styles.tabsContainer}
              renderItem={({ item, index }: any) => {
                return (
                  <TabsOptions
                    id={item.id}
                    label={t(item.label)}
                    icon={item.icon}
                    activeTabId={activeTabId}
                    onSelectTab={setActiveTabId}
                  />
                );
              }}
            />

            <TouchableOpacity onPress={() => setIsShowFilter(true)}>
              <Icon
                name="filter"
                type="antdesign"
                size={RF(16)}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {activeTabId === "1" && (
              <View style={{ marginBottom: RF(120) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: RF(15),
                  }}
                >
                  <Image
                    source={c_log}
                    style={{ width: 24, height: 24 }}
                  ></Image>
                  <View
                    style={{
                      marginHorizontal: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 18,
                        marginTop: 2,
                        marginHorizontal: 2,
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontWeight: "100",
                      }}
                    >
                      {t("Delivery To")}:
                    </Text>

                    <Text
                      style={{
                        color: "#616161",
                        fontSize: 18,
                        marginTop: 2,
                        marginHorizontal: 2,
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontWeight: "100",
                      }}
                    >
                      Behzadi Chowk, Lahore
                    </Text>
                  </View>
                </View>

                <View>
                  <FlatList
                    data={processList}
                    renderItem={({ item, index }: any) => {
                      return (
                        <View>
                          <View style={styles.processWrapper}>
                            <LinearGradient
                              colors={
                                item.complete
                                  ? ["#CA2323", "#9B0328"]
                                  : ["#ffffff", "#ffffff"]
                              }
                              style={[
                                styles.processIcon,
                                {
                                  borderColor:
                                    (item.complete && "#ffffff") ||
                                    (item.active && "#9B0328") ||
                                    (!item.active &&
                                      !item.complete &&
                                      "transparent"),
                                },
                              ]}
                            >
                              <Icon
                                name={
                                  (item.status === "received" && "filetext1") ||
                                  (item.status === "preparing" && "rest") ||
                                  (item.status === "ready" && "inbox") ||
                                  (item.status === "completed" && "export") ||
                                  ""
                                }
                                type="antdesign"
                                iconStyle={{
                                  color:
                                    (item.complete && "#ffffff") ||
                                    (item.active && "#9B0328") ||
                                    (!item.active &&
                                      !item.complete &&
                                      "#b3b3b3"),
                                }}
                              />
                            </LinearGradient>

                            <CustomText color="#000000" size={16}>
                              {t(item.label)}
                            </CustomText>
                          </View>
                          {item.status !== "completed" && (
                            <View
                              style={[
                                styles.dottedBorders,
                                {
                                  borderColor: item.complete
                                    ? "#9B0328"
                                    : "#727070",
                                },
                              ]}
                            />
                          )}
                        </View>
                      );
                    }}
                  />
                </View>

                <View style={styles.orderItemsBox}>
                  <View style={styles.orderMetadata}>
                    <View
                      style={[
                        styles.metaInfo,
                        {
                          width: "48%",
                        },
                      ]}
                    >
                      <CustomText
                        size={12}
                        color="#a9a9a9"
                        style={{ marginBottom: RF(5) }}
                      >
                        {t("Order Number")}
                      </CustomText>
                      <CustomText size={14} color="#000000">
                        #89698752309612
                      </CustomText>
                    </View>

                    <View
                      style={[
                        styles.metaInfo,
                        {
                          width: "48%",
                        },
                      ]}
                    >
                      <CustomText
                        size={12}
                        color="#a9a9a9"
                        style={{ marginBottom: RF(5) }}
                      >
                        {t("Estimated Delivery")}
                      </CustomText>
                      <CustomText size={14} color="#000000">
                        30 {t("mins")}
                      </CustomText>
                    </View>
                  </View>

                  <View>
                    <FlatList
                      data={orderProducts}
                      renderItem={({ item, index }: any) => {
                        return (
                          <ProductListItem
                            item={item}
                            index={index}
                            orderProducts={orderProducts}
                          />
                        );
                      }}
                    />
                  </View>

                  <View
                    style={[
                      styles.productItemWrapper,
                      styles.productTotalWrapper,
                    ]}
                  >
                    <View>
                      <CustomText
                        size={14}
                        color="#000000"
                        style={{ marginBottom: 2 }}
                      >
                        {t("Total Cost")}
                      </CustomText>
                      <CustomText size={13} color="#b3b3b3">
                        {t("Inc. VAT")}
                      </CustomText>
                    </View>
                    <CustomText size={16} color="#972729" bold>
                      1100 {t("SAR")}
                    </CustomText>
                  </View>
                </View>

                {/** Activate with react API **/}
                {/* <EmptyScreen
                  title="No order yet"
                  description="Hit the orange button down below to Create an order"
                  buttonText="Explore Products"
                  onClickBtn={() => navigation.navigate("delivery")}
                  iconUrl={cartIconImg}
                  iconStyle={{
                    width: RF(134),
                    height: RF(128),
                  }}
                /> */}
              </View>
            )}

            {activeTabId === "2" && (
              <View style={{ marginBottom: RF(120) }}>
                {order.length !== 0 ? order?.map((item) => {
                  return (
                    <View style={styles.orderItemsBox}>
                      <View style={styles.orderMetadata}>
                        <CustomText size={12} color="#a9a9a9">
                          {t("Date & Time")}
                        </CustomText>

                        <CustomText size={13} color="#000000">
                          11/12/2023 12:39 Am
                        </CustomText>
                      </View>

                      <View style={styles.orderMetadata}>
                        <View
                          style={[
                            styles.metaInfo,
                            {
                              width: "31%",
                            },
                          ]}
                        >
                          <CustomText
                            size={12}
                            color="#a9a9a9"
                            style={{ marginBottom: RF(5) }}
                          >
                            {t("Method")}
                          </CustomText>
                          <CustomText size={14} color="#000000">
                            {t("Pickup")}
                          </CustomText>
                        </View>

                        <View
                          style={[
                            styles.metaInfo,
                            {
                              width: "31%",
                            },
                          ]}
                        >
                          <CustomText
                            size={12}
                            color="#a9a9a9"
                            style={{ marginBottom: RF(5) }}
                          >
                            {t("Invoice ID")}
                          </CustomText>
                          <CustomText size={14} color="#000000">
                            {item?.id.substr(item?.id.length - 6)}
                          </CustomText>
                        </View>

                        <View
                          style={[
                            styles.metaInfo,
                            {
                              width: "31%",
                            },
                          ]}
                        >
                          <CustomText
                            size={12}
                            color="#a9a9a9"
                            style={{ marginBottom: RF(5) }}
                          >
                            {t("Items")}
                          </CustomText>
                          <CustomText size={14} color="#000000">
                            7
                          </CustomText>
                        </View>
                      </View>

                      <View>
                        <FlatList
                          data={completedOrderProducts}
                          contentContainerStyle={{
                            height: viewAllSecond ? "auto" : RF(200),
                            overflow: "hidden",
                          }}
                          renderItem={({ item, index }: any) => {
                            return (
                              <ProductListItem
                                item={item}
                                index={index}
                                orderProducts={completedOrderProducts}
                              />
                            );
                          }}
                        />
                      </View>

                      <View
                        style={[
                          styles.productItemWrapper,
                          styles.productTotalWrapper,
                        ]}
                      >
                        <View>
                          <CustomText
                            size={14}
                            color="#000000"
                            style={{ marginBottom: 2 }}
                          >
                            {t("Total Cost")}
                          </CustomText>
                          <CustomText size={13} color="#b3b3b3">
                            {t("Inc. VAT")}
                          </CustomText>
                        </View>
                        <CustomText size={16} color="#972729" bold>
                          1100 {t("SAR")}
                        </CustomText>
                      </View>

                      <View style={styles.detailButtonWrapper}>
                        <TouchableOpacity
                          style={[
                            styles.buttonStyle,
                            styles.secondButtons,
                            {
                              width: "100%",
                            },
                          ]}
                          onPress={() => setViewAllSecond(!viewAllSecond)}
                        >
                          <Text style={[styles.buttonText]}>
                            {viewAllSecond ? t("Hide") : t("View Details")}
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.completedLabel}>
                          <Icon
                            name="checkcircleo"
                            type="antdesign"
                            color="#31B64E"
                            size={RF(15)}
                            style={{ marginRight: RF(5) }}
                          />
                          <CustomText color="#31B64E" size={14}>
                            {t("Completed")}
                          </CustomText>
                        </View>
                      </View>
                    </View>)
                }) :
                  <EmptyScreen
                    title="No history yet"
                    description="Hit the orange button down below to Create an order"
                    buttonText="Explore Products"
                    onClickBtn={() => navigation.navigate("delivery")}
                    iconUrl={calendarIconImg}
                    iconStyle={{
                      width: RF(108),
                      height: RF(120),
                    }}
                  />

                }

                {/** Activate with react API **/}

              </View>
            )}
          </ScrollView>
        </View>

        {
          // Filters Modal
          isShowFilter && (
            <Overlay
              isVisible={isShowFilter}
              overlayStyle={styles.overlayContainer}
            >
              <View style={[styles.popupContainerContainer]}>
                <View style={styles.popupHeader}>
                  <CustomText size={24}>{t("Filters")}</CustomText>
                  <Icon
                    onPress={() => setIsShowFilter(false)}
                    name="cross"
                    type="entypo"
                    color="#000"
                  />
                </View>

                <View style={styles.popupText}>
                  <FilterForm
                    onCloseCard={setIsShowFilter}
                    submitValue={onSubmitFilter}
                  />
                </View>
              </View>
            </Overlay>
          )
        }
      </SafeAreaView>
    </Wrapper>
  );
};

export default Orders;
