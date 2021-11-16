import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useLayoutEffect,
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
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { postList, getLists, deleteList } from '../helpers/APICalls/lists';
import { Button, Input } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

const Dashboard = ({ navigation }) => {
  const { loggedInUser, logout } = useAuth();
  const [listArr, setListArr] = useState([]);
  const [newListName, setNewListName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => logout()} title="Logout" />,
    });
  }, [navigation]);

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

  const renderItem = ({ item, index }) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('Tasks', {
          listId: item._id,
          listName: item.listName,
        })
      }
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      <View>
        <Text>{item.listName}</Text>
      </View>
    </TouchableHighlight>
  );

  const deleteRow = (itemId, itemIndex) => {
    deleteList(itemId).then((data) => {
      if (data.success) {
        const filteredListArr = listArr.filter((el, index) =>
          index === itemIndex ? false : true
        );
        setListArr(filteredListArr);
      }
    });
  };

  const renderHiddenItem = ({ item, index }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(item._id, index)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
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
      <SwipeListView
        disableRightSwipe
        data={listArr}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={75}
        keyExtractor={(item) => item._id}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  taskTextStrike: {
    textDecorationLine: 'line-through',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: 'blue',
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  button: {
    marginBottom: 50,
  },
});
