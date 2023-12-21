import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS, GST, HP, RF} from '../../exporter';
import CustomText from '../customText';

const {LIGHT_GRAY, BLACK, WHITE} = COLORS;

interface Props {
  visible: boolean;
  data?: any;
  valKey?: string;
  onSelect?: (item: any) => void;
  toggleSheet: () => void;
  hideSearchBar?: boolean;
}

const CustomSheet = ({
  data,
  valKey = 'title',
  onSelect,
  visible,
  toggleSheet,
  hideSearchBar,
}: Props) => {
  const [initialData, setInitialData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  let listData: any = searchText ? searchResult : initialData;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    visible ? onOpen() : onClose();
  }, [visible]);

  const searchHandler = (query: string) => {
    setSearchText(query);
    const results: any = data?.filter((item: any) => {
      const target = valKey ? item[valKey] : item;
      return target.toLowerCase().match(query.toLowerCase());
    });
    setSearchResult(results);
  };

  const selectionHandler = (item: any) => {
    onSelect && onSelect(item);
    toggleSheet();
  };

  const onClose = () => {
    setSearchText('');
    setInitialData([]);
  };

  const onOpen = () => {
    if (data?.length > 0) {
      setInitialData(data);
    }
  };

  return (
    <Modal
      isVisible={visible}
      animationInTiming={500}
      backdropOpacity={0.3}
      backdropTransitionInTiming={100}
      onBackdropPress={toggleSheet}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      style={[styles.modal, {paddingBottom: insets.bottom}]}>
      <View style={styles.inputContainer}>
        {!hideSearchBar && (
          <TextInput
            value={searchText}
            placeholder={'Search'}
            placeholderTextColor={LIGHT_GRAY}
            onChangeText={searchHandler}
            style={styles.input}
          />
        )}
      </View>
      <FlatList
        data={listData}
        contentContainerStyle={listData.length < 1 && GST.FLEX}
        keyboardShouldPersistTaps={'always'}
        keyExtractor={(_, index: number) => String(index)}
        renderItem={({item, index}: any) => {
          return (
            <View style={styles.itemContainer} key={String(index)}>
              <TouchableOpacity
                style={styles.itemSubContainer}
                onPress={() => selectionHandler(item)}>
                <CustomText size={13} color={BLACK}>
                  {valKey ? item[valKey] : item}
                </CustomText>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    backgroundColor: WHITE,
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: HP(30),
    borderTopLeftRadius: RF(20),
    borderTopRightRadius: RF(20),
    ...GST.pb2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: RF(10),
    ...GST.pt5,
    height: RF(60),
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderColor: LIGHT_GRAY,
    paddingHorizontal: RF(16),
  },
  itemSubContainer: {
    paddingVertical: RF(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 0.5,
    borderColor: LIGHT_GRAY,
    padding: RF(10),
    borderRadius: RF(8),
    fontFamily: FONTS.ROMAN,
    fontSize: RF(14),
    ...GST.mx3,
    color: BLACK,
    flex: 1,
  },
});

export default CustomSheet;
