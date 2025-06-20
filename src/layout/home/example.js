import { Image, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import Compare, { Before, After, DefaultDragger } from 'react-native-before-after-slider-v2';

export default function Example() {
    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Text style={[ui.h4, { textAlign: "center" }]}>Conserva <Text style={{ color: colors.accent }}>tus recuerdos</Text> para la posterioridad</Text>
            </View>
            <Compare initial={75} draggerWidth={50} height={200} width={150} >
                <Before>
                    <Image style={styles.image} source={require("../../../assets/example-before.jpeg")}  />
                </Before>
                <After>
                    <Image style={styles.image} source={require("../../../assets/example-after.png")}  />
                </After>
                <DefaultDragger />
            </Compare>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        padding: 8,
    },
    hero: {
        maxWidth: 150,
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 8,
    },
})