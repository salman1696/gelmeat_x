import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RF } from "../../exporter";
import CustomText from "../customText";
import { Icon } from "react-native-elements";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getFav, markFav, removeFav } from "../../services/OrderService";

interface ProductBoxProps {
  url: string;
  title: string;
  price: number;
  navigation: any;
  elm: any;
  all: any;
}

const ProductBox = ({
  url,
  elm,
  title,
  price,
  navigation,
  all,
}: ProductBoxProps) => {
  const { t } = useTranslation();
  const [isLike, setIsLike] = useState(false);
  const lastItem = all?.length % 2

  const { rItems, cartItems, currentRoute } = useSelector((state: any) => state.root.user);

  const [item, setItem] = useState(elm ?? {});
  const [favItems, setFavItems] = useState([]);
  const [imageLoaded, setImgeLaoded] = useState(false);

  // const { user } = useSelector((state) => state.root.user);
  // const { user } = useSelector((state) => state.root.user);
  const [products, setPro] = useState([]);

  console.log(elm?.favorite_type === currentRoute, "currentRoute", currentRoute, elm?.favorite_type, "elm?.favorite_type === currentRoute", elm?.Favorites?.length !== 0 && elm?.favorite_type === currentRoute);

  const [fav, setFav] = useState(elm?.Favorites?.length !== 0 && elm?.favorite_type === currentRoute);
  const [listProduct, setListProduct] = useState(rItems);


  const handleFav = (item: { id: any; }) => {
    if (fav) {
      fav && deleteFav(item);
      return;
    }
    let params = {
      product_id: item.id,
      type: currentRoute
    };
    markFav(params).then((res: { data: any; }) => {
      let addedFav = res.data;
      let arrFav = [];
      arrFav.push({ addedFav });
      setFav(true);

      setListProduct(
        listProduct.map((ls: { sub_cat: any[]; }) => {
          return {
            ...ls,
            sub_cat: ls.sub_cat?.map((i: { Products: any[]; }) => {
              return {
                ...i,
                Products: i.Products?.map((it: { id: any; }) => {
                  if (it.id === item?.id) {
                    return {
                      ...it,
                      Favorites: [addedFav.body]
                    };
                  } else {
                    return it;
                  }
                })
              };
            })
          };
        })
      );
    });
  };

  const deleteFav = (item: { id: any; Favorites?: any; }) => {
    let params = {
      id: item.Favorites[0].id
    };

    removeFav(params).then((res: any) => { });
    setFav(false);
    setListProduct(
      listProduct.map((ls: { sub_cat: any[]; }) => {
        return {
          ...ls,
          sub_cat: ls.sub_cat?.map((i: { Products: any[]; }) => {
            return {
              ...i,
              Products: i.Products?.map((it: { id: any; }) => {
                if (it.id === item?.id) {
                  return {
                    ...it,
                    Favorites: []
                  };
                } else {
                  return it;
                }
              })
            };
          })
        };
      })
    );
  };



  return (
    <TouchableOpacity style={{
      // flex: 1,
      alignSelf: 'center',
      backgroundColor: "#fff",
      borderRadius: RF(20),
      marginBottom: RF(25),
      marginTop: RF(40),
      marginHorizontal: 10,
      // marginRight: RF(1),
      // flex: 0.5,
      elevation: 20,
      shadowColor: "#393939",
      // backgroundColor: "#444",
    }} onPress={() => navigation.navigate("viewItemsDetail", { elm: elm })} >
      <View style={{
        width: RF(145),
        height: RF(119),
      }}>
        {!imageLoaded && <ActivityIndicator style={[styles.productImage]} />}
        <Image
          source={{
            uri: url,
          }}
          style={[styles.productImage]}
          onLoad={() => setImgeLaoded(true)}
        />

      </View>
      <View
        style={{
          position: "absolute",
          top: RF(-35),
          right: RF(20),
          borderWidth: RF(1),
          borderColor: "#CA2323",
          borderRadius: RF(17),
        }}
      >
        <Icon
          name={fav ? "heart" : "hearto"}
          type="antdesign"
          color="#f50"
          size={RF(12)}
          onPress={() => handleFav(item)}
          iconStyle={{
            backgroundColor: "#ffffffb8",
            width: RF(33),
            padding: RF(10),
            borderRadius: RF(17),
          }}
        />
      </View>

      <CustomText
        onPress={() =>
          navigation.navigate("viewItemsDetail", { name: "Jane" })
        }
        size={RF(12)}
        color="#000000"
        light
        style={{
          textAlign: "center",
          marginBottom: RF(15),
          marginTop: RF(15),
        }}
      >
        {title}
        {"\n"}
        (1 kg)
      </CustomText>
      <CustomText
        onPress={() =>
          navigation.navigate("viewItemsDetail", { name: "Jane" })
        }
        size={RF(12)}
        color="#972729"
        bold
        style={{ textAlign: "center", marginBottom: RF(15) }}
      >
        {price + ` ${t("SAR")}`}
      </CustomText>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  productBoxStyle: {
    alignSelf: 'center',
    backgroundColor: "#777",
    borderRadius: RF(20),
    marginBottom: RF(25),
    marginTop: RF(40),
    // marginRight: RF(1),
    elevation: 20,
    shadowColor: "#393939",
  },
  productImage: {
    width: RF(145),
    height: RF(119),
    borderRadius: RF(20),
    marginTop: RF(-40),
    marginLeft: "auto",
    marginRight: "auto",
  },
  productHeart: {
    backgroundColor: "#393939",
  },
});

export default ProductBox;


