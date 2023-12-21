import { StatusBar, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { GST, RF } from "../../../shared/exporter";
import { } from "../../../shared/theme/fonts";
import { BorderColor } from "@mui/icons-material";

const styles = StyleSheet.create({
  wrapper: {},
  headbg: {
    flex: 0.39,
    backgroundColor: "#fff",
    shadowColor: "black",
    zIndex: 10,
    shadowOpacity: 0.2,
    // height: RFValue(230),
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    width: '100%',

    marginTop: RFValue(60),
  },
  main_logo: {
    width: RFValue(134),
    height: RFValue(134),
  },
  logo_text: {
    marginTop: 3,
    color: "#9D2731",
    fontSize: 34,
    fontFamily: 'Outfit',
    fontWeight: "900",
  },
  form_area: {
    backgroundColor: "#F2F2F2",
  },
  screen_bg: {
    backgroundColor: "#F2F2F2",
    // height: RFValue(100, 100),

    flex: 1
  },
  tabs: {
    // fontSize: 20,
    backgroundColor: '#F2F2F2',
    flex: 1

  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    padding: 16,

  },
});

export default styles;
