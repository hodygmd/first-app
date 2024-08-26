import { useAuth } from "../../context/AuthContext";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { CloseSesion, EditIcon, PasswordIcon } from "../../components/Icons";
import { useEffect, useState } from "react";
import { updatePassword, updateUser } from "../../lib/empleado";
import { Picker } from "@react-native-picker/picker";
import { getPuestos } from "../../lib/extra";

export default function Perfil() {
  const router = useRouter();
  const { userC, setUserC } = useAuth();
  const [puestos,setPuestos]=useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [editPassword, setEditPassword] = useState(false);
  useEffect(() => {
    setName(userC.nombre);
    setUsername(userC.username);
    setSelectedValue(userC.id_puesto.id);
  }, [userC]);
  useEffect(()=>{
    getPuestos().then((data)=>{
      setPuestos(data)
    })
  },[])
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
  const handleSubmit = () => {
    if (!editPassword) {
      if (!name.trim() || !username.trim() || !selectedValue) {
        Alert.alert("Error", "All fields must be filled");
        return;
      }
      updateUser(userC.clave, name, username, selectedValue).then((data) => {
        setUserC(data);
      });
    } else {
      if (!password.trim()) {
        Alert.alert("Error", "Password is required");
        return;
      }
      updatePassword(userC.clave, password).then((data) => {
        Alert.alert("Updated", `Process successful`);
      });
    }
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.titleCard}>{userC.nombre}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.cardBody}>
          <Text style={{ marginBottom: 10 }}>
            <Text style={styles.titleInfo}>Clave: </Text>
            {userC.clave}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            <Text style={styles.titleInfo}>Usuario: </Text>
            {userC.username}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            <Text style={styles.titleInfo}>Puesto: </Text>
            {userC.id_puesto.nombre}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.cardFooter}>
          <Pressable onPress={logout}>
            <CloseSesion />
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              setEditPassword(true);
            }}
          >
            <PasswordIcon />
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              setEditPassword(false);
              setSelectedValue(userC.id_puesto.id)
            }}
          >
            <EditIcon />
          </Pressable>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.modalText}>Hello World!</Text>
                {!editPassword && (
                  <>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Nombre"
                      value={name}
                      onChangeText={(value) => setName(value)}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Username"
                      value={username}
                      onChangeText={(value) => setUsername(value)}
                    />
                    <View style={{alignItems:"center"}}>
                      <Picker
                        selectedValue={selectedValue}
                        style={{ height: 40, width: 150, borderRadius:15, backgroundColor:"#eac4d5", borderColor:"black", borderWidth:1 }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <Picker.Item label="---SELECT---" value={null} />
                        {puestos.map((item)=>(
                          <Picker.Item key={item.id} label={item.nombre} value={item.id}/>
                        ))}
                      </Picker>
                    </View>
                  </>
                )}
                {editPassword && (
                  <TextInput
                    style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#809bce",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
  },
  cardHeader: {
    paddingVertical: 10,
    backgroundColor: "#eac4d5",
    borderRadius: 10,
    padding: 10,
  },
  cardBody: {
    padding: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  titleCard: {
    fontWeight: "600",
    color: "#4e4c50",
    fontSize: 40,
  },
  titleInfo: {
    fontWeight: "600",
    color: "#4e4c50",
    fontSize: 15,
  },
  separator: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  centeredView: {
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 8,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  inputs: {
    backgroundColor: "#eac4d5",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: 200,
    padding: 10,
    margin: 10,
  },
});
