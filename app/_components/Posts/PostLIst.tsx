import React, { useContext, useEffect, useState } from "react";
import PostItems from "./PostItems";
import axios from "axios";
import { authContext } from "@/app/authContext/authContext";

const PostLIst = () => {
  const [allposts, setAllPosts] = useState({});
  const { token } = useContext(authContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      getPosts(storedToken);
    }
  }, []);

  async function getPosts(token: string) {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts",
        {
          headers: {
            token: token,
          },
        }
      );
      setAllPosts(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <PostItems data = {allposts} />
    </div>
  );
};

export default PostLIst;
