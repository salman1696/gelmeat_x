import React from "react";
import {
  TextInput,
  Text,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { RF } from "../../../shared/exporter";
import { useTranslation } from "react-i18next";
import { verifyPromo } from "../../../shared/services/OrderService";
import { useSelector } from "react-redux";
import Toast from 'react-native-simple-toast'

interface AddNewCardProps {
  onCloseCard: Function;
  submitValue: any;
}

const PromoCodeForm = ({ onCloseCard, submitValue }: AddNewCardProps) => {
  const { t } = useTranslation();
  const { user, rItems, cartItems } = useSelector((state: any) => state.root.user);


  const redeemCoupon = (value: any) => {
    const params = {
      coupon_code: value,
      consumer_id: user?.id
    }
    verifyPromo(value).then((res) => {
      Toast.show('Promo applied successfully', Toast.SHORT);
      submitValue(res.data.body)
    })
      .catch((err) => Toast.show(err.response.data.message, Toast.SHORT))
  }

  return (
    <Formik
      initialValues={{
        promocode: "",
      }}
      onSubmit={(values) => {
        // submitValue(values);
        onCloseCard();
        redeemCoupon(values)
        // Alert.alert(JSON.stringify(values))
      }}
      validationSchema={yup.object().shape({
        promocode: yup.string().required(`${t("Please, provide promo code!")}`),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.promocode}
              placeholderTextColor={'#888'}

              style={styles.inputStyle}
              onChangeText={handleChange("promocode")}
              onBlur={() => setFieldTouched("promocode")}
              placeholder={`${t("Enter Promo Code")}`}
            />

            {touched.promocode && errors.promocode && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.promocode}
              </Text>
            )}
          </View>

          <View
            style={[
              styles.footerWrapper,
              {
                marginLeft: RF(-20),
                marginRight: RF(-20),
                marginBottom: RF(-20),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => onCloseCard(false)}
              style={[styles.buttonStyle, styles.firstButton]}
            >
              <Text style={styles.get_started}>{t("Cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.secondButtons]}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={[styles.get_started, { color: "white" }]}>
                {t("Apply")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    // padding: 50,
  },
  inputStyle: {
    borderWidth: 0,
    padding: RF(15),
    paddingLeft: RF(25),
    paddingRight: RF(25),
    marginBottom: RF(5),
    borderRadius: RF(50),
    backgroundColor: "#ffffff",
    fontSize: RF(15),
  },
  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
  },
  buttonStyle: {
    justifyContent: "center",
    height: RF(55),
    alignSelf: "center",
    width: "48%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 30,
    borderColor: "#CA2323",
    borderWidth: 1.5,
  },
  firstButton: {
    backgroundColor: "white",
  },
  secondButtons: {
    backgroundColor: "#CA2323",
  },
  get_started: {
    color: "#9D2731",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
});

export default PromoCodeForm;
