import AsyncStorage from "@react-native-async-storage/async-storage";

const OCORRENCIAS_KEY = '@app_ocorrencias';

export async function salvarOcorrencia(ocorrencias:any) {
    try{
        const dadosEmTexto = JSON.stringify(ocorrencias);

        await AsyncStorage.setItem(OCORRENCIAS_KEY, dadosEmTexto);

    } catch(error) {
    console.log("Erro ao salvar a ocorrencia", error)
    }
    
} 

export async function buscarOcorrencia() {
    try{
        const dadosSalvos = await AsyncStorage.getItem(OCORRENCIAS_KEY);
        if(dadosSalvos){
            return JSON.parse(dadosSalvos);
        }

    } catch(error) {
    console.log("Erro ao salvar a ocorrencia", error)
    }
    
} 
