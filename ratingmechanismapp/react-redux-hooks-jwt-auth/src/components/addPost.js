import React, { useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";


const APIURLPost = 'http://localhost:8010/api/'

const AddPost = ({allposts,setAddPost}) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [addPostData, setPostData] = useState({
        title: "",
        body: "",
        username: currentUser.username
    })
    const onChangeFormData = (e) => {
        const value = e.target.value;
        setPostData({
            ...addPostData,
            [e.target.name]: value
        });
    };
    const submitPost = () => {
        axios.post(APIURLPost + "post", {
            title: addPostData.title,
            body: addPostData.body,
            username: addPostData.username
        }).then((response) => {
            allposts()
            setAddPost(false)
        }).catch(err => console.log(err))
    }

    return (
        <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input disabled type="email" className="form-control" value={currentUser.email} id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input disabled type="email" className="form-control" value={currentUser.username} id="username" placeholder="name@example.com" />
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input name="title" type="email" onChange={onChangeFormData} value={addPostData.title} className="form-control" id="title" placeholder="Title of the Post" />
            </div>
            <div className="form-group">
                <label htmlFor="body">Body of the Post</label>
                <textarea name="body" onChange={onChangeFormData} value={addPostData.body} className="form-control" id="body" rows="3"></textarea>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => submitPost()}>Add Post</button>
        </form>
    )
}
export default AddPost