import React, { useState } from 'react';
import { StatusBar, Alert, ImageBackground, Text, View, SafeAreaView, FlatList, Modal, Pressable, Image } from 'react-native';
import { Icon, Overlay } from "react-native-elements";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { offer1, offer_detail } from '../../../assets/images';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import { RF } from '../../../shared/exporter';
import styles from './styles';
import PromoCodeForm from './promoCode';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../../shared/utils/i18';
import CartAddedItem from '../../../shared/components/cartAddedItem';
import { placeOrder } from '../../../shared/services/OrderService';
import Toast from 'react-native-simple-toast'

const Checkout = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { user, rItems, cartItems } = useSelector((state: any) => state.root.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [isShowPromoCode, setIsShowPromoCode] = useState(false);
  const [promoValue, setPromoValue] = useState({ promocode: null });



  console.log(user, "user====>")

  const PlaceOrder = () => {

    let params =

    {
      table_id: null,
      type: "applepay",
      discount: 12,
      sub_total: cartItems?.length !== 0
        ? cartItems?.reduce(
          (a: any, b: any) => a + b.price * b.count,
          0
        )
        : 0,
      products: cartItems,
      payment_status: 'pending',
      payment_method: 'Apple Pay',
      card_id: "132",
      coupon_id: promoValue,
    }
    console.log(params, 'placeorder');


    placeOrder(params)
      .then((res) => {
        Toast.show('Order placed successfully', Toast.SHORT);
        navigation.navigate("payment")
      })
      .catch((err) => Toast.show(err.response.data.message, Toast.SHORT))

  };

  return (
    <Wrapper>
      <SafeAreaView style={{ backgroundColor: "#F2F2F2", marginTop: 15, flex: 1, marginBottom: RF(80) }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#F2F2F2"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View style={{ backgroundColor: "#F2F2F2", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 8,
              }}
            >
              <Icon
                name={
                  i18n.language !== "ar" ? "chevron-back" : "chevron-forward"
                }
                type="ionicon"
                color="#000"
                size={RF(21)}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.header}>{t("Checkout")} </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <View style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 15 }}>
                <Icon name='g-translate' type='materialIcons' color='#CA2323' size={RF(16)} />
              </View> */}
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              name="swipe"
              type="materialicons"
              color="#000"
              size={RF(14)}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.swipe_text}>
              {t("swipe on an item to delete or add to favourites")}
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: RF(300),
            }}
            data={cartItems}
            renderItem={({ item }) => (
              <CartAddedItem item={item} quantity={true} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.centeredView}>
          <View
            style={{
              width: "90%",
              height: "100%",
              borderRadius: 30,
            }}
          >
            <View
              style={{
                paddingTop: RF(20),
                paddingBottom: RF(10),
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("Sub Total")} </Text>
              <Text style={styles.sub_price_text}>
                {t("SAR")}{" "}
                {cartItems?.length !== 0
                  ? cartItems?.reduce(
                    (a: any, b: any) => a + b.price * b.count,
                    0
                  )
                  : 0}
              </Text>
            </View>

            <View
              style={{
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("VAT")}</Text>
              <Text style={styles.sub_price_text}>{t("SAR")} 0</Text>
            </View>

            <View
              style={{
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("Delivery")}</Text>
              <Text style={styles.sub_price_text}>{t("SAR")} 0</Text>
            </View>

            <View
              style={{
                paddingBottom: 15,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("Discount")}</Text>
              <Text style={styles.sub_price_text}>{t("SAR")} 0.0</Text>
            </View>

            <View
              style={{
                paddingVertical: 0,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("Promos")}</Text>
              <View>
                {promoValue?.promocode && (
                  <Text style={[styles.sub_price_text]}>
                    <Text style={[{ color: "#9D2731" }]}>(MGT Staff 15%)</Text>{" "}
                    {t("SAR")} 0.0
                  </Text>
                )}

                <TouchableOpacity onPress={() => setIsShowPromoCode(true)}>
                  <Text
                    style={[
                      styles.sub_price_text,
                      { color: "#9D2731", textAlign: "right" },
                    ]}
                  >
                    {promoValue?.promocode ? t("Change") : t("Apply Promo")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: 1,
                width: "100%",
                marginVertical: 15,
                backgroundColor: "#00000030",
              }}
            />
            <View
              style={{
                paddingVertical: 0,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("Total")}</Text>
              <Text style={styles.toatl_price_text}>
                {t("SAR")}{" "}
                {cartItems?.length !== 0
                  ? cartItems?.reduce(
                    (a: any, b: any) => a + b.price * b.count,
                    0
                  )
                  : 0}
              </Text>
            </View>

            <TouchableOpacity onPress={() => {
              PlaceOrder()
              // navigation.navigate("payment")
            }}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                colors={["#CA2323", "#9B0328"]}
                style={{
                  borderRadius: 60,
                  alignSelf: "center",
                  width: "100%",
                  padding: 24,
                  marginVertical: 10,
                  backgroundColor: "#CA2323",
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "#fff", fontSize: 17 }}
                >
                  {t("Proceed to Payment")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {
          // Add Promo Code
          isShowPromoCode && (
            <Overlay
              isVisible={isShowPromoCode}
              overlayStyle={styles.overlayContainer}
            >
              <View style={[styles.popupContainerContainer]}>
                <View style={styles.popupHeader}>
                  <CustomText size={24}>{t("Promo")}</CustomText>
                  <Icon
                    onPress={() => setIsShowPromoCode(false)}
                    name="cross"
                    type="entypo"
                    color="#000"
                  />
                </View>

                <View style={styles.popupText}>
                  <PromoCodeForm
                    onCloseCard={setIsShowPromoCode}
                    submitValue={setPromoValue}
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

export default Checkout;
