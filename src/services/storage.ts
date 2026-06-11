import  AsyncStorage  from "@react-native-async-storage/async-storage";

const OCORRENCIAS_KEY = '@app_ocorrencias';

export async function salvarOcorrencias(ocorrencias: any[]) {
    try{
        const dadosEmTexto = JSON.stringify(ocorrencias);
        await AsyncStorage.setItem(OCORRENCIAS_KEY, dadosEmTexto)
    } catch(error){
        console.log("Error ao salvar a ocorrência, error");
    }
}

export async function buscarOcorrencias() {
    try{
        const dadosSalvos = await AsyncStorage.getItem(OCORRENCIAS_KEY);
        if(dadosSalvos){
            return JSON.parse(dadosSalvos);
        }
        return [];
    } catch(error){
        console.log("Error ao buscar ocorrencia", error);
        return[];
    }
    
}