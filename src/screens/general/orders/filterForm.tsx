import React, { useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
// import ModernDatepicker from "react-modern-datepicker";
import { RF } from "../../../shared/exporter";
import TabsOptions from "../../../shared/components/tabsOptions";
import { useTranslation } from "react-i18next";

interface AddNewCardProps {
  onCloseCard: Function;
  submitValue: Function;
}

const tabsList = [
  { id: "all", label: "All" },
  { id: "delivery", label: "Delivery" },
  { id: "pickup", label: "Pickup" },
  { id: "catering", label: "Catering" },
];

const FilterForm = ({ onCloseCard, submitValue }: AddNewCardProps) => {
  const {t} = useTranslation();
  const [activeOption, setActiveOption] = useState("all");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <Formik
      initialValues={{
        date: "",
      }}
      onSubmit={(values) => {
        submitValue(values);
        onCloseCard(false);
        // Alert.alert(JSON.stringify(values))
      }}
      validationSchema={yup.object().shape({
        date: yup.string().required(`${t("Please, select date!")}`),
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
            <FlatList
              data={tabsList}
              horizontal
              contentContainerStyle={styles.tabsContainer}
              renderItem={({ item, index }: any) => {
                return (
                  <TabsOptions
                    id={item.id}
                    label={t(item.label)}
                    icon={item.icon}
                    activeTabId={activeOption}
                    onSelectTab={setActiveOption}
                  />
                );
              }}
            />
          </View>
          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.date}
              placeholderTextColor={'#888'}

              style={styles.inputStyle}
              onChangeText={handleChange("date")}
              onBlur={() => setFieldTouched("date")}
              placeholder="dd-mm-yyyy"
            />

            {touched.date && errors.date && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.date}
              </Text>
            )}
          </View>

          <View>
            {/* <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{ marginBottom: RF(10), padding: RF(100) }}
            >
              <TextInput
                value={date}
                style={styles.inputStyle}
                onChangeText={handleChange("date")}
                onBlur={() => setFieldTouched("date")}
                placeholder="Enter Promo Code"
              />

              {touched.date && errors.date && (
                <Text
                  style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
                >
                  {errors.date}
                </Text>
              )}
            </TouchableOpacity>

            <ModernDatepicker
              date={date}
              format={"DD-MM-YYYY"}
              showBorder
              onChange={(date: any) => setDate(date)}
              placeholder={"Select a date"}
            /> */}
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
              <Text style={styles.get_started}>{t("Clear Filters")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, styles.secondButtons]}
              onPress={() => handleSubmit()}
              disabled={!isValid}
            >
              <Text style={[styles.get_started, { color: "white" }]}>
                {t("Apply Filters")}
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
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FilterForm;
