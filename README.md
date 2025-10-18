# 📝 Notes Manager App

A simple **CRUD-based Notes Manager** built using **HTML, JavaScript, and Node.js**.  
This app allows users to **Add, View, Edit, and Delete notes** — similar to a Todo App but with more structured data.

Each note includes:

- **Title**
- **Description**
- **Timestamp (Auto-generated when created)**

---

## 🚀 Features

- ✅ Add new notes
- ✅ View all saved notes dynamically
- ✅ Edit existing notes
- ✅ Delete notes instantly
- ✅ Stores data in `notes.json`

---

## 📁 Folder Structure

```
project/
│
├── app.js                 # Main server file (Express server)
├── controller/
│   └── notes.js           # CRUD logic for handling notes
├── data/
│   └── notes.json         # JSON storage for notes
└── public/
    ├── index.html         # Frontend UI
    └── script.js          # Handles UI actions & API requests
```

---

## 📦 Example Data (data/notes.json)

```json
[
  { "title": "Meeting", "description": "Team meeting at 5 PM", "timestamp": "2025-10-05T18:00:00Z" },
  { "title": "Shopping", "description": "Buy milk and bread", "timestamp": "2025-10-05T10:00:00Z" }
]
```

---

## 🛠️ How to Run

```bash
# Install dependencies (if any)
npm install

# Start the server
node app.js

# Open in browser
http://localhost:3000
```

---

## 🧑‍💻 Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | HTML, CSS, JavaScript |
| Backend   | Node.js, Express |
| Storage   | JSON File (`notes.json`) |



## 🙌 Author

**Katta Akshaya**  
Contributions and suggestions are welcome!
