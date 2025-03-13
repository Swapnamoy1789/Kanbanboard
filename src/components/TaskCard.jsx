import React, { useState, useContext, useEffect, useCallback } from "react";
import { useDraggable } from "@dnd-kit/core";
import {
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Chip,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/taskSlice";
import { ThemeContext } from "../context/ThemeContext";

const TaskCard = ({ task, searchQuery }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  // Manage task state for editing
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [tags, setTags] = useState(task.tags || []);

  // Draggable hook
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setTags(task.tags || []);
  }, [task]);

  // ✅ Use `useCallback` to prevent unnecessary re-renders
  const handleClick = useCallback((e) => e.stopPropagation(), []);

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(deleteTask(task.id));
    },
    [dispatch, task.id]
  );

  const handleUpdate = useCallback(() => {
    dispatch(updateTask({ id: task.id, title, description, priority, tags }));
    setOpen(false);

    // ✅ Fix: Move focus to edit button to prevent zooming issues
    setTimeout(() => {
      document.getElementById(`edit-btn-${task.id}`)?.focus();
    }, 100);
  }, [dispatch, task.id, title, description, priority, tags]);

  const priorityColors = {
    High: "#ff4444",
    Medium: "#ffbb33",
    Low: "#00C851",
  };

  // Highlight searched tasks
  const isHighlighted =
    searchQuery && task.title.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <>
      <Paper
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        elevation={2}
        style={{
          padding: "16px",
          margin: "8px 0",
          borderRadius: "8px",
          position: "relative",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: isHighlighted
            ? darkMode
              ? "#6648B1"
              : "#B3D4FC"
            : darkMode
            ? "#1E1E1E"
            : "#FFFFFF",
          color: darkMode ? "#FFFFFF" : "#000000",
          transition: "all 0.2s ease-in-out",
          cursor: "grab",
          touchAction: "none", // ✅ Prevent scroll conflicts with dragging on mobile
        }}
      >
        {/* Task Title and Description */}
        <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
          {task.title}
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "8px" }}>
          {task.description}
        </Typography>

        {/* Priority */}
        <Typography
          variant="body2"
          style={{ marginBottom: "8px", color: priorityColors[task.priority] }}
        >
          Priority: {task.priority}
        </Typography>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              style={{ background: darkMode ? "#333" : "#f0f0f0" }}
            />
          ))}
        </div>

        {/* Edit/Delete Buttons */}
        <div style={{ position: "absolute", top: "8px", right: "8px" }}>
          <IconButton
            id={`edit-btn-${task.id}`}
            onClick={(e) => {
              handleClick(e);
              setOpen(true);
            }}
            size="small"
          >
            <EditIcon fontSize="small" style={{ color: darkMode ? "#FFFFFF" : "#000000" }} />
          </IconButton>
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon fontSize="small" style={{ color: darkMode ? "#FFFFFF" : "#000000" }} />
          </IconButton>
        </div>
      </Paper>

      {/* Edit Task Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby={`edit-dialog-${task.id}`}
      >
        <DialogTitle id={`edit-dialog-${task.id}`}>Edit Task</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: "16px" }} />
          <TextField fullWidth label="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginBottom: "16px" }} />
          <TextField fullWidth label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} select style={{ marginBottom: "16px" }}>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
          <TextField fullWidth label="Tags (comma separated)" value={tags.join(',')} onChange={(e) => setTags(e.target.value.split(','))} style={{ marginBottom: "16px" }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;
