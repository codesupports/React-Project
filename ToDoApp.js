import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [inputData, setInputData] = useState('');
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [getEditId, setGetEditId] = useState();
  const [editItem, setEditItem] = useState(-1);

  const handleAddData = () => {
    setData([{ id: Date.now(), name: inputData }, ...data]);
    setInputData('');
  };

  const hendleEdit = (id, index) => {
    setInputData(data[index].name);
    setIsEdit(true);
    setGetEditId(id);
    setEditItem(index);
  };

  const hendleDelete = (id) => {
    const dt = data.filter((item) => {
      return item.id !== id;
    });
    setData(dt);
  };

  const handleUpdate = (val) => {
    data[val] = { id: getEditId, name: inputData };
    setData(data);
    setInputData('');
    setIsEdit(false);
  };
  console.log('data', data);

  return (
    <>
      <div className="todo-wrap">
        <div className="todo-input">
          <input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {!isEdit ? (
            <button onClick={() => handleAddData()}>Add</button>
          ) : (
            <button onClick={() => handleUpdate(editItem)}>Update</button>
          )}
        </div>
        <div className="todo-list">
          <h4>Todo List</h4>
          <ul>
            {data?.map((item, index) => {
              return (
                <li key={item.id}>
                  {item.name}{' '}
                  <span
                    className="btn"
                    onClick={() => hendleEdit(item.id, index)}
                  >
                    Edit
                  </span>{' '}
                  <span className="btn" onClick={() => hendleDelete(item.id)}>
                    Delete
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
