// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { ThemeProvider } from './contexts/ThemeContext';
import AppNavigator from './app/AppNavigator';
import { useCustomFonts } from '../mobile/components/hooks/useFonts';

export default function App() {
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <StatusBar style="light" />
                <AppNavigator />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}