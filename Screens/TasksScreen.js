import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { getTasks, postTask } from '../helpers/APICalls/tasks';

const TasksScreen = ({ navigation, route }) => {
  const [tasksArr, setTasksArr] = useState([]);
  const [taskText, setTaskText] = useState('');

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
        console.log(tasksArr);
        setTasksArr([...tasksArr, data.success.newTask]);
        setTaskText('');
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text></Text>
      <FlatList
        data={tasksArr}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight
            key={item._id}
            onPress={() => console.log('Do nothing yet!')}
          >
            <View style={styles.title}>
              <Text style={styles.item}>{item.taskName}</Text>
              <Text style={styles.item}>{item.completed.toString()}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item._id}
      />
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
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default TasksScreen;

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
