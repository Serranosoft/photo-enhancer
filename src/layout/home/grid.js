import { Dimensions, Image,  ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { router } from "expo-router";
import GridItem from "./grid-item";

const deviceWidth = Dimensions.get("window").width;

const CONTAINER_PADDING = 16;
const WRAPPER_GAP = 12;

const CONTAINER_TOTAL_PADDING = CONTAINER_PADDING * 2;
const BOX_WIDTH = (deviceWidth - CONTAINER_TOTAL_PADDING - WRAPPER_GAP) / 2;


export default function Grid({ records, setSelected, selected }) {


    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.wrapper}>
                <TouchableOpacity
                    style={[styles.box, { justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "#fff" }]}
                    onPress={() => router.push("/camera")}
                >
                    <Image source={require("../../../assets/plus-dark.png")} style={styles.add} />
                    <Text style={ui.text}>Añadir nueva foto</Text>
                </TouchableOpacity>
                {
                    records && records.length > 0 ?
                        records.map((item, index) => {
                            return (
                                <GridItem {...{ item, index, setSelected, selected, CONTAINER_TOTAL_PADDING, WRAPPER_GAP }} />
                            )
                        })
                        :
                        [1, 2, 3, 4, 5].map((_, index) => {
                            return (
                                <View key={index} style={[styles.box, { height: 150 }]}></View>
                            )
                        })
                }

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        padding: CONTAINER_PADDING,
        alignItems: "center",
    },
    
    wrapper: {
        flexDirection: "row",
        gap: WRAPPER_GAP,
        flexWrap: "wrap",
    },
    box: {
        width: BOX_WIDTH,
        backgroundColor: colors.secondary,
        borderRadius: 8,
    },
    add: {
        width: 48,
        height: 48,
    }
})