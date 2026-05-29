// app/components/common/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    pressed?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, pressed = false }) => {
    const { isDark } = useTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
                },
                pressed && styles.pressed,
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        overflow: 'hidden',
    },
    pressed: {
        transform: [{ translateY: -4 }],
    },
});