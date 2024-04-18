import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;

export class ProjectService {
  static async listarProjetos() {
    const projetos = await axios.get(`${API_HOST}/project`);
    return projetos;
  }

  static buscarProjetoPorId(projetoId: number) {
    return axios.get(`${API_HOST}/project/${projetoId}`);
  }
}
