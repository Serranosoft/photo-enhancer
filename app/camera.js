import { CameraView, useCameraPermissions } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import GalleryIcon from '../src/icons/gallery';
import { colors, ui } from '../src/utils/styles';
import CreditsModal from '../src/layout/credits-modal';
import { canAnalyze } from '../src/utils/credits';
import * as ImagePicker from 'expo-image-picker';
import Header from '../src/layout/header';
import Button from '../src/components/button';
import * as FileSystem from 'expo-file-system';
import ImageCropPicker from 'react-native-image-crop-picker';

export default function Camera() {

    const [cameraActive, setCameraActive] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);

    const ref = useRef();
    const router = useRouter();

    // Gestión de modales
    const [activeModal, setActiveModal] = useState(null);
    const openModal = (name) => setActiveModal(name);
    const closeModal = () => setActiveModal(null);

    useFocusEffect(
        useCallback(() => {
            setImage(null);
            openCamera();
            return () => {
                setCameraActive(false);
            };
        }, [])
    );

    useEffect(() => {
        if (image) {
            openCropper();
        }
    }, [image])

    // Se está cargando el hook de permisos.
    if (!permission) {
        return <View />
    }

    // No ha aceptado los permisos.
    if (!permission.granted) {
        return (
            <>
                <Header back={true} />
                <View style={styles.permissionWrapper}>
                    <Text style={[ui.h4, { textAlign: "center", color: "#000" }]}>Para poder comenzar necesitamos abrir la cámara</Text>
                    <Button text="Abrir cámara" onClick={requestPermission} />
                </View>
            </>
        );
    }

    async function openCamera() {
        // Solicitar permisos
        requestPermission();
        // Activar cámara
        setCameraActive(true);
    }

    // Persistir la imagen en el dispositivo
    async function saveImagePermanently(tempUri) {
        const fileName = tempUri.split('/').pop();
        const newPath = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: tempUri, to: newPath });
        return newPath;
    };


    function openCropper() {
        ImageCropPicker.openCropper({
            path: decodeURIComponent(image.uri),
            width: 900,
            height: 1250,
            cropperToolbarTitle: "Recortar imagen",
            cropperToolbarWidgetColor: colors.accent,
            cropperToolbarColor: colors.primary,
            cropperStatusBarColor: colors.primary,
            cropperActiveWidgetColor: colors.accent,
            compressImageQuality: 1
        }).then(async (image) => {
            if (await canAnalyze()) {
                const persistentPath = await saveImagePermanently(image.path);
                image.path = persistentPath;
                router.navigate({ pathname: "/result", params: { image: JSON.stringify(image) } });
            } else {
                openModal("credits");
            }
        });
    }

    async function takePicture() {
        const photo = await ref.current?.takePictureAsync();
        photo.uri = encodeURIComponent(photo.uri);
        setImage(photo);
    }

    // Abre la galería
    async function openGallery() {
        // Solicitar permisos
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permiso denegado", "Necesitas habilitar los permisos para continuar");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            result.assets[0].uri = encodeURIComponent(result.assets[0].uri);
            setImage(result.assets[0]);
        }
    }
    return (
        <>
            <Header back={true} />
            <View style={styles.container}>
                {cameraActive &&
                    <CameraView style={styles.camera} facing={"back"} ref={ref} flash={"on"}>

                        <View style={styles.instructions}>
                            <Text style={[ui.text, { textAlign: "center", fontFamily: "ancizar-bold", color: "#000" }]}>Mantén la cámara enfocada sobre la imagen</Text>
                        </View>

                        <TouchableOpacity style={styles.takePicture} onPress={takePicture}>
                            <View style={styles.takePictureInner}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.gallery} onPress={openGallery}>
                            <GalleryIcon />
                        </TouchableOpacity>

                    </CameraView>
                }
            </View>
            {activeModal === "credits" && <CreditsModal isOpen={activeModal === "credits"} closeModal={closeModal} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        position: "relative",
        flex: 1,
    },

    instructions: {
        position: "absolute",
        top: 24,
        left: "50%",
        transform: [{
            translateX: "-50%"
        }],
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 100,
        backgroundColor: colors.accent,
    },
    takePicture: {
        width: 75,
        height: 75,
        borderRadius: 100,
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: [{
            translateX: "-50%"
        }]
    },
    takePictureInner: {
        width: 65,
        height: 65,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: colors.accent,
        position: "absolute",
        bottom: 5,
        left: "50%",
        transform: [{
            translateX: "-50%"
        }]
    },
    reverse: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        right: 24,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 100,
        padding: 24
    },
    gallery: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        left: 24,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderRadius: 100,
        padding: 24

    },
    
    preview: {
        position: "absolute",
        bottom: 40,
        right: 12,
    },

    previewImg: {
        width: 115,
        height: 115,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fff"
    },

    permissionWrapper: {
        padding: 16,
        marginVertical: "auto",
        marginHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: colors.secondary,
        gap: 16,
    }

})