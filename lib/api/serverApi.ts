import { cookies } from "next/headers";
import { nextServer } from "./api";

export async function fetchNotes() {}

export async function fetchNoteById() {}

export async function getMe() {}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}
