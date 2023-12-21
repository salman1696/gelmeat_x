import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Cart from '../../../screens/general/cart';
import Delivery from '../../../screens/general/delivery';
import Home from '../../../screens/general/home';
import Offer from '../../../screens/general/offer';
import PickUP from '../../../screens/general/pickup';
import Delive from "../../../screens/general/pickup";
import ViewItemsDetail from "../../../screens/general/ViewItemsDetail";
import Profile from "../../../screens/general/profile";
import { RF, ROUTES, navigate, setUser } from "../../../shared/exporter";
import MainFlow from '../../../screens/general/home/BottomTabs';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, useDrawerProgress } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { big_logo, g_b_f, home_b } from '../../../assets/images';
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import Payment from '../../../screens/general/payment';
import DeliveryDetails from '../../../screens/general/deliveryDetails';
import PickupAddress from '../../../screens/general/pickupAddress';
import Checkout from '../../../screens/general/Checkout';
import { useDispatch } from 'react-redux';
import Orders from '../../../screens/general/orders';
import Favorites from "../../../screens/general/favorites";
import MyAccount from '../../../screens/general/my-account';
import OnboardingScreen from '../../../screens/auth/onboarding';
import LoginMain from '../../../screens/auth/loginMain';
import ForgotPassword from '../../../screens/auth/forgotPassword';
import PickAddress from '../../../screens/auth/pickAddress';
import Splash from '../../../screens/auth/splash';
import Notification from '../../../screens/general/notification';
import SavedAddress from '../../../screens/general/savedAddress';
import ChangePassword from '../../../screens/general/changePassword';
import SavedPayment from '../../../screens/general/savedPayment';
import TermsCondition from '../../../screens/general/termCondition';
import Privacy from '../../../screens/general/privacy';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ViewProfile from '../../../screens/general/viewProfile';
import EditProfile from '../../../screens/general/editProfile';
import NotificationSettings from '../../../screens/general/notificationSettings';
import { useTranslation } from 'react-i18next';
import SetAddress from '../../../screens/general/setAddress';


const Stack = createStackNavigator();


const Drawer = createDrawerNavigator();


const CustomDrawerItem = ({ icon, type, label, size, onPress }: any) => {
  const { t, i18n } = useTranslation()
  return (
    <TouchableOpacity // drawer item button
      style={[styles.drawerItem]}
      onPress={onPress}>
      <Icon
        name={icon}
        type={type}
        color="#fff"
        size={size}
      />
      <Text // drawer item label
        style={styles.drawerItemLabel}>
        {t(label)}
      </Text>
    </TouchableOpacity>
  );
};



const CustomDrawer = () => {


  return (
    <LinearGradient
      colors={['#CA2323', '#9B0328']}
      style={styles.container}>
      <Drawer.Navigator
        useLegacyImplementation
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: { flex: 1, width: '55%', backgroundColor: 'transparent' },
          sceneContainerStyle: { backgroundColor: 'transparent' },
        }}
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
        initialRouteName={'main'}>
        {/* initialRouteName={'ChatScreen'}> */}
        <Drawer.Screen name={'main'} component={MainFlow} />
      </Drawer.Navigator>
    </LinearGradient>

  );
};

const CustomDrawerContent = ({ navigation }: any) => {
  const { t, i18n } = useTranslation()

  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, paddingLeft: 20 }}>
        <View // close button container
          style={styles.closeBtnContainer}>
          <TouchableOpacity // close button
            style={styles.logo}
            onPress={() => navigation.closeDrawer()}>
            <Image // close button icon
              source={big_logo}
              style={styles.closeBtnIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity // close button
            style={styles.closeBtn}
            onPress={() => navigation.closeDrawer()}>
            <Icon
              name={"cross"}
              type="entypo"
              color="#fff"
              size={RF(32)}
            />
          </TouchableOpacity>
        </View>




        <View // drawer items container
          style={styles.drawerItmContainer}>
          <CustomDrawerItem // qr code
            icon={'home-outline'}
            type={'material-community'}
            label="Home"
            size={25}
            onPress={() => navigation.navigate('home')}
          />
          <View // separator
            style={styles.separator}
          />
          <CustomDrawerItem // qr code
            icon={'account-circle-outline'}
            type={'material-community'}
            label="Profile"
            size={25}
            onPress={() => navigation.navigate('viewProfile')}

          />
          <View // separator
            style={styles.separator}
          />
          <CustomDrawerItem // qr code
            icon={'cart-arrow-down'}
            type={'material-community'}
            label="Orders"
            size={23}
            onPress={() => navigation.navigate('Orders')}

          />
          <View // separator
            style={styles.separator}
          />
          <CustomDrawerItem // qr code
            icon={'tag-outline'}
            type={'material-community'}
            label="Offers"
            size={23}
            onPress={() => navigation.navigate('offer')}
          />
          <View // separator
            style={styles.separator}
          />
          <CustomDrawerItem // qr code
            icon={'bell-outline'}
            type={'material-community'}
            label="Notifications"
            size={23}
            onPress={() => navigation.navigate('notification')}

          />
          <View // separator
            style={styles.separator}
          />
          <CustomDrawerItem // qr code
            icon={'tag-outline'}
            type={'material-community'}
            label="Privacy policy"
            size={23}
            onPress={() => navigation.navigate('Privacy')}

          />
          <View // separator
            style={styles.separator}
          />
          <CustomDrawerItem // qr code
            icon={'note-text'}
            type={'material-community'}
            label="Terms & conditions"
            size={23}
            onPress={() => navigation.navigate('TermsCondition')}
          />
          <View // separator
            style={styles.separator}
          />
        </View>
        <View // logout button container
          style={{ marginBottom: 20 }}>
          <TouchableOpacity // drawer item button
            style={[styles.drawerItem]}
            onPress={() => {
              console.log('we')
              navigation.closeDrawer()
              navigation.navigate('onboarding');
              dispatch(setUser(null))

            }}>
            <Text // drawer item label
              style={styles.drawerItemLabel}>
              {t('Log-out')}
            </Text>
            <Icon
              name={i18n.language !== 'ar' ? 'arrow-right-thin' : 'arrow-left-thin'}
              type={'material-community'}
              color="#fff"
              size={25}
            />

          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};





