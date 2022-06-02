import React, { useState, useRef, useEffect } from 'react'
import '../App.css'

export default function Note({id, position, activeId, getLastNote, removeNote}) {
    const [diffX, setDiffX] = useState(0);
    const [diffY, setDiffY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [style, setstyle] = useState({})

    const eleRef = useRef(null)
    
    const dragStart = (e) => {
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
        console.log('drag end')
        setIsDragging(false);
    };

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
                <button className={'noteClose'} onClick={() => removeNote(id)}></button>
            </div>
            <div className='noteLine'></div>
            <input type='text' multiple placeholder='Write your note here...' />
        </div>
    )
}
