import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { RF } from "../../exporter";
import { useDispatch, useSelector } from 'react-redux';
import { setCartItems, setRItems } from '../../redux/reducers/userReducer';

interface AddedCartItemProps {
  item: any;
}

const AddedCartItem = ({ item }: AddedCartItemProps) => {
  const navigation = useNavigation();

  const { rItems, cartItems } = useSelector((state: any) => state.root.user);

  const dispatch = useDispatch();

  return (
    <View
      style={{ margin: 10, backgroundColor: "#fff", borderRadius: 10 }}
    >
      <View style={{ flex: 1, padding: 12, flexDirection: "row" }}>
        <View style={{ flex: 0.2 }}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/174479270/photo/fresh-ribeye-steaks-at-the-butcher-shop.jpg?b=1&s=170667a&w=0&k=20&c=-xq-dAqjL5reqUiKQXCbD0xMfKiNw38VLs44KPp9T2k=",
            }}
            style={{ width: RF(55), height: RF(55), borderRadius: 10 }}
          ></Image>
        </View>
        <View
          style={{
            flex: 0.8,
            alignItems: "flex-start",
            marginLeft: 10,
            justifyContent: "center",
          }}
        >
          <Text style={styles.header_yellow}>{item?.title}</Text>
          <View
            style={{
              width: 300,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.header_white}>1 Variant, 2 Modifiers</Text>
            <Icon
              name="chevron-down"
              type="entypo"
              color="#000"
              size={RF(19)}
            />
          </View>
        </View>
      </View>
      <View
        style={{ height: 1, width: "100%", backgroundColor: "#00000010" }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#35353510",
              padding: 8,
              borderRadius: 35,
            }}
          >
            <Icon
              name="minus-a"
              type="fontisto"
              color="#9B0328"
              size={RF(15)}
              onPress={() => {

                dispatch(setCartItems(item?.count === 0 ? cartItems.filter((i: any) => i.id !== item.id) :
                  cartItems.map((i: any) => i.id === item.id ? { ...i, count: i.count - 1 } : i)));
              }}
            />
          </View>
          <Text style={styles.header_white}>{item?.count} </Text>
          <View
            style={{
              backgroundColor: "#35353510",
              marginLeft: 5,
              padding: 8,
              borderRadius: 35,
            }}
          >
            <Icon
              name="plus-a"
              type="fontisto"
              color="#000"
              size={RF(15)}
              onPress={() => dispatch(setCartItems(cartItems.map((i: any) => i.id === item.id ? { ...i, count: i.count + 1 } : i)))}
            />
          </View>
        </View>
        <View>
          <Text style={styles.price_text}>SAR {item?.price * item?.count}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_yellow: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  header_white: {
    color: "#000",
    fontSize: 18,
    marginTop: 2,
    marginHorizontal: 2,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  price_text: {
    color: "#000",
    fontSize: 16,
    marginTop: 2,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
    fontWeight: "800",
  },
});

export default AddedCartItem;
