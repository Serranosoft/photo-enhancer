import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ui } from "../utils/styles";

export default function CreditsModal({ isOpen, closeModal }) {
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => { closeModal() }}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => closeModal(false)}>
                        <Text style={[ui.h4, { alignSelf: "flex-end" }]}>&#10006;</Text>
                    </TouchableOpacity>
                    <View style={styles.header}>
                        <Image source={require("../../assets/info.png")} style={styles.icon} />
                        <Text style={ui.h4}>Servicio temporalmente saturado</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={ui.text}>Estamos experimentando un alto volumen de solicitudes en este momento. Por favor, espere unos minutos e inténtelo nuevamente. ¡Gracias por su paciencia!</Text>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    wrapper: {
        width: "90%",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 24,
        gap: 8,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    content: {
        marginTop: 16,
        gap: 16
    }
})