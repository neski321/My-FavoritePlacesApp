import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, ImageBackground } from "react-native";
import { auth, createUserWithEmailAndPassword } from "../firebaseConfig.js";
import styles from "../styles.js";

const RegisterScreen = (props) => {
  const [emailFromUI, setEmailFromUI] = useState("");
  const [passwordFromUI, setPasswordFromUI] = useState("");

  const btnRegisterPressed = async () => {
    try {
      // Create a new user account using Firebase authentication
      await createUserWithEmailAndPassword(auth, emailFromUI, passwordFromUI);
      Alert.alert("Registration Successful", "Your account has been created successfully!");
      props.navigation.navigate("Countries List");
    } catch (error) {
      // Handle registration error and display an alert
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <ImageBackground source={require("../imageback.jpg")} style={styles.log_backgroundImage}>
      <View style={styles.log_container}>
        <View style={styles.loginBox}>
          <Text style={styles.log_headerText}>Register</Text>
          <TextInput
            style={styles.log_input}
            placeholder="Enter email"
            value={emailFromUI}
            onChangeText={setEmailFromUI}
          />
          <TextInput
            style={styles.log_input}
            placeholder="Enter password"
            secureTextEntry
            value={passwordFromUI}
            onChangeText={setPasswordFromUI}
          />
          <Button title="REGISTER" onPress={btnRegisterPressed} />
          <Text style={styles.log_footerText}>
            Already have an account?{" "}
            <Text
              style={styles.log_footerLink}
              onPress={() => props.navigation.navigate("Login")}
            >
              Login here
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;
