// app/components/common/GradientText.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

interface GradientTextProps {
    children: React.ReactNode;
    style?: any;
    colors?: string[];
}

export const GradientText: React.FC<GradientTextProps> = ({
                                                              children,
                                                              style,
                                                              colors = ['#ffffff', '#6D5CE8']
                                                          }) => {
    const { isDark } = useTheme();

    return (
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={[styles.text, style, { color: isDark ? '#fff' : '#000' }]}>
                {children}
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    text: {
        includeFontPadding: false,
    },
});