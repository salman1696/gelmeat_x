import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomText } from "../../../shared/components";
import CustomAppBar from "../../../shared/components/customAppBar";
import CustomImageTab from "../../../shared/components/customImageTab";
import CustomSimpleTab from "../../../shared/components/customSimpleTab";
import { RF } from "../../../shared/exporter";
import ProductBox from "../../../shared/components/productBox";
import { useDispatch, useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar } from "./productTab";
import ProductList from "./productList";
import SubCartList from "./subCatList";
import { useTranslation } from "react-i18next";
import { getCat } from "../../../shared/services/AuthService";
import { setRItems } from "../../../shared/redux/reducers/userReducer";
import { height } from "@mui/system";
import { ProgressBar } from "react-native-paper";
import { useScrollToTop } from '@react-navigation/native';

const listData = [
  {
    id: 1,
    title: "Beef",
    sub_cat: [
      {
        id: 1,
        title: "S2",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
      {
        id: 2,
        title: "S3",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
      {
        id: 3,
        title: "SX",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Mutton",
    sub_cat: [
      {
        id: 1,
        title: "S2",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
      {
        id: 2,
        title: "S3",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
      {
        id: 3,
        title: "SX",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Chicken",
    sub_cat: [
      {
        id: 1,
        title: "S2",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
      {
        id: 2,
        title: "S3",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
      {
        id: 3,
        title: "SX",
        products: [
          {
            id: 1,
            title: "Beaf",
            selected: true,
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 2,
            title: "Meat",
            selected: false,

            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 3,
            selected: false,
            title: "Chicken",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 4,
            selected: false,
            title: "Mutton",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 5,
            selected: false,
            title: "Legs",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
          {
            id: 6,
            selected: false,
            title: "Wings",
            url: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
          },
        ],
      },
    ],
  },
];


const Delivery = ({ navigation }: any) => {
  const { rItems, cartItems, currentRoute, selectedLocation } = useSelector((state: any) => state.root.user);
  const [productsListData, setProductsListData] = useState([]);

  const [selectedMainTab, setSelectedMainTab] = useState(1);
  const [selectedSimpleTab, setSelectedSimpleTab] = useState("");
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const ref = React.useRef(null);

  useScrollToTop(ref);


  const dispatch = useDispatch();

  // const flatListRef = useRef(null)
  let index = 0;
  // const totalIndex = productsListData.length - 1;

  // useEffect(() => {
  //   setInterval(() => {
  //     index++;
  //     if (index < totalIndex) {
  //       flatListRef.current.scrollToIndex({ animated: true, index: index })
  //     } else {
  //       flatListRef.current.scrollToIndex({ animated: true, index: 0 })
  //     }
  //   }, 1000)
  // }, []);



  useEffect(() => {
    getCat().then((res) => {
      setProductsListData(res.data.body)
      let counted = res.data.body.map((cat: { sub_cat: any[]; }) => {
        return {
          ...cat,
          sub_cat: cat.sub_cat?.map((sub: { Products: any[]; }) => {
            return {
              ...sub,
              Products: sub.Products?.map((pro: any) => {
                return { ...pro, count: 0 };
              })
            };
          })
        };
      });
      counted = counted.map((cat: any, index: number) => {
        if (index === 0) {
          return { ...cat, selected: true };
        } else {
          return { ...cat, selected: false };
        }
      });
      // const arr = counted.shift()


      setProductsListData(counted);


      // localStorage.setItem("products", JSON.stringify(counted));
      counted && dispatch(setRItems(counted));

    })
  }, [])

  console.log(productsListData, 'productsListData');


  const Tab = createMaterialTopTabNavigator();

  return (
    <View
      style={[
        {
          flex: 1,
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <CustomAppBar
          title={
            (currentRoute === "delivery" && t("Delivery")) ||
            (currentRoute === "pickup" && t("Pickup")) ||
            (currentRoute === "catering" && t("Catering"))
          }
          location={
            (currentRoute === "delivery" &&
              (selectedLocation?.strLoc ?? t("Riyadh Gallery Mall, Riyadh")))
            ||
            (currentRoute === "pickup" && t("Select Branch")) ||
            (currentRoute === "catering" && (selectedLocation?.strLoc ?? t("Riyadh Gallery Mall, Riyadh")))
          }
          navigation={navigation}
          onPressback={() => navigation.goBack()}
        />
        <View
          style={{
            flex: 1,

            paddingHorizontal: RF(15),
          }}
        >
          <View
            style={{
              flex: 1,
              paddingBottom: RF(15),
            }}
          >

            {productsListData?.length !== 0 ? <Tab.Navigator
              tabBar={(props: any) => <TabBar {...props} />}
              initialRouteName={"AllDates"}

              screenOptions={{
                tabBarScrollEnabled: true, tabBarIndicatorStyle: {
                  backgroundColor: "blue",
                  height: 8,

                }
              }}
            >

              {productsListData?.map((elm: { title: any; sub_cat: any; }, index) => {
                return (
                  index !== 0 && <Tab.Screen
                    name={elm.title}
                    initialParams={{ sub_cat: elm.sub_cat }}
                    options={{
                      tabBarLabel: elm.title,
                    }}
                  >
                    {(props: any) => (
                      <SubCartList
                        {...props}
                        navigation={navigation}
                        data={elm?.sub_cat}
                      />
                    )}
                  </Tab.Screen>
                );
              })}
              {/* {productsListData?.map((elm: { title: any; sub_cat: any; }, index) => {
                return (
                  index !== 0 && <Tab.Screen
                    name={elm.title}
                    initialParams={{ sub_cat: elm.sub_cat }}
                    options={{
                      tabBarLabel: elm.title,
                    }}
                  >
                    {(props: any) => (
                      <SubCartList
                        {...props}
                        navigation={navigation}
                        data={elm?.sub_cat}
                      />
                    )}
                  </Tab.Screen>
                );
              })} */}
            </Tab.Navigator> : <ActivityIndicator size={'large'} color={'#9B0328'} style={{ height: '90%' }} />}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Delivery;
