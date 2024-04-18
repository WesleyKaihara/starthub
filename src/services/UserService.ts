import axios from 'axios';

const API_HOST = process.env.NEXT_PUBLIC_STARTHUB_API;

export type CadastrarUsuarioBody = {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  static async cadastrarUsuario(input: CadastrarUsuarioBody) {
    const usuario = await axios.post(`${API_HOST}/user`, {
      name: input.name,
      email: input.email,
      password: input.password,
    });
    return usuario;
  }
}
