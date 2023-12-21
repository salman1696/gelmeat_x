import { StyleSheet } from "react-native";
import { RF } from "../../../shared/exporter";

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RF(15),
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    borderWidth: 1,
    borderRadius: RF(100),
    padding: RF(13),
    borderColor: "#797979",
    color: "#797979",
  },
  processWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: RF(20),
  },
  processIcon: {
    width: RF(52),
    height: RF(52),
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "red",
    borderRadius: RF(100),
    marginRight: RF(15),
  },
  orderItemsBox: {
    backgroundColor: "#ffffff",
    borderRadius: RF(25),
    marginBottom: RF(15),
  },
  orderMetadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: RF(15),
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  metaInfo: {
    backgroundColor: "#f2f2f2",
    borderRadius: RF(15),
    padding: RF(10),
  },

  productItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: RF(10),
    paddingHorizontal: RF(15),
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  productMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImg: {
    width: RF(40),
    height: RF(40),
    marginRight: RF(10),
    borderRadius: RF(8),
  },
  productTotalWrapper: {
    borderBottomWidth: 0,
    borderTopWidth: 1,
  },
  productVariantWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailButtonWrapper: {
    padding: RF(20),
    backgroundColor: "#ffffff",
    // elevation: 5,
    shadowColor: "#393939",
    position: "absolute",
    width: "100%",
    bottom: 0,
    // shadowOffset: { width: -10, height: -13 },
    // shadowRadius: 23,
    borderBottomStartRadius: RF(25),
    borderBottomEndRadius: RF(25),
  },
  buttonStyle: {
    justifyContent: "center",
    height: RF(48),
    alignSelf: "center",
    width: "48%",
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: "#CA2323",
    borderWidth: 1.5,
  },
  secondButtons: {
    backgroundColor: "#CA2323",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
  completedLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RF(10),
  },
  overlayContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  popupContainerContainer: {
    position: "absolute",
    bottom: 0,
    width: "105%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#F5F5F8",
    zIndex: 1000,
  },
  popupHeader: {
    flexDirection: "row",
    width: "100%",
    marginTop: RF(20),
    alignItems: "center",
    justifyContent: "space-between",
    padding: RF(20),
    paddingTop: RF(5),
  },
  popupText: {
    padding: RF(20),
    paddingTop: RF(0),
    // alignSelf: 'center'
  },
  dottedBorders: {
    borderLeftWidth: RF(2),
    height: RF(25),
    borderStyle: "dashed",
    marginLeft: 30,
    marginTop: RF(-18),
  },
});

export default styles;
