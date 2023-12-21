import React, { useCallback, useDebugValue, useEffect, useMemo, useRef, useState } from 'react';
import Wrapper from '../../../shared/components/wrapper';
import Onboarding from 'react-native-onboarding-swiper';
import Swiper from 'react-native-swiper';
import styles from './styles';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { RF } from '../../../shared/exporter';
import { pngwing, gelameatlogo, silde2, silde3 } from '../../../assets/images';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements';
import LanguageContainer from '../../../shared/components/languageContainer';
import { useTranslation } from 'react-i18next'

import { fcmService } from '../../../shared/services/notification/fcm-service';
import { localNotificationService } from '../../../shared/services/notification/LocalNotifictionService';
import DeviceInfo from 'react-native-device-info';
import { addFCMToken } from '../../../shared/services/AuthService';


const OnboardingScreen = ({ navigation }: any) => {


  const { t } = useTranslation()

  const [langCheck, setLangCheck] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);

  ////
  const [FCMToken, setFCMToken] = useState('')
  const [deviceId, setDeviceId] = useState('test')

  // FCM
  useEffect(() => {
    DeviceInfo.getUniqueId().then((res) => setDeviceId);
    fcmService.registerAppWithFCM();

    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  useEffect(() => {
    onAddFCMToken(FCMToken, deviceId)

  }, [FCMToken])

  const onRegister = async (token: any) => {
    // sendDeviceToken(token, uid);
    console.log('ooooo');

    setFCMToken(token);
    console.log(token, 'token');

  };

  const onAddFCMToken = (token: any, deviceId: any) => {

    const params = {
      fcm_token: token,
      device_id: deviceId,
    }
    addFCMToken(params).then((res) => {
      console.log(res, 'fcm')
    }).catch((e) => {
      console.log(e, 'fcm');

    })

  }

  ////
  const onNotification = (notify: any, remoteMessage: any) => {
    console.log('[App] onNotification: ', notify);
    localNotificationService.configure(onOpenNotification, remoteMessage);
    const options = {
      soundName: 'default',
      playSound: true, //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    };
    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options
    );
  };

  const onOpenNotification = (notify: any, remoteMessage: { data: { id: any; type: any; }; }) => {
    console.log('[App] onOpenNotification: ', notify);
    console.log('[App] onOpenNotification: data ', remoteMessage);
    if (remoteMessage) {
      const { id, type } = remoteMessage.data;
      switch (type) {
        default:
          return;
      }
    }
  };


  // variables
  const snapPoints = useMemo(() => ['30%', '30%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [lang, setLang] = useState([
    { langName: 'العربية', selected: true },
    { langName: 'English', selected: false }
  ])

  const toggleSelection = (i: { langName: string; } | undefined) => {
    setLang(
      lang.map((item) => {
        if (item.langName === i?.langName) {

          return {
            ...item,
            selected: !item.selected
          }
        } else {
          return {
            ...item,
            selected: !item.selected
          }
        }

      })
    )
  }


  return (
    <Wrapper >
      <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#CA2323', '#9B0328']} style={styles.linearGradient}>
        <Swiper style={styles.wrapper}
          autoplay={true}
          dotStyle={{ marginBottom: 30 }} showsButtons={false} dotColor={'#CA2323'} activeDotColor={"#fff"} >
          <View style={styles.slide1}>
            <View style={styles.bg_logo_image} >
              <Image source={gelameatlogo} style={styles.logo_image} />
            </View>
            <Text style={styles.text}>
              {t('Food for Everyone')}
            </Text>
            <Image source={pngwing} style={styles.image} />
          </View>

          <View style={styles.slide1}>
            <View style={styles.bg_logo_image} >
              <Image source={gelameatlogo} style={styles.logo_image} />
            </View>
            <Text style={styles.text}>
              {t('Food for Everyone')}

            </Text>
            <Image source={silde2} style={styles.image2} resizeMode='cover' />
          </View>
          <View style={styles.slide3}>
            <View style={styles.bg_logo_image} >
              <Image source={gelameatlogo} style={styles.logo_image} />
            </View>
            <Text style={styles.text3}>
              {t('Food for Everyone')}

            </Text>
            <Image source={silde3} style={styles.image3} resizeMode='cover' />
          </View>
        </Swiper>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('pickAddress')
          }
          style={{
            marginHorizontal: 20,
            position: 'absolute',
            justifyContent: 'center',
            bottom: 0,
            height: RF(55), borderRadius: 30, alignSelf: 'center', marginBottom: RF(20), width: '95%', padding: 20, backgroundColor: 'white'
          }}
        >
          <Text style={styles.get_started}>{t('Get Started')}</Text>

        </TouchableOpacity>

        {langCheck && <LanguageContainer onClose={setLangCheck} />
        }
      </LinearGradient>
    </Wrapper >

  );
};



export default OnboardingScreen;
