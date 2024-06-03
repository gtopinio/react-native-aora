import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import GlobalProvider from '@/context/GlobalProvider';

SplashScreen.preventAutoHideAsync(); // prevents the splash screen from hiding immediately before the asset loading is done

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) {
      throw error;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync(); // hides the splash screen immediately after the fonts are loaded
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null; // Don't render anything if the fonts are not loaded yet
  }

  return (
    <GlobalProvider>
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(auth)"
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(tabs)"
        options={{
          headerShown: false,
        }} 
      />
      {/* <Stack.Screen 
        name="search/[query]"
        options={{
          headerShown: false,
        }} 
      /> */}
    </Stack>
    </GlobalProvider>
  )
}

export default RootLayout