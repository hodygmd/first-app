import {
  Text,
  ActivityIndicator,
  Pressable,
  Alert,
  View,
  Modal,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { createMarca, deleteMarca, getMarcas, updateMarca } from "../../lib/marca";
import { EditIcon, DeleteIcon } from "../../components/Icons";

export default function Marca() {
  const [modalVisible, setModalVisible] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit,setEdit]=useState(false);
  const [idToEdit,setIdToEdit]=useState(null);
  const [textButton,setTextButton]=useState("Add");
  const [flag,setFlag]=useState(false);
  useEffect(() => {
    getMarcas()
      .then((data) => {
        setMarcas(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
      setFlag(false)
  }, [flag]);
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const showModal = (aux) => {
    aux==='add' && setNull()
    setModalVisible(true);
  }
  const  handleSubmit= () => {
    if(!edit){
      createMarca(nombre,descripcion).then((data)=>{
        Alert.alert("Created", `Process successful`);
        setFlag(true)
      })
    }else{
      updateMarca(idToEdit,nombre,descripcion).then((data)=>{
        Alert.alert("Updated", `Process successful`);
        setFlag(true)
      })
    }
    
    setModalVisible(false)
    setNull()
  }
  const update = (id, index) => {
    //setNombre(marcas.find((item) => item.id === id).nombre)
    setEdit(true)
    setIdToEdit(id)
    setNombre(marcas[index].nombre)
    setDescripcion(marcas[index].descripcion)
    setTextButton("Update")
    showModal()
  }
  const deleteM=(id)=>{
    Alert.alert(
      "Delete",
      "¿Are you sure?",
      [
        {
          text: "Cacel",
          style: "cancel",
        },
        {
          text: "OK", 
          onPress: () => deleteMarca(id).then((data)=>{
            setFlag(true)
          }),
        },
      ],
      { cancelable: false }
    );
  }
  const setNull=()=>{
    setNombre(null);
    setDescripcion(null);
    setTextButton("Add");
    setEdit(false);
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}>
          Marcas
        </Text>
        <Pressable 
            style={[styles.button, styles.buttonOpen]}
            onPress={() => showModal('add')}
        >
          <Text>Agregar</Text>
        </Pressable>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Descripcion</Text>
        <Text style={styles.headerText}>Acciones</Text>
      </View>
      <FlatList
        data={marcas}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.cellText}>{item.nombre}</Text>
            <Text style={styles.cellText}>{item.descripcion}</Text>
            <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
              <Pressable 
                onPress={() => update(item.id, index)}
              >
                <EditIcon />
              </Pressable>
              <Pressable 
                style={{ paddingStart: 10 }}
                onPress={() => deleteM(item.id)}
              >
                <DeleteIcon />
              </Pressable>
            </View>
          </View>
        )}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{marginBottom:20}}>
                <Text style={styles.modalText}>Hello World!</Text>
                <TextInput
                  style={styles.inputs}
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={(value)=>setNombre(value)}
                />
                <TextInput
                  style={styles.inputs}
                  placeholder="Descripcion"
                  value={descripcion}
                  onChangeText={(value)=>setDescripcion(value)}
                />
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
                  <Text style={styles.textStyle}>{textButton}</Text>
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
    padding: 20,
    justifyContent: "center",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  cellText: {
    flex: 1,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  }
});