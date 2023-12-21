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
  Modal,
  ImageBackground,
  Pressable,
} from "react-native";
import { Icon } from "react-native-elements";
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateNode,
} from "react-native-reanimated";
import {
  catering,
  c_log,
  delivery,
  menu,
  offer1,
  offer2,
  offer_detail,
  offer_list,
  pickup,
} from "../../../assets/images";
import CustomText from "../../../shared/components/customText";
import Wrapper from "../../../shared/components/wrapper";
import { RF } from "../../../shared/exporter";
import styles from "./styles";

import { useDrawerProgress } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  setRItems,
  setCurrentRoute,
} from "../../../shared/redux/reducers/userReducer";
import { ScrollView } from "react-native-gesture-handler";
import LanguageContainer from "../../../shared/components/languageContainer";
import { useTranslation } from "react-i18next";
import { getCat } from "../../../shared/services/AuthService";
import DeviceInfo, { getUniqueId, getManufacturer } from 'react-native-device-info';

const Home = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  // const id = DeviceInfo.getUniqueId();

  const [modalVisible, setModalVisible] = useState(false);
  const [langCheck, setLangCheck] = useState(false);
  const { rItems, lang, selectedLocation } = useSelector((state: any) => state.root.user);


  const [productsListData, setProductsListData] = useState();
  useEffect(() => {
    getCat().then((res) => {
      setProductsListData(res.data.body)
    })
  }, [])






  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-1425571e29d72",
      title: "Third Item",
    },
    {
      id: "3ac68afc-c605-482d3-a4f8-f2b2d391aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e229d72",
      title: "Third Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-f2bd91aa297f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-47231f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const Item = ({ onPress }: any) => {
    return (
      <TouchableOpacity
        style={{ borderRadius: 20, marginEnd: 15 }}
        onPress={onPress}
      >
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={offer2} style={{ borderRadius: 10 }}></Image>
          </View>
          {/* <View style={{ alignItems: 'flex-start', marginLeft: 10, justifyContent: 'center' }} >
          <Text style={styles.header_yellow}>Gelameat 2, Behzadi Chowk, Lahore</Text>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={styles.header_white}>Km 5 refinery road oppsite re public road, effurun, delta state</Text>
          </View>
          <Text style={styles.red_text}>+966 12-345-6789</Text>

        </View> */}
        </View>
        <View
          style={{ height: 1, width: "100%", backgroundColor: "#00000010" }}
        />
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, alignItems: 'center', marginVertical: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#35353510', padding: 8, borderRadius: 35 }}>
            <Icon name='minus-a' type='fontisto' color='#9B0328' size={RF(15)} onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.header_white}>{" 1 "} </Text>
          <View style={{ backgroundColor: '#35353510', marginLeft: 5, padding: 8, borderRadius: 35 }}>
            <Icon name='plus-a' type='fontisto' color='#000' size={RF(15)} onPress={() => navigation.goBack()} />
          </View>
        </View>
        <View>
          <Text style={styles.price_text}>SAR 800</Text>
        </View>
      </View> */}
      </TouchableOpacity>
    );
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRItems(productsListData));
  }, []);

  const onClickPickUp = () => {
    dispatch(setCurrentRoute("pickup"));
    navigation.navigate("pickup");
  };

  const onClickCatering = () => {
    dispatch(setCurrentRoute("catering"));
    navigation.navigate("delivery");
  };

  const onClickDelivery = () => {
    dispatch(setCurrentRoute("delivery"));
    navigation.navigate("delivery");
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
            paddingHorizontal: 15,
            backgroundColor: "#F2F2F2",
            height: "100%",
            marginTop: Platform.OS === "ios" ? 0 : 25,
          }}
        >
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View
                style={{
                  width: "100%",
                  height: "70%",
                  borderRadius: 30,
                  paddingHorizontal: 15,
                }}
              >
                <ImageBackground
                  source={offer_detail}
                  resizeMode="stretch"
                  style={styles.modalView}
                >
                  <View
                    style={{
                      width: "100%",
                      alignItems: "flex-end",
                      padding: 10,
                    }}
                  >
                    <Icon
                      name="close"
                      type="ionicon"
                      color="#fff"
                      size={RF(21)}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                  <Text style={styles.pop_up}>Fresh Meat</Text>
                  <Text style={styles.pop_up}>Today's Offer</Text>
                </ImageBackground>
              </View>
            </View>
          </Modal>
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

            <TouchableOpacity
              style={{
                alignItems: "flex-start",
                flex: 1,
                marginHorizontal: 10,
                flexDirection: "row",
              }}
              onPress={() => navigation.navigate("pickAddress")}
            >
              <Image
                source={c_log}
                style={{ width: 24, height: 24, marginHorizontal: 7 }}
              ></Image>

              <CustomText size={11} color="#000000" style={{ flex: 0.9 }}>
                {selectedLocation?.strLoc || t("Riyadh Gallery Mall, Riyadh")}
              </CustomText>
              <Icon
                name="chevron-down"
                type="entypo"
                color="#000"
                size={RF(19)}
              />
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("notification")}
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
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setLangCheck(true)}
                style={{
                  marginVertical: 5,
                  padding: 7,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginLeft: 10,
                }}
              >
                <Icon
                  name="g-translate"
                  type="materialIcons"
                  color="#CA2323"
                  size={RF(16)}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

              <TouchableOpacity onPress={() => navigation.toggleDrawer()
              }><Image source={menu} style={{ width: 20, height: 20, }} ></Image>
              </TouchableOpacity>
              <Image source={c_log} style={{ width: 24, height: 24, marginLeft: 15 }} ></Image>
              <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row' }}
                onPress={() => navigation.navigate('pickAddress')
                }>
                <Text style={{
                  color: '#000',
                  fontSize: 18,
                  marginTop: 2,
                  marginHorizontal: 2,
                  textAlign: 'center',
                  fontFamily: 'Outfit',
                  fontWeight: '100'
                }}>Riyadh Gallery Mall, Riyadh</Text>
                <Icon name='chevron-down' type='entypo' color='#000' size={RF(19)} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => navigation.navigate('notification')} style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8 }}>
                <Icon name='bells' type='antdesign' color='#353535' size={RF(16)} />
              </TouchableOpacity>
              <View style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 8 }}>
                <Icon name='g-translate' type='materialIcons' color='#CA2323' size={RF(16)} />
              </View>
            </View>
          </View> */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ height: "100%" }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => onClickPickUp()}
                  style={{
                    width: "48%",
                    backgroundColor: "#fff",
                    alignItems: "flex-start",
                    padding: 20,
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={pickup}
                    style={{ width: 70, height: 50 }}
                  ></Image>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 25,
                      marginVertical: 6,
                      textAlign: "center",
                      fontFamily: "Outfit",
                      fontWeight: "700",
                    }}
                  >
                    {t("Pick-Up")}
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 13,
                      textAlign: "left",
                      fontFamily: "Outfit",
                      fontWeight: "500",
                      paddingEnd: 40,
                    }}
                  >
                    {t("Get your food on the go")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onClickCatering()}
                  style={{
                    width: "48%",
                    backgroundColor: "#fff",
                    alignItems: "flex-start",
                    padding: 20,
                    borderRadius: 25,
                  }}
                >
                  <Image
                    source={catering}
                    style={{ width: 50, height: 50 }}
                  ></Image>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 25,
                      marginVertical: 6,
                      textAlign: "center",
                      fontFamily: "Outfit",
                      fontWeight: "700",
                    }}
                  >
                    {t("Catering")}
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 13,
                      textAlign: "left",
                      fontFamily: "Outfit",
                      fontWeight: "500",
                      paddingEnd: 10,
                    }}
                  >
                    {t("Savor the Moment, Let Us Cater to You!")}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: "#fff",
                  alignItems: "flex-start",
                  padding: 20,
                  marginTop: 20,
                  borderRadius: 25,
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    paddingEnd: 50,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 32,
                      marginVertical: 6,
                      textAlign: "center",
                      fontFamily: "Outfit",
                      fontWeight: "700",
                    }}
                  >
                    {t("Delivery")}
                  </Text>
                  <Text
                    style={{
                      width: RF(110),
                      color: "#000",
                      fontSize: 17,
                      textAlign: "left",
                      fontFamily: "Outfit",
                      fontWeight: "200",
                    }}
                  >
                    {t("We deliver with-in 25 mins")}
                  </Text>

                  <TouchableOpacity
                    onPress={() => onClickDelivery()}
                    style={{
                      backgroundColor: "#9D2731",
                      marginTop: 10,
                      padding: 12,
                      paddingHorizontal: 20,
                      borderRadius: 30,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        marginVertical: 6,
                        textAlign: "center",
                        fontFamily: "Outfit",
                        fontWeight: "400",
                      }}
                    >
                      {t("Get Started")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center", justifyContent: "center" }}>
                  <Image
                    source={delivery}
                    style={{ width: 150, height: 150 }}
                    resizeMode={"contain"}
                  ></Image>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.branch_heading}>{t(`Todays Offers`)}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("offer")}>
                  <Text style={styles.see_text}>{t("see more")}</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={DATA}
                horizontal
                renderItem={({ item, index }) => (
                  <Item
                    key={index}
                    title={item?.title}
                    onPress={() => setModalVisible(true)}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
        </View>

        {langCheck && <LanguageContainer onClose={setLangCheck} bottom={95} />}
      </SafeAreaView>
    </Wrapper>
  );
};

export default Home;
