import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ProductBox from "../../../../shared/components/productBox";
import { useSelector } from "react-redux";

import { CustomText } from "../../../../shared/components";
import { RF } from "../../../../shared/exporter";
import { getFav } from "../../../../shared/services/OrderService";
import Toast from "react-native-simple-toast";
import EmptyScreen from "../../../../shared/components/empty";
import { noFavoriteIconImg } from "../../../../assets/images";
import { set } from "react-native-reanimated";

const ProductList = ({ navigation, route }: any) => {
  const { rItems, user } = useSelector((state: any) => state.root.user);
  const { items, label } = route.params.products;

  const valueLabel =
    { Delivery: 'delivery', Catering: 'catering', Pickup: 'pick-up' }
  const [productsListData, setProductsListData] = useState([]);
  const [favItems, setFavItems] = useState(items ?? []);
  const [products, setPro] = useState([]);
  const [isLoggedin, setLoggedin] = useState(user ?? false)
  console.log(favItems, "navigation", valueLabel[label], items);



  // useEffect(() => {
  //   getFav().then((res) => {
  //     console.log(res?.data?.body, "ssdsss");

  //     setFavItems(
  //       res?.data?.body.map((i: any) => {
  //         return { ...i, count: 0 };
  //       })
  //     );
  //     setLoggedin(true)
  //   }).catch((e) => {
  //     setLoggedin(false)
  //     if (e.response.status === 401)
  //       Toast.show("Please login", Toast.SHORT)


  //     console.log(e.response.status, "fetch fav err")
  //   }
  //   );
  // }, []);
  useEffect(() => {

    setFavItems(items.filter((x: any) => x.favorite_type == valueLabel[label]));

  }, [route.params.products]);

  useEffect(() => {
    setProductsListData(rItems);
  }, [rItems]);

  let arrItems = [];

  useEffect(() => {
    productsListData?.map((ls: { sub_cat: any[]; }) =>
      ls.sub_cat?.map((item: { Products: any[]; }) => {
        item.Products?.map((i: { Favorites: string | any[]; }) => {
          i.Favorites.length !== 0 && arrItems.push(i);
        });
      })
    );
    setPro(rItems);
  }, [productsListData]);


  return (
    favItems?.length ? <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: RF(10),
          paddingHorizontal: RF(3),
          // marginVertical: RF(15),
        }}
      >
        <CustomText color="#000000" size={21} bold weight={"600"}>
          {favItems?.length + " Items"}
        </CustomText>
      </View>

      <View style={{ flex: 1, marginTop: RF(5) }}>
        <FlatList
          data={favItems}
          pagingEnabled={true}
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
          keyExtractor={(key: any) => key.index}
          renderItem={({ item, index }: any) => {
            // console.log(item, "loopitem");

            return (
              <ProductBox
                title={item?.title}
                elm={item}
                // onPressClick={onClickProduct}
                url={item?.img_url}
                price={item?.price}
                navigation={navigation}
                all={productsListData}
              />
            );
          }}
        />
      </View>
    </View> :
      <EmptyScreen
        title="No favorites yet"
        description="Hit the orange button down below to Create an order"
        buttonText="Explore Products"
        onClickBtn={() => navigation.navigate("delivery")}
        iconUrl={noFavoriteIconImg}
        iconStyle={{
          width: RF(142),
          height: RF(138)
        }}
      />
  );
};

export default ProductList;
