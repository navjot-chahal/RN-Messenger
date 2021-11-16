import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import {
  getTasks,
  postTask,
  deleteTask,
  toggleTask,
} from '../helpers/APICalls/tasks';
import { SwipeListView } from 'react-native-swipe-list-view';

const TasksScreen = ({ navigation, route }) => {
  const [tasksArr, setTasksArr] = useState([]);
  const [taskText, setTaskText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.listName,
    });
  }, [navigation]);

  useEffect(() => {
    getTasks(route.params.listId).then((data) => {
      if (data.success) {
        setTasksArr(data.success.tasks);
      }
    });
  }, []);

  const handleNewTask = () => {
    postTask(route.params.listId, taskText).then((data) => {
      if (data.success) {
        setTasksArr([...tasksArr, data.success.newTask]);
        setTaskText('');
      }
    });
  };

  const toggleComplete = (itemId, itemIndex) => {
    toggleTask(itemId).then((data) => {
      if (data.success) {
        const tempArr = [...tasksArr];
        tempArr[itemIndex] = data.success.task;
        setTasksArr(tempArr);
      }
    });
  };

  const deleteRow = (itemId, itemIndex) => {
    deleteTask(itemId).then((data) => {
      if (data.success) {
        const filteredTaskArr = tasksArr.filter((el, index) =>
          index === itemIndex ? false : true
        );
        setTasksArr(filteredTaskArr);
      }
    });
  };

  const renderItem = ({ item, index }) => (
    <TouchableHighlight style={styles.rowFront} underlayColor={'#AAA'}>
      <View>
        <Text style={item.completed && styles.taskTextStrike}>
          {item.taskName}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = ({ item, index }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backLeftBtn]}
        onPress={() => toggleComplete(item._id, index)}
      >
        {item.completed ? (
          <Text style={styles.backTextWhite}>Undo</Text>
        ) : (
          <Text style={styles.backTextWhite}>Done</Text>
        )}
      </TouchableOpacity>
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
        placeholder="Add new Task"
        type="text"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <Button
        containerStyle={styles.button}
        raised
        onPress={handleNewTask}
        title="Add Task"
      />
      <SwipeListView
        data={tasksArr}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        keyExtractor={(item) => item._id}
      />
    </KeyboardAvoidingView>
  );
};

export default TasksScreen;

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
