import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RF } from "../../exporter";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { setCartItems } from "../../redux/reducers/userReducer";
import { offer1 } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import CustomText from "../customText";

type ItemProps = { item: any; quantity?: boolean };
const CartAddedItem = ({ item, quantity }: ItemProps) => {
  const { t } = useTranslation();
  const { cartItems } = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();

	const [showDetails, setShowDetails] = useState<Boolean>(false);

  return (
    <View style={{ margin: 10, backgroundColor: "#fff", borderRadius: 10 }}>
      <TouchableOpacity
        style={{ flex: 1, padding: 12, flexDirection: "row" }}
        onPress={() => setShowDetails(!showDetails)}
      >
        <View style={{ flex: 0.2 }}>
          <Image
            source={offer1}
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
              width: "100%",
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
              iconStyle={{
                transform: [{ rotate: showDetails ? "180deg" : "0deg" }],
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {/** More Detail Box **/}
      {showDetails && (
        <View style={styles.moreDetailBox}>
          <View>
            <View style={styles.detailHead}>
              <CustomText size={15} color="#000000">
                Variants
              </CustomText>
            </View>
            <View style={styles.detailRow}>
              <CustomText color="#7a7a7b" size={13}>
                Variant 1
              </CustomText>
              <CustomText size={14} color="#9D2731">
                {t("SAR")} 20
              </CustomText>
            </View>
          </View>

          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#cfcfd0",
              marginBottom: RF(10),
              marginTop: RF(4),
            }}
          />

          <View>
            <View style={styles.detailHead}>
              <CustomText size={15} color="#000000">
                Modifiers
              </CustomText>
            </View>
            <View style={styles.detailRow}>
              <CustomText color="#7a7a7b" size={13}>
                Modifier 1
              </CustomText>
              <CustomText size={14} color="#9D2731">
                {t("SAR")} 20
              </CustomText>
            </View>

            <View style={styles.detailRow}>
              <CustomText color="#7a7a7b" size={13}>
                Modifier 2
              </CustomText>
              <CustomText size={14} color="#9D2731">
                {t("SAR")} 20
              </CustomText>
            </View>
          </View>
        </View>
      )}

      <View
        style={{ height: 1, width: "100%", backgroundColor: "#00000010" }}
      />
      {quantity ? (
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
            <Text style={styles.header_white}>{`( ${t("Quantity")} : ${
              item?.count
            } )`}</Text>
          </View>
          <View>
            <Text style={styles.price_text}>
              {t("SAR")} {item?.price * item?.count ?? 0}
            </Text>
          </View>
        </View>
      ) : (
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
                  dispatch(
                    setCartItems(
                      cartItems
                        .filter((i: any) => i.count > 1)
                        .map((i: any) => {
                          if (i.id === item.id) {
                            return { ...i, count: i.count - 1 };
                          }
                          return i;
                        })
                    )
                  );
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
                onPress={() =>
                  dispatch(
                    setCartItems(
                      cartItems.map((i: any) => {
                        if (i.id === item.id) {
                          return { ...i, count: i.count + 1 };
                        }
                        return i;
                      })
                    )
                  )
                }
              />
            </View>
          </View>
          <View>
            <Text style={styles.price_text}>
              {"SAR " + item?.count * item?.price ?? 0}
            </Text>
          </View>
        </View>
      )}
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
    color: "#9D2731",
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
  moreDetailBox: {
    padding: RF(10),
    backgroundColor: "#F4F4F5",
    marginHorizontal: RF(10),
		marginBottom: RF(10),
    borderRadius: RF(8),
  },
  detailHead: {
    width: "100%",
    marginBottom: RF(10),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RF(10),
  },
});

export default CartAddedItem;
