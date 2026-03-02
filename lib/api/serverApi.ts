import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";

export interface SessionResponse {
  headers: {
    "set-cookie"?: string[];
  };
  status: number;
}

export async function fetchNotes(
  search?: string,
  page?: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, tag, perPage: 12 },
    headers: {
      Cookie: allCookies,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: allCookies,
    },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: allCookies,
    },
  });
  return data;
}

export async function checkServerSession(): Promise<SessionResponse> {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}
