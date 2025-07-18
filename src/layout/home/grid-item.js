import { Dimensions, Image, StyleSheet, View } from "react-native";
import { colors } from "../../utils/styles";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useEffect, useState } from "react";
import { router } from "expo-router";
import Compare, { Before, After, Dragger } from 'react-native-before-after-slider-v2';
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";

const deviceWidth = Dimensions.get("screen").width;
const BOX_PADDING = 8;


export default function GridItem({ item, index, setSelected, selected, CONTAINER_TOTAL_PADDING, WRAPPER_GAP  }) {

    const BOX_WIDTH = (deviceWidth - CONTAINER_TOTAL_PADDING - WRAPPER_GAP) / 2;
    const IMAGE_WIDTH = (deviceWidth - CONTAINER_TOTAL_PADDING - WRAPPER_GAP - BOX_PADDING) / 2;

    const [isSelected, setIsSelected] = useState(false);

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (selected.length < 1) setIsSelected(false);
    }, [selected])

    useEffect(() => {
        if (isSelected) {
            scale.value = withSpring(0.94, {
                damping: 10,
                stiffness: 120,
            });
        } else {
            scale.value = withSpring(1, {
                damping: 3,
                stiffness: 350,
            });
        }
    }, [isSelected])

    function highlight() {
        if (selected.includes(item.id)) {
            const updatedSelected = selected.filter(record => record !== item.id);
            setSelected(updatedSelected);
        } else {
            setSelected((selected) => [...selected, item.id]);
        }
        setIsSelected(!isSelected);
    }

    function onPress() {
        if (selected.length > 0) {
            highlight();
        } else {
            router.navigate({ pathname: "/result", params: { id: item.id } });
        }
    }

    return (
        <TouchableWithoutFeedback key={index} onLongPress={highlight} onPress={() => onPress()}>
            <Animated.View style={[
                styles.box, 
                isSelected && styles.selected, 
                animatedStyle,
                { padding: BOX_PADDING, width: BOX_WIDTH }
                ]}>
                <Compare initial={((deviceWidth / 2) - 16 - 16) / 2} draggerWidth={50} height={230 - (BOX_PADDING * 2)} width={((deviceWidth - 48) / 2) - 16}>
                    <Before>
                        <Image style={[styles.image, { width: IMAGE_WIDTH }]} source={{ uri: item.old_image }} />
                    </Before>
                    <After>
                        <Image style={[styles.image, { width: IMAGE_WIDTH }]} source={{ uri: item.new_image }} />
                    </After>
                    <Dragger>
                        <View style={{ position: 'absolute', top: 0, right: 24, bottom: 0, left: 24, backgroundColor: colors.accent, opacity: .6 }}></View>
                        <View style={{ position: 'absolute', top: 117, left: 18, backgroundColor: colors.accent, opacity: .9, width: 15, height: 15, marginTop: -15, transform: [{ rotate: '45deg' }] }}></View>
                    </Dragger>
                </Compare>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    box: {
        backgroundColor: colors.secondary,
        borderRadius: 8,
        height: 230,
    },

    image: {
        height: 230 - BOX_PADDING
    },

    selected: {
        backgroundColor: colors.accent,
        transform: [{ scale: 0.94 }],
    }
})