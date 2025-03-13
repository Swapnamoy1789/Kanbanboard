import React, { useContext } from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Paper, Typography } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

const KanbanColumn = ({ column, searchQuery }) => {
  const { darkMode } = useContext(ThemeContext);

  // 🛠 Fix: Ensure column is droppable
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { stage: column.id },
  });

  return (
    <Paper
      ref={setNodeRef}
      elevation={3}
      style={{
        padding: "16px",
        width: "100%",
        maxWidth: "300px",
        background: darkMode
          ? "linear-gradient(135deg, #2C2C2C, #3D3D3D)" // ✅ Light gradient for better visibility
          : "#FFFFFF",
        borderRadius: "12px",
        boxShadow: darkMode
          ? "0 4px 12px rgba(255, 255, 255, 0.2)" // ✅ Light glow effect for contrast
          : "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "10px",
        color: darkMode ? "#FFFFFF" : "#000000",
        border: darkMode ? "2px solid #555" : "1px solid #ddd", // ✅ Border for better separation
        contain: "layout",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        style={{
          marginBottom: "16px",
          color: darkMode ? "#FFD700" : "#333", // ✅ Highlight column title
        }}
      >
        {column.title}
      </Typography>

      {column.tasks.map((task) => (
        <TaskCard key={task.id} task={task} searchQuery={searchQuery} />
      ))}
    </Paper>
  );
};

export default KanbanColumn;
