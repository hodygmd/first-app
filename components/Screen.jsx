import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const Screen = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex:1 }}>
      {children}
    </View>
  );
};
