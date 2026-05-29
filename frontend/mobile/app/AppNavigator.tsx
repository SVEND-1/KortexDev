import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../contexts/ThemeContext';

// Экраны (пока заглушки, потом заменим на реальные компоненты)
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ContactScreen from '../screens/ContactScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { isDark } = useTheme();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: isDark ? '#000000' : '#ffffff',
                        borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                    tabBarActiveTintColor: isDark ? '#ffffff' : '#000000',
                    tabBarInactiveTintColor: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                }}
            >
                <Tab.Screen name="Главная" component={HomeScreen} />
                <Tab.Screen name="Услуги" component={ServicesScreen} />
                <Tab.Screen name="Проекты" component={PortfolioScreen} />
                <Tab.Screen name="Контакты" component={ContactScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}