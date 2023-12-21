import {StyleSheet} from 'react-native';
import {COLORS, RF} from '../exporter';
import {SIZING} from './sizing';
import {SPACING} from './spacing';

export const GST = StyleSheet.create({
  ...SPACING,
  ...SIZING,
  FLEX: {
    flex: 1,
  },
  ERROR: {
    marginTop: RF(2),
    fontSize: RF(10),
    color: COLORS.YELLOW,
  },
  SHADOW: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  HITSLOP: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  DIVIDER: {
    borderBottomColor: COLORS.COBALT,
    borderBottomWidth: 1,
  },
  CONTENT_CONTAINER: {
    flexGrow: 1,
    justifyContent: "center",
  },
  BOTTOM_BTN_CONTANIER: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: RF(10),
  },
  TRIANGLE: {
    position: "absolute",
    bottom: -RF(15),
    right: "12%",
    width: 0,
    height: 0,
    borderLeftWidth: RF(25),
    borderTopWidth: RF(15),
    borderLeftColor: "transparent",
    borderTopColor: COLORS.WHITE,
  },
  OVERLAYSTYLE: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    marginRight: 0,
    paddingRight: 0,
  },
});
