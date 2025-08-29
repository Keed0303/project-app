import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface FabButtonProps {
  onPress: () => void;
}

const FabButton = ({ onPress }: FabButtonProps) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: '0%',
    backgroundColor: "#2196F3",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
});

export default FabButton