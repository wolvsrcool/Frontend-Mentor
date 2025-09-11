import { useState } from "react";

export default function AddCommentForm({
  currentUser,
  replyingTo,
  onAddReply,
  children,
}) {
  const [text, setText] = useState("");
  const [showError, setShowError] = useState(false);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  function handleReply(e) {
    setText(e.target.value);
    if (e.target.value.length >= 1) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddReply(e, text);
    setText("");
  }

  function handleBlur() {
    if (showError) {
      setShowError(false);
    }
  }

  return (
    <form className="add-comment-form" onSubmit={handleSubmit}>
      {replyingTo ? (
        <p>
          Replying to <span className="replying-to">@{replyingTo}</span>
        </p>
      ) : null}

      <div className="main-form">
        {currentUser && (
          <img
            src={require("../" + `${currentUser.image.png}`.slice(2))}
            alt={currentUser.username}
          ></img>
        )}

        <div className="form-input-wrapper">
          <textarea
            autoFocus="true"
            className="comment-input"
            placeholder="Add a comment..."
            required
            id="comment-text"
            value={text}
            onChange={(e) => handleReply(e)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          ></textarea>

          <button className="btn">{children}</button>
        </div>
      </div>
      {showError && (
        <div className="form-error">
          <p>Comment too short!</p>
        </div>
      )}
    </form>
  );
}
