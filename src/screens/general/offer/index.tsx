import React, { useEffect, useState } from 'react';
import { StatusBar, Alert, ImageBackground, Text, View, SafeAreaView, FlatList, Modal, Pressable, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { offer1, offer_detail } from '../../../assets/images';
import Wrapper from '../../../shared/components/wrapper';
import { RF } from '../../../shared/exporter';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Toast from "react-native-simple-toast";
import { getOffers } from '../../../shared/services/OrderService';


const Offer = ({ navigation }: any) => {

  const { t, i18n } = useTranslation()

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

  const [offers, setOffers] = useState(DATA);

  useEffect(() => {
    getDiscountedOffer()
  }, [])

  const getDiscountedOffer = () => {
    getOffers().then((res) => {
      setOffers(res?.data?.body)
    }).catch((err) => {
      Toast.show(err.response.data.message, Toast.SHORT)
    })
  }

  type ItemProps = { title: string };
  const Item = ({ title }: ItemProps) => (
    <TouchableOpacity onPress={() => setModalVisible(true)} >
      <ImageBackground source={offer1} resizeMode='contain' style={styles.image}>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <Wrapper >
      <SafeAreaView style={{ backgroundColor: '#F2F2F2', marginTop: Platform.OS === 'ios' ? 0 : 24 }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#F2F2F2"
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View style={{ backgroundColor: '#F2F2F2', height: '100%', marginHorizontal: RF(20) }} >

          <Modal
            animationType={'fade'}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={{
                width: '100%',
                height: '70%',
                borderRadius: 30,
                paddingHorizontal: 15,
              }} >
                <ImageBackground source={offer_detail} resizeMode='stretch' style={styles.modalView}>
                  <View style={{ width: '100%', alignItems: "flex-end", padding: 10 }}>
                    <Icon name='close' type='ionicon' color='#fff' size={RF(21)} onPress={() => setModalVisible(false)} />
                  </View>
                  <Text style={styles.header_yellow}>Fresh Meat</Text>
                  <Text style={styles.header_white}>Today's Offer</Text>
                </ImageBackground>
              </View>
            </View>
          </Modal>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, }}>
              <Icon name={i18n.language !== 'ar' ? "chevron-back" : "chevron-forward"} type='ionicon' color='#000' size={RF(21)} onPress={() => navigation.goBack()} />
              <Text style={styles.header}>{t('Todays Offers')}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8 }}>
                <Icon name='bells' type='antdesign' color='#353535' size={RF(16)} />
              </View>
              <View style={{ marginVertical: 5, padding: 7, backgroundColor: '#fff', borderRadius: 8, marginHorizontal: 8 }}>
                <Icon name='g-translate' type='materialIcons' color='#CA2323' size={RF(16)} />
              </View>
            </View>
          </View>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item?.title} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </Wrapper >
  );
};

export default Offer;
