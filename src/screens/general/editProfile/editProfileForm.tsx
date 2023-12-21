import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import * as yup from "yup";
import DocumentPicker from "react-native-document-picker";
import { Formik, useFormik } from "formik";
import { offer1 } from "../../../assets/images";
import { RF } from "../../../shared/exporter";
import LinearGradient from "react-native-linear-gradient";
import { Icon } from "react-native-elements";
import { CustomText } from "../../../shared/components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { updateProfile } from "../../../shared/services/OrderService";
import ImageCropPicker from "react-native-image-crop-picker";
import { getFileExtension, getFileName } from "../../../shared/utils/util";
import { SetMeal } from "@mui/icons-material";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface AddNewCardProps {
  goBackScreen: Function;
}

const EditProfileForm = ({ goBackScreen }: AddNewCardProps) => {
  const { t } = useTranslation();

  const { user } = useSelector((state: any) => state.root.user);
  const [name, setName] = useState(user?.user?.fullname ?? "");
  const [isName, setIsName] = useState(true);
  const [email, setEmail] = useState(user?.user?.email ?? "");
  const [isEmail, setIsEmail] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [profileImg, setProfileImg] = useState('null');

  const [phone, setPhone] = useState(user?.user?.phone ?? "");
  const [singleFile, setSingleFile] = useState<any>(null);

  const updateProfileCall = () => {
    const params = {
      fullname: name,
      phone: phone
    };
    updateProfile(user?.user?.id, params).then((res) => {
      console.log(res);
    });
  };


  function openGallery() {
    ImageCropPicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setShowModal(false);
      console.log(image, "image");

      setProfileImg(image?.path);
      uploadImage(image);
    });
  }

  function openCamera() {
    ImageCropPicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setShowModal(false);
      setProfileImg(image.path);
      uploadImage(image);
    });
  }

  const uploadImage = async image => {
    const filename = getFileName(image?.path);
    const extension = getFileExtension(filename);
    // const payload = {
    //   type: DocumentType.PROFILE_PICTURE,
    //   category: DocumentCategory.PROFILE,
    //   mimeType: image.mime ?? 'image/jpeg',
    //   name: DocumentName.profileImage + '.' + extension,
    // };

    // const presignedUrl = await getPresignedUrl(
    //   payload,
    //   state?.user?.accessToken,
    // );

    // if (presignedUrl.status == 200) {
    //   const filePathUrl = getPathFromUrl(
    //     presignedUrl?.data?.url,
    //     'user_profile',
    //   );

    //   const path = await uploadDocumentOnPresignedUrl(
    //     presignedUrl.data?.url,
    //     image?.path,
    //   );
    //   if (path.status == 200) {
    //     uploadImageToServer(payload, image.path, presignedUrl.data?.url);
    //   } else {
    //     alert(
    //       path?.data?.detail ?? 'Unable to upload document to presigned url.',
    //     );
    //   }
    // } else {
    //   alert(presignedUrl.data?.detail ?? 'Unable to upload document.');
    // }
  };
  // const uploadImageToServer = async (image, path, url = null) => {
  //   const payload = {
  //     id: state?.user?.id,
  //     profilePicture: {
  //       name: image.name,
  //       category: image.category,
  //       type: image.type,
  //     },
  //   };
  //   const response = await updateProfile(
  //     state?.user?.id,
  //     payload,
  //     state?.user?.accessToken,
  //   );
  //   if (response.status === 200) {
  //     BannerNotification.show(
  //       '',
  //       'Profile image uploaded successfully.',
  //       'success',
  //     );
  //   } else {
  //     BannerNotification.show(
  //       '',
  //       'Failed to upload profile image.',
  //       'error',
  //     );
  //     console.log('Unable to upload image', response.data);
  //   }
  // };



  const selectProfilePicture = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      // Setting the state to show single file attributes
      setSingleFile(JSON.parse(JSON.stringify(res)));
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        // alert("Canceled");
      } else {
        // For Unknown Error
        // alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  console.log(email, 'emailemail');

  const onSubmit = (data: { name: any; email: any; dateOfBirth: string; phone: any; address: string; }) => {
    console.log(data, 'data');
    updateProfileCall()
  }


  const selectedFile = singleFile && singleFile[0];
  return (
    <Formik
      initialValues={{
        name: name,
        email: email,
        dateOfBirth: "15/02/1994",
        phone: phone,
        address: "Riyadh Al Ta'aown Dist",
      }}
      onSubmit={(data) => onSubmit(data)}
      validationSchema={yup.object().shape({
        name: yup.string().required(`${t("Please, provide your name!")}`),
        email: yup
          .string()
          .email()
          .required(`${t("Please, provide your email!")}`),
        dateOfBirth: yup
          .string()
          .required(`${t("Please, provide your date of birth!")}`),
        phone: yup
          .string()
          .matches(phoneRegExp, `${t("Please, provide valid phone number!")}`),
        address: yup.string(),
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.formContainer}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              marginBottom: RF(10),
            }}
          >
            <View
              style={{
                flex: 1,
                padding: 15,
                flexDirection: "row",
                marginVertical: 15,
              }}
            >
              <View>
                <Image
                  source={profileImg ? { uri: profileImg } : offer1}
                  style={{ width: RF(55), height: RF(55), borderRadius: 40 }}
                ></Image>
              </View>
              <View
                style={{
                  flex: 0.8,
                  alignItems: "flex-start",
                  marginLeft: 10,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.header_yellow}>
                  {selectedFile ? selectedFile.name : "Profile.png"}
                </Text>
                <Text
                  style={{
                    color: "#00000050",
                    fontSize: 16,
                    textAlign: "left",
                    fontFamily: "Outfit",
                    fontWeight: "100",
                  }}
                >
                  {selectedFile
                    ? `${Math.ceil(selectedFile.size / 1024)}MB`
                    : "13MB"}
                </Text>

                <TouchableOpacity onPress={() => {
                  setShowModal(true)
                  // selectProfilePicture()
                }}>
                  <LinearGradient
                    colors={["#CA2323", "#9B0328"]}
                    style={styles.gradientButton}
                  >
                    <Icon
                      name="clouduploado"
                      type="antdesign"
                      color="#ffffff"
                      size={RF(14)}
                      style={{ marginRight: RF(4) }}
                    />
                    <CustomText size={12} color="white">
                      {t("Replace Photo")}
                    </CustomText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.name}
               placeholderTextColor={'#888'}
              style={styles.inputStyle}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              placeholder={`${t("Your Name")}`}
            />

            {touched.name && errors.name && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.name}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.email}
              style={styles.inputStyle}
              placeholderTextColor={'#888'}

              placeholder="johndoe@sample.com"
              editable={false}
            />
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.dateOfBirth}
              style={styles.inputStyle}
              placeholderTextColor={'#888'}

              onChangeText={handleChange("dateOfBirth")}
              onBlur={() => setFieldTouched("dateOfBirth")}
              placeholder="dd/mm/yyyy"
            />

            {touched.dateOfBirth && errors.dateOfBirth && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.dateOfBirth}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.phone}
               placeholderTextColor={'#888'}
               style={styles.inputStyle}
              onChangeText={handleChange("phone")}
              onBlur={() => setFieldTouched("phone")}
              placeholder={`${"Phone Number"}`}
            />

            {touched.phone && errors.phone && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.phone}
              </Text>
            )}
          </View>

          <View style={{ marginBottom: RF(10) }}>
            <TextInput
              value={values.address}
               placeholderTextColor={'#888'}
               style={styles.inputStyle}
              onChangeText={handleChange("address")}
              onBlur={() => setFieldTouched("address")}
              placeholder={`${t("Address")}`}
            />

            {touched.address && errors.address && (
              <Text
                style={{ fontSize: 13, color: "#FF0D10", marginLeft: RF(25) }}
              >
                {errors.address}
              </Text>
            )}
          </View>


          <Modal animationType="fade" transparent={true} visible={showModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modal_title}>Upload Profile Photo</Text>
                </View>
                <Pressable style={styles.modalButton} onPress={openCamera}>
                  <Text style={styles.textStyle}>Take a photo</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={openGallery}>
                  <Text style={styles.textStyle}>Choose from gallery</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, { borderBottomWidth: 0 }]}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )
      }
    </Formik >
  );
};
const styles = StyleSheet.create({
  formContainer: {
    // padding: 50,
    flex: 1,
  },
  modalTitleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#BABABB',
    borderBottomWidth: 1,
  },
  modal_title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  modalButton: {
    width: '100%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#BABABB',
    borderBottomWidth: 1,
  },
  centeredView: {
    flex: 1,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  modalView: {
    width: 300,
    zIndex: 4,
    backgroundColor: '#CDCDCD',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: '#007aff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputStyle: {
    borderWidth: 0,
    padding: RF(15),
    paddingLeft: RF(25),
    paddingRight: RF(25),
    marginBottom: RF(5),
    borderRadius: RF(50),
    backgroundColor: "#ffffff",
    fontSize: RF(15),
  },
  twoColumnsForm: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: RF(20),
    borderTopStartRadius: RF(17),
    borderTopEndRadius: RF(17),
  },
  buttonStyle: {
    justifyContent: "center",
    height: RF(55),
    alignSelf: "center",
    width: "48%",
    paddingVertical: 20,
    borderRadius: 30,
    borderColor: "#CA2323",
    borderWidth: 1.5,
  },
  firstButton: {
    backgroundColor: "white",
    // marginRight: RF(10),
  },
  secondButtons: {
    backgroundColor: "#CA2323",
  },
  get_started: {
    color: "#9D2731",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "400",
  },
  header_white: {
    color: "#9D2731",
    fontSize: 16,
    marginTop: 2,
    marginHorizontal: 2,
    textAlign: "center",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  header_yellow: {
    color: "#000",
    fontSize: 18,
    textAlign: "left",
    fontFamily: "Outfit",
    fontWeight: "100",
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RF(100),
    paddingHorizontal: RF(10),
    paddingVertical: RF(8),
    marginTop: RF(5)
  }
});

export default EditProfileForm;
