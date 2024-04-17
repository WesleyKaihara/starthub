import { ReactNode } from 'react';

type Params = {
  projetoId: string;
};

type PageProps = {
  params: Params;
};

export default function Page({ params }: PageProps): ReactNode {
  return <div>ID: {params.projetoId}</div>;
}
