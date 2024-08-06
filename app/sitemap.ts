export default async function sitemap() {

  let routes = ['', '/projetos', '/visitas', '/uses', '/trabalho', 'aprendizado'].map((route) => ({
    url: `https://sebinha.github.io${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
