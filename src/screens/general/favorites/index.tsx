import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CustomText } from "../../../shared/components";
import { RF } from "../../../shared/exporter";
import ProductList from "./productList";
import { SubCatTabBar } from "./subCatTab";
import { Icon } from "react-native-elements";
import { menu, noFavoriteIconImg } from "../../../assets/images";
import Wrapper from "../../../shared/components/wrapper";
import EmptyScreen from "../../../shared/components/empty";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import i18n from "../../../shared/utils/i18";
import { getFav } from "../../../shared/services/OrderService";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";

const subCat = [
  {
    id: 1,
    title: "Delivery",

  },
  {
    id: 2,
    title: "Catering",

  },
  {
    id: 3,
    title: "Pickup",

  },
];

const Favorites = ({ navigation }: any) => {
  const Tab = createMaterialTopTabNavigator();
  const { t } = useTranslation();
  // const navigation = useNavigation()

  const { rItems, user } = useSelector((state: any) => state.root.user);
  const [favItems, setFavItems] = useState([]);
  const [products, setPro] = useState([]);
  const [isLoggedin, setLoggedin] = useState(user ?? false)

  useEffect(() => {
    getFav().then((res) => {
      console.log(res?.data?.body, "ssdsss");

      setFavItems(
        res?.data?.body.map((i: any) => {
          return { ...i, count: 0 };
        })
      );
      setLoggedin(true)

    }).catch((e) => {
      setLoggedin(false)
      if (e.response.status === 401)
        Toast.show("Please login", Toast.SHORT)


      console.log(e.response.status, "fetch fav err")
    }
    );
  }, []);

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
            marginTop: Platform.OS === "ios" ? 0 : 25,
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
              {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image source={menu} style={{ width: 20, height: 20 }}></Image>
              </TouchableOpacity> */}
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

            <CustomText size={18} color="#000000">
              {t("Favorites")}
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

          <View style={{ flex: 1 }}>
            <Tab.Navigator
              tabBar={(props: any) => <SubCatTabBar {...props} />}
              initialRouteName={"AllDates"}
            >
              {subCat?.map((elm: any) => {
                return (
                  <Tab.Screen
                    name={elm.title}
                    component={ProductList}
                    initialParams={{
                      products:
                        { items: favItems, label: elm.title }
                    }}
                    options={{
                      tabBarLabel: elm.title,
                    }}
                  />
                );
              })}
            </Tab.Navigator>
          </View>
        </View>

        {/* <EmptyScreen
          title="No favorites yet"
          description="Hit the orange button down below to Create an order"
          buttonText="Explore Products"
          onClickBtn={() => navigation.navigate("delivery")}
          iconUrl={noFavoriteIconImg}
          iconStyle={{
            width: RF(142),
            height: RF(138)
          }}
        /> */}
      </SafeAreaView>
    </Wrapper>
  );
};

export default Favorites;
