import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";

export default function Header({ title, back}) {

    return (
        <View style={styles.header}>
            { back && 
                <TouchableOpacity onPress={() => router.back()}>
                    <Image style={styles.back} source={require("../../assets/back-dark.png")} />
                </TouchableOpacity>
            }
            <View style={styles.logo}>
                <Text style={[ui.h3, { color: colors.accent }]}>{title ? title : "Recuerdos a color"}</Text>
                <Image style={{ width: 24, height: 24 }} source={require("../../assets/header-icon.png")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },

    logo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        color: colors.accent,
    },

    back: {
        width: 40,
        height: 40,
    }
})