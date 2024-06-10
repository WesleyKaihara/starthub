export interface Projeto {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface UpdateProjetoBody {
  name: string;
  description: string;
  userId: number;
  private: boolean;
}