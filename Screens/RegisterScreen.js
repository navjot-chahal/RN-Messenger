import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import register from '../helpers/APICalls/register';
import { useAuth } from '../context/useAuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateLoginContext } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();

    register(name, email, password).then((data) => {
      if (data.success) {
        updateLoginContext(data.success);
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <View>
        <Text h3 style={{ marginBottom: 50 }}>
          Create a New account
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          //   autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          autoCapitalize="none"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        containerStyle={styles.button}
        raised
        onPress={handleRegister}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
