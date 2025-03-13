import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const AddTaskButton = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      tags,
      stage: 'todo',
    };
    dispatch(addTask(newTask));
    setOpen(false);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setTags([]);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            fullWidth
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            select
            style={{ marginBottom: '16px' }}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Tags (comma separated)"
            value={tags.join(',')}
            onChange={(e) => setTags(e.target.value.split(','))}
            style={{ marginBottom: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskButton;