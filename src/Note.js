// Note.js
import React from 'react';
import moment from 'moment';

const Note = ({ note, onDelete, onArchive }) => (
  <div className="note">
    <h3>{note.title}</h3>
    <p>{note.body}</p>
    <p>Created At: {moment(note.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
    <button onClick={() => onDelete(note.id)}>Hapus</button>
    {onArchive && <button onClick={() => onArchive(note.id)}>Arsipkan</button>}
  </div>
);

export default Note;
