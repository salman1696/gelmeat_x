import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { RF } from '../../exporter';
import CustomText from '../customText';
import { useTranslation } from 'react-i18next';

const ProductListItem = ({ item, orderProducts, index }: any) => {
  const {t} = useTranslation();
  return (
    <View
      style={[
        styles.productItemWrapper,
        orderProducts.length === index + 1 && {
          borderBottomWidth: 0,
        },
      ]}
    >
      <View style={styles.productMeta}>
        <Image
          source={{
            uri: item.url,
          }}
          style={styles.productImg}
        />
        <View>
          <CustomText size={15} color="#000000" style={{ marginBottom: 5 }}>
            {`${item.name} (${item.weight})`}
          </CustomText>
          <TouchableOpacity style={styles.productVariantWrapper}>
            <CustomText size={13} color="#972729">
              Variant 1, 3 Modifiers
            </CustomText>
            <Icon
              name="chevron-down"
              type="entypo"
              color="#000"
              size={RF(16)}
              iconStyle={{ marginLeft: RF(4) }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CustomText size={16} color="#000000" style={{ fontWeight: "500" }}>
        {`${item.price} ${t("SAR")}`}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  productItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: RF(10),
    paddingHorizontal: RF(15),
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
  },
  productMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImg: {
    width: RF(40),
    height: RF(40),
    marginRight: RF(10),
    borderRadius: RF(8),
  },
  productVariantWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProductListItem;