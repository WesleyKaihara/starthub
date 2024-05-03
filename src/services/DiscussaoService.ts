import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;

export class DiscussionService {
  static buscarDiscussaoPorId(discussionId: number) {
    return axios.get(`${API_HOST}/discussion/${discussionId}`);
  }

  static buscarInteracoesDiscussao(discussionId: number) {
    return axios.get(`${API_HOST}/interaction/${discussionId}`);
  }
}
