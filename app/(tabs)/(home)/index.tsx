import CreateTaskModal from '@/app/create-task-modal';
import ViewTask from '@/app/view-task';
import FabButton from '@/components/FabButton';
import Header from '@/components/Header';
import { useTasks } from '@/hooks/useTask';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TaskProps {
  id: string,
  title: string,
  from: string,
  to: string,
  description: string
}

const index = () => {

  const { tasks, selectedTask, setSelectedTask } = useTasks();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fabVisible, setFabVisible] = useState(true);

  const BottomSheetRef = useRef<BottomSheet>(null);
  const FormSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '40%', '70%'], []);
  const formSnapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  const backDrop = useCallback(
  (props: any) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  ),[]);

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const routeViewTaskItem = (task: any) => {
    setSelectedTask(task);
    BottomSheetRef.current?.expand();
    BottomSheetRef.current?.snapToIndex(1);
  };

  const createTask = () => {
    setFabVisible(false);
    FormSheetRef.current?.expand();
    FormSheetRef.current?.snapToIndex(1);
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", margin: 16 }}>
        <Header title="Home" />

        <View style={{ backgroundColor: "white", borderRadius: 8, elevation: 2, margin: 16, width: "100%" }}>
          <Text style={{ padding: 16 }}>List Todos</Text>
        </View>

        {tasks.map((task) => (
          <View
            key={task.id}
            style={{
              padding: 16,
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 12,
              backgroundColor: "#e8ecfdff",
              width: "100%",
            }}
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
                <Text style={{ fontSize: 14, color: "#565656ff" }}>{task.title}</Text>
                <Text style={{ fontSize: 21, fontWeight: "bold", lineHeight: 35 }}>
                  {task.description}
                </Text>
              </View>
            </View>
            <Text style={{ textAlign: "right" }}>
              {task.from} - {task.to}
            </Text>
          </View>
        ))}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {fabVisible && <FabButton onPress={createTask} />}
      </View>

      {/* View Task */}
      <BottomSheet
        snapPoints={snapPoints}
        ref={BottomSheetRef}
        index={-1}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "#000" }}
        backdropComponent={backDrop}
      >
        <BottomSheetView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ViewTask
            id={selectedTask?.id}
            title={selectedTask?.title}
            description={selectedTask?.description}
            from={selectedTask?.from}
            to={selectedTask?.to}
          />
        </BottomSheetView>
      </BottomSheet>

      {/* Create Task */}
      <BottomSheet
        snapPoints={formSnapPoints}
        ref={FormSheetRef}
        index={-1}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "#000" }}
        backdropComponent={backDrop}
        onClose={() => setFabVisible(true)}
      >
        <BottomSheetView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <CreateTaskModal />
        </BottomSheetView>
      </BottomSheet>
    </>
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