import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/screens/HomeScreen';
import NovaOcorrenciaScreen from './src/screens/NovaOcorrenciaScreen';
import ListaOcorrenciasScreen from './src/screens/ListaOcorrenciasScreen';
import { colors, fontSize } from './src/styles/theme';
import {buscarOcorrencias, salvarOcorrencias} from'./src/services/storage';

export type Ocorrencia = {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
};

export type RootTabParamList = {
  Home: undefined;
  NovaOcorrencia: undefined;
  ListaOcorrencias: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
export default function App() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  function adicionarOcorrencia(novaOcorrencia: Omit<Ocorrencia, 'id'>) {
    const ocorrenciaCompleta: Ocorrencia = {
      id: Date.now().toString(),
      ...novaOcorrencia,
    };

    setOcorrencias((valorAtual) => [ocorrenciaCompleta, ...valorAtual]);
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
            component={HomeScreen}
            options={{ title: 'Início' }}
          />

          <Tab.Screen
            name="NovaOcorrencia"
            options={{ title: 'Nova' }}
          >

            {() => (
              adicionarOcorrencia = { adicionarOcorrencia }
              />
            )}

          </Tab.Screen>

          <Tab.Screen
            name="ListaOcorrencias"
            options={{ title: 'Lista' }}
          >

            {() => (
              <ListaOcorrenciasScreen
                ocorrencias={ocorrencias}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

