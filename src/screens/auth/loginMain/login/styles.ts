import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { GST, RF } from "../../../shared/exporter";
// import {} from "../../../shared/theme/fonts";

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 0.4,
    paddingVertical: 10,
    borderBottomColor: 'gray',
    marginVertical: RFValue(16),
  },
  submit_btn: {
    borderRadius: 100,
    padding: 10,
  },
  forgot_text: {
    color: "#972729",
    fontSize: 16,
    marginTop: 20,
    paddingRight: 40,
    fontWeight: '700'
  },
});

export default styles;
