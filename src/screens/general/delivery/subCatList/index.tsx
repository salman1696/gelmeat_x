import React, { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProductBox from "../../../../shared/components/productBox";
import { useSelector } from "react-redux";
import CustomSimpleTab from "../../../../shared/components/customSimpleTab";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CustomText } from "../../../../shared/components";
import { RF } from "../../../../shared/exporter";
import { TabBar } from "../productTab";
import ProductList from "../productList";
import { SubCatTabBar } from "../subCatTab";

const SubCartList = ({ route }: any) => {
  const subCat = route.params.sub_cat;

  const { rItems, cartItems } = useSelector((state: any) => state.root.user);
  const [productsListData, setProductsListData] = useState(rItems ?? []);

  const [selectedMainTab, setSelectedMainTab] = useState(1);
  const [selectedSimpleTab, setSelectedSimpleTab] = useState("");
  const insets = useSafeAreaInsets();

  const Tab = createMaterialTopTabNavigator();






  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props: any) => <SubCatTabBar {...props} />}

      >
        {subCat?.map((elm: any) => {

          return (
            <Tab.Screen
              name={elm.title}
              // component={ProductList}

              initialParams={{ products: elm?.Products }}
              options={{
                tabBarLabel: elm.title,
              }}
            >
              {(props: any) => <ProductList {...props} />}
            </Tab.Screen>
          );
        })}
      </Tab.Navigator>
    </View>
  );
};

export default SubCartList;
