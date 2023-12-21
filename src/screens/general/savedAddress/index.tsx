import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { Icon, Image, Overlay } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { cartCheckIcon, deliveryMan, menu, offer1 } from "../../../assets/images";
import { CustomText } from "../../../shared/components";
import ActivityItem from "../../../shared/components/activityItem";
import AddedCartItem from "../../../shared/components/addedCartItem";
import PaymentCardBox from "../../../shared/components/paymentCardBox";
import TabsOptions from "../../../shared/components/tabsOptions";
import { GST, RF, setUser } from "../../../shared/exporter";
import AddNewCard from "./notification";
import { useTranslation } from "react-i18next";
import { color, log } from "react-native-reanimated";
import setAddress from "../setAddress";
import { addAddress, getAddresses, getCards } from "../../../shared/services/OrderService";

import Toast from 'react-native-simple-toast'

const SavedAddress = ({ navigation }: any) => {

  const { t } = useTranslation()
  const { user, rItems, cartItems } = useSelector((state: any) => state.root.user);

  const [types, setTypes] = useState([
    { id: "1", label: "Home", icon: "home", tpye: 'feather', selected: true },
    { id: "2", label: "Office", icon: "home", tpye: 'feather', selected: false },
    { id: "3", label: "Other", icon: "home", tpye: 'feather', selected: false },
  ]);

  const [addLocaiton, setAddLocation] = useState('');


  const insets = useSafeAreaInsets();

  const [label, handleChange] = useState('');


  const dispatch = useDispatch();
  const [allAddresses, setAlladdress] = useState([]);
  const [houseAddress, setHouseAd] = useState(null);
  const [officeAddress, setOfficeAd] = useState(null);
  const [selectedAdd, setSelectedAdd] = useState(false);
  const [activeTabId, setActiveTabId] = useState("1");
  const [isShowOrderPlaced, setIsShowOrderPlaced] = useState(false);
  const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);

  useEffect(() => {
    setIsShowOrderPlaced(false);
    setIsShowAddNewCard(false);
    getAllAddress()
  }, []);

  const toggleType = (x: { id: string; label: string; icon: string; tpye: string; selected: boolean; }) => {
    setTypes(
      types.map((elm) =>
        x.id === elm.id ?
          { ...elm, selected: !elm.selected } :
          { ...elm, selected: false }
      )
    )
  }
  const getAllAddress = () => {
    const params = {}
    getAddresses(params).then((res) => {
      res.data.body.map((item: any) => {
        if (item?.address_type === 'house') {
          setHouseAd(item)
        } if (item?.address_type === 'office') {
          setOfficeAd(item)
        } if (item?.address_type === 'other') {
          setAlladdress(allAddresses.length === 0 ? [item] : [...allAddresses, item])
        }
      })
    })
      .catch((err) => {
        console.log(err, "err");
        if (err.response.status === 401) {
          setAlladdress([])
          dispatch(setUser(null))
          Toast.show("Please login", Toast.SHORT)

        }
      })
  }

  const AddAddress = (label: any, location: any) => {
    const params = {
      address_type: "house",
      label: "House Address",
      landmark: "11 streat",
      house_no: "111A"
    }
    addAddress(params).then((res) => {
      Toast.show('Address added successfully', Toast.SHORT);
    })
      .catch((err) => Toast.show(err.response.data.message, Toast.SHORT))
  }


  useEffect(() => {

    if (selectedAdd) {
      setIsShowAddNewCard(true)
    }


  }, [selectedAdd, addLocaiton])

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
        }
      ]}
    >

      <View style={styles.pageWrapper}>
        {/** Header **/}
        <View style={styles.pageHeader}>
          <TouchableOpacity style={{
            marginBottom: 20,
            left: RF(0),
            top: RF(0),
          }} onPress={() => navigation.goBack()
          }><Icon name={'left'} type={'antdesign'} size={22} />
          </TouchableOpacity>
          <CustomText size={24} style={{ textAlign: "center" }}>
            {t('Saved Addresses')}
          </CustomText>
        </View>


        <ScrollView showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} >
          {houseAddress && <View style={styles.labelAndButton}>
            <CustomText size={13} style={{ textAlign: "center", }}>
              Home
            </CustomText>
          </View>
          }
          {houseAddress && <View style={{ backgroundColor: '#fff', borderRadius: 10 }} >
            <View style={{ flex: 1, padding: 15, flexDirection: 'row', marginVertical: 15 }}>
              <View style={{ flex: 0.9, alignItems: 'flex-start', marginLeft: 10, justifyContent: 'center', }} >
                <Text style={styles.header_yellow}>{houseAddress?.house_no ?? ""}</Text>
                <Text style={{
                  color: '#000000',
                  fontSize: 13,
                  textAlign: 'left',
                  fontFamily: 'Outfit',
                  fontWeight: '300',
                  paddingEnd: 10,
                  marginVertical: 4
                }}>{houseAddress?.landmark}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                  <Text style={styles.header_white}>{user?.user?.phone}</Text>
                </View>
              </View>
            </View>
          </View>}
          {officeAddress && <View style={styles.labelAndButton}>
            <CustomText size={13} style={{ textAlign: "center", }}>
              Office
            </CustomText>
          </View>}
          {officeAddress &&
            <View style={{ backgroundColor: '#fff', borderRadius: 10 }} >
              <View style={{ flex: 1, padding: 15, flexDirection: 'row', marginVertical: 15 }}>
                <View style={{ flex: 0.9, alignItems: 'flex-start', marginLeft: 10, justifyContent: 'center', }} >
                  <Text style={styles.header_yellow}>{'Marvis Kparobo'}</Text>
                  <Text style={{
                    color: '#000000',
                    fontSize: 13,
                    textAlign: 'left',
                    fontFamily: 'Outfit',
                    fontWeight: '300',
                    paddingEnd: 10,
                    marginVertical: 4

                  }}>{'Km 5 refinery road oppsite re public road, effurun, delta state'}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={styles.header_white}>+966 12-345-6789</Text>
                  </View>
                </View>
              </View>
            </View>}
          <View style={styles.labelAndButton}>
            <CustomText size={13} style={{ textAlign: "center", }}>
              Other
            </CustomText>
          </View>

          <FlatList
            data={[allAddresses]}
            renderItem={(item) => {

              return <View style={{ backgroundColor: '#fff', borderRadius: 10, marginVertical: 8, }} >
                <View style={{ flex: 1, padding: 15, flexDirection: 'row', marginVertical: 15 }}>
                  <View style={{ flex: 0.9, alignItems: 'flex-start', marginLeft: 10, justifyContent: 'center', }} >
                    <Text style={styles.header_yellow}>{item?.name ?? 'Marvis Kparobo'}</Text>
                    <Text style={{
                      color: '#000000',
                      fontSize: 13,
                      textAlign: 'left',
                      paddingEnd: 10,
                      fontFamily: 'Outfit',
                      fontWeight: '300',
                      marginVertical: 4

                    }}>{'Km 5 refinery road oppsite re public road, effurun, delta state'}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                      <Text style={styles.header_white}>+966 12-345-6789</Text>
                    </View>
                  </View>
                </View>
              </View>;
            }}
          />
        </ScrollView>
      </View >
      <View style={{
        position: 'absolute',
        width: '100%',
        bottom: 0, padding: 20, paddingVertical: 10,
        backgroundColor: '#fff', borderTopLeftRadius: 35,
        borderTopRightRadius: 35
      }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          colors={["#CA2323", "#9B0328"]}
          style={{
            borderRadius: 60,
            alignSelf: "center",
            width: "100%",
            padding: 24,
            marginVertical: 10,
            backgroundColor: "#CA2323",
          }}
        >
          <TouchableOpacity onPress={() => {
            setSelectedAdd(true)
            setIsShowAddNewCard(true)
          }}>
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 17, fontFamily: 'Outfit' }}
            >
              Add new address
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>


      {
        // Add New Card
        (isShowAddNewCard) && (
          <Overlay isVisible={isShowAddNewCard} overlayStyle={GST.OVERLAYSTYLE}>
            <View
              style={[
                styles.popupContainerContainer
              ]}
            >
              <View style={styles.popupHeader}>
                <CustomText size={24}>Add Address</CustomText>
                <Icon
                  onPress={() => setIsShowAddNewCard(false)}
                  name="cross"
                  type="entypo"
                  color="#000"
                />
              </View>
              <ScrollView
                style={{ marginVertical: 10 }}
              >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", alignSelf: 'center' }}>

                  {types.map((x) => {
                    return (
                      <TouchableOpacity onPress={() => toggleType(x)} style={{
                        flexDirection: "row",
                        marginHorizontal: 5,
                        backgroundColor: x.selected ? "#9B0328" : "#fff", alignSelf: 'center', paddingHorizontal: 22, paddingVertical: 14, borderRadius: 25,
                        alignItems: "center",
                      }}>
                        <Icon
                          onPress={() => setIsShowAddNewCard(false)}
                          name="home"
                          size={18}
                          type="feather"
                          color={x?.selected ? "#fff" : '#555'}
                        />
                        <CustomText style={{ marginHorizontal: 5, fontFamily: "Outfit-medium", color: x?.selected ? "#fff" : '#555' }} size={13}>{x?.label}</CustomText>

                      </TouchableOpacity>
                    )
                  })}

                </View>

              </ScrollView>

              <View style={styles.popupText}>
                <TextInput
                  style={styles.inputStyle}
                  placeholderTextColor={'#888'}

                  onChangeText={() => handleChange("name")}
                  placeholder={`${t("Location Name")}`}
                />
                <TextInput
                  style={styles.inputStyle}
                  value={addLocaiton ?? ""}
                  placeholderTextColor={'#888'}

                  onChangeText={() => setAddLocation("name")}
                  onPressIn={() => {
                    navigation.navigate('setAddress', { setAddLocation: setAddLocation })
                    setIsShowAddNewCard(false)
                  }}
                  placeholder={`${t("Click to update address")}`}
                />
                <LinearGradient
                  start={{ x: 0.0, y: 0.25 }}
                  end={{ x: 0.5, y: 1.0 }}
                  colors={["#CA2323", "#9B0328"]}
                  style={{
                    borderRadius: 60,
                    alignSelf: "center",
                    width: "100%",
                    padding: 24,
                    marginVertical: 10,
                    backgroundColor: "#CA2323",
                  }}
                >
                  <TouchableOpacity onPress={() => {
                    setIsShowAddNewCard(false)
                    // setSelectedAdd(true)
                    AddAddress(label, addLocaiton)
                  }}>
                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 17, fontFamily: 'Outfit' }}
                    >
                      Add new address
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </Overlay >
        )
      }
    </View >
  );
};


