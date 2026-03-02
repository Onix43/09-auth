import { Metadata } from "next";
import Profile from "./ProfilePage.client";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "NoteHub: Profile",
  description:
    "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
  openGraph: {
    title: "NoteHub: Profile",
    description:
      "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
    url: `https://notehub.com/profile`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default async function ProfileServer() {
  const user = await getMe();
  return <Profile user={user} />;
}
