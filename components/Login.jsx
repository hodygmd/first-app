import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useState } from "react";
import { login } from "../lib/empleado";
import { Screen } from "./Screen";
import { useRouter } from "expo-router";
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const router = useRouter();
  const {setUserC}=useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const submitLogin = () => {
    if (!user.trim() || !password.trim()) {
      alert("Todos los campos deben estar llenos");
      return;
    }
    login(user, password).then((data) => {
      if (data===undefined) {
        Alert.alert("Error", "Incorrect user or password");
        return;
      }
      
      setUserC(data);
      Alert.alert("Welcome", `${data.nombre}`);
      router.replace('/nav/perfil');
    });
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Inicio de Sesion</Text>
          <TextInput
            style={styles.userInputs}
            placeholder="Usuario"
            value={user}
            onChangeText={(value) => setUser(value)}
            onSubmitEditing={submitLogin}
          />
          <TextInput
            style={styles.userInputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
            onSubmitEditing={submitLogin}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={submitLogin}
            underlayColor="#DDDDDD"
            onSubmitEditing={submitLogin}
          >
            <Text>Iniciar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#809bce",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 30,
    margin: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  userInputs: {
    backgroundColor: "#eac4d5",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: 200,
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "#841584",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: "center",
  },
});
