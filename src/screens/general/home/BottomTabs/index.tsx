/** @format */

import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


import { TabBar } from './TabBar';
import Home from '../../home';
import { offer1 } from '../../../../assets/images';
import Animated, { Extrapolate, interpolateNode } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';
import Cart from '../../cart';
import PickupAddress from '../../pickupAddress';
import { RF, ROUTES } from '../../../../shared/exporter';
import Orders from '../../orders';
import MyAccount from '../../my-account';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Delivery from '../../delivery';

import { useTranslation } from 'react-i18next';
import i18n from '../../../../shared/utils/i18';
import ViewItemsDetail from '../../ViewItemsDetail';
import Checkout from '../../Checkout';
import Payment from '../../payment';




const OrderFlowStack = createNativeStackNavigator()

function OrderFlowStackScreen() {
  return (
    <OrderFlowStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <OrderFlowStack.Screen name={ROUTES.HOME} component={Home} />
      <OrderFlowStack.Screen name={ROUTES.DELIVERY} component={Delivery} />
      <OrderFlowStack.Screen name={ROUTES.VIEWITEMSDETAIL} component={ViewItemsDetail} />
      <OrderFlowStack.Screen name={ROUTES.CART} component={Cart} />
      <OrderFlowStack.Screen name={ROUTES.CHECKOUT} component={Checkout} />
      <OrderFlowStack.Screen name={ROUTES.PAYMENT} component={Payment} />



    </OrderFlowStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const MainFlow = ({ navigation }: { navigation: any }) => {

  // const { t, i18n } = useTranslation();

  const { t } = i18n


  const progress: any = useDrawerProgress();

  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.7],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 18],
  });

  const animatedStyles = { borderRadius, transform: [{ scale }] };
  return (

    <Animated.View style={[
      {
        flex: 1,
        backgroundColor: 'blue',
      },
      animatedStyles,
    ]}>

      <Tab.Navigator
        useLegacyImplementation
        tabBar={(props: any) => <TabBar {...props} />}
        // initialRouteName={
        //   route?.params?.route === 'ProfileTabs' ? 'Profile' : null
        // }
        initialRouteName={'Home'}
        tabBarOptions={{
          activeTintColor: "#000",
          style: {
            borderWidth: 0.5,

            borderBottomWidth: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderColor: 'grey',
            position: 'absolute',
          },
        }}>
        <Tab.Screen
          component={OrderFlowStackScreen}
          name={'Home'}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={offer1}
                resizeMode={'contain'}
                style={{ height: 42, width: 42, marginHorizontal: 5 }}
              />
            ),
          }}
        />
        <Tab.Screen
          component={Orders}
          name={'Orders'}
          options={{
            tabBarLabel: 'Orders',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='reorder' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          component={OrderFlowStackScreen}
          name={'Courses'}
          options={{
            tabBarLabel: 'My Courses',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name='reorder' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          component={Cart}
          name={'Cart'}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name='user' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          component={MyAccount}
          name={'Account'}
          options={{
            tabBarLabel: 'My Account',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name='user' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default MainFlow;
