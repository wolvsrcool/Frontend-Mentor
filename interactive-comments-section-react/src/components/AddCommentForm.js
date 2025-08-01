import { useState } from "react";

export default function AddCommentForm({
  currentUser,
  replyingTo,
  onAddReply,
  children,
  autofocus,
}) {
  const [text, setText] = useState(`${replyingTo ? `@${replyingTo} ` : ""}`);
  const [showError, setShowError] = useState(false);

  let strFix = replyingTo?.length + 2 || 0;
  let fixedText = text.slice(strFix);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  function handleReply(e) {
    if (replyingTo) {
      if (e.target.value.startsWith(`@${replyingTo} `)) {
        setText(e.target.value);
      }
    } else {
      setText(e.target.value);
    }
    if (e.target.value.length > strFix) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (fixedText.trim()) {
      onAddReply(e, fixedText);
      setText("");
    } else {
      setShowError(true);
    }
  }

  function handleBlur() {
    if (showError) {
      setShowError(false);
    }
  }

  return (
    <form className="add-comment-form" onSubmit={handleSubmit}>
      <div className="main-form">
        {currentUser && (
          <img
            src={require("../" + `${currentUser.image.png}`.slice(2))}
            alt={currentUser.username}
          ></img>
        )}

        <div className="form-input-wrapper">
          <textarea
            autoFocus={autofocus}
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
