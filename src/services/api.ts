// base da nossa api
const API_URL = 'https://api-ocorrencia.muapps.com.br';

// slug de identificação aluno
export const SLUG_ALUNO = 'Gabriel Kewryghan';

// tipos de dados que irao ser enviados, tipo de dado
export type CriarOcorrenciaPayload = {
  titulo: string;
  descricao: string;
  local: string;
  slug: string;
};

// funcao para buscar  as nossas ocorrencias
export async function listarOcorrenciasPorSlug(slug: string) {
  const resposta = await fetch(`${API_URL}/ocorrencias?slug=${slug}`);
  console.log(resposta);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar ocorrencias');
  }
  return await resposta.json();
}

/* NOVO: tipo para atualizar ocorrência */
export type AtualizarOcorrenciaPayload = {
  titulo: string;
  descricao: string;
  local: string;
};

/* NOVO: atualizar ocorrência na API */
export async function atualizarOcorrencia(
  id: string,
  dados: AtualizarOcorrenciaPayload
) {
  const resposta = await fetch(`${API_URL}/ocorrencias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Erro ao atualizar ocorrência');
  }
  return await resposta.json();
}

/* NOVO: remover ocorrência da API
 A API usa Soft Delete, preenchendo deleted_at no banco. */
export async function deletarOcorrencia(id: string) {
  const resposta = await fetch(`${API_URL}/ocorrencias/${id}`, {
    method: 'DELETE',
  });
  if (!resposta.ok) {
    throw new Error('Erro ao remover ocorrência');
  }
  return await resposta.json();
}

export async function criarOcorrencia(dados: CriarOcorrenciaPayload) {
  console.log("dados que estão vindo", dados);
  const resposta = await fetch(`${API_URL}/ocorrencias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error('Erro ao criar ocorrencia');
  }
  return await resposta.json();
}