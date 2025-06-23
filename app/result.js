import { router, useLocalSearchParams } from "expo-router";
import { Alert, Dimensions, Image, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../src/utils/styles";
import { useEffect, useState } from "react";
import Header from "../src/layout/header";
import LottieView from 'lottie-react-native';
import CreditsModal from "../src/layout/credits-modal";
import Compare, { Before, After, Dragger } from 'react-native-before-after-slider-v2';
import { getRecordFromId, insertRecord } from "../src/utils/sqlite";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { convertDateToString } from "../src/utils/date";
import * as MediaLibrary from 'expo-media-library';
import { subtractCredit } from "../src/utils/credits";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const CONTAINER_PADDING = 16;
const CONTAINER_GAP = 16;
const ACTIONS_VERTICAL_PADDING = 12;
const BUTTON_PADDING = 8;
const ICON_SIZE = 25;

const CONTAINER_TOTAL_PADDING = CONTAINER_PADDING * 2;
const IMAGE_WIDTH = (deviceWidth - CONTAINER_TOTAL_PADDING);

export default function Result() {

    const params = useLocalSearchParams();

    const [record, setRecord] = useState({ id: null, old_image: null, new_image: null, filename: null });
    const [isSaved, setIsSaved] = useState(false);
    const [textHeight, setTextHeight] = useState(null);

    const [imageHeight, setImageHeight] = useState(null);
    useEffect(() => {
        if (textHeight) {
            const IMAGE_HEIGHT = deviceHeight - CONTAINER_TOTAL_PADDING - CONTAINER_GAP - (40 + 32 + 2) - (ACTIONS_VERTICAL_PADDING * 2) - (BUTTON_PADDING * 2) - ICON_SIZE - textHeight;
            setImageHeight(IMAGE_HEIGHT);
        }
    }, [textHeight])

    // Gestión de modales
    const [activeModal, setActiveModal] = useState(null);
    const openModal = (name) => setActiveModal(name);
    const closeModal = () => setActiveModal(null);

    useEffect(() => {
        if (record.new_image && !isSaved) {
            saveResult();
        }
    }, [record])

    useEffect(() => {
        init();
    }, [])

    async function init() {
        if (!params.id) {
            const photo = JSON.parse(params.image);
            analyze(photo);
        } else {
            fetchRecord(params.id);
        }
    }

    // Guardar resultado
    async function saveResult() {
        setIsSaved(true); // Registrar flag
        const id = await insertRecord(record.old_image, record.new_image, record.filename, convertDateToString(new Date())); // Recuperar id del item guardado
        setRecord(prev => ({ ...prev, id: id }));
    }

    // Recuperar registro dado un id
    async function fetchRecord(id) {
        setIsSaved(true); // Flag para no persistir

        // Recuperar registro y settear valores
        const result = await getRecordFromId(id);
        setRecord({ id: id, old_image: result.old_image, new_image: result.new_image, filename: result.filename });
    }

    async function analyze(photo) {
        const formData = new FormData();
        formData.append('image', {
            uri: photo.path,
            type: photo.mime,
            name: photo.filename,
        });
        try {
            const response = await fetch('https://replicate-proxy-seven.vercel.app/api/photo-enhancer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const responseText = await response.text();

            if (!response.ok) {
                console.error("Server returned error:", response.status, responseText);
                return;
            }
            const data = JSON.parse(responseText);
            console.log(data);
            setRecord(prev => ({ ...prev, old_image: photo.path, new_image: data.output, filename: photo.filename }));
        } catch (error) {
            console.log(error);
            openModal("credits");
        } finally {
            subtractCredit();
        }
    }

    async function share() {
        const imageUrl = record.new_image;
        const fileUri = FileSystem.documentDirectory + `colorize-${record.filename}.png`;
        const download = await FileSystem.downloadAsync(imageUrl, fileUri);
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(download.uri);
        } else {
            alert('Compartir no está disponible en este dispositivo');
        }
    }

    function changeImage() {
        router.back();
    }

    async function requestPermissions() {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync(false, ["photo"]);
            if (status === "granted") {
                downloadImage();
            } else {
                if (Platform.OS === "android") {
                    ToastAndroid.showWithGravityAndOffset(
                        "No tengo permisos para acceder a la galería de su dispositivo",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                    );
                } else {
                    Alert.alert("No tengo permisos para acceder a la galería de su dispositivo");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function downloadImage() {
        try {
            const { uri } = await FileSystem.downloadAsync(record.new_image, FileSystem.documentDirectory + `${record.filename}.jpg`);

            // Agregar la imagen al álbum
            const asset = await MediaLibrary.createAssetAsync(uri);

            // Obtener el álbum existente o crearlo
            let album = await MediaLibrary.getAlbumAsync("Recuerdos a color");
            if (!album) {
                album = await MediaLibrary.createAlbumAsync("Recuerdos a color", asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }

            if (Platform.OS === "android") {
                ToastAndroid.showWithGravityAndOffset(
                    "Imagen guardada en tu Galería ",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } else {
                Alert.alert("Imagen guardada en tu Galería");
            }



        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header
                title="Resultado"
                back={true}
            />
            <View style={styles.container}>


                <View style={styles.wrapper}>
                    {
                        imageHeight && record.new_image !== null ?
                            <View>
                                <Compare initial={(deviceWidth - 32) / 2} draggerWidth={50} height={imageHeight} width={(deviceWidth - 32)}>
                                    <Before>
                                        <Image style={[styles.image, { height: imageHeight }]} source={{ uri: record.old_image }} />
                                    </Before>
                                    <After>
                                        <Image style={[styles.image, { height: imageHeight }]} source={{ uri: record.new_image }} />
                                    </After>
                                    <Dragger>
                                        <View style={{ position: 'absolute', top: 0, right: 24, bottom: 0, left: 24, backgroundColor: colors.accent, opacity: 1 }}></View>
                                        <View style={{ position: 'absolute', top: imageHeight / 2, left: 10, backgroundColor: colors.accent, opacity: 1, width: 30, height: 30, marginTop: -15, transform: [{ rotate: '45deg' }] }}></View>
                                    </Dragger>
                                </Compare>
                            </View>
                            :
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <LottieView source={require("../assets/lottie/magic-wand.json")} style={styles.lottie} loop={true} autoPlay={true} />
                            </View>
                    }

                </View>
                {
                    record.old_image && record.new_image !== null &&
                    <View style={styles.actions}>
                        <View style={styles.action}>
                            <TouchableOpacity onPress={share} style={styles.button}>
                                <Image style={styles.icon} source={require("../assets/share-dark.png")} />
                            </TouchableOpacity>
                            <Text style={ui.h5} onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}>Compartir</Text>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity onPress={() => changeImage()} style={styles.button}>
                                <Image style={styles.icon} source={require("../assets/picture-dark.png")} />
                            </TouchableOpacity>
                            <Text style={ui.h5}>Cambiar</Text>
                        </View>
                        <View style={[styles.action, { marginLeft: "auto" }]}>
                            <TouchableOpacity onPress={() => requestPermissions()} style={styles.button}>
                                <Image style={styles.icon} source={require("../assets/download-dark.png")} />
                            </TouchableOpacity>
                            <Text style={ui.h5}>Descargar</Text>
                        </View>
                    </View>
                }

            </View>
            {activeModal === "credits" && <CreditsModal isOpen={activeModal === "credits"} closeModal={closeModal} />}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        backgroundColor: colors.primary,
        padding: CONTAINER_PADDING,
    },
    wrapper: {
        flex: 1,
        position: "relative",
    },
    image: {
        width: IMAGE_WIDTH,
    },

    actions: {
        paddingVertical: ACTIONS_VERTICAL_PADDING,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        borderTopWidth: 2,
        borderColor: colors.accent,
        // height: (ACTIONS_VERTICAL_PADDING * 2) + (BUTTON_PADDING * 2) + ICON_SIZE,
    },

    action: {
        alignItems: "center",
        gap: 4,
    },

    button: {
        padding: BUTTON_PADDING,
        borderRadius: 100,
        backgroundColor: colors.accent,
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
    lottie: {
        width: "80%",
        height: "80%",
    },

})