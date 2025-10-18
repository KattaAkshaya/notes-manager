// public/script.js
const apiBase = '/api/notes';

const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const addBtn = document.getElementById('addBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const notesContainer = document.getElementById('notesContainer');

let editingTimestamp = null;

// Fetch notes from server
async function fetchNotes() {
  const res = await fetch(apiBase);
  if (!res.ok) return [];
  return res.json();
}

// Render notes on page
function renderNotes(notes) {
  notesContainer.innerHTML = '';
  if (!notes || notes.length === 0) {
    notesContainer.innerHTML = '<div class="empty">No notes yet. Add one above.</div>';
    return;
  }
  notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note';

    const content = document.createElement('div');
    content.className = 'note-content';

    const meta = document.createElement('div');
    meta.className = 'meta';
    const d = new Date(note.timestamp);
    meta.textContent = `${note.title} — ${d.toLocaleString()}`;

    const desc = document.createElement('div');
    desc.className = 'small';
    desc.textContent = note.description;

    content.appendChild(meta);
    content.appendChild(desc);

    const actions = document.createElement('div');
    actions.className = 'note-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => startEdit(note);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'btn-danger';
    delBtn.onclick = () => deleteNote(note.timestamp);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    card.appendChild(content);
    card.appendChild(actions);

    notesContainer.appendChild(card);
  });
}

// Load notes initially
async function loadAndRender() {
  const notes = await fetchNotes();
  renderNotes(notes);
}

// Add or update note
addBtn.addEventListener('click', async () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title && !description) {
    alert('Please enter title or description.');
    return;
  }

  if (editingTimestamp) {
    // update existing note
    const res = await fetch(`${apiBase}/${encodeURIComponent(editingTimestamp)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (!res.ok) {
      alert('Failed to update note.');
    } else {
      resetForm();
      loadAndRender();
    }
  } else {
    // create new note
    const res = await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (!res.ok) {
      alert('Failed to create note.');
    } else {
      resetForm();
      loadAndRender();
    }
  }
});

// Cancel edit mode
cancelEditBtn.addEventListener('click', () => {
  resetForm();
});

// Start editing a note
function startEdit(note) {
  editingTimestamp = note.timestamp;
  titleInput.value = note.title;
  descInput.value = note.description;
  addBtn.textContent = 'Update Note';
  cancelEditBtn.style.display = 'inline-block';
}

// Reset form
function resetForm() {
  editingTimestamp = null;
  titleInput.value = '';
  descInput.value = '';
  addBtn.textContent = 'Add Note';
  cancelEditBtn.style.display = 'none';
}

// Delete note
async function deleteNote(timestamp) {
  if (!confirm('Delete this note?')) return;
  const res = await fetch(`${apiBase}/${encodeURIComponent(timestamp)}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    alert('Failed to delete note.');
  } else {
    loadAndRender();
  }
}

// Load notes when page opens
loadAndRender();
