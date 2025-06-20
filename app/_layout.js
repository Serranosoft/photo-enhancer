import { SplashScreen, Stack } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initDb } from "../src/utils/sqlite";

SplashScreen.preventAutoHideAsync();


export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "ancizar-regular": require("../assets/fonts/AncizarSans-Regular.ttf"),
        "ancizar-medium": require("../assets/fonts/AncizarSans-Medium.ttf"),
        "ancizar-bold": require("../assets/fonts/AncizarSans-Bold.ttf"),
        "ancizar-extrabold": require("../assets/fonts/AncizarSans-ExtraBold.ttf")
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        initDb();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <GestureHandlerRootView style={styles.container}>
                    <View style={styles.container}>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="index" />
                        </Stack>
                        <StatusBar backgroundColor={"#2C3E50"} style="light" />
                    </View>
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
})