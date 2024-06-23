export interface Projeto {
  id: number;
  name: string;
  description: string;
  image: string;
  ative: boolean;
}

export interface UpdateProjetoBody {
  name: string;
  description: string;
  userId: number;
  private: boolean;
}