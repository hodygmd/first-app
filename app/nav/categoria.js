import {
  Text,
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
  TextInput
} from "react-native";
import { useEffect, useState } from "react";
import { createCategoria, deleteCategoria, getCategorias, updateCategoria } from "../../lib/categoria";
import { DeleteIcon, EditIcon } from "../../components/Icons";
import { Picker } from "@react-native-picker/picker";
import { getFunciones } from "../../lib/extra";

export default function Index() {
  const [categorias, setCategorias] = useState([]);
  const [funciones, setFunciones] = useState([]);
  const [nombre, setNombre] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit,setEdit]=useState(false);
  const [idToEdit,setIdToEdit]=useState(null);
  const [textButton,setTextButton]=useState("Add");
  const [flag,setFlag]=useState(false);
  useEffect(() => {
    getCategorias()
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
      setFlag(false)
  }, [flag]);
  useEffect(()=>{
    getFunciones().then((data)=>{
      setFunciones(data)
    })
  },[])
  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  const handleSubmit= () => {
    if(!edit){
      createCategoria(nombre,selectedValue).then((data)=>{
        Alert.alert("Created", `Process successful`);
        setFlag(true)
      })
    }else{
      updateCategoria(idToEdit,nombre,selectedValue).then((data)=>{
        Alert.alert("Updated", `Process successful`);
        setFlag(true)
      })
    }
    setModalVisible(false)
  }
  const update = (id, index) => {
    //setNombre(marcas.find((item) => item.id === id).nombre)
    setEdit(true)
    setIdToEdit(id)
    setNombre(categorias[index].nombre)
    setSelectedValue(categorias[index].funcion_id)
    setTextButton("Update")
  }
  const deleteC=(id)=>{
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
          onPress: () => deleteCategoria(id).then((data)=>{
            setFlag(true)
          }),
        },
      ],
      { cancelable: false }
    );
  }
  const setNull=()=>{
    setNombre(null)
    setSelectedValue(null)
    setTextButton("Add");
    setEdit(false);
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}>
          Categorias
        </Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(true)
            setNull()
          }}
        >
          <Text>Agregar</Text>
        </Pressable>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Funcion</Text>
        <Text style={styles.headerText}>Acciones</Text>
      </View>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.cellText}>{item.nombre}</Text>
            <Text style={styles.cellText}>{item.funcion_nombre}</Text>
            <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
              <Pressable onPress={() => {
                update(item.id, index)
                setModalVisible(true)
                }}>
                <EditIcon />
              </Pressable>
              <Pressable 
                style={{ paddingStart: 10 }}
                onPress={() => deleteC(item.id)}
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
                <View style={{alignItems:"center"}}>
                      <Picker
                        selectedValue={selectedValue}
                        style={{ height: 40, width: 150, borderRadius:15, backgroundColor:"#eac4d5", borderColor:"black", borderWidth:1 }}
                        onValueChange={(itemValue, itemIndex) =>
                          setSelectedValue(itemValue)
                        }
                      >
                        <Picker.Item label="---SELECT---" value={null} />
                        {funciones.map((item)=>(
                          <Picker.Item key={item.id} label={item.nombre} value={item.id}/>
                        ))}
                      </Picker>
                    </View>
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
