import React from "react";
import { TextInput, Text, Alert, View, StyleSheet, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { RF } from "../../../shared/exporter";
import { useTranslation } from "react-i18next";
import { addCard } from "../../../shared/services/OrderService";
import Toast from 'react-native-simple-toast'

interface AddNewCardProps {
  onCloseCard: Function
}

const AddNewCard = ({ onCloseCard }: AddNewCardProps) => {
  const { t } = useTranslation();

  const AddCard = (values: any) => {

    const params = {
      card_holder_name: values.name,
      card_number: values.cardNumber,
      expire_date: values.expiryDate,
      cvv: values.cvc
    }

    addCard(params).then((res) => {
      Toast.show('Card Added successfully', Toast.SHORT);
      onCloseCard()
    })
      .catch((err) => Toast.show(err.response.data.message, Toast.SHORT))
  }

  return (
    <Formik
      initialValues={{
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      }}
      onSubmit={(values) => {
        AddCard(values)
      }}
      validationSchema={yup.object().shape({
        name: yup
          .string()
          .required(`${t("Please, provide card holder name!")}`),
        cardNumber: yup
          .number()
          .required(`${t("Please, provide card number!")}`),
        expiryDate: yup
          .string()
          .required(`${t("Please, provide expiry date!")}`),
        cvc: yup.string().required(`${t("Please, provide CVC")}`),
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
              value={values.name}
              placeholderTextColor={'#888'}
              style={styles.inputStyle}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              placeholder={`${t("Card Holder Name")}`}
            />

            {touched.name && errors.name && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.name}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.cardNumber}
              placeholderTextColor={'#888'}
              style={styles.inputStyle}
              onChangeText={handleChange("cardNumber")}
              onBlur={() => setFieldTouched("cardNumber")}
              placeholder={`${t("Card Number")}`}
            />

            {touched.name && errors.name && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.cardNumber}
              </Text>
            )}
          </View>

          <View style={[styles.twoColumnsForm, { marginBottom: RF(10) }]}>
            <View style={{ width: "47%" }}>
              <TextInput
                value={values.expiryDate}
                placeholderTextColor={'#888'}
                style={[styles.inputStyle]}
                onChangeText={handleChange("expiryDate")}
                onBlur={() => setFieldTouched("expiryDate")}
                placeholder={`${t("Expiry Date")}`}
              />

              {touched.name && errors.name && (
                <Text
                  style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
                >
                  {errors.expiryDate}
                </Text>
              )}
            </View>

            <View style={{ width: "47%" }}>
              <TextInput
                placeholderTextColor={'#888'}
                value={values.cvc}
                style={[styles.inputStyle]}
                onChangeText={handleChange("cvc")}
                onBlur={() => setFieldTouched("cvc")}
                placeholder={`${t("CVC")}`}
              />

              {touched.name && errors.name && (
                <Text
                  style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
                >
                  {errors.cvc}
                </Text>
              )}
            </View>
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
                {t("Save Card")}
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
  twoColumnsForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingVertical: 20,
    borderRadius: 30,
    borderColor: "#CA2323",
    borderWidth: 1.5,
  },
  firstButton: {
    backgroundColor: "white",
    // marginRight: RF(10),
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

export default AddNewCard;
