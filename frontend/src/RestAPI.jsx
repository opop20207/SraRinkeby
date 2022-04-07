import React, { useState } from "react";
import axios from "axios";

function RestAPI() {
  const [text, setText] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  console.log(title, content);

  return (
    <div>
      <h1>REST API 연습</h1>
      

      <div className="btn-primary">


        <input id="titlein"  type="text"/> <br/>
        <input id ="contentin"  type="text"/> <br/>
        
        <button
          onClick={() => {
            setTitle(document.getElementById("titlein").value)
            setContent(document.getElementById("contentin").value)

          
            axios
              .post("http://127.0.0.1:8000/review/", {
                title: title,
                content: content,
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          POST
        </button>
       
        
        <button
          onClick={() => {
            axios
              .get("http://127.0.0.1:8000/review/")
              .then((response) => {
                setText([...response.data]);
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          GET
        </button>
      </div>
      {text.map((e) => (
        <div>
          {" "}
          <div className="list">
            <span>
              {e.id}번, {e.title}, {e.content}, {e.update_at}
            </span>
            <button
              className="btn-delete"
              onClick={() => {
                axios.delete(`http://127.0.0.1:8000/review/${e.id}`);
                setText(text.filter((text) => text.id !== e.id));
              }}
            >
              DELETE
            </button>{" "}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestAPI;