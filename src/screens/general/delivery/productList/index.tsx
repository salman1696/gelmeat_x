import React, { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProductBox from "../../../../shared/components/productBox";
import { useSelector } from "react-redux";
import CustomSimpleTab from "../../../../shared/components/customSimpleTab";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomText } from "../../../../shared/components";
import { RF } from "../../../../shared/exporter";
import { useTranslation } from "react-i18next";

const ProductList = ({ route, navigation }: any) => {
    const { t } = useTranslation();

    const { rItems, cartItems } = useSelector((state: any) => state.root.user);

    const [productsListData, setProductsListData] = useState(rItems?.filter(((item: any) => item?.sub_cat[0]?.title === route?.name && item?.sub_cat[0].Products.length !== undefined)) ?? []);

    console.log(route?.name, productsListData, "rItems=====", rItems, "====>", productsListData[0]?.sub_cat[0].Products.length);

    // useEffect(()=>{
    //     setProductsListData(productsListData.map(()=> )
    // },[])

    return (
        <View style={{ flex: 0.9 }}>
            <View
                style={{
                    marginTop: RF(10),
                    paddingHorizontal: RF(3),
                    // marginVertical: RF(15),
                }}
            >
                <CustomText color="#000000" size={21} bold weight={'600'}>
                    {productsListData[0]?.sub_cat[0].Products.length + ` ${t("Items")}`}
                </CustomText>
            </View>

            <View style={{ flex: 1, marginTop: RF(5) }}>
                <FlatList
                    data={productsListData[0]?.sub_cat[0].Products}
                    pagingEnabled={true}
                    numColumns={2}
                    contentContainerStyle={{
                        alignItems: 'center', justifyContent: 'center'
                    }}
                    keyExtractor={(key: any) => key.index}

                    renderItem={({ item, index }: any) => {
                        const lastItem = index === productsListData[0]?.sub_cat[0].Products.length - 1;
                        return (
                            <ProductBox
                                title={item?.title}
                                elm={item}
                                // onPressClick={onClickProduct}
                                url={item?.img_url}
                                all={lastItem}
                                price={item?.price}
                                navigation={navigation}
                            />
                        );
                    }}
                />
            </View>
        </View>
    )
}

export default ProductList;