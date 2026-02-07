import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import UserLayout from "@/Layout/UserLayout";
import { useEffect, useReducer, useState } from "react";
import { client } from "@/confic";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [task,setTask]=useState([]);
  const [message,setMessage]=useState("");

  const router=useRouter();


  useEffect(() => {

  const fetchTasks = async () => {
    try {
      const response = await client.get("/all_tasks");
      setTask(response.data.tasks);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  fetchTasks();

}, []);

const handleDelete = async (id) => {
  try {
    await client.post("delete_task",{
      _id:id
    });
    setTask((prev) => prev.filter((t) => t._id !== id));
  } catch (error) {
    console.log(error);
  }
};

  return (
   <UserLayout>
  <div className={styles.wrapper}>
    <h1 className={styles.pageTitle}>Your Tasks</h1>

    {task.length === 0 && (
      <p className={styles.empty}>No tasks added yet.</p>
    )}

    <div className={styles.grid}>
      {task.map((t) => (
        <div key={t._id} className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.title}>{t.title}</h2>
            <span
              className={`${styles.status} ${
                t.status === "completed"
                  ? styles.completed
                  : styles.pending
              }`}
            >
              {t.status}
            </span>
          </div>

          <p className={styles.description}>{t.description}</p>

          <div className={styles.actions}>
            <button
              className={styles.updateBtn}
              onClick={() =>
                router.push(`UpdateTask/${t._id}`)
               }
            >
              Update
            </button>

            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(t._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</UserLayout>

  );
}
