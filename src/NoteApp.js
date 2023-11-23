// NoteApp.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NoteList from './NoteList';
import { getInitialData, showFormattedDate } from './ListData';

const NoteApp = () => {
    
  const [notes, setNotes] = useState(getInitialData());
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [characterLimit, setCharacterLimit] = useState(50);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  const addNote = () => {
    const newNoteData = {
      id: +new Date(),
      title: newNote.title,
      body: newNote.body,
      createdAt: moment().toISOString(),
      archived: false,
    };

    setNotes([...notes, newNoteData]);
    setNewNote({ title: '', body: '' });
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleSearch = () => {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
  };

  const handleTitleChange = (e) => {
    const titleValue = e.target.value;
    if (titleValue.length <= 50) {
      setNewNote({ ...newNote, title: titleValue });
      setCharacterLimit(50 - titleValue.length);
    }
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    setArchivedNotes([...archivedNotes, noteToArchive]);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const allNotes = searchTerm ? filteredNotes : notes;
    setFilteredNotes(allNotes);
  }, [searchTerm, notes, filteredNotes]);

  return (
    <div>
      <h1>Catatan Saya</h1>

      {/* Form untuk menambah catatan */}
      <form>
        <label>Judul Catatan (Max 50 Karakter):
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => handleTitleChange(e)}
          />
          <span>{characterLimit} karakter tersisa</span>
        </label>
        <br />
        <label>Isi Catatan:
          <textarea
            value={newNote.body}
            onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={addNote}>Tambah Catatan</button>
      </form>

      {/* Fitur Pencarian */}
      <label>Cari Catatan:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Cari</button>
      </label>

      <h2>Daftar Catatan Saya</h2>
      
      {/* Daftar catatan */}
      <NoteList
        notes={filteredNotes}
        onDelete={deleteNote}
        onArchive={archiveNote}
      />

      {/* Daftar catatan terarsip */}
      <h2>Daftar Catatan Terarsip</h2>
      <NoteList notes={archivedNotes} onDelete={deleteNote} />
    </div>
  );
};

export default NoteApp;
