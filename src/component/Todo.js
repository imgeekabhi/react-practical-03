import React, { useState, useEffect } from "react";
import "../component/Todo.css";
import Clock from "./Clock";
import CurrentDate from "./CurrentDate";
const schedule = require("node-schedule");

//get data from local storage
const getLocalItmes = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [show, setShow] = useState(false);
  const addItem = () => {
    if (!inputData) {
      alert("Please enter the item...");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  // to delete the items
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updateditems);
  };

  // to edit the item

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };

  //automatically clear list in 24hrs
  //"*/10 * * * * *"
  schedule.scheduleJob("0 0 * * *", () => {
    setItems([]);
  });
  // to add data local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  //on press enter butoon
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
      console.log("do validate");
    }
  };
  // onPress escape button
  const handleEscapeKeyDown = (event) => {
    if (event.key === "Escape") {
      document.getElementById("add-btn").style.visibility = "visible";
      document.getElementById("add-items").style.display = "none";
      setShow(!show);
      console.log("escape presses...");
    }
  };
  return (
    <>
      <div className="card sticky-top">
        <div className="card-body dateTime row justify-content-center">
          <div className="align-items-center ">
            <CurrentDate />
          </div>
          <div className="Space-between"></div>
          <div className="align-items-center">
            <Clock />
          </div>
        </div>
      </div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>Your List is Here 👇</figcaption>
          </figure>
          <div className="showItems">
            {items.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Your Item"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Your Item"
                      onClick={() => deleteItem(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {show ? (
            <div id="add-items" className="addItems">
              <input
                type="text"
                placeholder="Add your items here..."
                value={inputData}
                onKeyDown={handleKeyDown}
                onKeyUp={handleEscapeKeyDown}
                onChange={(e) => setInputData(e.target.value)}
              />
              {toggleSubmit ? (
                <i
                  className="fa fa-plus-square"
                  title="Add Your Item"
                  onClick={addItem}
                ></i>
              ) : (
                <i
                  className="far fa-edit add-btn"
                  title="Update Your Item"
                  onClick={addItem}
                ></i>
              )}
            </div>
          ) : null}
          <button
            id="add-btn"
            type="button"
            className="fa fa-plus mt-5 "
            onClick={() => {
              setShow(!show);
              document.getElementById("add-btn").style.visibility = "hidden";
            }}
          ></button>
        </div>
      </div>
    </>
  );
};

export default Todo;
