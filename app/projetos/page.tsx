import { ThreeDCardDemo } from "app/components/Card3D";
import SwiperProjects from "app/components/Swiper";

export const metadata = {
  title: 'Projetos',
  description: 'Veja meus repos em destaque e todos que desejo mostrar',
};

export default function Projetos() {

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        veja meus projetos
      </h1>
      <SwiperProjects/>
    </section>
  );
}