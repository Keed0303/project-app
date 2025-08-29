import Header from '@/components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TaskParams = {
  id?: string;
  title?: string;
  description?: string;
  from?: string;
  to?: string;
};

const view = () => {
  const params = useLocalSearchParams<TaskParams>();


  useEffect(() => {
    console.log('kyd',params);
    
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={{ margin: 16 }}>
        <Header title="Task Details" />
      </View>

      <View style={{ margin: 16 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{params.title}</Text>
          <Text style={{ fontSize: 16, fontWeight: 400, marginTop: 16 }}>{params.description ? params.description : 'Not Available'}</Text>
        </View>

        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, color: '#8a8a8aff' }}>Start Date</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>
              <Ionicons name="calendar-outline" size={16} color="#000" /> {' '}
              {params.from ? params.from : 'Not Available'}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 16, fontWeight: 400, color: '#8a8a8aff' }}>End Date</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8 }}>
              <Ionicons name="calendar-outline" size={16} color="#000" /> {' '}
              {params.to ? params.to : 'Not Available'}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default view