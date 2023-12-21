import React, { useState } from 'react';
import { StatusBar, Alert, ImageBackground, Text, View, SafeAreaView, FlatList, Modal, Pressable, Image, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { branch_img, cart_b, offer1, offer_detail } from '../../../assets/images';
import CustomText from '../../../shared/components/customText';
import Wrapper from '../../../shared/components/wrapper';
import { RF } from '../../../shared/exporter';
import styles from './styles';
import { FloatingAction } from "react-native-floating-action";
import i18n from '../../../shared/utils/i18';
import { CustomAppBar } from '../../../shared/components';
import { useTranslation } from 'react-i18next'

const PickUP = ({ navigation }: any) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isMap, setIsMap] = useState(false);

  const { t } = useTranslation()
  const actions = [
    {
      // text: "Location",
      icon: <Icon name='chevron-back'
        type='ionicon'
        color='#000'
        size={RF(21)}
        onPress={() => navigation.goBack()} />,
      name: "bt_room",
      position: 1
    },
  ];

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
      id: '58694a0f-3da1-471f-bd96-1425571e29d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-482d3-a4f8-f2b2d391aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e229d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-f2bd91aa297f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-47231f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  type ItemProps = { title: string };
  const Item = ({ title }: ItemProps) => (
    <TouchableOpacity onPress={() => navigation.navigate('delivery')} style={{ margin: 10, backgroundColor: '#fff', borderRadius: 20 }} >
      <View style={{ padding: 3, }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={branch_img} resizeMode={'contain'} style={{ width: "100%", borderRadius: 10 }} ></Image>
        </View>
        <View style={{ alignItems: 'flex-start', marginLeft: 10, justifyContent: 'center' }} >
          <Text style={styles.header_yellow}>Gelameat 2, Behzadi Chowk, Lahore</Text>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={styles.header_white}>Km 5 refinery road oppsite re public road, effurun, delta state</Text>
          </View>
          <Text style={styles.red_text}>+966 12-345-6789</Text>

        </View>
      </View>
      <View style={{ height: 1, width: '100%', backgroundColor: '#00000010', }} />
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, alignItems: 'center', marginVertical: 10, }}>
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
      </View> */}
    </TouchableOpacity >
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
        <View style={{ backgroundColor: '#F2F2F2', height: '100%', marginHorizontal: 17 }} >



          <CustomAppBar
            title={t("Pickup")}
            location={t("Select Branch")}
            navigation={navigation}
            onPressback={() => navigation.goBack()}
          />

          <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} >
            <Text style={styles.branch_heading}>{t('Nearby Branch')}</Text>
            <Item title={'qwe'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginVertical: 10, }} >
              <Text style={styles.branch_heading}>{t("All Branches")}</Text>
              <Text style={styles.see_text}>{t("see more")}</Text>

            </View>




            <FlatList
              data={DATA}
              renderItem={({ item }) => <Item title={item?.title} />}
              keyExtractor={item => item.id}
            />

          </ScrollView>


          <FloatingAction
            actions={actions}
            color={'#fff'}
            floatingIcon={<Icon name='map-sharp'
              type='ionicon'
              color='#9D2731'
              size={RF(21)} />}
            onPressItem={name => {
            }}
          />

        </View>

      </SafeAreaView>
    </Wrapper >
  );
};

export default PickUP;
