import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { useAuth } from '../context/useAuthContext';
import loginAPI from '../helpers/APICalls/login';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateLoginContext } = useAuth();

  const handleSignIn = () => {
    loginAPI(email, password).then((data) => {
      if (data.success) {
        console.log('logged In!');
        updateLoginContext(data.success);
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
        }}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          // autoFocus
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={handleSignIn}
        title="Login"
      />
      <Button
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
