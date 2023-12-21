import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  input: {
    marginVertical: RFValue(16),
    borderBottomWidth: 0.4,
    paddingVertical: 10,
    borderBottomColor: 'gray'
  },
  submit_btn: {
    borderRadius: 100,
    padding: 10,
  },
  forgot_text: {
    color: "#972729",
    fontSize: 16,
    fontWeight: '700'
  },
});

export default styles;
