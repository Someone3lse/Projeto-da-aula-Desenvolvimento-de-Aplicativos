//Base  da nossa URL
const API_URL = "https://api-ocorrencia.muapps.com.br";
//Slug de identificação do aluno
export const SLUG_ALUNO = "Gabriel Kewryghan Marinho Moura Rosas";

//tipo de dados que irao ser enviados

export type CriarOcorrenciaPayload = {
    titulo : string;
    descricao : string;
    local : string;
    slug : string;
};

//Função para buscar as nossa ocorrencias

export async function listarOcorrenciaPorSlug(slug : string){
    const resposta = await fetch(`${API_URL}/ocorrencias?slug=${slug}`);

    if(!resposta.ok){
        throw new Error('Erro ao buscar ocorrencias');
    }

    return await resposta.json();
}
export async function criarOcorrencia(dados: CriarOcorrenciaPayload){
    const resposta = await fetch(`${API_URL}/ocorrencias`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(dados),

    });

    if(!resposta.ok){
        throw new Error('Erro ao buscar ocorrencias');
    }
    return await resposta.json();
}
