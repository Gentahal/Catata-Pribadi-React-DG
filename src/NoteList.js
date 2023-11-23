// NoteList.js
import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onDelete, onArchive }) => (
  <ul>
    {notes.length === 0 ? (
      <p>Tidak ada catatan</p>
    ) : (
      notes.map((note) => (
        <li key={note.id}>
          <Note note={note} onDelete={onDelete} onArchive={onArchive} />
        </li>
      ))
    )}
  </ul>
);

export default NoteList;
