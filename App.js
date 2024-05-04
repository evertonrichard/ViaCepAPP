import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import NomeQualquer from './assets/viacep.jpg';
import axios from 'axios';
import { api } from './axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({});
  
  const handleSearch = async () => {
    try {
      const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(response.data);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }

    useEffect(() => {
      handleCepSelected();
    }, [cep]);
  
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={{ position: 'absolute', top: 40 }}
        source={NomeQualquer}
      />

      <View style={styles.containerInfos}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}>Nome:</Text>
          <TextInput
            placeholder='Informe o seu nome.'
            style={styles.inputStyle}
          />

          <Text style={styles.textStyle}>CEP:</Text>
          <TextInput
            placeholder='Informe o seu CEP.'
            style={styles.inputStyle}
            keyboardType='numeric'
            onChangeText={text => setCep(text)}
            value={cep}
          />

          <Text style={styles.textStyle}>Endereço:</Text>
          <TextInput
            placeholder='Informe o seu Endereço.'
            style={styles.inputStyle}
            value={endereco.logradouro}
            onChangeText={text => setEndereco({...endereco, logradouro: text})}
          />

          <Text style={styles.textStyle}>Número:</Text>
          <TextInput
            placeholder='Informe o seu Número.'
            style={styles.inputStyle}
            keyboardType='numeric'
          />

          <Text style={styles.textStyle}>Bairro:</Text>
          <TextInput
            placeholder='Informe o seu Bairro.'
            style={styles.inputStyle}
            value={endereco.bairro}
            onChangeText={text => setEndereco({...endereco, bairro: text})}
          />

          <Text style={styles.textStyle}>Cidade:</Text>
          <TextInput
            placeholder='Informe a sua Cidade.'
            style={styles.inputStyle}
            value={endereco.localidade}
            onChangeText={text => setEndereco({...endereco, localidade: text})}
          />

          <Text style={styles.textStyle}>UF:</Text>
          <TextInput
            placeholder='Informe o seu UF.'
            style={styles.inputStyle}
            value={endereco.uf}
            onChangeText={text => setEndereco({...endereco, uf: text})}
          />
        </ScrollView>

        {/* Botão de pesquisa */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: 'white', fontSize: 18 }}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInfos: {
    flex: 1,
    width: '90%',
    height: '60%',
    marginTop: 250,
  },
  inputStyle: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    borderColor: '#417b35',
    marginTop: 10,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: '#6c9c5e',
  },
  searchButton: {
    backgroundColor: '#417b35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});
