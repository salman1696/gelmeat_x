import React, { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { CustomText } from "../../../shared/components";
import { RF } from "../../../shared/exporter";
import { useTranslation } from "react-i18next";

const NotificationSettings = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t, i18n } = useTranslation();
  const { lang } = useSelector((state: any) => state.root.user);

  const [isGeneralNotifi, setIsGeneralNotifi] = useState(false);
  const [isSound, setIsSound] = useState(false);

  const [isAppUpdate, setIsAppUpdate] = useState(false);
  const [isBillReminder, setIsBillReminder] = useState(false);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isPaymentRequest, setIsPaymentRequest] = useState(false);

  const [isNewService, setIsNewService] = useState(false);
  const [isNewTip, setIsNewTip] = useState(false);

  return (
    <View
      style={[
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          height: "100%",
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.pageWrapper}>
          {/** Header **/}
          <View style={styles.pageHeader}>
            <TouchableOpacity
              style={[
                styles.backIconWrapper,
                {
                  transform: [
                    { rotateY: i18n.language === "ar" ? "180deg" : "0deg" },
                  ],
                },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Icon
                name="left"
                type="antdesign"
                size={RF(20)}
                iconStyle={styles.backIcon}
              />
            </TouchableOpacity>
            <CustomText size={17} style={{ textAlign: "center" }}>
              {t("Notification Settings")}
            </CustomText>
          </View>

          <View style={{ marginBottom: RF(15) }}>
            <CustomText
              size={14}
              color="#939395"
              style={{ marginBottom: RF(12) }}
            >
              {t("Common")}
            </CustomText>
            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("General Notification")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isGeneralNotifi ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsGeneralNotifi((previousState) => !previousState)
                }
                value={isGeneralNotifi}
              />
            </View>

            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("Sound")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isSound ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsSound((previousState) => !previousState)
                }
                value={isSound}
              />
            </View>
          </View>

          <View style={{ marginBottom: RF(15) }}>
            <CustomText
              size={14}
              color="#939395"
              style={{ marginBottom: RF(12) }}
            >
              {t("System & services update")}
            </CustomText>
            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("App Update")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isAppUpdate ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsAppUpdate((previousState) => !previousState)
                }
                value={isAppUpdate}
              />
            </View>

            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("Bill Reminder")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isBillReminder ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsBillReminder((previousState) => !previousState)
                }
                value={isBillReminder}
              />
            </View>

            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("Promotion")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isPromotion ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsPromotion((previousState) => !previousState)
                }
                value={isPromotion}
              />
            </View>

            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("Discount Available")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isDiscount ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsDiscount((previousState) => !previousState)
                }
                value={isDiscount}
              />
            </View>

            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("Payment Request")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isPaymentRequest ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsPaymentRequest((previousState) => !previousState)
                }
                value={isPaymentRequest}
              />
            </View>
          </View>

          <View style={{ marginBottom: RF(15) }}>
            <CustomText
              size={14}
              color="#939395"
              style={{ marginBottom: RF(12) }}
            >
              {t("Others")}
            </CustomText>
            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("New Service Available")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isNewService ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsNewService((previousState) => !previousState)
                }
                value={isNewService}
              />
            </View>

            <View style={styles.switchBoxWrapper}>
              <CustomText size={15} color="#000000">
                {t("New Tips Available")}
              </CustomText>

              <Switch
                trackColor={{ false: "#D9D9D9", true: "#9B0328" }}
                thumbColor="#ffffff"
                ios_backgroundColor={isNewTip ? "#9B0328" : "#D9D9D9"}
                onValueChange={() =>
                  setIsNewTip((previousState) => !previousState)
                }
                value={isNewTip}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: RF(25),
  },
  backIconWrapper: {
    position: "absolute",
    left: RF(0),
    top: RF(0),
  },
  backIcon: {
    color: "#000000",
  },
  switchBoxWrapper: {
    paddingHorizontal: RF(24),
    paddingVertical: RF(16),
    borderRadius: RF(17),
    backgroundColor: "#ffffff",
    marginBottom: RF(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default NotificationSettings;
