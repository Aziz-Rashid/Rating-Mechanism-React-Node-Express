import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import AddPost from './addPost'

const APIURLPost = 'http://localhost:8010/api/'

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [PostData, setPostData] = useState('')
  const [rate, setRate] = useState(0)
  const [error, setError] = useState('')
  const [postid, setPostId] = useState('')
  const [addPost, setAddPost] = useState(false)

  const allposts = async () => {
    const data = await axios.get(`${APIURLPost}allpost`)
    setPostData(data)
  }
  useEffect(() => {
    allposts()
  }, [])

  useEffect(() => {
    const rating = async () => {
      axios.post(`${APIURLPost}rating`, {
        id: postid,
        username: currentUser?.username,
        rate,
      }).then(response => {
        setPostData('')
        allposts()
      }).catch((err) => setError(err?.response?.data?.message))
    }
    rating()
  }, [rate])
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  const DeletePost = (id) => {
    axios.post(`${APIURLPost}deletePost`, {
      id: id,
    }).then(response => {
      setPostData('')
      allposts()
    }).catch((err) => setError(err?.response?.data?.message))
  }
  

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setAddPost(!addPost)}>{addPost === false ? "Add Post" : "All Post"}</button>
      {addPost ? (
        <>
          <AddPost setAddPost={setAddPost} allposts={allposts} />
        </>
      ) : (
          <>
            {PostData && PostData.data.map(post => {
              let ratingCount = 0
              const avg = post?.newRate?.map(el => Number(el.rate) + ratingCount)
              const newavg = post?.newRate.length !== 0 ? avg?.reduce((a, b) => a + b) / avg.length : 0;
              return (
                <div className="row" key={post._id}>
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <h2 className="card-title">{post.title}</h2>
                          </div>
                          <div>
                            <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              size={35}
                              edit={false}
                              value={newavg}
                              isHalf={true}
                              activeColor="#ffd700"
                            />
                          </div>
                        </div>
                        <p className="card-text">{post.body}</p>
                        <p>created By: {post.username}</p>
                        <div onClick={() => setPostId(post._id)}>
                          {error !== "" && postid === post._id && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={35}
                            isHalf={true}
                            activeColor="#ffd700"
                          />
                        </div>
                      </div>
                        <button type="button" className="btn btn-danger" onClick={() => DeletePost(post._id)}>Delete Post</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )}
    </div>
  );
};

export default Home;
