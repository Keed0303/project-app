import { useTasks } from '@/hooks/useTask';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CreateTaskModal = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // 🔹 extra states for date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [dateField, setDateField] = useState<'from' | 'to' | null>(null);

  const handleSubmit = async () => {
    if (!title || !description) return;

    await addTask({
      id: Date.now().toString(),
      title,
      description,
      from,
      to,
    });

    // reset form after save
    setTitle("");
    setDescription("");
    setFrom("");
    setTo("");
  };

  const handleDateIconPress = (field: 'from' | 'to') => {
    setDateField(field);
    setPickerDate(
      field === 'from' && from
        ? new Date(from)
        : field === 'to' && to
        ? new Date(to)
        : new Date()
    );
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Task</Text>
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
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 8,
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

export default CreateTaskModal;
