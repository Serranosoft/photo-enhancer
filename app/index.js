import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../src/utils/styles";
import Grid from "../src/layout/home/grid";
import Example from "../src/layout/home/example";
import Header from "../src/layout/header";
import { useFocusEffect } from "expo-router";
import { deleteRecordFromId, getAllRecords } from "../src/utils/sqlite";
import GridDeleteWrapper from "../src/layout/home/grid-delete-wrapper";



export default function Home() {

    const [records, setRecords] = useState([]);
    const [selected, setSelected] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchDb();
        }, [])
    );
    async function fetchDb() {
        const result = await getAllRecords();
        setRecords(result);
    }
    async function deleteRecords() {
        emptySelected();
        selected.forEach(async (record) => await deleteRecordFromId(record));
        fetchDb();
    }

    async function emptySelected() {
        setSelected([]);
    }

    return (
        <>
            <Header />
            <View style={[styles.container, selected.length > 0 && { paddingBottom: 80 }]}>
                <Grid {...{ records, setSelected, selected }} />
                { records.length < 1 && <Example /> }
                { selected.length > 0 && <GridDeleteWrapper {...{ selected, emptySelected, deleteRecords }} /> }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 8,
        backgroundColor: colors.primary,
        paddingVertical: 16,
    },
    deleteWrapper: {
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