import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { api } from "./src/services/api";

const INTIAL_STATE = {
  logradouro: "",
  bairro: "",
  localidade: "",
  uf: "",
  cep: ""
};

export default function App() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(INTIAL_STATE);

  const getCep = async () => {
    try {
      const response = await api(cep);

      if (response.data.erro) {
        Alert.alert("Erro", "CEP inválido");
        return setAddress(INTIAL_STATE);
      }

      Keyboard.dismiss();
      return setAddress(response.data);
    } catch (error) {
      Alert.alert("Erro", "CEP inválido");
      return setAddress(INTIAL_STATE);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        <View>
          <Text style={styles.headerText}>CEP x Endereço</Text>
        </View>

        <View style={styles.box}>
          <TextInput style={styles.input} keyboardType="numeric"
            value={cep} onChangeText={setCep} />
          <TouchableOpacity style={styles.button} onPress={getCep}>
            <Feather name="check" color="darkgreen" size={16} />
          </TouchableOpacity>
        </View>

        {Boolean(address.localidade) && (
          <View style={styles.result}>
            <View style={styles.resultItem}>
              <Text style={styles.resultItemTitle}>CEP: </Text>
              <Text style={styles.resultItemDesc}>{address.cep}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultItemTitle}>Logradouro: </Text>
              <Text style={styles.resultItemDesc}>{address.logradouro}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultItemTitle}>Bairro: </Text>
              <Text style={styles.resultItemDesc}>{address.bairro}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultItemTitle}>Cidade: </Text>
              <Text style={styles.resultItemDesc}>{address.localidade}</Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultItemTitle}>Estado: </Text>
              <Text style={styles.resultItemDesc}>{address.uf}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 48,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  headerText: {
    borderBottomColor: "#222",
    borderBottomWidth: 2,
    textAlign: "center",
    paddingBottom: 16,
    fontSize: 48
  },
  box: {
    width: "100%",
    gap: 8,
    paddingBottom: 48,
    flexDirection: "row"
  },
  input: {
    borderColor: "#222",
    borderWidth: 2,
    width: "84%",
    borderRadius: 4,
    padding: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 4
  },
  result: {
    gap: 4
  },
  resultItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  resultItemTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  resultItemDesc: {
    fontSize: 16,
  },
});
