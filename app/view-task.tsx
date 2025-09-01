import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type TaskParams = {
  id?: string;
  title?: string;
  description?: string;
  from?: string;
  to?: string;
};

const ViewTask = ({ id, title, description, from, to }: TaskParams) => {
  return (
    <>
      <View style={styles.container}>
        <View style={{ margin: 16 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
            <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 16 }}>{description ? description : 'Not Available'}</Text>
          </View>

          <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 400, color: '#8a8a8aff' }}>Start Date</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>
                <Ionicons name="calendar-outline" size={16} color="#000" /> {' '}
                {from ? from : 'Not Available'}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, fontWeight: 400, color: '#8a8a8aff' }}>End Date</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>
                <Ionicons name="calendar-outline" size={16} color="#000" /> {' '}
                {to ? to : 'Not Available'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 100
  },
});

export default ViewTask