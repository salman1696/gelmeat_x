import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CartAddedItem from "../cartAddedItem";
import { Icon } from "react-native-elements";
import { RF } from "../../exporter";

interface SwipeableCartItemProps {
  item: any;
  index: any;
  onRemoveItem: Function
}

export default function SwipeableCartItem({
  item,
  index,
  onRemoveItem
}: SwipeableCartItemProps) {
  const [isLike, setIsLike] = useState(false);

  let row: Array<any> = [];
  let prevOpenedRow: { close: () => void };

  const closeRow = (i: any) => {
    if (prevOpenedRow && prevOpenedRow !== row[i]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[i];
  };

  const renderRightActions = (progress: any, dragX: any) => {
    return (
      <View style={styles.actionsButtons}>
        <Icon
          name={isLike ? "heart" : "hearto"}
          type="antdesign"
          color="#9B0328"
          size={RF(15)}
          onPress={() => setIsLike(!isLike)}
          iconStyle={{
            backgroundColor: "#ffffff",
            width: RF(40),
            height: RF(40),
            padding: RF(12.4),
            borderRadius: RF(100),
            borderWidth: 1,
            borderColor: "#9B0328",
            marginRight: RF(5),
          }}
        />
        <Icon
          name="delete-outline"
          type="MaterialCommunityIcons"
          color="#ffffff"
          size={RF(18)}
          onPress={() => onRemoveItem()}
          iconStyle={{
            backgroundColor: "#9B0328",
            width: RF(40),
            height: RF(40),
            padding: RF(11),
            borderRadius: RF(100),
            borderWidth: 1,
            borderColor: "#9B0328",
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
      >
        <CartAddedItem item={item} />
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  actionsButtons: {
    flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: RF(5)
  },
});
