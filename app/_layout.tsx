import { TaskProvider } from '@/hooks/useTask';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TaskProvider>
          <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </TaskProvider>
      </GestureHandlerRootView>
    </SafeAreaView>


  )
}
