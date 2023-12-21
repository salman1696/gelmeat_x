import React, { useState } from 'react';
import { StatusBar, Alert, ImageBackground, Text, View, SafeAreaView, FlatList, Modal, Pressable, Image, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { offer1, offer_detail } from '../../../assets/images';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import { RF } from '../../../shared/exporter';
import i18n from '../../../shared/utils/i18';
import styles from './styles';

const Cart = ({ navigation }: any) => {

  const [modalVisible, setModalVisible] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  type ItemProps = { title: string };
  const Item = ({ title, }: ItemProps) => (
    <TouchableOpacity
      style={{ margin: 10, backgroundColor: '#fff', borderRadius: 10, }} >
      <View style={{ flex: 1, padding: 12, flexDirection: 'row' }}>
        <View style={{ flex: 0.2 }}>
          <Image source={offer1} style={{ width: RF(55), height: RF(55), borderRadius: 10 }} ></Image>
        </View>
        <View style={{ flex: 0.8, alignItems: 'flex-start', marginLeft: 10, justifyContent: 'center', }} >
          <Text style={styles.header_yellow}>Top Sirlion Steak</Text>
          <View style={{ width: 300, flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={styles.header_white}>1 Variant, 2 Modifiers</Text>
            <Icon name='chevron-down' type='entypo' color='#000' size={RF(19)} />
          </View>
        </View>
      </View>
      <View style={{ height: 1, width: '100%', backgroundColor: '#00000010', }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, alignItems: 'center', marginVertical: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#35353510', padding: 8, borderRadius: 35 }}>
            <Icon name='minus-a' type='fontisto' color='#9B0328' size={RF(15)} onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.header_white}>{" 1 "} </Text>
          <View style={{ backgroundColor: '#35353510', marginLeft: 5, padding: 8, borderRadius: 35 }}>
            <Icon name='plus-a' type='fontisto' color='#000' size={RF(15)} onPress={() => navigation.goBack()} />
          </View>

        </View>
        <View>
          <Text style={styles.price_text}>SAR 800</Text>
        </View>
      </View>
    </TouchableOpacity >
  );

  return (
    <Wrapper >
      <SafeAreaView style={{ backgroundColor: '#F2F2F2', }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#F2F2F2"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View style={{ backgroundColor: '#F2F2F2', height: '100%', }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, }}>
              <Icon name={i18n.language !== 'ar' ? "chevron-back" : "chevron-forward"} type='ionicon' color='#000' size={RF(21)} onPress={() => navigation.goBack()} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.header}>Cart : </Text>
              <Text style={styles.header1}>Pickup </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 15 }}>
                <Icon name='g-translate' type='materialIcons' color='#CA2323' size={RF(16)} />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon name='swipe' type='materialicons' color='#000' size={RF(14)} onPress={() => navigation.goBack()} />
            <Text style={styles.swipe_text}>swipe on an item to delete or add to favourites</Text>
          </View>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item?.title} />}
            keyExtractor={item => item.id}
          />




        </View>
        <View style={styles.centeredView}>
          <View style={{
            width: '90%',
            height: '100%',
            borderRadius: 30,
          }} >
            <View style={{
              paddingVertical: 20,
              flexDirection: 'row', justifyContent: 'space-between'
            }}>
              <Text style={styles.sub_total}>Sub Total </Text>
              <Text style={styles.sub_price_text}>SAR 800</Text>
            </View>
            <View style={{ paddingVertical: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.sub_total}>Delivery</Text>
              <Text style={styles.sub_price_text}>SAR 800</Text>
            </View>
            <View style={{ height: 1, width: '100%', marginVertical: 15, backgroundColor: '#00000030', }} />
            <View style={{ paddingVertical: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.sub_total}>Total</Text>
              <Text style={styles.toatl_price_text}>SAR 800</Text>
            </View>

            <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#CA2323', '#9B0328']} style={{
              borderRadius: 60,
              alignSelf: 'center',
              width: '100%',
              padding: 24,
              marginVertical: 10,
              backgroundColor: '#CA2323',
            }}>

              <TouchableOpacity onPress={() =>
                navigation.navigate('pickAddress')}
              >
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>Proceed to Checkout</Text>
              </TouchableOpacity>

            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    </Wrapper >
  );
};

export default Cart;
