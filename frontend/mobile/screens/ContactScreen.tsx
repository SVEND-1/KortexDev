// app/screens/ContactScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Alert,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { api } from '../utils/api/api';

export default function ContactScreen() {
    const { isDark } = useTheme();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [requestType, setRequestType] = useState<'TG' | 'VK'>('TG');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async () => {
        if (!name.trim() || !username.trim()) {
            Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
            return;
        }

        setLoading(true);
        try {
            await api.createRequest({ name, username, requestType });
            Alert.alert('Успешно!', 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            setName('');
            setUsername('');
            setShowForm(false);
        } catch (error) {
            Alert.alert('Ошибка', 'Не удалось отправить заявку. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialPress = (type: 'tg' | 'vk') => {
        const url = type === 'tg'
            ? 'https://t.me/kortexdev'
            : 'https://vk.com/kortexdev';
        Linking.openURL(url).catch(() => {
            Alert.alert('Ошибка', `Не удалось открыть ${type.toUpperCase()}`);
        });
    };

    const handleEmailPress = () => {
        Linking.openURL('mailto:hello@kortex.dev').catch(() => {
            Alert.alert('Ошибка', 'Не удалось открыть почтовое приложение');
        });
    };

    const handlePhonePress = () => {
        Linking.openURL('tel:+79991234567').catch(() => {
            Alert.alert('Ошибка', 'Не удалось открыть телефонное приложение');
        });
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: isDark ? '#000000' : '#ffffff' }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.tag, { color: isDark ? '#fff' : '#000' }]}>Контакты</Text>
                </View>

                {/* Main Title */}
                <View style={styles.titleSection}>
                    <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
                        Давайте
                    </Text>
                    <Text style={[styles.titleGradient, { color: isDark ? '#fff' : '#000' }]}>
                        обсудим проект
                    </Text>
                </View>

                <Text style={[styles.subtitle, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                    Оставьте заявку — мы свяжемся с вами в течение 15 минут
                </Text>

                {/* Quick Contact Buttons */}
                <View style={styles.quickButtons}>
                    <Button
                        title="Оставить заявку →"
                        onPress={() => setShowForm(!showForm)}
                        variant="primary"
                        style={styles.requestButton}
                    />
                    <Button
                        title="hello@kortex.dev"
                        onPress={handleEmailPress}
                        variant="outline"
                        style={styles.emailButton}
                    />
                </View>

                {/* Request Form */}
                {showForm && (
                    <Card style={styles.formCard}>
                        <Text style={[styles.formTitle, { color: isDark ? '#fff' : '#000' }]}>
                            Заполните форму
                        </Text>

                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                    color: isDark ? '#fff' : '#000',
                                },
                            ]}
                            placeholder="Ваше имя"
                            placeholderTextColor={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                            value={name}
                            onChangeText={setName}
                        />

                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                    color: isDark ? '#fff' : '#000',
                                },
                            ]}
                            placeholder="Юзернейм (без @)"
                            placeholderTextColor={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
                            value={username}
                            onChangeText={setUsername}
                        />

                        <View style={styles.radioGroup}>
                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    requestType === 'TG' && styles.radioActive,
                                    {
                                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                                        backgroundColor: requestType === 'TG' && !isDark ? '#000' : 'transparent',
                                    },
                                ]}
                                onPress={() => setRequestType('TG')}
                            >
                                <View style={[styles.radioDot, requestType === 'TG' && styles.radioDotActive]} />
                                <Text style={[styles.radioText, { color: isDark ? '#fff' : '#000' }]}>
                                    Telegram
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.radioButton,
                                    requestType === 'VK' && styles.radioActive,
                                    {
                                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                                        backgroundColor: requestType === 'VK' && !isDark ? '#000' : 'transparent',
                                    },
                                ]}
                                onPress={() => setRequestType('VK')}
                            >
                                <View style={[styles.radioDot, requestType === 'VK' && styles.radioDotActive]} />
                                <Text style={[styles.radioText, { color: isDark ? '#fff' : '#000' }]}>
                                    ВКонтакте
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Button
                            title={loading ? 'Отправка...' : 'Отправить заявку →'}
                            onPress={handleSubmit}
                            variant="primary"
                            loading={loading}
                            style={styles.submitButton}
                        />
                    </Card>
                )}

                {/* Contact Info Cards */}
                <View style={styles.infoGrid}>
                    <Card style={styles.infoCard}>
                        <Text style={styles.infoIcon}>📧</Text>
                        <Text style={[styles.infoTitle, { color: isDark ? '#fff' : '#000' }]}>
                            Email
                        </Text>
                        <TouchableOpacity onPress={handleEmailPress}>
                            <Text style={[styles.infoValue, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>
                                hello@kortex.dev
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={styles.infoCard}>
                        <Text style={styles.infoIcon}>📱</Text>
                        <Text style={[styles.infoTitle, { color: isDark ? '#fff' : '#000' }]}>
                            Телефон
                        </Text>
                        <TouchableOpacity onPress={handlePhonePress}>
                            <Text style={[styles.infoValue, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>
                                +7 (999) 123-45-67
                            </Text>
                        </TouchableOpacity>
                    </Card>
                </View>

                {/* Social Links */}
                <View style={styles.socialSection}>
                    <Text style={[styles.socialTitle, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                        Мы в соцсетях
                    </Text>
                    <View style={styles.socialLinks}>
                        <TouchableOpacity
                            style={[styles.socialLink, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }]}
                            onPress={() => handleSocialPress('tg')}
                        >
                            <Text style={[styles.socialLinkText, { color: isDark ? '#fff' : '#000' }]}>Telegram</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.socialLink, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }]}
                            onPress={() => handleSocialPress('vk')}
                        >
                            <Text style={[styles.socialLinkText, { color: isDark ? '#fff' : '#000' }]}>VK</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Working Hours */}
                <Card style={styles.hoursCard}>
                    <Text style={[styles.hoursTitle, { color: isDark ? '#fff' : '#000' }]}>
                        🕐 Режим работы
                    </Text>
                    <Text style={[styles.hoursText, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                        Пн-Пт: 10:00 - 20:00
                    </Text>
                    <Text style={[styles.hoursText, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                        Сб-Вс: по договоренности
                    </Text>
                </Card>

                {/* Map Placeholder */}
                <Card style={styles.mapCard}>
                    <Text style={[styles.mapTitle, { color: isDark ? '#fff' : '#000' }]}>
                        📍 Офис
                    </Text>
                    <Text style={[styles.mapText, { color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }]}>
                        г. Москва, ул. Тверская, д. 1
                    </Text>
                    <View style={[styles.mapPlaceholder, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                        <Text style={[styles.mapPlaceholderText, { color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }]}>
                            🗺️ Карта загружается...
                        </Text>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    tag: {
        fontFamily: 'JetBrainsMono_500Medium',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    titleSection: {
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 42,
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 48,
    },
    titleGradient: {
        fontFamily: 'Orbitron_700Bold',
        fontSize: 42,
        textTransform: 'uppercase',
        textAlign: 'center',
        lineHeight: 48,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    quickButtons: {
        gap: 12,
        marginBottom: 24,
    },
    requestButton: {
        width: '100%',
    },
    emailButton: {
        width: '100%',
    },
    formCard: {
        marginBottom: 24,
        gap: 16,
    },
    formTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_400Regular',
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 12,
    },
    radioButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    radioActive: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    radioDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    radioDotActive: {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
    },
    radioText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    submitButton: {
        marginTop: 8,
    },
    infoGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    infoCard: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    infoIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    infoTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 14,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 12,
        fontFamily: 'SpaceGrotesk_400Regular',
        textDecorationLine: 'underline',
    },
    socialSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    socialTitle: {
        fontSize: 14,
        marginBottom: 12,
    },
    socialLinks: {
        flexDirection: 'row',
        gap: 16,
    },
    socialLink: {
        borderWidth: 1,
        borderRadius: 40,
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    socialLinkText: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    hoursCard: {
        marginBottom: 16,
        alignItems: 'center',
    },
    hoursTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 16,
        marginBottom: 12,
    },
    hoursText: {
        fontSize: 14,
        marginBottom: 4,
    },
    mapCard: {
        marginBottom: 16,
    },
    mapTitle: {
        fontFamily: 'Orbitron_600SemiBold',
        fontSize: 16,
        marginBottom: 8,
    },
    mapText: {
        fontSize: 14,
        marginBottom: 16,
    },
    mapPlaceholder: {
        height: 120,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholderText: {
        fontSize: 12,
    },
});