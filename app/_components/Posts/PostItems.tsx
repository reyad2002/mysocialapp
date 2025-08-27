import { authContext } from "@/app/authContext/authContext";
import React, { useContext, useState } from "react";

interface PostItemsProps {
  data: any; // Replace 'any' with a more specific type if available
}

const PostItems: React.FC<PostItemsProps> = ({ data }) => {
  const allPosts = data?.posts;
  console.log(allPosts);

  const { userData } = useContext<any>(authContext);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Ahmed Ali",
      authorPhoto: userData?.photo,
      text: "Great post! Keep it up! 👍",
      timestamp: "1 hr ago",
      likes: 3,
    },
    {
      id: 2,
      author: "Sara Mohamed",
      authorPhoto: userData?.photo,
      text: "I totally agree with this!",
      timestamp: "30 min ago",
      likes: 1,
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: userData?.name || "Anonymous",
        authorPhoto: userData?.photo,
        text: newComment,
        timestamp: "now",
        likes: 0,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };
  return (
    <div>
      {allPosts?.map((post: any) => (
        <section key={post.id} className="bg-slate-800 rounded-xl shadow p-4 mb-4">
      {/* header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userData?.photo || "/img/default-avatar.png"}
          className="w-10 h-10 rounded-full"
          alt="user"
        />
        <div>
          <p className="font-semibold text-slate-200">{userData?.name}</p>
          <span className="text-sm text-slate-400">2 hrs ago</span>
        </div>
      </div>

      {/* content */}
      <div className="postContent">
        <p className="text-slate-200 mb-3 overflow-auto w-full">{post?.body}</p>
        {post?.image && (
          <div className="image bg-amber-300 rounded-xl">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-auto rounded"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-600">
        <button className="flex items-center gap-2 text-slate-300 hover:text-blue-400">
          ❤️ Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-slate-300 hover:text-blue-400"
        >
          💬 Comment ({comments.length})
        </button>
        <button className="flex items-center gap-2 text-slate-300 hover:text-blue-400">
          🔗 Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-600">
          {/* Add Comment */}
          <div className="flex gap-3 mb-4">
            <img
              src={userData?.photo || "/img/default-avatar.png"}
              className="w-8 h-8 rounded-full"
              alt="user"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-2 border border-slate-600 bg-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.authorPhoto || "/img/default-avatar.png"}
                  className="w-8 h-8 rounded-full"
                  alt="user"
                />
                <div className="flex-1">
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-slate-200">{comment.author}</span>
                      <span className="text-xs text-slate-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-slate-200 text-sm">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 ml-3">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400"
                    >
                      ❤️ {comment.likes > 0 && comment.likes}
                    </button>
                    <button className="text-xs text-slate-400 hover:text-blue-400">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        </section>
      ))}
    </div>
  );
};

export default PostItems;
