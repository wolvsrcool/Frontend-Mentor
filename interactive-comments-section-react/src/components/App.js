import { useEffect, useState } from "react";
import Attribution from "./Attribution";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";
import DeleteModal from "./DeleteModal";
import ActiveUser from "./ActiveUser";

import data from "../data.json";

export default function App() {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem(`state`);
    return savedState ? JSON.parse(savedState) : data;
  });
  const [replyingId, setReplyingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem(`users`);
    const defaultUsers = state.comments.reduce((acc, comment) => {
      let toPush = [];
      toPush.push(comment.user);
      if (comment.replies.length > 0)
        toPush.push(comment.replies.flatMap((reply) => reply.user));
      acc.push(toPush.flat());
      return acc.flat();
    }, []);

    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  const score = state.comments.reduce((acc, comment) => {
    if (comment.user.username === state.currentUser.username)
      acc += comment.score;
    if (comment.replies.length > 0) {
      comment.replies.reduce((_, reply) => {
        if (reply.user.username === state.currentUser.username)
          acc += reply.score;
        return _;
      }, 0);
    }
    return acc;
  }, 0);

  useEffect(() => {
    localStorage.setItem(`state`, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function handleReply(id) {
    id === replyingId ? setReplyingId(null) : setReplyingId(id);
  }

  function handleEdit(id) {
    setEditingId(id);
  }

  function handleDelete(id) {
    setDeletingId(id);
  }

  function findMainComment(id) {
    return (
      state.comments.find((com) => com.id === id) ??
      state.comments.find((com) => com.replies.find((rep) => rep.id === id))
    );
  }

  function findExactComment(id) {
    return (
      state.comments.find((com) => com.id === id) ??
      state.comments.reduce((acc, com) => {
        const match = com.replies?.find((rep) => rep.id === id);
        if (match) acc = match;
        return acc;
      }, {})
    );
  }

  function handleRating(id, rating) {
    const originalComment = findExactComment(id);

    const isCurrentlyRated = originalComment.ratedBy.some(
      (rate) => rate?.username === state.currentUser.username
    );

    const isCurrentlyRatedSame = originalComment.ratedBy.some(
      (rate) =>
        rate?.username === state.currentUser.username && rate?.rating === rating
    );

    function createNewComment(comment) {
      let newRatedBy;
      if (isCurrentlyRatedSame)
        newRatedBy = comment.ratedBy.filter(
          (curRating) => curRating.username !== state.currentUser.username
        );
      else if (isCurrentlyRated)
        newRatedBy = comment.ratedBy.map((curRating) =>
          curRating.username === state.currentUser.username
            ? { ...curRating, rating: rating }
            : curRating
        );
      else
        newRatedBy = [
          ...comment.ratedBy,
          { username: state.currentUser.username, rating: rating },
        ];

      const newComment = {
        ...comment,
        ratedBy: newRatedBy,
        score: newRatedBy.reduce((acc, rating) => acc + rating.rating, 0),
      };

      return newComment;
    }

    setState((currentState) => {
      return {
        currentUser: currentState.currentUser,
        comments: currentState.comments.reduce((acc, comment) => {
          let toPush = comment;
          if (comment === originalComment) toPush = createNewComment(comment);
          if (comment.replies.some((rep) => rep === originalComment)) {
            toPush = {
              ...comment,
              replies: comment.replies.map((rep) =>
                rep === originalComment ? createNewComment(rep) : rep
              ),
            };
          }
          acc.push(toPush);
          return acc;
        }, []),
      };
    });
  }

  function handleAddReply(e, text) {
    e.preventDefault();

    const replyTo = findExactComment(replyingId).user.username;

    const originalComment = findMainComment(replyingId);

    const reply = {
      id: Date.now(),
      content: text,
      createdAt: Date.now(),
      replyingTo: replyTo,
      user: state.currentUser,
      score: 0,
      ratedBy: [],
    };

    setState((currentState) => {
      return {
        currentUser: currentState.currentUser,
        comments: currentState.comments.map((comment) => {
          return comment === originalComment
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment;
        }),
      };
    });
    setReplyingId(null);
  }

  function handleAddComment(e, text) {
    e.preventDefault();

    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      content: text,
      createdAt: Date.now(),
      score: 0,
      user: state.currentUser,
      replies: [],
      ratedBy: [],
    };

    setState((curState) => {
      return {
        currentUser: curState.currentUser,
        comments: [...curState.comments, newComment],
      };
    });
  }

  function handleDeleteComment() {
    const targetComment = findExactComment(deletingId);

    setState((curState) => {
      return {
        currentUser: curState.currentUser,
        comments: curState.comments.reduce((acc, comment) => {
          let toPush = comment;
          if (comment === targetComment) return acc;
          if (comment.replies.some((rep) => rep === targetComment))
            toPush = {
              ...comment,
              replies: comment.replies.filter((rep) => rep !== targetComment),
            };
          acc.push(toPush);
          return acc;
        }, []),
      };
    });
    setDeletingId(null);
  }

  function handleUserChange(newUsername) {
    const alreadyExists = users.find((user) => user.username === newUsername);

    const number = Math.floor(Math.random() * 10);
    const newUser = alreadyExists
      ? alreadyExists
      : {
          image: {
            png: `./images/avatars/${number}.png`,
            webp: null,
          },
          username: newUsername,
        };

    setState((curretnState) => {
      return {
        currentUser: newUser,
        comments: curretnState.comments,
      };
    });

    if (newUser !== alreadyExists)
      setUsers((curUsers) => [...curUsers, newUser]);
  }

  function handleEditComment(e, text) {
    e.preventDefault();

    const originalComment = findExactComment(editingId);

    setState((curState) => {
      return {
        currentUser: curState.currentUser,
        comments: curState.comments.map((comment) => {
          if (comment === originalComment) {
            return { ...comment, content: text };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((rep) => {
                return rep === originalComment
                  ? { ...rep, content: text }
                  : rep;
              }),
            };
          } else return comment;
        }),
      };
    });

    setEditingId(null);
  }

  return (
    <>
      <main className="container">
        <ActiveUser
          user={state.currentUser}
          onUserChange={handleUserChange}
          score={score}
        ></ActiveUser>
        {state.comments.map((comment, i) => {
          return (
            <Comment
              comment={comment}
              currentUser={state.currentUser}
              key={comment.id}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              replyingId={replyingId}
              editingId={editingId}
              onEditComment={handleEditComment}
              onAddReply={handleAddReply}
              onRating={handleRating}
            />
          );
        })}
        <AddCommentForm
          currentUser={state.currentUser}
          onAddReply={handleAddComment}
        >
          SEND
        </AddCommentForm>
        {deletingId && (
          <DeleteModal
            onDelete={handleDelete}
            onDeleteComment={handleDeleteComment}
          ></DeleteModal>
        )}
      </main>
      <Attribution />
    </>
  );
}
