import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Alert, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [ImageSelected, setImageSelected] = useState(null);

  const capturarFotoAsync = async () => {
    let permisoCamara = await ImagePicker.requestCameraPermissionsAsync();

    if (permisoCamara.granted === false) {
      Alert.alert(
        "Permiso denegado",
        "Necesitamos acceso a la cámara para capturar una foto."
      );
      return;
    }

    const resultadoCamara = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (resultadoCamara.canceled) {
      return;
    } else {
      setImageSelected({
        direccion: resultadoCamara.assets[0].uri,
      });
    }
  };

  const abrirCompartirArchivosAsync = async () => {
    if (!ImageSelected) {
      Alert.alert("Error", "No hay imagen seleccionada para compartir.");
      return;
    }

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(
        "No disponible",
        "Esta imagen no se puede compartir en tu dispositivo."
      );
      return;
    }

    await Sharing.shareAsync(ImageSelected.direccion);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={{
          uri: ImageSelected
            ? ImageSelected.direccion
            : "https://www.univalle.edu/wp-content/uploads/2022/06/logo_uni01.png",
        }}
        style={styles.logo2}
      />

      <Text style={styles.titulo}>Hola Univalle</Text>
      <Text style={styles.subtitulo}>Bienvenidos al módulo 4</Text>

      {/* Botón para capturar una foto */}
      <Pressable style={styles.boton2} onPress={capturarFotoAsync}>
        <Text style={styles.textoBoton}>¡Capturar foto!</Text>
      </Pressable>

      {}
      {ImageSelected && (
        <Pressable style={styles.boton2} onPress={abrirCompartirArchivosAsync}>
          <Text style={styles.textoBoton}>Compartir imagen</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 50,
    color: "black",
  },
  subtitulo: {
    alignSelf: "center",
  },
  logo2: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
  boton2: {
    backgroundColor: "#2510ABFF",
    margin: 20,
    padding: 15,
  },
  textoBoton: {
    fontSize: 20,
    color: "white",
  },
});
