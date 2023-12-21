import React, { useCallback, useMemo, useRef, useState } from 'react';
import Wrapper from '../../../shared/components/wrapper';
import Onboarding from 'react-native-onboarding-swiper';
import Swiper from 'react-native-swiper';
import styles from './styles';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RF } from '../../../shared/exporter';
import { pngwing, gelameatlogo, silde2, silde3 } from '../../../assets/images';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '@gorhom/bottom-sheet';
import { Icon } from 'react-native-elements';
import i18n from '../../../shared/utils/i18';
import { CustomText } from '../../../shared/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-simple-toast'
import { forgotPassword } from '../../../shared/services/AuthService';

const ForgotPassword = ({ navigation }: any) => {


  // variables
  const snapPoints = useMemo(() => ['30%', '30%'], []);
  const insets = useSafeAreaInsets();


  const [email, setEmail] = useState('');

  const forgotPasswordCall = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email?.match(validRegex)) {
      forgotPassword({ email: email })
        .then((res) => {
          console.log(res);
          Toast.show("Reset email sent", Toast.SHORT)
        })
        .catch((err) =>
          Toast.show(err.response.data.message, Toast.SHORT));
    } else {
      Toast.show("Not valid Email", Toast.SHORT)
    }
  };


  const { t } = useTranslation()


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
        },
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
            {t('Forgot Password')}
          </CustomText>
          <CustomText size={12} style={{ textAlign: "left", marginVertical: 20, color: "#00000034" }}>
            {t('To reset your password, please enter your email address below. We will then send you an email containing a link to reset your password.')}
          </CustomText>
          <TextInput
            style={[styles.input, {
              width: '100%', textAlign: i18n.language !== 'ar' ? 'left' : 'right',
              color: '#999',

            }]}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={"#888"}
            placeholder={t("email")} variant="standard"
          />
        </View>



      </View>

      <View style={{
        position: 'absolute',
        bottom: 5,
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
      }}>
        <TouchableOpacity onPress={() => {
          forgotPasswordCall()
        }}
          style={{
            borderRadius: 60,
            alignSelf: 'center',
            width: '100%',
            padding: 24,
            backgroundColor: '#CA2323',
          }} >
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>{t('Send Reset Link')}</Text>
        </TouchableOpacity>
      </View>
    </View >

  );
};

export default ForgotPassword;
