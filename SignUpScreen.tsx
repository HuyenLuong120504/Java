import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
// import yourImage from '../../assets/images/logoshoes.jpg'; 

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoshoes.jpg')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.subHeader}>Please fill in the details below to sign up</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 250, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    alignSelf: 'center',
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 20,
    color: '#383838',
    marginBottom: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    alignSelf: "center",
    width: 300,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#181717',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 200,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#181717',
    fontSize: 16,
    marginVertical: 8,
  },
});
