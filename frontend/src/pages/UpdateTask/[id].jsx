import { useState, useEffect } from "react";
import styles from "./styles.module.css"; // SAME CSS
import UserLayout from "@/Layout/UserLayout";
import { client } from "@/confic";
import { useRouter } from "next/router";

export default function UpdateTask() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  // Fetch old task data
  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      const res = await client.get(`/task/${id}`);
      const task = res.data.task;

      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await client.post("/update_task", {
        _id: id,
        title,
        description,
        status,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        setMessage("");
        router.push("/"); // go back after update
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Task Management App</h1>

        <div className={styles.card}>
          {message && <p style={{ textAlign: "center" }}>{message}</p>}

          <h2 className={styles.sectionTitle}>Update Task</h2>

          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Title:</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <label className={styles.label}>Description:</label>
            <textarea
              rows="4"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />

            <label className={styles.label}>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <button type="submit" className={styles.button}>
              Update Task
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
