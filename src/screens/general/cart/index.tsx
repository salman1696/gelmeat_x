import React, { useState } from 'react';
import { StatusBar, Text, View, SafeAreaView, FlatList, Modal, Pressable, Image, Platform } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../../../shared/components/wrapper';
import { GST, RF } from '../../../shared/exporter';
import styles from './styles';
import { useSelector } from 'react-redux';
import CartAddedItem from '../../../shared/components/cartAddedItem';

import { useTranslation } from 'react-i18next';
import SwipeableCartItem from '../../../shared/components/swipeableCartItem';
import { CustomText } from '../../../shared/components';
import { circleCrossImg } from '../../../assets/images';

const Cart = ({ navigation, route }: any) => {

  const login = route.params?.login ?? false

  const { user, cartItems, currentRoute } = useSelector((state: any) => state.root.user);


  const { t, i18n } = useTranslation()

  const [showCartDeleteModal, setShowCartDeleteModal] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#F2F2F2",
          // marginTop: Platform.OS === "ios" ? 0 : 24,
          // marginBottom: !login ? 55 : 0,
        }}
      >
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
              <Text style={styles.header}>{t("Cart :")} </Text>
              <Text style={styles.header1}>
                {(currentRoute === "delivery" && t("Delivery")) ||
                  (currentRoute === "pickup" && t("Pickup")) ||
                  (currentRoute === "catering" && t("Catering"))}{" "}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  marginVertical: 5,
                  padding: 7,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  marginHorizontal: 15,
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              name="swipe"
              type="materialicons"
              color="#000"
              size={RF(14)}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.swipe_text}>
              {t("Swipe on an item to delete or add to favourites")}
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: RF(300),
            }}
            data={cartItems}
            renderItem={({ item, index }) => (
              <SwipeableCartItem
                item={item}
                index={index}
                onRemoveItem={() => setShowCartDeleteModal(true)}
              />
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
                paddingVertical: 20,
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
                paddingVertical: 0,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sub_total}>{t("Delivery")}</Text>
              <Text style={styles.sub_price_text}>{t("SAR")} 0</Text>
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

            <LinearGradient
              start={{ x: 0.0, y: 0.25 }}
              end={{ x: 0.5, y: 1.0 }}
              colors={["#CA2323", "#9B0328"]}
              style={{
                borderRadius: 60,
                alignSelf: "center",
                width: "100%",
                padding: 24,
                marginVertical: 20,
                backgroundColor: "#CA2323",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  login
                    ? navigation.navigate("checkout")
                    : navigation.navigate("loginMain")
                }
              >
                <Text
                  style={{ textAlign: "center", color: "#fff", fontSize: 17 }}
                >
                  {t("Proceed to")} {login || user ? "Checkout" : "Sign-in"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {showCartDeleteModal && (
          <Overlay
            isVisible={showCartDeleteModal}
            overlayStyle={GST.OVERLAYSTYLE}
          >
            <View style={[styles.popupContainerContainer]}>
              <View style={styles.popupHeader}>
                <CustomText size={24}>{t("Remove Item")}</CustomText>
                <Icon
                  onPress={() => setShowCartDeleteModal(false)}
                  name="cross"
                  type="entypo"
                  color="#000"
                />
              </View>

              <View style={styles.popupText}>
                <Image
                  source={circleCrossImg}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: RF(15),
                  }}
                />

                <CustomText
                  size={17}
                  color="#000000"
                  style={{ marginBottom: RF(15), textAlign: "center" }}
                >
                  {t("Are you sure you want to remove this item?")}
                </CustomText>
              </View>

              <View style={styles.footerWrapper}>
                <TouchableOpacity
                  onPress={() => setShowCartDeleteModal(false)}
                  style={[styles.buttonStyle, styles.firstButton]}
                >
                  <Text style={styles.get_started}>{t("Cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.secondButtons]}
                  onPress={() => setShowCartDeleteModal(false)}
                >
                  <Text style={[styles.get_started, { color: "white" }]}>
                    {t("Remove")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Overlay>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Cart;
