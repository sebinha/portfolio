'use server';

import { auth } from 'app/auth';
import conn from './postgres';
import { type Session } from 'next-auth';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function increment(slug: string) {
  noStore();
  await conn.query(`INSERT INTO views (slug, count) VALUES (${slug}, 1) ON CONFLICT (slug) DO UPDATE SET count = views.count + 1`)

}

async function getSession(): Promise<Session> {
  let session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  return session;
}


export async function saveGuestbookEntry(formData: FormData) {
  let session = await getSession();
  let email = session.user?.email as string;
  let created_by = session.user?.name as string;
  

  if (!session.user) {
    throw new Error('Unauthorized');
  }

  let entry = formData.get('entry')?.toString() || '';
  let body = entry.slice(0, 500);
  const text = "INSERT INTO guestbook(email, body, created_by, created_at) VALUES ($1, $2, $3, $4)"
  const values = [`${email}`, `${body}`, `${created_by}`, "NOW()"]

  await conn.query(text,values);

  revalidatePath('/visitas');

//   let data = await fetch('https://api.resend.com/emails', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${process.env.RESEND_SECRET}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       from: 'failureindata@gmail.com',
//       to: 'victorfcardoso@hotmail.com',
//       subject: 'New Guestbook Entry',
//       html: `<p>Email: ${email}</p><p>Message: ${body}</p>`,
//     }),
//   });

//   let response = await data.json();
//   console.log('Email sent', response);
 }

export async function deleteGuestbookEntries(selectedEntries: string[]) {
  let session = await getSession();
  let email = session.user?.email as string;

  if (email !== 'victorfcardoso@hotmail.com') {
    throw new Error('Unauthorized');
  }

  let selectedEntriesAsNumbers = selectedEntries.map(Number);
  let arrayLiteral = `{${selectedEntriesAsNumbers.join(',')}}`;

  await conn.query(`DELETE FROM guestbook WHERE id = ANY(${arrayLiteral}::int[])`)

  revalidatePath('/admin');
  revalidatePath('/visitas');
}

// Função para salvar o access token no banco de dados
export async function saveAccessToken(accessToken: string) {
  try {
    await conn.query('INSERT INTO tokens (access_token) VALUES ($1)', [
      accessToken,
    ]);
  } catch (error) {
    console.error('Erro ao salvar o token de acesso no banco de dados:', error);
    throw new Error('Falha ao salvar o token de acesso no banco de dados.');
  }
}