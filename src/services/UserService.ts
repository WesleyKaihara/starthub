import axios, { AxiosInstance } from "axios";

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;

export type CadastrarUsuarioBody = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserBody = {
  name: string;
}

export class UserService {
  constructor(private readonly axios: AxiosInstance){};

  static async cadastrarUsuario(input: CadastrarUsuarioBody) {
    const usuario = await axios.post(`${API_HOST}/user`, {
      name: input.name,
      email: input.email,
      password: input.password,
    });
    return usuario;
  }

  async updateUser(userId:number, input: UpdateUserBody) {
    const user = await axios.put(`${API_HOST}/user/${userId}`, {
      name: input.name
    })
    return user;
  }
}
