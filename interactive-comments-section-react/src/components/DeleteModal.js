export default function DeleteModal({ onDelete, onDeleteComment }) {
  return (
    <div className="delete-modal-container">
      <div className="delete-modal">
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="btns-modal">
          <button className="btn grey" onClick={() => onDelete(null)}>
            NO, CANCEL
          </button>
          <button className="btn red" onClick={onDeleteComment}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
