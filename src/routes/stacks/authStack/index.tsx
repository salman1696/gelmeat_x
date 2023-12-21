import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import ForgotPassword from '../../../screens/auth/forgotPassword';
import LoginMain from '../../../screens/auth/loginMain';
import OnboardingScreen from '../../../screens/auth/onboarding';
import PickAddress from '../../../screens/auth/pickAddress';
import Splash from '../../../screens/auth/splash';
import { ROUTES } from '../../../shared/exporter';

const Stack = createStackNavigator();

const AuthStack = () => {
  const { authInitialRoute } = useSelector((state: any) => state.root.general);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Stack.Navigator
        initialRouteName={authInitialRoute}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginMain} />
        <Stack.Screen name={ROUTES.FORGOTPASSWORD} component={ForgotPassword} />
        <Stack.Screen name={ROUTES.PICKADDRESS} component={PickAddress} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
