// @ts-nocheck
'use server';
import conn from './postgres';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';

export async function getBlogViews() {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  noStore();
  let views = await conn.query("SELECT count FROM views")

  return views.reduce((acc, curr) => acc + Number(curr.count), 0);
}

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!conn) {
    return [];
  }

  noStore();
  return await conn.query("SELECT slug, count FROM views")
    
}

export const getLeeYouTubeSubs = cache(
  async () => {
    let response = await yt.channels.list({
      id: ['UCZMli3czZnd1uoc1ShTouQw'],
      part: ['statistics'],
    });

    let channel = response.data.items![0];
    return Number(channel?.statistics?.subscriberCount).toLocaleString();
  },
  ['leerob-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export const getVercelYouTubeSubs = cache(
  async () => {
    let response = await yt.channels.list({
      id: ['UCLq8gNoee7oXM7MvTdjyQvA'],
      part: ['statistics'],
    });

    let channel = response.data.items![0];
    return Number(channel?.statistics?.subscriberCount).toLocaleString();
  },
  ['vercel-youtube-subs'],
  {
    revalidate: 3600,
  }
);

export async function getGuestbookEntries() {
  if (!process.env.POSTGRES_HOST) {
    return [];
  }

  noStore();
  try {
    const result = await conn.query(
      'SELECT id, body, created_by, updated_at FROM guestbook ORDER BY created_at DESC LIMIT 100'
    );
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;}
}

// import pool from './postgres'

// export default async function handler(req,res){
//   try{
//     const result = await pool.query('SELECT * FROM tokens')
//     res.status(200).json(result.rows)
//   } catch (error){
//     console.error('Error executing query', error)
//     res.status(500).json({error:"Internal Server Error"})
//   }
// }