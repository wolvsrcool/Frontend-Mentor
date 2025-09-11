import { useEffect, useState } from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import editIcon from "../images/icon-edit.svg";
import deleteIcon from "../images/icon-delete.svg";

export default function CommentBody({
  comment,
  currentUser,
  onReply,
  onEdit,
  editingId,
  replyingId,
  onEditComment,
  onRating,
  onDelete,
}) {
  const [whenStr, setWhenStr] = useState("");
  const [mouseOver, setMouseOver] = useState(false);

  const [text, setText] = useState(comment.content);
  const [showError, setShowError] = useState(false);

  const isEditing = editingId === comment.id;

  function handleEdit(e) {
    setText(e.target.value);
    if (e.target.value.trim().length >= 1) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  function handleBlur() {
    if (showError) {
      setShowError(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim()) {
      onEditComment(e, text);
    }
  }

  useEffect(
    function () {
      const editFieldEl = document.getElementById(`comment-edit`);
      editFieldEl?.focus();
      const textLength = editFieldEl?.value.length;
      editFieldEl?.setSelectionRange(textLength, textLength);
    },
    [isEditing]
  );

  useEffect(() => {
    if (mouseOver) return;

    const daysSince = Math.round(
      (Date.now() - comment.createdAt) / (24 * 60 * 60 * 1000)
    );

    if (daysSince === 0) setWhenStr("today");
    if (daysSince === 1) setWhenStr("yesterday");
    if (daysSince > 1 && daysSince < 7) setWhenStr(`${daysSince} days ago`);
    if (daysSince >= 7 && daysSince < 30) {
      const weeks = Math.round(daysSince / 7);
      setWhenStr(`${weeks === 1 ? "1 week ago" : `${weeks} weeks ago`}`);
    }
    if (daysSince >= 30 && daysSince < 365) {
      const months = Math.round(daysSince / 30);
      setWhenStr(`${months === 1 ? "1 month ago" : `${months} months ago`}`);
    }
    if (daysSince >= 365) {
      const years = Math.round(daysSince / 365);
      setWhenStr(`${years === 1 ? "1 year ago" : `${years} years ago`}`);
    }
  }, [
    comment.createdAt,
    mouseOver,
    comment.replyingTo,
    comment.content,
    isEditing,
  ]);

  function handleMouseEnter() {
    setMouseOver(true);
    setWhenStr((cur) => new Date(comment.createdAt).toLocaleDateString());
  }

  return (
    <div className="comment">
      <div className="side-buttons">
        <button
          className={
            comment.ratedBy.some(
              (rep) => rep.username === currentUser.username && rep.rating === 1
            )
              ? "active-button"
              : ""
          }
          onClick={() => onRating(comment.id, 1)}
        >
          <img src={plusIcon} alt="+" />
        </button>
        <p>{comment.score}</p>
        <button
          className={
            comment.ratedBy.some(
              (rep) =>
                rep.username === currentUser.username && rep.rating === -1
            )
              ? "active-button"
              : ""
          }
          onClick={() => onRating(comment.id, -1)}
        >
          <img src={minusIcon} alt="-" />
        </button>
      </div>

      <div className="user-cont">
        <img
          className="comment-img"
          src={require("../" + `${comment.user.image.png}`.slice(2))}
          alt={comment.user.username}
        />
        <div className="username-wrapper-one">
          <span className="username">{comment.user.username}</span>
          <div className="username-info-wrapper">
            {currentUser.username === comment.user.username ? (
              <span className="you-comment">you</span>
            ) : null}

            <span
              className="created-at"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setMouseOver(false)}
            >
              {whenStr}
            </span>
          </div>
        </div>
      </div>

      <div className="comment-header-actions">
        {currentUser.username === comment.user.username ? (
          <>
            <div
              className="comment-action delete"
              onClick={() => onDelete(comment.id)}
            >
              <img src={deleteIcon} alt="delete" />
              <span>Delete</span>
            </div>
            <div className="comment-action" onClick={() => onEdit(comment.id)}>
              <img src={editIcon} alt="edit" />
              <span>Edit</span>
            </div>
          </>
        ) : (
          <div className="comment-action" onClick={() => onReply(comment.id)}>
            {comment.id === replyingId ? (
              <span>Cancel</span>
            ) : (
              <>
                <img src={replyIcon} alt="reply" />
                <span>Reply</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="comment-content">
        {isEditing ? (
          <>
            <p>
              Replying to{" "}
              <span className="replying-to">@{comment.replyingTo}</span>
            </p>
            <form className="editing" onSubmit={handleSubmit}>
              <div>
                <textarea
                  className="comment-input"
                  value={text}
                  onChange={handleEdit}
                  required
                  id="comment-edit"
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              </div>
              <div className="editing-err-btn">
                <div className="form-error">
                  {showError && <p>Comment too short!</p>}
                </div>
                <button className="btn" type="submit">
                  UPDATE
                </button>
              </div>
            </form>
          </>
        ) : (
          <p>
            {comment.replyingTo ? (
              <span className="replying-to">@{comment.replyingTo} </span>
            ) : null}
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
}
