import react, { useState } from 'react';
import Note from './Note/Note'
import './App.css';

function App() {
    const [availableNotes, setAvailableNotes] = useState(5)
    const [currentNotes, setCurrentNotes] = useState(0)
    const [activeNote, setActiveNote] = useState(null)
    const [noteList, setNoteList] = useState([])
    const createNote = () => {
        let notes = currentNotes;
        if (currentNotes != availableNotes) {
            notes++;
            setCurrentNotes(notes)
            let setWidthPos = 35
            let setHeightPos = 30

            let noteObject = {
                id: notes,
                position: {
                    x: setWidthPos * notes,
                    y: setHeightPos * notes
                }
            }

            setNoteList([...noteList, noteObject])
        }
    }

    const updateCounter = (value) => {
        setAvailableNotes(value)
    }

    const getLastNote = (id) => {
        setActiveNote(id)
    }

    const removeNote = (id) => {
        let updatedList = noteList.filter(item => item.id != id)
        console.log(updatedList)
        setNoteList(updatedList)
    }


    return (
        <div className="App" >
            <nav className='nav'>
                <div className='navElement'>
                    <button onClick={() => createNote()} className='createButton'>Create Note</button>
                </div>
                <div className='noteCounter'>
                    <input type='number' value={availableNotes} onChange={(e) => updateCounter(e.target.value)}></input>
                    <p>{`current notes ${currentNotes}`}</p>
                </div>
            </nav>
            <div className='board'>
                {/* <Note /> */}
                {noteList.length > 0 ? noteList.map(({ id, position }) => (
                    <Note
                        key={id}
                        id={id}
                        position={position}
                        activeId={activeNote}
                        getLastNote={getLastNote}
                        removeNote={removeNote}
                    />
                )) : null}
            </div>
        </div>
    );
}

export default App;
