"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";

type UserForm = {
  username: string;
};

export default function EditPage() {
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleNameChange = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as UserForm;
      const res = await updateMe({
        email: user?.email || "",
        username: formValues.username,
      });
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || ""}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleNameChange}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
