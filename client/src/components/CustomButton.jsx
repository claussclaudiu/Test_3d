import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';

const CustomButton = ({ type, title, customstyles, handleclick }) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if(type === 'filled'){
            return{
                backgroundColor: snap.color,
                color: '#000000'
            }
        }
    }
  return (
    <button
        className={`px-2 py-1.5 flex-1 rounded-mx ${customstyles}`}
        style={generateStyle(type)}
        onClick={handleclick}
    >
        {title}
    </button>
  )
}

export default CustomButton