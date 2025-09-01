import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const Modal = () => {


  return (

    <View>
      <Text>Profile Page</Text>
    </View>

  );
}

const profile = () => {
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

  }, [])

  return (

    <View style={styles.container}>
      <Button title='Open' onPress={() => BottomSheetRef.current?.expand()} />
      <BottomSheet
        snapPoints={snapPoints}
        ref={BottomSheetRef}
        index={-1}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: '#000' }}
        backdropComponent={backDrop}
      >
        <BottomSheetView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Modal />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
});

export default profile