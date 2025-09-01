import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, PanResponder, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface createSubtaskModelProps {
  visible: boolean;
  onCreate: (task: { id: number; title: string; from: string; to: string; description: string }) => void;
  onClose: () => void;
}

const createSubtaskModel = ({ visible, onClose, onCreate }: createSubtaskModelProps) => {
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateField, setDateField] = useState<'from' | 'to' | null>(null);
  const [pickerDate, setPickerDate] = useState<Date>(new Date());
  const screenHeight = Dimensions.get('window').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderMove: Animated.event([null, { dy: panY }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        // Swipe up to close
        if (gestureState.dy < -100) {
          Animated.timing(panY, {
            toValue: -screenHeight,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
            panY.setValue(screenHeight); // Reset for next open
          });
        } else {
          Animated.spring(panY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  const handleCreate = () => {
    onCreate({
      id: Date.now(),
      title,
      from,
      to,
      description,
    });
    setTitle('');
    setFrom('');
    setTo('');
    setDescription('');
  };

  const handleDateIconPress = (field: 'from' | 'to') => {
    setDateField(field);
    setPickerDate(field === 'from' && from ? new Date(from) : field === 'to' && to ? new Date(to) : new Date());
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date && dateField) {
      const formatted = date.toLocaleDateString();
      if (dateField === 'from') setFrom(formatted);
      if (dateField === 'to') setTo(formatted);
    }
    setDateField(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay} />
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateY: panY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>Create Task</Text>
          <TextInput
            style={styles.input}
            placeholder="Task title"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.row}>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.half, { marginBottom: 0 }]}
                placeholder="From"
                value={from}
                onChangeText={setFrom}
              />
              <TouchableOpacity onPress={() => handleDateIconPress('from')}>
                <Ionicons name="calendar-outline" size={22} color="#007AFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.half, { marginBottom: 0 }]}
                placeholder="To"
                value={to}
                onChangeText={setTo}
              />
              <TouchableOpacity onPress={() => handleDateIconPress('to')}>
                <Ionicons name="calendar-outline" size={22} color="#007AFF" />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={pickerDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  animatedContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  modal: {
    height: '50%',
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '80%',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginBottom: 16,
    paddingRight: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default createSubtaskModel;