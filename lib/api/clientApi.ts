import { User } from "@/types/user";
import type { Note, CreateNoteValues } from "../../types/note";
import { nextServer } from "./api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateName = {
  email: string;
  username: string;
};

const noteOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
};

export async function fetchNotes(
  search?: string,
  page?: number,
  tag?: string,
): Promise<FetchNotesResponse> {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { search, page, tag, perPage: 12 },
    ...noteOptions,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    ...noteOptions,
  });
  return response.data;
}

export async function createNote(note: CreateNoteValues): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", note, noteOptions);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await nextServer.delete<Note>(
    `/notes/${noteId}`,
    noteOptions,
  );
  return response.data;
}

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout() {
  await nextServer.post("/auth/logout");
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function updateMe(data: UpdateName) {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
}
