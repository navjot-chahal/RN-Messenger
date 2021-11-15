import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/useAuthContext';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { postList, getLists } from '../helpers/APICalls/lists';
import { Button, Input } from 'react-native-elements';

const Dashboard = ({ navigation }) => {
  const { loggedInUser, logout } = useAuth();
  const [listArr, setListArr] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    getLists().then((data) => {
      if (data.success) {
        setListArr(data.success.lists);
      }
    });
  }, []);

  const handleNewList = () => {
    postList(newListName).then((data) => {
      if (data.success) {
        setListArr([...listArr, data.success.newList]);
        setNewListName('');
      }
    });
  };

  //   if (!listArr.length) return <Text>No lists found!</Text>;

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text>This is Dashboard View</Text>
      <Text>{JSON.stringify(loggedInUser)}</Text>
      <FlatList
        data={listArr}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            key={item._id}
            onPress={() => navigation.navigate('Tasks', { listId: item._id })}
            // onShowUnderlay={separators.highlight}
            // onHideUnderlay={separators.unhighlight}
          >
            <View style={styles.title}>
              <Text style={styles.item}>{item.listName}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item._id}
      />
      <Input
        placeholder="Add new list"
        type="text"
        value={newListName}
        onChangeText={(text) => setNewListName(text)}
      />
      <Button
        containerStyle={styles.button}
        raised
        onPress={handleNewList}
        title="Add List"
      />
      <View style={{ height: 100 }} />
      <Button onPress={() => logout()} title="Logout" />
    </KeyboardAvoidingView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  button: {
    marginBottom: 50,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
