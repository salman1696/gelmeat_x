import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import CustomText from '../customText';
import { RF } from '../../exporter';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';


interface EmptyScreenProps {
	title: string,
	description: string,
	iconUrl: any,
	onClickBtn?: Function;
	buttonText?: string
	iconStyle?: any
}

const EmptyScreen = ({
  title,
  description,
  iconUrl,
  onClickBtn,
  buttonText,
  iconStyle,
}: EmptyScreenProps) => {
  const {t} = useTranslation();

  return (
    <View style={styles.emptyWrapper}>
      <View style={{ marginBottom: RF(28) }}>
        <Image source={iconUrl} style={iconStyle} />
      </View>

      <CustomText
        size={26}
        color="#000000"
        style={{ marginBottom: RF(14), textAlign: "center" }}
      >
        {t(title)}
      </CustomText>
      <CustomText
        size={15}
        color="#69696b"
        style={{ marginBottom: RF(60), textAlign: "center" }}
      >
        {t(description)}
      </CustomText>

      {onClickBtn && buttonText && (
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => onClickBtn()}
        >
          <LinearGradient
            colors={["#CA2323", "#9B0328"]}
            style={styles.gradientButton}
          >
            <CustomText size={15} color="white" style={{ textAlign: "center" }}>
              {t(buttonText)}
            </CustomText>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: RF(30),
    height: "100%",
  },
  buttonWrapper: { width: "100%", textAlign: "center" },
  gradientButton: {
    borderRadius: RF(100),
    padding: RF(20),
    marginTop: RF(10),
    width: "100%",
  }
});

export default EmptyScreen;