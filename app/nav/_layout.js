import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import { Slot, Link, useRouter } from "expo-router";
import { CategoriaIcon, CloseSesion, PerfilIcon } from "../../components/Icons";
import { Screen } from "../../components/Screen";
export default function NavigationLayout() {
  const router = useRouter();
  const logout = () => {
    Alert.alert(
      "Logout",
      "¿Are you sure?",
      [
        {
          text: "Cacel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => router.replace("/"),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <Screen>
      <View style={styles.nav}>
        <Link asChild href="/nav/perfil">
          <Pressable>
            <PerfilIcon />
          </Pressable>
        </Link>
        <Link asChild href="/nav/categoria" style={{ alignItems: "center" }}>
          <Pressable>
            <CategoriaIcon />
            <Text>Categoria</Text>
          </Pressable>
        </Link>
        <Link asChild href="/nav/marca" style={{ alignItems: "center" }}>
          <Pressable>
            <CategoriaIcon />
            <Text>Marca</Text>
          </Pressable>
        </Link>
        <Link asChild href="/nav/presentacion" style={{ alignItems: "center" }}>
          <Pressable>
            <CategoriaIcon />
            <Text>Presentacion</Text>
          </Pressable>
        </Link>
        <Pressable onPress={logout}>
          <CloseSesion />
        </Pressable>
      </View>
      <Slot />
    </Screen>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
});
