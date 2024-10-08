import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
// import yourImage from "../../assets/images/logoshoes.jpg";

const SignInScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logoshoes.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.subHeader}>
        Happy to see you again. Please SignIn Here
      </Text>

      <View style={styles.formContainer}>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.footerText}> Đăng ký</Text>
          <Text style={styles.footerText}>Quên mật khẩu </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 290, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    alignSelf: "center",
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 20,
    color: "#383838",
    marginBottom: 24,
    textAlign: "center",
    fontStyle: "italic",
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    alignSelf: "center",
    width: 300,
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: "center",
    width: 200,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  footer: {
    marginTop: 24,
    alignItems: "center",
  },
  footerText: {
    alignItems: "center",
    color: "#181717",
    fontSize: 16,
    marginVertical: 8,
  },
  footerr: {
    alignItems: "center",
    color: "#800606",
  },
});

export default SignInScreen;
