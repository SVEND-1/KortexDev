// app/components/sections/FinalOffer.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface FinalOfferProps {
    onRequestClick: () => void;
    onContactClick: () => void;
}

export default function FinalOffer({ onRequestClick, onContactClick }: FinalOfferProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Готовы начать?
                </Text>

                <Text style={styles.subtitle}>
                    Создадим цифровой продукт, который будет приносить вам клиентов каждый день
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={onRequestClick}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>
                            Заказать разработку
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.outlineButton}
                        onPress={onContactClick}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.outlineButtonText}>
                            Связаться с нами
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        maxWidth: 800,
        width: '100%',
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 28 : 36,
        textAlign: 'center',
        marginBottom: 16,
        color: '#ffffff',
    },
    subtitle: {
        fontSize: width < 480 ? 14 : 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
        color: 'rgba(255,255,255,0.55)',
    },
    buttons: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 40,
        minWidth: width < 480 ? '100%' : 220,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#000000',
    },
    outlineButton: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: 'transparent',
        minWidth: width < 480 ? '100%' : 220,
        alignItems: 'center',
    },
    outlineButtonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
});