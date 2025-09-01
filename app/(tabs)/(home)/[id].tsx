import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
type TaskParams = {
  id?: string;
  title?: string;
  description?: string;
  from?: string;
  to?: string;
};

const view = () => {
  const params = useLocalSearchParams<TaskParams>();

  const BottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

  const backDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  )

  useEffect(() => {
    console.log('kyd', params);
    BottomSheetRef.current?.expand();
  }, [])

  return (
    <>
      <View style={styles.container}>
        <BottomSheet
          snapPoints={snapPoints}
          ref={BottomSheetRef}
          index={-1}
          enablePanDownToClose={false}
          handleIndicatorStyle={{ backgroundColor: '#000' }}
          backdropComponent={backDrop}
        >
          <BottomSheetView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/* <View style={{ margin: 16 }}>
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
            </View> */}
            <View>
              <Text>Test</Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>

      
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
});

export default view