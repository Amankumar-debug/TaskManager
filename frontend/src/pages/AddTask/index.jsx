import { useState } from "react";
import styles from "./styles.module.css";
import UserLayout from "@/Layout/UserLayout";
import { client } from "@/confic";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending"); 
  const [message,setMessage]=useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
  const response = await client.post("/add_task", {
    title, description, status
  });

  setMessage(response.data.message);

  setTimeout(() => {
    setMessage("");
  }, 3000);

} catch (error) {
  setMessage(error.response?.data?.message || "Something went wrong");

  setTimeout(() => {
    setMessage("");
  }, 3000);
}
    
    

    setTitle("");
    setDescription("");
    setStatus("pending"); 
   
  };

  return (
    <UserLayout>
     
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Task Management App</h1>

        <div className={styles.card}> {message && <p style={{textAlign:"center"}}>{message}</p>}
          <h2 className={styles.sectionTitle}>Add New Task</h2>

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
              Add Task
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
