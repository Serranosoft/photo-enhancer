import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";

export default function GridDeleteWrapper({ selected, emptySelected, deleteRecords, }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => emptySelected()}>
                <Image style={styles.icon} source={require("../../../assets/cross-dark.png")} />
            </TouchableOpacity>
            <Text style={[ui.h4, { textAlign: "center" }]}>{selected.length} elemento(s) seleccionados</Text>
            <TouchableOpacity onPress={() => deleteRecords()}>
                <Image style={styles.icon} source={require("../../../assets/trash-dark.png")} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 24,
        backgroundColor: colors.accent,
        borderTopWidth: 2,
    },
    icon: {
        width: 20,
        height: 20,
    },
})