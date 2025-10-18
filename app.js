// app.js
const express = require('express');
const path = require('path');
const notesController = require('./controller/notes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await notesController.getNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read notes.' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { title, description, timestamp } = req.body;
    const note = {
      title: String(title || '').trim(),
      description: String(description || '').trim(),
      timestamp: timestamp ? String(timestamp) : new Date().toISOString()
    };
    const created = await notesController.addNote(note);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note.' });
  }
});

app.put('/api/notes/:timestamp', async (req, res) => {
  try {
    const ts = req.params.timestamp;
    const { title, description } = req.body;
    const updated = await notesController.updateNote(ts, { title, description });
    if (!updated) return res.status(404).json({ error: 'Note not found.' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note.' });
  }
});

app.delete('/api/notes/:timestamp', async (req, res) => {
  try {
    const ts = req.params.timestamp;
    const removed = await notesController.deleteNote(ts);
    if (!removed) return res.status(404).json({ error: 'Note not found.' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note.' });
  }
});

app.listen(PORT, () => {
  console.log(`Notes app running at http://localhost:${PORT}`);
});
