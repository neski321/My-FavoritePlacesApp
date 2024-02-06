import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, ImageBackground } from "react-native";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig.js";
import styles from "../styles.js";

const LoginScreen = (props) => {
  const [emailFromUI, setEmailFromUI] = useState("");
  const [passwordFromUI, setPasswordFromUI] = useState("");

  const btnLoginPressed = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailFromUI, passwordFromUI);
      props.navigation.navigate("Countries List");
    } catch (error) {
      Alert.alert("Wrong Email/Password", error.message);
    }
  };

  return (
    <ImageBackground source={require("../imageback.jpg")} style={styles.log_backgroundImage}>
      <View style={styles.log_container}>
        <View style={styles.loginBox}>
          <Text style={styles.log_headerText}>Welcome</Text>
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
          <Button title="LOGIN" onPress={btnLoginPressed} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
