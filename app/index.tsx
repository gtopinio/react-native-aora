import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.appHeader}>Welcome to Aora!</Text>
      <StatusBar style="auto" />
      <Link href={'/profile'} style={styles.profile}>Go to Profile</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profile : {
    color: "blue",
    fontSize: 20
  }
})
