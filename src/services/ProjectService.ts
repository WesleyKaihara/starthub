import { UpdateProjetoBody } from '@/types/Projeto';
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

  static buscarProjetosUsuario(usuarioId: number) {
    return axios.get(`${API_HOST}/project/user/${usuarioId}`);
  }

  static async cadastrarProjeto(projeto: FormData) {
    return await axios.post(`${API_HOST}/project`, projeto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async atualizarProjeto(projetoId: number, projeto: UpdateProjetoBody) {
    return await axios.put(`${API_HOST}/project/${projetoId}`, projeto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
