import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center bg-blue-100"
    >
      <Text className="text-3xl font-pblack">Welcome to Aora!</Text>
      <StatusBar style="auto" />
      <Link className="mt-4 text-blue-900" href={'/profile'}>Go to Profile</Link>
    </View>
  );
}
