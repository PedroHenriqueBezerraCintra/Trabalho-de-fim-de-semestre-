import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

import backgroundImage from './assets/fundo.jpg'; // Imagem de fundo

export default function App() {
  const [carKm, setCarKm] = useState('');
  const [electricity, setElectricity] = useState('');
  const [fuelType, setFuelType] = useState('gasolina');
  const [result, setResult] = useState(null);

  const fuelFactors = {
    etanol: 0.18,
    gasolina: 0.21,
    diesel: 0.25,
  };

  const referenceGoal = 400;

  const calculateCarbon = () => {
    const carFactor = fuelFactors[fuelType] || 0.21;
    const electricityFactor = 0.5;

    const total =
      (parseFloat(carKm) || 0) * carFactor +
      (parseFloat(electricity) || 0) * electricityFactor;

    setResult(total.toFixed(2));
  };

  const resetFields = () => {
    setCarKm('');
    setElectricity('');
    setFuelType('gasolina');
    setResult(null);
  };

  const parsedResult = parseFloat(result);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Calculadora de Carbono</Text>

          <Text style={styles.label}>Km percorridos de carro por semana:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={carKm}
            onChangeText={setCarKm}
            placeholder="Ex: 100"
            placeholderTextColor="#CCC"
          />

          <Text style={styles.label}>Tipo de combustível:</Text>
          <View style={styles.fuelButtons}>
            {['etanol', 'gasolina', 'diesel'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.fuelButton,
                  fuelType === type && styles.fuelButtonSelected,
                ]}
                onPress={() => setFuelType(type)}
              >
                <Text style={styles.fuelButtonText}>{type.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Consumo de energia mensal (kWh):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={electricity}
            onChangeText={setElectricity}
            placeholder="Ex: 250"
            placeholderTextColor="#CCC"
          />

          <TouchableOpacity style={styles.customButton} onPress={calculateCarbon}>
            <Text style={styles.customButtonText}>Calcular</Text>
          </TouchableOpacity>

          {result && (
            <>
              <Text style={styles.result}>
                🌍 Emissão estimada: {result} kg de CO₂ por mês.
              </Text>

              {parsedResult > referenceGoal && (
                <>
                  <Text style={styles.warning}>
                    ❕Sua emissão está acima da média de 400 kg.
                  </Text>
                  <Text style={styles.tip}>
                    💡 Dica: Reduza o uso do carro, troque para fontes renováveis e economize energia!
                  </Text>
                </>
              )}

              <TouchableOpacity style={styles.resetButton} onPress={resetFields}>
                <Text style={styles.resetButtonText}>Reiniciar</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 45,
    paddingTop: 60,
    flexGrow: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'italic',
    marginBottom: 100,
    textAlign: 'center',
    color: '#ffffff',
  },
  label: {
    fontSize: 18,
    marginBottom: 6,
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#787878AA',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 500,
    marginBottom: 40,
    color: '#FFF',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 20,
  },
  warning: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 10,
  },
  tip: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FAF8F5',
    marginTop: 6,
    fontStyle: 'italic',
  },
  fuelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  fuelButton: {
    backgroundColor: '#787878',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginHorizontal: 4,
  },
  fuelButtonSelected: {
    backgroundColor: '#389613',
  },
  fuelButtonText: {
    color: '#FAF8F5',
    fontWeight: 'bold',
  },
  customButton: {
    backgroundColor: '#389613',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  customButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#B22222',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});