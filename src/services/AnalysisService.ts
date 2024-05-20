import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;


export class AnalysisService {
  static async gerarSugestoesNomes(descricaoProjeto: string) {
    const nomes = await axios.post(`${API_HOST}/analysis/names`, {
      projectDescription: descricaoProjeto,
    });
    return nomes;
  }

  static async listarTopicosEstudo(descricaoProjeto: string) {
    const topicos = await axios.post(`${API_HOST}/analysis/importance-data`, {
      projectDescription: descricaoProjeto,
    });
    return topicos;
  }
}
