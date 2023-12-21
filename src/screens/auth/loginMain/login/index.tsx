import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Stack } from "@react-native-material/core";
import styles from './styles';
import { Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { RF, setUser } from "../../../../shared/exporter";
import { useTranslation } from 'react-i18next';
import { signIn } from "../../../../shared/services/AuthService";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from 'yup';
import Toast from 'react-native-simple-toast'

const Login = ({ }: any) => {
    const navigation = useNavigation();
    const [text, onChangeText] = React.useState('Email');
    const [number, onChangeNumber] = React.useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const { t, i18n } = useTranslation();

    const onSubmit = (data: any) => {
        setLoading(true)
        signIn(JSON.stringify(data))
            .then((res) => {
                Toast.show("Login successfull", Toast.SHORT)
                dispatch(setUser(res.data));
                console.log(res.data);
                setLoading(false);
                // navigation.navigate('cart', { login: true })
                navigation.goBack()
            })
            .catch((err) => {
                Toast.show(err.response.data.message, Toast.SHORT)
                console.log(err.response.data.message);
                setLoading(false)
            });
    };


    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })


    return (
        <Stack style={{ flex: 1 }}>
            {/* <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    flex: 1,
                    paddingVertical: 24,
                    backgroundColor: "#999",
                    height: '89%',
                }}
            > */}

            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => onSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors,
                    touched,
                    isValid, }) => (
                    <View style={{
                        height: '100%',
                        paddingTop: RF(40),
                    }}>
                        <TextInput
                            name="email"
                            placeholder="Email Address"
                            placeholderTextColor={"#888"}
                            style={[styles.input, {
                                textAlign: i18n.language !== 'ar' ? 'left' : 'right',
                                marginHorizontal: 40,
                                color: '#999',
                            }]}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {(errors.email && touched.email) &&
                            <Text style={{ textAlign: "center", fontSize: 10, color: '#972729' }}>{errors.email}</Text>
                        }

                        <TextInput
                            name="password"
                            placeholder="Password"
                            placeholderTextColor={"#888"}
                            style={[styles.input, {
                                marginHorizontal: 40,
                                color: '#999',
                                textAlign: i18n.language !== 'ar' ? 'left' : 'right'
                            }]}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password &&
                            <Text style={{
                                textAlign: "center",

                                fontSize: 10, color: '#972729'
                            }}>{errors.password}</Text>
                        }

                        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword', { login: true })}>
                            <Text style={[styles.forgot_text, { textAlign: i18n.language === 'ar' ? 'left' : 'right' }]}>{t("Forgot Password?")}</Text>
                        </TouchableOpacity>
                        {/* <Button onPress={handleSubmit} title="Submit" /> */}
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            padding: 20,
                            backgroundColor: '#fff',
                            borderTopEndRadius: 30,
                            borderTopLeftRadius: 30,
                        }}>
                            <TouchableOpacity onPress={() => handleSubmit()}
                                //     onSubmit()
                                //     navigation.navigate('cart', { login: true })
                                // }}
                                style={{
                                    borderRadius: 60,
                                    alignSelf: 'center',
                                    width: '100%',
                                    padding: 24,
                                    backgroundColor: '#CA2323',
                                }} >
                                {loading ? <ActivityIndicator /> : <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>{t('Login')}</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}


            </Formik>


            {/* </ScrollView> */}

        </Stack >
    )
}

export default Login;