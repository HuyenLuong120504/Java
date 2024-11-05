import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { apiService } from '../config/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    password: ''
  });

  useFocusEffect(
    useCallback(() => {
      clearLoginInfo();
    }, [])
  );

  const clearLoginInfo = async () => {
    setName('');
    setPassword('');
    try {
      await AsyncStorage.removeItem('loginInfo');
    } catch (error) {
      console.error('Error clearing login info:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      
      if (!name || !password) {
        Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
        return;
      }

      const response = await apiService.login({
        name: name,
        password: password
      });

      if (response.data.status) {
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          token: response.data.token,
          user: response.data.user
        };

        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('loginInfo', JSON.stringify(userData));
        
        Alert.alert('Thành công', 'Đăng nhập thành công');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Lỗi', response.data.message || 'Email hoặc mật khẩu không chính xác');
      }

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Lỗi', 'Không thể kết nối đến server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoshoes.png')} style={styles.image} resizeMode="contain" />

      <Text style={styles.subHeader}>Đăng nhập</Text>

      <View style={styles.formContainer}>
        <View>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="Tên đăng nhập"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
          />
          {errors.name ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.name}</Text>
            </View>
          ) : null}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={[styles.button, errors.name ? styles.buttonDisabled : null]}
          onPress={handleSignIn}
          disabled={isLoading || !!errors.name}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
          <Text style={styles.footerText}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#000" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  subHeader: {
    fontSize: 25,
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: 250,
    alignSelf: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 200,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Căn giữa các nút
    width: '100%',
  },
  footerText: {
    color: '#000',
    fontSize: 16,
    marginVertical: 8,
  },
  inputError: {
    borderColor: 'red',
  },
  errorContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: -10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  }
});

export default SignInScreen;
