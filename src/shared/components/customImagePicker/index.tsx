import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {Overlay} from 'react-native-elements';
import FastImage, {Source} from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
// import {camera, closeIcon, gallary} from '../../../assets/icons';
import {COLORS, GST, RF} from '../../exporter';
import CustomText from '../customText';
const {SEA_BLUE, LIGHT_GRAY, WHITE} = COLORS;

interface Props {
  cropping?: boolean;
  visible: boolean;
  multiple?: boolean;
  toggleImagePicker: () => void;
  getSource: (image: Source) => void;
  includeVideo?: boolean;
  includeBase64?: boolean;
}

interface FieldBtnProps {
  label: string;
  icon: Source;
  onPress: () => void;
  color: string;
  bgColor: string;
}

const CustomImagePicker = ({
  cropping = false,
  visible,
  toggleImagePicker,
  getSource,
  includeVideo,
  multiple = false,
  includeBase64 = false,
}: Props) => {
  const PICKER_OPTIONS: any = {
    width: 500,
    height: 500,
    cropping,
    multiple,
    mediaType: includeVideo ? 'any' : 'photo',
    includeBase64,
    compressVideoPreset: 'Passthrough',
  };

  const cameraPressHandler = () => {
    ImagePicker.openCamera(PICKER_OPTIONS)
      .then((res: any) => {
        toggleImagePicker();
        getSource(multiple ? [res] : res);
      })
      .catch();
  };

  const gallaryPressHandler = () => {
    ImagePicker.openPicker(PICKER_OPTIONS).then((res: any) => {
      toggleImagePicker();
      getSource(res);
    });
  };

  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <CustomText bold size={18} style={GST.my2}>
        Upload Photo
      </CustomText>
      {/* <FieldBtn
        label={'Take Photo'}
        icon={camera}
        onPress={cameraPressHandler}
        color={WHITE}
        bgColor={SEA_BLUE}
      />
      <FieldBtn
        label={'Choose from Library'}
        icon={gallary}
        onPress={gallaryPressHandler}
        color={SEA_BLUE}
        bgColor={LIGHT_GRAY}
      /> */}
      {/* <Pressable style={styles.closeContainer} onPress={toggleImagePicker}>
        <FastImage source={closeIcon} style={styles.closeIcon} />
      </Pressable> */}
    </Overlay>
  );
};

const FieldBtn = ({label, icon, onPress, color, bgColor}: FieldBtnProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.btnContainer, {backgroundColor: bgColor}]}>
    <FastImage
      source={icon}
      resizeMode={'contain'}
      style={styles.icon}
      tintColor={color}
    />
    <CustomText size={14} style={GST.px4} color={color}>
      {label}
    </CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    width: '70%',
    borderRadius: RF(12),
    ...GST.py4,
    ...GST.px4,
  },

  btnContainer: {
    alignItems: 'center',
    ...GST.px4,
    ...GST.py6,
    ...GST.mt2,
  },
  icon: {
    width: RF(20),
    height: RF(20),
    ...GST.mb1,
  },
  closeContainer: {
    position: 'absolute',
    right: RF(4),
    top: RF(2),
    padding: RF(10),
  },
  closeIcon: {
    width: RF(20),
    height: RF(20),
  },
});

export default CustomImagePicker;
