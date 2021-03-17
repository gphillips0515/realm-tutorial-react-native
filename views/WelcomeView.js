import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { View, Text, TextInput, Button, Alert } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";



export function WelcomeView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      navigation.navigate("Projects");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    console.log("Press sign in");
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
    
  };


  return (

    <View>
    
      <Text style={{fontSize:22 , textAlign:"center", lineHeight:300}}>Sign In or Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          lineHeight = {18}
          borderWidth = {1}
          padding = {10}
          borderRadius = {10}
          Text style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="password"
          lineHeight = {18}
          borderWidth = {1}
          padding = {10}
          borderRadius = {10}
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <Button onPress={onPressSignIn} title="Sign In" />
      
      
      
      <Button onPress={onPressSignUp} title="Sign Up" />

      
    </View>
    
  );

  
}
