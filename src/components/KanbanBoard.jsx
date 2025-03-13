import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { moveTask } from '../redux/taskSlice';
import KanbanColumn from './KanbanColumn';
import SearchBar from './SearchBar';
import AddTaskButton from './AddTaskButton';
import { ThemeContext } from '../context/ThemeContext';
import { Switch, Typography } from '@mui/material';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  // Get tasks from Redux store
  const tasks = useSelector((state) => state.tasks.tasks);

  // Define Kanban columns
  const columns = [
    { id: 'todo', title: 'To Do', tasks: tasks.filter((task) => task.stage === 'todo') },
    { id: 'inProgress', title: 'In Progress', tasks: tasks.filter((task) => task.stage === 'inProgress') },
    { id: 'peerReview', title: 'Peer Review', tasks: tasks.filter((task) => task.stage === 'peerReview') },
    { id: 'done', title: 'Done', tasks: tasks.filter((task) => task.stage === 'done') },
  ];

  // Sensors for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor));

  // ✅ FIX: Prevent drag errors
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    const activeTaskId = active.id;
    const overColumnId = over.id;
    if (!activeTaskId || !overColumnId) return;

    const activeTask = tasks.find((task) => task.id === activeTaskId);
    if (!activeTask) return;

    if (activeTask.stage !== overColumnId) {
      dispatch(moveTask({ id: activeTaskId, stage: overColumnId }));
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        minHeight: '100vh',
        background: darkMode
          ? 'radial-gradient(circle, #1A1A1A, #121212)' // ✅ Improved Dark Mode Background
          : 'linear-gradient(45deg, #E0EAFC, #CFDEF3)',
        color: darkMode ? '#ffffff' : '#000000',
        transition: 'background 0.3s ease-in-out',
      }}
    >
      {/* Dark Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        <Typography variant="body1" style={{ marginRight: '10px' }}>
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </div>

      {/* Add Task Button */}
      <AddTaskButton />

      {/* Search Bar */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Drag-and-Drop Context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} searchQuery={searchQuery} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
