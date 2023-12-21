import React from 'react'
import { Animated, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';
import { gelameatlogo, logoBig } from '../../../assets/images';
import { Wrapper } from '../../../shared/components';
import { TabView, SceneMap } from 'react-native-tab-view';
import Login from './login';
import Register from './register';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { RF } from '../../../shared/exporter';

const LoginTab = () => (
    <View style={{ flex: 1, }} >
        <Login />
    </View>
);

const RegisterTab = () => (
    <View style={{ flex: 1 }} >
        <Register />
    </View>
);
const renderScene = SceneMap({
    first: LoginTab,
    second: RegisterTab,
});



const LoginMain = ({ navigation }) => {
    const layout = useWindowDimensions();
    const { t } = useTranslation()

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: t('Login') },
        { key: 'second', title: t('Sign Up') },
    ]);


    const renderTabBar = (props: { navigationState: { routes: any[]; }; position: { interpolate: (arg0: { inputRange: any; outputRange: any; }) => any; }; }) => {
        const inputRange = props.navigationState.routes.map((x: any, i: any) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route: { title: string | number | boolean | Animated.Value | Animated.AnimatedInterpolation | Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> | Animated.WithAnimatedObject<{}> | Animated.WithAnimatedObject<Iterable<React.ReactNode>> | Animated.WithAnimatedObject<React.ReactPortal> | (string & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (string & Iterable<React.ReactNode>) | (string & React.ReactPortal) | (number & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (number & Iterable<React.ReactNode>) | (number & React.ReactPortal) | (false & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (false & Iterable<React.ReactNode>) | (false & React.ReactPortal) | (true & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (true & Iterable<React.ReactNode>) | (true & React.ReactPortal) | (Animated.Value & string) | (Animated.Value & number) | (Animated.Value & false) | (Animated.Value & true) | (Animated.Value & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (Animated.Value & Iterable<React.ReactNode>) | (Animated.Value & React.ReactPortal) | (Animated.AnimatedInterpolation & string) | (Animated.AnimatedInterpolation & number) | (Animated.AnimatedInterpolation & false) | (Animated.AnimatedInterpolation & true) | (Animated.AnimatedInterpolation & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (Animated.AnimatedInterpolation & Iterable<React.ReactNode>) | (Animated.AnimatedInterpolation & React.ReactPortal) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & string) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & number) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & false) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & true) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & Iterable<React.ReactNode>) | (Animated.WithAnimatedObject<React.ReactElement<any, string | React.JSXElementConstructor<any>>> & React.ReactPortal) | (Animated.WithAnimatedObject<{}> & string) | (Animated.WithAnimatedObject<{}> & number) | (Animated.WithAnimatedObject<{}> & false) | (Animated.WithAnimatedObject<{}> & true) | (Animated.WithAnimatedObject<{}> & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (Animated.WithAnimatedObject<{}> & Iterable<React.ReactNode>) | (Animated.WithAnimatedObject<{}> & React.ReactPortal) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & string) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & number) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & false) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & true) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & Iterable<React.ReactNode>) | (Animated.WithAnimatedObject<Iterable<React.ReactNode>> & React.ReactPortal) | (Animated.WithAnimatedObject<React.ReactPortal> & string) | (Animated.WithAnimatedObject<React.ReactPortal> & number) | (Animated.WithAnimatedObject<React.ReactPortal> & false) | (Animated.WithAnimatedObject<React.ReactPortal> & true) | (Animated.WithAnimatedObject<React.ReactPortal> & React.ReactElement<any, string | React.JSXElementConstructor<any>>) | (Animated.WithAnimatedObject<React.ReactPortal> & Iterable<React.ReactNode>) | (Animated.WithAnimatedObject<React.ReactPortal> & React.ReactPortal) | null | undefined; }, i: any) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex: any) =>
                            inputIndex === i ? 1 : 0.5
                        ),
                    });
                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => setIndex(i)}
                        >
                            <Animated.Text style={{ opacity, color: "#222", fontSize: 18, fontFamily: 'Outfit-Bold' }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };


    return (
        <Wrapper>
            <View style={styles.screen_bg}>

                <View style={styles.headbg}>

                    <View style={styles.head}>
                        <View style={{ width: '100%' }} >
                            <Icon
                                onPress={() => navigation.goBack()}
                                name="cross"
                                type="entypo"
                                color="#000"
                                size={RF(24)}
                                style={{ paddingEnd: 30, alignSelf: 'flex-end', }}
                            />
                        </View>
                        <Image source={logoBig} style={styles.main_logo} resizeMode={'contain'} />

                    </View>


                </View>
                <View style={{ flex: 0.61, }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        renderTabBar={renderTabBar}
                        initialLayout={{ width: layout.width }}
                        style={styles.tabs}
                    />
                </View>
            </View>
        </Wrapper>
    )
}

export default LoginMain;