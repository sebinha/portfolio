import BaseLayout from 'app/layouts/BaseLayout.tsx';
import Card from 'app/components/Card.tsx';
import { PreloadResources } from 'app/preload';

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIconDown() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.292 16.706a1 1 0 0 0 1.416 0l3-3a1 1 0 0 0-1.414-1.414L13 13.586V4a1 1 0 0 0-2 0v9.586l-1.293-1.293a1 1 0 0 0-1.414 1.414zM17 19H7a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <BaseLayout
        title="Victor Fernandes"
        description="Meta description. Here goes your page description. Provide a clear and concise summary of the content."
      >
        <Card
          name="Victor Fernandes"
          position="Full Stack Web Developer"
          aboutMe={`
Sou um apaixonado por tecnologia e adoro trabalhar com desenvolvimento fullstack. Ultimamente, tenho me aventurado no mundo da inteligência artificial, e estou animado com as possibilidades. Para mim, o que realmente importa são as conexões que fazemos e como podemos colaborar para alcançar algo incrível. Meu grande sonho é criar soluções que não apenas façam a diferença na vida das pessoas, mas que também contribuam para um futuro melhor.`}
          profileImage="/images/profile.jpg"
        />
      </BaseLayout>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/vctf/"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">conecte-se comigo</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/sebinha"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">meus repos</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            download="curriculo-victor-fernandes.pdf"
            href="https://drive.usercontent.google.com/download?id=1MQrpt5KRhkMeH-2aYwDVx7TpW9dUA53g&export=download&authuser=0&confirm=t&uuid=6223fdd9-d108-4e4a-80cb-e4e40fe7b3c9&at=APZUnTXvRlea7ZReRPxScwh4z-fS:1722653156998"
          >
            <ArrowIconDown />
            <p className="ml-2 h-4">meu cv</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
