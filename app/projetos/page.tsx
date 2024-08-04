import Link from 'next/link';
import { Suspense } from 'react';
import { getViewsCount } from 'app/db/queries';
import { getBlogPosts } from 'app/db/blog';

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
    </section>
  );
}