import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Button, Stack, } from "@react-native-material/core";
import { Text } from "react-native-elements";
import styles from "./styles";
import i18n from "../../../../shared/utils/i18";
import { useTranslation } from 'react-i18next'
import { Formik } from "formik";
import * as yup from 'yup'
import { RF, setUser } from "../../../../shared/exporter";
import { signUp } from "../../../../shared/services/AuthService";
import Toast from 'react-native-simple-toast'
import { useDispatch } from "react-redux";


const Register = ({ navigation }: any) => {
    const { t } = useTranslation()
    const [text, onChangeText] = React.useState('Email');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();


    const signUpValidationSchema = yup.object().shape({
        fullname: yup
            .string()
            .matches(/(\w.+\s).+/, 'Enter at least 2 names')
            .required('Full name is required'),
        phone: yup
            .string()
            .matches(/(\d){8}\b/, 'Enter a valid phone number')
            .required('Phone number is required'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email is required'),
        password: yup
            .string()
            .matches(/\d/, "Password must have a number")
            .min(6, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
    })

    const onSubmit = (data: { fullname: string; email: string; phone: string; password: string; }) => {
        delete data.confirmPassword
        console.log('data1', data)
        var raw = JSON.stringify({
            ...data,
            role: 'user'
        });
        signUp(raw).then((res: {
            data: any; status: number;
        }) => {
            Toast.show("User created successfully", Toast.SHORT)
            dispatch(setUser(res.data));
            setLoading(false);
            // navigate('/sign-in');
        }).catch((err) => {
            setLoading(false)
            Toast.show(err.response.data.message, Toast.SHORT)
        });
    };

    return (
        <View style={{ flex: 1, }}>
            <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{ fullname: '', email: '', phone: '', password: '', confirmPassword: "" }}
                onSubmit={(data) => onSubmit(data)
                }

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors,
                    touched,
                    isValid, }) => (
                    // <ScrollView style={{
                    //     flex: 1,
                    //     // backgroundColor: '#111'
                    // }}>
                    <View style={{
                        // height: '100%',
                        flex: 1,
                        // backgroundColor: '#225552'
                        // paddingTop: RF(40),
                    }}>
                        <ScrollView>
                            <View>
                                <TextInput
                                    style={[styles.input, {
                                        textAlign: i18n.language !== 'ar' ? 'left' : 'right',
                                        color: '#999',
                                        marginHorizontal: 40,
                                    }]}
                                    onChangeText={handleChange('fullname')}
                                    onBlur={handleBlur('fullname')}
                                    placeholderTextColor={"#888"}
                                    value={values.fullname}
                                    placeholder={t("Username")}
                                    variant="standard"
                                />

                                {(errors.fullname && touched.fullname) &&
                                    <Text style={{ textAlign: "center", fontSize: 10, color: '#972729' }}>{errors.fullname}</Text>
                                }

                                <TextInput
                                    name="email"
                                    placeholder="Email Address"
                                    style={[styles.input, {
                                        textAlign: i18n.language !== 'ar' ? 'left' : 'right',
                                        marginHorizontal: 40,
                                        color: '#999',

                                    }]}
                                    placeholderTextColor={"#888"}

                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {(errors.email && touched.email) &&
                                    <Text style={{ textAlign: "center", fontSize: 10, color: '#972729' }}>{errors.email}</Text>
                                }
                                <TextInput
                                    style={[styles.input, {
                                        textAlign: i18n.language !== 'ar' ? 'left' : 'right',
                                        marginHorizontal: 40,
                                        color: '#999',

                                    }]}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    placeholderTextColor={"#888"}

                                    value={values.phone}
                                    placeholder={t("Phone Number")}
                                    variant="standard"
                                />

                                {(errors.phone && touched.phone) &&
                                    <Text style={{ textAlign: "center", fontSize: 10, color: '#972729' }}>{errors.phone}</Text>
                                }


                                <TextInput
                                    name="password"
                                    placeholder="Password"
                                    placeholderTextColor={"#888"}

                                    style={[styles.input, {
                                        color: '#999',

                                        marginHorizontal: 40,
                                        textAlign: i18n.language !== 'ar' ? 'left' : 'right'
                                    }]}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                // secureTextEntry
                                />
                                {errors.password &&
                                    <Text style={{
                                        textAlign: "center",

                                        fontSize: 10, color: '#972729'
                                    }}>{errors.password}</Text>
                                }

                                <TextInput
                                    name="confirm password"
                                    placeholder="Confirm Password"
                                    placeholderTextColor={"#888"}

                                    style={[styles.input, {
                                        color: '#999',

                                        marginHorizontal: 40,
                                        textAlign: i18n.language !== 'ar' ? 'left' : 'right'
                                    }]}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry
                                />
                                {errors.confirmPassword &&
                                    <Text style={{
                                        textAlign: "center",

                                        fontSize: 10, color: '#972729'
                                    }}>{errors.confirmPassword}</Text>
                                }
                            </View>
                        </ScrollView>



                        <View style={{
                            // position: 'absolute',
                            // bottom: 0,
                            width: '100%',
                            padding: 24,
                            backgroundColor: '#fff',
                            borderTopEndRadius: 30,
                            borderTopLeftRadius: 30,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleSubmit()
                                }}
                                // navigation.navigate('loginMain')}
                                style={{
                                    borderRadius: 60,
                                    alignSelf: 'center',
                                    width: '100%',
                                    padding: 24,
                                    backgroundColor: '#CA2323',
                                }} >
                                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    // </ScrollView>
                )}


            </Formik>

        </View >
    )
}

export default Register;