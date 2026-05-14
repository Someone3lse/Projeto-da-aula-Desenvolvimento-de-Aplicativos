import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { colors, fontSize, radius, spacing } from '../styles/theme';
import { Ocorrencia } from '../../App';
import { mostrarToast } from '../components/ToastMensagem';

type Props = {
  adicionarOcorrencia: (novaOcorrencia: Omit<Ocorrencia, 'id'>) => void;
};

export default function NovaOcorrenciaScreen({ adicionarOcorrencia }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');

function salvarOcorrencia() {
  if (!titulo.trim() || !descricao.trim() || !local.trim()) {
    mostrarToast(
      'error',
      'Erro ao salvar',
      'Preencha todos os campos antes de continuar.'
    );

    return;
  }

  adicionarOcorrencia({
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    local: local.trim(),
  });

  mostrarToast(
    'success',
    'Ocorrência cadastrada',
    'A ocorrência foi salva com sucesso.'
  );

  setTitulo('');

  setDescricao('');

  setLocal('');

}
  return (
    <View style={styles.container}>
      <Header
        titulo="Nova Ocorrência"
        subtitulo="Preencha os dados abaixo para cadastrar uma nova ocorrência."
      />

      <View style={styles.formBox}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Buraco na avenida principal"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMaior]}
          placeholder="Descreva o problema encontrado"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Centro"
          value={local}
          onChangeText={setLocal}
        />
        
      </View>
      <CustomButton titulo="Salvar Ocorrência" onPress={salvarOcorrencia} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
  },

  formBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },

  label: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
 
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm + 2,
    fontSize: fontSize.md,
    color: colors.text,
  },
 
  inputMaior: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

