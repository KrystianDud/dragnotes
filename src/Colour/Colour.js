import React from 'react'

export default function Colour({ pastels, colour, closePicker, setPickColour }) {
    // document.window
    return (
        <div
            className='pickerBody'
            onMouseLeave={() => closePicker()}
        >
            {pastels.map(({ colour, id }, index) => (
                <button
                    key={id}
                    className='pickerItem'
                    style={{ background: colour }}
                    onClick={() => setPickColour(colour)}
                />
            ))}
        </div>
    )
}
