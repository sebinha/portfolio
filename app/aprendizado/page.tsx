// app/aprendizado/page.tsx
import Aprendizado from '../components/Aprendizado';

export const metadata = {
  title: 'Aprendizado',
  description: 'Veja o que há nos meus repos e o que aprendo.',
};

const Page = () => {
  return <Aprendizado />;
};

export default Page;