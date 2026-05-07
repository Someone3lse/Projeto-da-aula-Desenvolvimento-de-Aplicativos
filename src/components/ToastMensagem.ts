import Toast from 'react-native-toast-message';

type TipoToast = 'success' | 'error' | 'info';

export function mostrarToast(

  tipo: TipoToast,

  titulo: string,

  mensagem?: string

) {

  Toast.show({

    type: tipo,

    text1: titulo,

    text2: mensagem,

    position: 'top',

    visibilityTime: 3000,

  });

}