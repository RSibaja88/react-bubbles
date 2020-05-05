import React, { useState } from "react";
import axiosWithAuth from './axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  })

  const history = useHistory();


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  
  const getCall = () => {
    axiosWithAuth().get('/api/colors')
    .then(res => {
      updateColors(res.data)
    })
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
    getCall()
    .catch(err => console.log('inner error', err))
    history.push('/bubble-page')
    })
    .catch(err => {
      console.log('outer error', err)
    })

  };

  const deleteColor = color => {
   axiosWithAuth().delete(`/api/colors/${color.id}`, color)
   .then(res => {
    getCall()
     .catch(err => console.log('inner error', err))
    history.push('/bubble-page')
   })
   .catch(err => {
    console.log('outer error', err)
   })
  };

  const addColor = e => {
    e.preventDefault();
    console.log("from addColor: ", newColor);

    axiosWithAuth().post('/api/colors', newColor)
    .then(res => {
     getCall()
      .catch(err => console.log('inner error', err))
    })
    .catch(err => {
      console.log('outer error', err)
    })
  }

  const handleNameChange = e => {
    setNewColor({...newColor, [e.target.value]:e.target.value})
  }

  const handleHexChange = e => {
    setNewColor({...newColor, code: {hex: e.target.value}})
  }




  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="addForm" />
      <form onSubmit={addColor}>
        <p>Create a Color!</p>
        <input 
          type='text'
          name='color'
          placeholder='Type Color Name'
          onChange={handleNameChange} />
        <input 
          type='text'
          name='hex'
          placeholder="Enter hex code"
          onChange={handleHexChange}/>
        <input type='submit' />
      </form>
      
    </div>
  );
};

export default ColorList;
