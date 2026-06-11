import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, fontSize, radius, spacing } from '../styles/theme';

type OccurrenceCardProps = {
    id: string;
    titulo: string;
    descricao: string;
    local: string;
    onRemover: (id: string) => Promise<void>;
    onEditar: (
        id: string,
        dadosAtualizados: {
            titulo: string;
            descricao: string;
            local: string;
        }
    ) => Promise<void>;
};


export default function OccurrenceCard({
    id,
    titulo,
    descricao,
    local,
    onRemover,
    onEditar,
}: OccurrenceCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.topo}>
                <Ionicons name="alert-circle-outline" size={22} color={colors.primary} />
                <Text style={styles.titulo}>{titulo}</Text>
            </View>

            <Text style={styles.descricao}>{descricao}</Text>

            <View style={styles.rodape}>
                <Ionicons name="location-outline" size={18} color={colors.textLight} />
                <Text style={styles.local}>{local}</Text>
            </View>

            <View style={styles.acoes}>
                <Text
                    style={styles.botaoEditar}
                    onPress={() =>
                        onEditar(id, {
                            titulo: titulo + ' (editado)',
                            descricao,
                            local,
                        })
                    }
                >
                    Editar
                </Text>

                <Text
                    style={styles.botaoExcluir}
                    onPress={() => onRemover(id)}
                >
                    Excluir
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    topo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    titulo: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: colors.text,
        marginLeft: spacing.xs,
    },
    descricao: {
        fontSize: fontSize.md,
        color: colors.textLight,
        lineHeight: 22,
        marginBottom: spacing.sm,
    },
    rodape: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    local: {
        fontSize: fontSize.sm,
        color: colors.textLight,
        marginLeft: spacing.xs,
    },
    acoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.md,
    },
    botaoEditar: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    botaoExcluir: {
        color: colors.danger,
        fontWeight: 'bold',
    },
});