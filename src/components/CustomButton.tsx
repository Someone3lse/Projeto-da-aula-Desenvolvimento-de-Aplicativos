import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontSize, radius, spacing } from '../styles/theme';

type CustomButtonProps = {
    titulo: string;
    onPress: () => void;
};

export default function CustomButton({ titulo, onPress }: CustomButtonProps) {
    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <Text style={styles.texto}>{titulo}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        alignItems: 'center',
        marginTop: spacing.sm,
        width: '100%',
    },
    texto: {
        color: colors.surface,
        fontSize: fontSize.md,
        fontWeight: 'bold',
    },
});