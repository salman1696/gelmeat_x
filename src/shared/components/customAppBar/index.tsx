import React, { useCallback, useState } from "react";
import {
  AppBar,
  IconButton,
} from "@react-native-material/core";
import { Icon, Badge } from "react-native-elements";
import { StyleSheet, View, Image, Alert } from "react-native";
import { RF } from "../../exporter";
import CustomText from "../customText";
import { SearchBar } from "@rneui/themed";
import { cart_b } from "../../../assets/images";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const customAppBar = ({ title, location, onPressback, navigation }: any) => {
  const { t, i18n } = useTranslation();

  const [search, setSearch] = useState("");
  const { rItems, cartItems } = useSelector((state: any) => state.root.user);


  const updateSearch = useCallback((value) => {
    setSearch(value);
  }, []);
  return (
    <View
      style={{
        paddingBottom: RF(15),
        paddingHorizontal: RF(15),
      }}
    >
      <AppBar
        style={styles.headWrapper}
        title={<CustomText style={[styles.heading, { textAlign: i18n.language === 'en' ? 'left' : 'right' }]}>{title}</CustomText>}
        subtitle={<CustomText style={[styles.subHeading, { textAlign: i18n.language === 'en' ? 'left' : 'right' }]}>{location}</CustomText>}
        leading={(props: any) => (
          <View
            style={{
              transform: [
                { rotateY: i18n.language === "ar" ? "180deg" : "0deg" },
              ],
            }}
          >
            <Icon
              onPress={onPressback}
              name="chevron-back"
              type="ionicon"
              color="#000"
              size={RF(21)}
            />
          </View>
        )}
        trailing={(props: any) => (
          <View style={{ backgroundColor: "#fff", borderRadius: RF(4) }}>
            <IconButton
              onPress={() => navigation.navigate("cart", { login: false })}
              style={styles.cartStyle}
              icon={() => (
                <Image
                  source={cart_b}
                  resizeMode={"cover"}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: "#9D2731",
                  }}
                />
              )}
              {...props}
            />

            {cartItems?.length !== 0 && (
              <Badge
                badgeStyle={styles.badgeStyling}
                value={cartItems?.length}
                containerStyle={{ position: "absolute", top: -4, right: -4 }}
              />
            )}
          </View>
        )}
      />
      <View>
        <SearchBar
          platform="android"
          containerStyle={styles.searchBarInput}
          leftIconContainerStyle={{ paddingLeft: RF(5) }}
          placeholder={t("Search")}
          placeholderTextColor="#888"
          value={search}
          style={{ textAlign: i18n.language !== 'ar' ? 'left' : 'right' }}
          onChange={updateSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headWrapper: {
    backgroundColor: 'transparent',
    marginTop: RF(15),
    marginBottom: RF(10)
  },
  heading: {

    fontSize: RF(20),
    fontWeight: "500",
    color: "#9D2731",
  },
  subHeading: {
    color: '#000000',
    fontWeight: '500',
    fontSize: RF(14)
  },
  searchBarInput: {
    borderRadius: RF(25),
  },
  cartStyle: {
    borderRadius: RF(4),
    margin: -6
  },
  cartIcon: {
    color: '#9D2731',
    fontSize: RF(20)
  },
  badgeStyling: {
    backgroundColor: '#CA2323'

  }
});

export default customAppBar;
