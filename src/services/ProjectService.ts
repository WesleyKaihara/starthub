import { UpdateProjetoBody } from "@/types/Projeto";
import axios, { AxiosInstance } from "axios";

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;

export class ProjectService {
  constructor(private readonly authAxios: AxiosInstance){};

  static async listarProjetos() {
    const projetos = await axios.get(`${API_HOST}/project`);
    return projetos;
  }

  buscarProjetoPorId(projetoId: number) {
    return this.authAxios.get(`${API_HOST}/project/${projetoId}`);
  }

  buscarProjetosUsuario(usuarioId: number) {
    return this.authAxios.get(`${API_HOST}/project/user/${usuarioId}`);
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

  async alterarStatusProjeto(projetoId: number) {
    return await this.authAxios.put(`${API_HOST}/project/status/${projetoId}`);
  }
}