const styles = StyleSheet.create({
  pageWrapper: {
    padding: RF(20),
    marginBottom: RF(30)
  },
  pageHeader: {
    alignItems: "flex-start",
    justifyContent: "center",
    // marginBottom: RF(30),
  },
  backIconWrapper: {
    position: "absolute",
    left: RF(0),
    top: RF(0),
  },
  backIcon: {
    color: "#000000",
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
  labelAndButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: RF(10),
  },
  buttonStyle: {
    justifyContent: "center",
    height: RF(55),
    alignSelf: "center",
    width: "50%",
    paddingVertical: 20,
    borderRadius: 30,
    borderColor: "#9B0328",
    borderWidth: 1.5,
  },
  firstButton: {
    backgroundColor: "white",
    // marginRight: RF(10),
  },
  header: {
    color: '#000000',
    fontSize: 20,
    marginHorizontal: 6,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'

  },
  header1: {
    color: '#9D2731',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  sub_total: {
    color: '#05112640',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  toatl_price_text: {
    color: '#9B0328',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  header_yellow: {
    color: '#000',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '600'

  },
  header_white: {
    color: '#9D2731',
    fontSize: 16,
    marginTop: 2,
    marginHorizontal: 2,
    textAlign: 'left',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  price_text: {
    color: '#000',
    fontSize: 16,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
    fontWeight: '800'
  },
  sub_price_text: {
    color: '#051126',
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '500'
  },
  swipe_text: {
    color: '#000',
    fontSize: 11,
    marginBottom: 10,
    marginHorizontal: 8,
    textAlign: 'center',
    fontFamily: 'Outfit',
    fontWeight: '400'

  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    flex: 1,
    padding: 95,
    marginBottom: 12,
    justifyContent: 'center',
  },
  centeredView: {
    width: '100%',
    height: '35%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalView: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },



  get_started: {
    color: "#9D2731",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
  },

  secondButtons: {
    backgroundColor: "#CA2323",
  },
  horizontalTabs: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RF(10),
  },
  deliveryManWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: RF(-20),
  },
  deliveryManImg: {
    height: RF(510),
    width: RF(260),
  },
  placeOrderSection: {
    backgroundColor: "#fafafa",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
    position: "absolute",
    bottom: RF(-20),
    marginLeft: RF(-20),
    marginRight: RF(-20),
  },
  totalOrder: {
    marginBottom: RF(0),
    marginTop: RF(10),
    paddingTop: RF(10),
    borderTopColor: "#9ba0a8",
    borderTopWidth: RF(1),
  },
  popupContainerContainer: {
    position: "absolute",
    bottom: 0,
    width: "102%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#F2F2F2",
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
  cartIconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: RF(15),
  },
});

export default SavedAddress;
