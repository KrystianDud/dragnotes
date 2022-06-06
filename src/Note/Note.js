import React, { useState, useRef, useEffect } from 'react'
import '../App.css'
import Colour from '../Colour/Colour';

export default function Note({ id, position, activeId, getLastNote, removeNote }) {
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [style, setstyle] = useState({})
    const [openPicker, setopenPicker] = useState(false)
    const [currentColour, setcurrentColour] = useState('#f1f1f1')
    const eleRef = useRef(null)

    const pastels = [
        {
            id: 1,
            colour: '#f1f1f1'
        },
        {
            id: 2,
            colour: '#faebd7'
        },
        {
            id: 3,
            colour: '#c3ffc4'
        },
        {
            id: 4,
            colour: '#c3e9ff'
        },
        {
            id: 5,
            colour: '#ffc3c3'
        }
    ]

    const dragStart = (e) => {
        // e.stopPropagation();
        if (Object.keys(style).length === 0) {
            console.log(e.currentTarget.getBoundingClientRect())
            setDiffX(e.screenX);
            setDiffY(e.screenY);
        }
        else {
            let left = e.screenX - diffX;
            let top = e.screenY - diffY;
            setstyle({
                left: left,
                top: top
            });
        }
        getLastNote(id)
        setIsDragging(true);
    }

    const dragging = (e) => {
        if (isDragging) {
            let left = e.screenX - diffX;
            let top = e.screenY - diffY;
            setstyle({
                left: left,
                top: top
            });

            window.addEventListener('mouseup', function (event) {
                setIsDragging(false);
            })
        }
    };

    const dragEnd = (e) => {
        // e.stopPropagation();
        console.log('drag end')
        setIsDragging(false);
    };

    const pickColour = () => {
        setopenPicker(true)
    }
    const setPickColour = (col) => {
        setcurrentColour(col)
        console.log()
        eleRef.current.style.background = col;
    }

    const closePicker = (e) => {
        setopenPicker(false)
    }

    return (
        <div
            className={`note ${activeId == id ? 'indexTop' : 'indexLow'}`}
            ref={eleRef}
            style={style}

            onMouseMove={(e) => dragging(e)}
            onMouseUp={() => dragEnd()}
        >
            <div className='noteNav'>
                <button
                    className={'noteDrag'}
                    onMouseDown={(e) => dragStart(e)}
                />

                <button className='colorPicker' style={{ background: currentColour }} onClick={() => pickColour()}>
                    {openPicker ?
                        <Colour
                            pastels={pastels}
                            colour={currentColour}
                            closePicker={closePicker}
                            setPickColour={setPickColour}
                        />
                        : null
                    }
                </button>

                <button className={'noteClose'} onClick={() => removeNote(id)}></button>
            </div>
            <div className='noteLine'></div>
            <input type='text' multiple placeholder='Write your note here...' />
        </div>
    )
}
