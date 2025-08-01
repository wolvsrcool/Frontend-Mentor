import AddCommentForm from "./AddCommentForm";
import CommentBody from "./CommentBody";

export default function Comment({
  comment,
  currentUser,
  replyingId,
  onReply,
  editingId,
  onEdit,
  onAddReply,
  onEditComment,
  onRating,
  onDelete,
}) {
  return (
    <div className="comment-section">
      <div className="comment-reply">
        <CommentBody
          comment={comment}
          currentUser={currentUser}
          onReply={onReply}
          onEdit={onEdit}
          editingId={editingId}
          replyingId={replyingId}
          onEditComment={onEditComment}
          onRating={onRating}
          onDelete={onDelete}
        ></CommentBody>
        {replyingId === comment.id ? (
          <AddCommentForm
            currentUser={currentUser}
            replyingTo={comment.user.username}
            onAddReply={onAddReply}
            autofocus={true}
          >
            REPLY
          </AddCommentForm>
        ) : null}
      </div>
      {comment.replies.length > 0 && (
        <div className="replies">
          <div className="vertical-line"></div>
          <div className="replies-comments">
            {comment.replies.map((reply) => (
              <div className="comment-reply" key={reply.id}>
                <CommentBody
                  comment={reply}
                  currentUser={currentUser}
                  onReply={onReply}
                  onEdit={onEdit}
                  editingId={editingId}
                  replyingId={replyingId}
                  onEditComment={onEditComment}
                  onRating={onRating}
                  onDelete={onDelete}
                ></CommentBody>
                {replyingId === reply.id ? (
                  <AddCommentForm
                    currentUser={currentUser}
                    onAddReply={onAddReply}
                    replyingTo={reply.user.username}
                    autofocus={true}
                  >
                    REPLY
                  </AddCommentForm>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
