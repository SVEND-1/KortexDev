// app/components/sections/Contact.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface ContactProps {
    onRequestClick: () => void;
}

export default function Contact({ onRequestClick }: ContactProps) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.tagWrapper}>
                    <Text style={styles.tag}>Контакты</Text>
                </View>

                <Text style={styles.title}>
                    Давайте
                </Text>

                <Text style={styles.titleGradient}>
                    обсудим проект
                </Text>

                <Text style={styles.subtitle}>
                    Оставьте заявку — мы свяжемся с вами в течение 15 минут
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={onRequestClick}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.primaryButtonText}>
                            Оставить заявку →
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.outlineButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.outlineButtonText}>
                            hello@kortex.dev
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.socialLinks}>
                    <TouchableOpacity>
                        <Text style={styles.socialLinkText}>Telegram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.socialLinkText}>VK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 80,
        alignItems: 'center',
    },
    tagWrapper: {
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    tag: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        color: '#ffffff',
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 36 : 52,
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: width < 480 ? 40 : 56,
        color: '#ffffff',
    },
    titleGradient: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: width < 480 ? 36 : 52,
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: width < 480 ? 40 : 56,
        color: '#ffffff',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        maxWidth: 420,
        color: 'rgba(255,255,255,0.55)',
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 48,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 40,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#000000',
    },
    outlineButton: {
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    outlineButtonText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#ffffff',
    },
    socialLinks: {
        flexDirection: 'row',
        gap: 32,
    },
    socialLinkText: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(255,255,255,0.55)',
    },
});