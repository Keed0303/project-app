import CreateTaskModal from '@/app/create-task-modal';
import FabButton from '@/components/FabButton';
import Header from '@/components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Router, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TaskProps {
  id: Date,
  title: string,
  from: string,
  to: string,
  description: string
}

const index = () => {
  const [todoTask, SetTodoTask] = React.useState('');
  const [tasks, setTasks] = React.useState<TaskProps[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const router: Router = useRouter();

  const handleCreateTask = async (task: any) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    setModalVisible(false);
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const routeViewTaskItem = (task: TaskProps) => {
    router.push({
      pathname: '/[id]',
      params: { id: String(task.id), title: task.title, from: task.from, to: task.to, description: task.description }
    });
  }

  useEffect(() => {
    // Load tasks from local storage or API
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    loadTasks();

    // clean
    return () => {
      setTasks([]);
    };

  }, []);
  
  console.log(tasks);

  return (
    <View style={{ flex: 1, alignItems: 'center', margin: 16 }}>

      <Header title="Home"/>

      {/* Card */}
      <View style={{ backgroundColor: 'white', borderRadius: 8, elevation: 2, margin: 16, width: '100%' }}>
        <Text style={{ padding: 16 }}>List Todos</Text>
      </View>

      {tasks.map((task: any) => (
        <View
          key={task.id}
          style={{ padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 12, backgroundColor: '#e8ecfdff', width: '100%' }}
          onTouchEnd={() => routeViewTaskItem(task)}
        >
          <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="business-outline"
                size={32}
                color="#3b2dffff"
                onPress={() => setShowDatePicker(true)}
              />
            </View>
            <View style={styles.headerContent}>
              <Text style={{ fontSize: 14, color: '#565656ff' }}>{task.title}</Text>
              <Text style={{ fontSize: 21, fontWeight: 'bold', lineHeight: 35 }}>{task.description}</Text>
            </View>
          </View>
          <Text style={{ textAlign: 'right' }}>{task.from} - {task.to}</Text>
        </View>
      ))}



      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Fab Button: Start */}
      <FabButton onPress={() => setModalVisible(true)} />
      {/* Fab Button: End */}
      <CreateTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} onCreate={handleCreateTask} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: 8,
  },

  iconContainer: {
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginBottom: 8
  }
})

export default index