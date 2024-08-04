import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trabalho',
  description: 'Um resumo do meu trabalho e contribuições.',
};

async function Stars() {
  let res = await fetch('https://api.github.com/repos/vercel/next.js');
  let json = await res.json();
  let count = Math.round(json.stargazers_count / 1000);
  return `${count}k stars`;
}

export default function WorkPage() {
  return (
    <section>
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">meu trabalho</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          No caminho para aprender e me consolidar fazendo o que amo, podendo aprender e ensinar aqueles que comigo compartilham do mesmo espaço.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl mb-1 tracking-tighter">IBM Brazil</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
        Estágio em Desenvolvimento Web, 2021 - 2023
        </p>
        <p>
          Eu entrei na <a href="https://www.ibm.com/br-pt">IBM Brasil</a> pronto para aprender{' '}
          <a href="https://nextjs.org">Next.js</a> e <a href="https://react.dev/">React</a> com o time do <a href="https://research.ibm.com/labs/brazil">IBM Research Brazil</a>.
          Construí aplicativos sozinho e com a ajuda do time também, usando tanto JavaScript quanto Python.
        </p>
        <ul>
          <li>
            Em 2021 fiquei mais focado em aprender do que desenvolver algo, mas mesmo
            assim surgiram projetos como a melhora da UI/UX do site do Bluetalks.<br/>
            (Não há uma demonstração do site, ele abre e fecha com o tempo pois há parceiros de hosting/inviting)
            {' '}
          </li>
          <li>
            Em 2022, houveram mais desafios como a construção do zero de um site que consistia basicamente em{' '}
            ler documentos e retornar os <a href="https://early-access-program.debater.res.ibm.com/">KPA (Key Point Analysis)</a> da mesma.<br/>
            Essa ferramenta e sua API, foram construídas por Yoav Katz e seu time onde ofereciam seu uso externo para testes, hoje só restam {' '}
            documentos já gerados para visualização e demonstração como no site do <a href="https://research.ibm.com/haifa/dept/vst/debating_data.shtml#Key_Point_Analysis">IBM Research</a>.<br/>
            Também ajudei na criação de outra aplicação que lia documentos mas usava do <a href="https://research.ibm.com/haifa/dept/vst/debating_data.shtml#Targeted_Sentiment_Analysis">Targeted Sentiment Analysis</a> e lia a semântica/sentimento dos chamados "papers", montando isso em Jupyter Notebook com Python.
          </li>
        </ul>
        <p>
          Desde a minha entrada na IBM pude ver que tive uma melhoria quase imediata dos meus pensamentos e lógicas de programação, pude sair de uma etapa onde mal conseguia fazer algo sozinho para praticamente poder montar o que quiser do jeito que queria, claro, com suas limitações mas nada que uma boa pesquisa não resolvesse.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      </div>
    </section>
  );
}
