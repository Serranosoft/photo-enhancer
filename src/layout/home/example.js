import { Image, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import Compare, { Before, After, Dragger } from 'react-native-before-after-slider-v2';

export default function Example() {
    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Text style={[ui.h4, { textAlign: "center" }]}>Rescata tus fotos y hazlas <Text style={{ color: colors.accent }}>brillar en alta calidad</Text></Text>
            </View>
            <Compare initial={75} draggerWidth={50} height={200} width={150} >
                <Before>
                    <Image style={styles.image} source={require("../../../assets/example-before.png")} />
                </Before>
                <After>
                    <Image style={styles.image} source={require("../../../assets/example-after.png")} />
                </After>
                <Dragger>
                    <View style={{ position: 'absolute', top: 0, right: 24, bottom: 0, left: 24, backgroundColor: colors.accent, opacity: .6 }}></View>
                    <View style={{ position: 'absolute', top: 100, left: 18, backgroundColor: colors.accent, opacity: .9, width: 15, height: 15, marginTop: -15, transform: [{ rotate: '45deg' }] }}></View>
                </Dragger>
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
    },
})