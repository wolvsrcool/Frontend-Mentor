import { useState } from "react";

export default function ActiveUser({ user, onUserChange, score }) {
  const [changing, setChanging] = useState(false);
  const [text, setText] = useState(`${user.username}`);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleClick();
    }
  }

  function handleClick() {
    if (changing) {
      if (text.trim()) {
        onUserChange(text);
        setChanging(false);
      }
    } else {
      setChanging(true);
    }
  }

  return (
    <>
      <p className="active-user-info">
        👥 You can change your username to pretend you're a different user. 😉
      </p>
      <div className="active-user">
        {changing ? (
          <input
            id="username"
            autoComplete="off"
            autoFocus
            type="text"
            value={text}
            onChange={handleChange}
            maxLength={40}
            required
            onKeyDown={handleKeyDown}
            className="active-user-input"
          ></input>
        ) : (
          <>
            <img
              src={require("../" + `${user.image.png}`.slice(2))}
              alt={user.username}
            ></img>
            <p className="user-username">{user.username}</p>
            <span className="user-score">{score ? score : 0}</span>
          </>
        )}

        <button className="btn" onClick={handleClick}>
          CHANGE
        </button>
      </div>
    </>
  );
}
