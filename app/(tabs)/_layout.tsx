import { Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="(home)" options={{ title: 'Home', tabBarIcon: () => null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: () => null }} />
      <Tabs.Screen name="setting" options={{ title: 'Settings', tabBarIcon: () => null }} />
    </Tabs>
  );
}

export default Layout