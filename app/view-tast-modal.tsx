import React from 'react';
import { Modal, Text, View } from 'react-native';

type TaskProps = {
  id: number;
  title: string;
  from: string;
  to: string;
  description: string;
}

interface ViewTaskProps {
  visible: boolean;
  onClose: () => void;
  task: TaskProps;
}

const ViewTaskModal = ({visible, onClose, task}: ViewTaskProps) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
    >
      <View>
        <Text>View Task Modal</Text>
        <Text>ID: {task.id}</Text>
        <Text>Title: {task.title}</Text>
        <Text>From: {task.from}</Text>
        <Text>To: {task.to}</Text>
        <Text>Description: {task.description}</Text>
      </View>
    </Modal>
  )
}

export default ViewTaskModal