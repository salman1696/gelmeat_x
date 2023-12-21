import React, { useState } from "react";
import { I18nManager, NativeModules, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RF } from "../../exporter";
import i18n from "../../utils/i18";
import RNRestart from 'react-native-restart';
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../redux/reducers/userReducer";
import { useTranslation } from 'react-i18next'






const LanguageContainer = ({ onClose, bottom = 0 }: any) => {

    const { rItems, lang } = useSelector((state: any) => state.root.user);
    const { t } = useTranslation()

    const [language, setLanguage] = useState([
        { langName: 'العربية', type: 'ar', selected: i18n.language === 'ar' ? true : false },
        { langName: 'English', type: 'en', selected: i18n.language === 'en' ? true : false }
    ])

    const dispatch = useDispatch();

    const toggleSelection = (i: { langName: string; } | undefined) => {

        language.filter((item) => !item.selected)

        setLanguage(
            language.map((item) => {

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
        <View style={[styles.contentContainer, { bottom: bottom }]}>
            <View style={styles.textContainer}>
                <Text style={styles.languageText}>{t('Language')}</Text>
                <Icon
                    onPress={() => onClose(false)}
                    name='cross'
                    type='entypo'
                    color='#000'
                />
            </View>
            {language.map((i) => {
                return (
                    <TouchableOpacity
                        onPress={() => toggleSelection(i)}
                        style={{
                            backgroundColor: '#F5F5F8',
                            alignItems: 'center',
                            marginTop: RFValue(5),
                            width: '87%',
                            height: RFValue(65),
                        }} key={i.langName}>
                        <View style={{
                            borderRadius: 20,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            height: RFValue(55),
                            backgroundColor: i.selected ? '#9B0328' : "#FFFFFF",
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: !i.selected ? '#9B0328' : '#fff',
                                fontSize: 24,
                                marginHorizontal: RFValue(20),
                                fontFamily: 'Outfit-Regular',
                                fontWeight: '400'
                            }}>{i.langName}</Text>
                            {i.selected && <Text style={styles.languageTextDefault}>{t('Default')}</Text>}
                        </View>
                    </TouchableOpacity>
                )
            })}

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', width: "100%", bottom: 0,
                borderTopLeftRadius: 25,
                paddingTop: 18, borderTopRightRadius: 25, backgroundColor: "#fff", paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => onClose()}
                    style={{
                        justifyContent: 'center',
                        // marginHorizontal: 10,
                        borderColor: '#CA2323',
                        borderWidth: 1.5,
                        height: RF(55),
                        borderRadius: 30,
                        alignSelf: 'center',
                        marginBottom: RF(20),
                        width: '48%',
                        paddingVertical: 20,
                        backgroundColor: 'white'
                    }} >
                    <Text style={styles.get_started}>{t("Cancel")}</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {

                        const fLang = language.filter((item) => !item.selected)
                        fLang[0].type === i18n.language && i18n
                            .changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
                            .then(() => {
                                I18nManager.forceRTL(i18n.language === 'ar');
                                RNRestart.Restart();
                                // NativeModules.DevSettings.reload();
                            });
                        dispatch(setLang(i18n.language === 'ar' ? 'ar' : 'en'))


                        onClose(false)


                    }}
                    // onPress={() => dispatch(setUser({ name: 'ahmed' }))}
                    style={{
                        justifyContent: 'center',
                        flexDirection: "row",
                        alignItems: "center",
                        height: RF(55),
                        borderRadius: 30,
                        alignSelf: 'center',
                        marginBottom: RF(20),
                        width: '48%',
                        paddingVertical: 20,
                        backgroundColor: '#CA2323'
                    }} >
                    <Text style={[styles.get_started, { color: 'white' }]}>{t("Save")}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )


}
const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        position: 'absolute',

        width: '100%',
        height: RFValue(290),
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: '#F5F5F8',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    langContainer: {
        borderRadius: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        height: RFValue(55),
        backgroundColor: '#9B0328',
        alignItems: 'center',
    },
    langButton: {
        backgroundColor: '#F5F5F8',
        alignItems: 'center',
        marginVertical: RFValue(5),
        width: '87%',
        height: RFValue(65),
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        marginTop: RFValue(100),
        justifyContent: 'center',

    },
    textContainer: {
        flexDirection: 'row',
        width: '87%',
        marginTop: RF(20),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: '#fff',
        fontSize: 55,
        textAlign: 'left',
        lineHeight: 55,
        fontFamily: 'Outfit-Bold',
        marginHorizontal: 50,
        fontWeight: '500'

    },
    languageText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'left',
        marginBottom: 8,
        fontFamily: 'Outfit-Bold',
        fontWeight: '400'

    },
    languageTextSelection: {
        color: '#fff',
        fontSize: 24,
        marginHorizontal: RFValue(20),
        fontFamily: 'Outfit-Regular',
        fontWeight: '400'

    },
    languageTextDefault: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: RFValue(20),
        fontFamily: 'Outfit-Regular',
        fontWeight: '400'

    },
    text3: {
        color: '#fff',
        fontSize: 55,
        textAlign: 'left',
        lineHeight: 55,
        fontFamily: 'Outfit-Bold',
        marginHorizontal: 50,
        fontWeight: '500'

    },
    get_started: {
        color: '#9D2731',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: '400'

    },
    linearGradient: {
        flex: 1,
        borderRadius: 5

    },
    image: {
        width: '80%',
        height: "40%",
        marginTop: RFValue(80),
        alignSelf: 'center',
    },
    image2: {
        width: '100%',
        height: RFPercentage(50),
        marginTop: RFValue(40),
        alignSelf: 'center',
    },
    image3: {
        width: '100%', top: 18,
        height: RFPercentage(71),
        alignSelf: 'center',
    },
    logo_image: {
        alignSelf: 'center',
    },
    bg_logo_image: {
        width: RFValue(50),
        borderRadius: 100,
        marginHorizontal: 50,
        height: RFValue(50),
        padding: 12,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: 'white'
    },
});
export default LanguageContainer;