const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItem: 'center',
    borderRadius: 10,
  },
  drawerItemIcon: { width: 20, height: 20, tintColor: '#fff' },
  drawerItemLabel: { fontSize: RF(17), color: '#fff', marginLeft: 10, fontFamily: 'Outfit', fontWeight: '600' },
  profileButton: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  profileImage: { width: 50, height: 50, borderRadius: 10 },
  closeBtnContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' },
  closeBtn: { alignItems: 'center', justifyContent: 'center' },
  logo: { alignItems: 'center', justifyContent: 'center' },
  closeBtnIcon: { width: RF(40), height: RF(40), tintColor: '#fff' },
  commonTxt: { fontSize: 18, color: '#fff' },
  drawerItmContainer: { flex: 0.94, marginTop: 20, justifyContent: 'center' },
  separator: { height: 0.5, backgroundColor: '#F4F4F8', marginEnd: RFValue(70), marginVertical: RF(20) },
  container: { flex: 1, backgroundColor: '#ff9f1c' },
});


const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"Splash"}
        component={Splash}
      // options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginMain} />

      {/* <Stack.Screen name={ROUTES.LOGIN} component={LoginMain} /> */}
      <Stack.Screen name={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
      <Stack.Screen name={ROUTES.PICKADDRESS} component={PickAddress} />
      <Stack.Screen name={ROUTES.SETADDRESS} component={SetAddress} />
      <Stack.Screen name={ROUTES.MAINFLOW} component={CustomDrawer} />
      {/* <Stack.Screen name={ROUTES.PAYMENT} component={Payment} /> */}
      <Stack.Screen name={ROUTES.DELIVERYDETAILS} component={DeliveryDetails} />
      {/* <Stack.Screen name={ROUTES.HOME} component={Home} /> */}
      <Stack.Screen name={ROUTES.ORDERS} component={Orders} />
      <Stack.Screen name={ROUTES.DELIVERY} component={Delivery} />
      <Stack.Screen name={ROUTES.PICkUP} component={PickUP} />
      {/* <Stack.Screen n ame={ROUTES.CART} component={Cart} /> */}
      <Stack.Screen name={ROUTES.PICKUPADDRESS} component={PickupAddress} />
      {/* <Stack.Screen name={ROUTES.CHECKOUT} component={Checkout} /> */}
      <Stack.Screen name={ROUTES.OFFER} component={Offer} />
      <Stack.Screen name={ROUTES.VIEWITEMSDETAIL} component={ViewItemsDetail} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.ACCOUNT} component={MyAccount} />
      <Stack.Screen name={ROUTES.FAVORITES} component={Favorites} />
      <Stack.Screen name={ROUTES.VIEWPROFILE} component={ViewProfile} />
      <Stack.Screen name={ROUTES.EDITPROFILE} component={EditProfile} />
      <Stack.Screen name={ROUTES.NOTIFICATION} component={Notification} />
      <Stack.Screen name={ROUTES.SAVEDADDRESS} component={SavedAddress} />
      <Stack.Screen name={ROUTES.SAVEDPAYMENT} component={SavedPayment} />
      <Stack.Screen name={ROUTES.TC} component={TermsCondition} />
      <Stack.Screen name={ROUTES.PRIVACY} component={Privacy} />
      <Stack.Screen name={ROUTES.CHANGEPASSWORD} component={ChangePassword} />

      <Stack.Screen name={ROUTES.NITIFICATIONSETTINGS} component={NotificationSettings} />
    </Stack.Navigator>
  );
};

export default MainStack;

