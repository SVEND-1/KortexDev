// app/hooks/useFonts.ts
import { useFonts } from 'expo-font';
import {
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_600SemiBold,
    Orbitron_700Bold,
    Orbitron_800ExtraBold,
    Orbitron_900Black,
} from '@expo-google-fonts/orbitron';
import {
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_600SemiBold,
    JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import {
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

export function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        Orbitron_400Regular,
        Orbitron_500Medium,
        Orbitron_600SemiBold,
        Orbitron_700Bold,
        Orbitron_800ExtraBold,
        Orbitron_900Black,
        JetBrainsMono_400Regular,
        JetBrainsMono_500Medium,
        JetBrainsMono_600SemiBold,
        JetBrainsMono_700Bold,
        SpaceGrotesk_300Light,
        SpaceGrotesk_400Regular,
        SpaceGrotesk_500Medium,
        SpaceGrotesk_600SemiBold,
        SpaceGrotesk_700Bold,
    });

    return fontsLoaded;
}