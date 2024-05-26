import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;

export class DiscussionService {
  static buscarDiscussaoPorId(discussionId: number) {
    return axios.get(`${API_HOST}/discussion/${discussionId}`);
  }

  static buscarInteracoesDiscussao(discussionId: number) {
    return axios.get(`${API_HOST}/interaction/${discussionId}`);
  }

  static buscarDiscussoesProjeto(projectId: number) {
    return axios.get(`${API_HOST}/discussion/project/${projectId}`);
  }

  static iniciarDiscussao(title: string, context: string, projectId: number) {
    return axios.post(`${API_HOST}/discussion`, {
      title,
      context,
      projectId,
    });
  }

  static listarDiscussoes() {
    return axios.get(`${API_HOST}/discussion`);
  }

  static adicionarInteracao(
    discussionId: number,
    message: string,
    userId: number
  ) {
    return axios.post(`${API_HOST}/interaction`, {
      discussionId,
      message,
      userId,
    });
  }
}
