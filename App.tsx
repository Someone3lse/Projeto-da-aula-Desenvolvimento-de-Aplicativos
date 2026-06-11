import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/srceens/HomeScreen';
import NovaOcorrenciaScreen from './src/srceens/NovaOcorrenciaScreen';
import ListaOcorrenciasScreen from './src/srceens/ListaOcorrenciasScreen';
import { colors, fontSize } from './src/styles/theme';

import {
  criarOcorrencia,
  listarOcorrenciasPorSlug,
  SLUG_ALUNO,
  deletarOcorrencia,
  atualizarOcorrencia,
} from './src/services/api';

export type Ocorrencia = {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export type RootTabParamList = {
  Home: undefined;
  NovaOcorrencia: undefined;
  ListaOcorrencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {

  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(false);
  useEffect(() => {
    carregarOcorrenciasDaApi();
  }, []);

  /* NOVO: remove uma ocorrência pela API
 A API usa Soft Delete, preenchendo deleted_at.
 No app, removemos o item da lista para atualizar a interface. */
  async function removerOcorrencia(id: string) {
    try {
      await deletarOcorrencia(id);
      setOcorrencias((valorAtual) =>
        valorAtual.filter((ocorrencia) => ocorrencia.id !== id)
      );
    } catch (error) {
      console.log('Erro ao remover ocorrência:', error);
      throw error;
    }
  }

  /* NOVO: atualiza uma ocorrência pela API */
  async function editarOcorrencia(
    id: string,
    dadosAtualizados: Omit<
      Ocorrencia,
      'id' | 'slug' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >
  ) {
    try {
      const ocorrenciaAtualizada = await atualizarOcorrencia(
        id,
        dadosAtualizados
      );
      setOcorrencias((valorAtual) =>
        valorAtual.map((ocorrencia) =>
          ocorrencia.id === id ? ocorrenciaAtualizada : ocorrencia
        )
      );
    } catch (error) {
      console.log('Erro ao editar ocorrência:', error);
      throw error;
    }
  }

  async function carregarOcorrenciasDaApi() {
    try {
      setCarregando(true);

      const dados = await listarOcorrenciasPorSlug(SLUG_ALUNO);
      setOcorrencias(dados);
    } catch (error) {
      console.log('Erro ao carregar ocorrências da API:', error);
    } finally {
      setCarregando(false);
    }
  }

  async function adicionarOcorrencia(novaOcorrencia: Omit<Ocorrencia, 'id'>) {
    const ocorrenciaCriada = await criarOcorrencia({
      titulo: novaOcorrencia.titulo,
      descricao: novaOcorrencia.descricao,
      local: novaOcorrencia.local,
      slug: SLUG_ALUNO,
    });
    setOcorrencias((valorAtual) => [ocorrenciaCriada, ...valorAtual]);
  }

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textLight,
            tabBarStyle: {
              height: 65,
              paddingBottom: 8,
              paddingTop: 8,
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },

            tabBarLabelStyle: {
              fontSize: 12,
            },

            tabBarIcon: ({ color, size, focused }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'NovaOcorrencia') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'ListaOcorrencias') {
                iconName = focused ? 'list' : 'list-outline';
              }

              return (
                <Ionicons
                  name={iconName}
                  size={size ?? fontSize.lg}
                  color={color}
                />
              );
            },
          })}
        >

          <Tab.Screen
            name="Home"
            options={{ title: 'Início' }}
          >
            {() => (
              <HomeScreen
                ocorrencias={ocorrencias}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="NovaOcorrencia"
            options={{ title: 'Nova' }}
          >
            {() => (
              <NovaOcorrenciaScreen
                adicionarOcorrencia={adicionarOcorrencia}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="ListaOcorrencias"
            options={{ title: 'Lista' }}
          >
            {() => (
              <Tab.Screen name="ListaOcorrencias" options={{ title: 'Lista' }}>
                {() => (
                  <ListaOcorrenciasScreen
                    ocorrencias={ocorrencias}
                    carregando={carregando}
                    removerOcorrencia={removerOcorrencia}
                    editarOcorrencia={editarOcorrencia}
                  />
                )}
              </Tab.Screen>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
}