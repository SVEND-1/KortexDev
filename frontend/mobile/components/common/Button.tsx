// app/components/common/Button.tsx
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  onPress,
                                                  variant = 'primary',
                                                  loading = false,
                                                  disabled = false,
                                                  style,
                                                  textStyle,
                                              }) => {
    const { isDark } = useTheme();

    const getButtonStyle = (): ViewStyle => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: isDark ? '#ffffff' : '#000000',
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                };
            default:
                return {
                    backgroundColor: 'transparent',
                };
        }
    };

    const getTextStyle = (): TextStyle => {
        switch (variant) {
            case 'primary':
                return {
                    color: isDark ? '#000000' : '#ffffff',
                };
            default:
                return {
                    color: isDark ? '#ffffff' : '#000000',
                };
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style, disabled && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={isDark ? '#000' : '#fff'} />
            ) : (
                <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'JetBrainsMono_600SemiBold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    disabled: {
        opacity: 0.5,
    },
});