import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { GST, RF } from '../../../shared/exporter';
import { } from '../../../shared/theme/fonts';

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
  },
  forgot_text: {
    color: '#000',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontWeight: '400'

  },
  container: {
    // height: '69%',
    // width: '100%',
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'flex-end',
    alignItems: 'center',
    // marginBottom:70,
  },
  // container: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'flex-end',
  //   alignItems: 'center'
  // },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 120
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: RFValue(240),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
  },
  langContainer: {
    borderRadius: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: RFValue(55),
    backgroundColor: '#9B0328',
    alignItems: 'center',
  },
  langButton: {
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
    marginVertical: RFValue(5),
    width: '87%',
    height: RFValue(65),
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    marginTop: RFValue(100),
    justifyContent: 'center',

  },
  textContainer: {
    flexDirection: 'row',
    width: '87%',
    marginTop: RF(20),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff',
    fontSize: 55,
    textAlign: 'left',
    lineHeight: 55,
    fontFamily: 'Outfit-Bold',
    marginHorizontal: 50,
    fontWeight: '500'

  },
  languageText: {
    color: '#000',
    fontSize: 28,
    textAlign: 'left',
    fontFamily: 'Outfit-Bold',
    fontWeight: '400'

  },
  languageTextSelection: {
    color: '#fff',
    fontSize: 24,
    marginHorizontal: RFValue(20),
    fontFamily: 'Outfit-Regular',
    fontWeight: '400'

  },
  languageTextDefault: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: RFValue(20),
    fontFamily: 'Outfit-Regular',
    fontWeight: '400'

  },
  text3: {
    color: '#fff',
    fontSize: 55,
    textAlign: 'left',
    lineHeight: 55,
    fontFamily: 'Outfit-Bold',
    marginHorizontal: 50,
    fontWeight: '500'

  },
  get_started: {
    color: '#CA2323',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '400'

  },
  linearGradient: {
    flex: 1,
    backgroundColor: '#F2F2F2',


  },
  image: {
    width: '80%',
    height: "40%",
    marginTop: RFValue(80),
    alignSelf: 'center',
  },
  image2: {
    width: '100%',
    height: RFPercentage(50),
    marginTop: RFValue(40),
    alignSelf: 'center',
  },
  image3: {
    width: '100%', top: 18,
    height: RFPercentage(71),
    alignSelf: 'center',
  },
  logo_image: {
    alignSelf: 'center',
  },
  bg_logo_image: {
    width: RFValue(50),
    borderRadius: 100,
    marginHorizontal: 50,
    height: RFValue(50),
    padding: 12,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'white'
  },
});

export default styles;
