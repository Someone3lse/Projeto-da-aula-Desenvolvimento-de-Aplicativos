import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import OccurrenceCard from '../components/OccurrenceCard';
import { colors, fontSize, spacing } from '../styles/theme';
import { Ocorrencia } from '../../App';

type Props = {
  ocorrencias: Ocorrencia[];
  carregando: boolean;
  removerOcorrencia: (id: string) => Promise<void>;
  editarOcorrencia: (
    id: string,
    dadosAtualizados: Omit<
      Ocorrencia,
      'id' | 'slug' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >
  ) => Promise<void>;
};

export default function ListaOcorrenciasScreen({
  ocorrencias,
  carregando,
  removerOcorrencia,
  editarOcorrencia,
}: Props) {

  return (
    <View style={styles.container}>
      <Header
        titulo="Lista de Ocorrências"
        subtitulo="As ocorrências cadastradas aparecerão abaixo."
      />
      {carregando ? (
        <View style={styles.vazioBox}>
          <Text style={styles.vazioTexto}>
            Carregando ocorrências...
          </Text>
        </View>
      )
        : ocorrencias.length === 0 ? (

          <View style={styles.vazioBox}>
            <Text style={styles.vazioTexto}>
              Nenhuma ocorrência cadastrada até o momento.
            </Text>
          </View>

        ) : (

          <FlatList
            data={ocorrencias}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (

              <OccurrenceCard
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
                local={item.local}
                onRemover={removerOcorrencia}
                onEditar={editarOcorrencia}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  vazioBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.lg,
  },

  vazioTexto: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
  },
});