// controller/notes.js
const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'notes.json');

async function readFileSafe() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

async function writeFileSafe(notes) {
  const data = JSON.stringify(notes, null, 2);
  await fs.writeFile(DATA_PATH, data, 'utf8');
}

async function getNotes() {
  const notes = await readFileSafe();
  return notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

async function addNote(note) {
  const notes = await readFileSafe();
  notes.push(note);
  await writeFileSafe(notes);
  return note;
}

async function updateNote(timestamp, updates) {
  const notes = await readFileSafe();
  const idx = notes.findIndex(n => n.timestamp === timestamp);
  if (idx === -1) return null;
  notes[idx] = {
    ...notes[idx],
    title: updates.title !== undefined ? updates.title : notes[idx].title,
    description: updates.description !== undefined ? updates.description : notes[idx].description
  };
  await writeFileSafe(notes);
  return notes[idx];
}

async function deleteNote(timestamp) {
  const notes = await readFileSafe();
  const idx = notes.findIndex(n => n.timestamp === timestamp);
  if (idx === -1) return false;
  notes.splice(idx, 1);
  await writeFileSafe(notes);
  return true;
}

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote
};
