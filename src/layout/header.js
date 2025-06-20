import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";

export default function Header({ title, back}) {

    return (
        <View style={styles.header}>
            { back && 
                <TouchableOpacity onPress={() => router.back()}>
                    <Image style={styles.back} source={require("../../assets/back-light.png")} />
                </TouchableOpacity>
            }
            <View style={styles.logo}>
                <Text style={[ui.h3, { color: colors.accent }]}>{title ? title : "Revive en alta calidad"}</Text>
                <Image style={{ width: 28, height: 28 }} source={require("../../assets/header-icon.png")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 8,
        padding: 16,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.primary,
        borderBottomWidth: 2,
        borderColor: colors.secondary
    },

    logo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        color: colors.accent,
    },

    back: {
        width: 40,
        height: 40,
    }
})