import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';


import {addUserToLocalStorage, addModeToLocalStorage, getModeFromLocalStorage,addTokenToLocalStorage,removeUserFromLocalStorage, removeTokenFromLocalStorage,getUserFromLocalStorage, getTokenFromLocalStorage} from '../utils/localStorage';
import customFetch from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
const disptach = useDispatch;
const initialState = {
    isLoading : false,
    upload : false,
    user : getUserFromLocalStorage() || null,
    token : [],
    dp : undefined,
    mode : getModeFromLocalStorage() || "light",
    postsPicture : "",
    posts : [],
    friends : [],
    firstName : "",
    lastName : "",
    email : "",
    occupation : "",
    location : "",
    password : "",
    picture : "",
    userFriends :[],
    currentUser : [],
    commentss : [],
    users : [],
    conversations : null,
    getUser : [],
    conversation : null,
};


// upload user image
export const userImageUpload = createAsyncThunk(
    'user/imageUpload',
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/post/uploadImage', user);
            // console.log(resp.data);
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

// register user
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/register', user);
            // console.log(resp.data);
            return resp.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);



// login user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/login', user);
            // console.log(resp.data);
            return resp.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);


// upload post image
export const postImageUpload = createAsyncThunk(
    'user/post',
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/post/uploadImage', user);
            // console.log(resp.data);
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

// upload post
export const createPost = createAsyncThunk(
    'user/createPost',
    async(post, thunkAPI) => {
        try {
            const resp = await customFetch.post('/posts', post,{
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            // console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)



// get all posts
export const getAllPosts = createAsyncThunk(
    'posts/allPosts',
    async(thunkAPI) => {
        try {
            const resp = await customFetch.get('/posts', {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            // console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);

// get specific user posts
export const getUserPosts = createAsyncThunk(
    'post/userPosts',
    async(userId, thunkAPI) => {
        try {
            const resp = await customFetch.get(`/posts/${userId}`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            // console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);


// add or remove friends
export const addOrRemoveFreinds = createAsyncThunk(
    'friends/createOrRemove',
    async({_id, friendId}, thunkAPI) => {
        // console.log(friendId);
        try {
            const resp = await customFetch.patch(`/user/${_id}/${friendId}`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            // console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);


// get specific friends posts
export const getUsersfrinds = createAsyncThunk(
    'user/getusersFriends',
    async(userId, thunkAPI)=> {
        try {
            const resp = await customFetch.get(`/user/${userId}/friends`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            // console.log( resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);

// like or unlike any post
export const likeOrUnlikePost = createAsyncThunk(
    'post/updatePost',
    async({postId, userId}, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/posts/${postId}/update`, {userId}, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            // console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);


// get specific user
export const getUser = createAsyncThunk(
    'user/getUser',
    async(id, thunkAPI) => {
        try {
            const resp = await customFetch.get(`/user/${id}`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            console.log(resp.data);
            return resp.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)



//get all comments of specific post
export const getAllComments = createAsyncThunk(
    'posts/allComments',
    async(id, thunkAPI) => {
        try {
            const resp = await customFetch.post(`/comments/getallcomments`, id, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            // console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);

// post a comment
export const postComments = createAsyncThunk(
    'posts/ccreateComment',
    async(comment, thunkAPI) => {
        try {
            const resp = await customFetch.post(`/comments`, comment, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
);




// get all users
export const getAllUsers = createAsyncThunk(
'users/getAllUsers',
async(thunkAPI) => {
    try {
        const resp = await customFetch.get('/message', {
            headers : {
                authorization : `Bearer ${getTokenFromLocalStorage()}`,
            },
        })
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
)

// get all conversations
export const getAllConversations = createAsyncThunk(
    'conversations/all',
    async(id, thunkAPI) => {
        try {
            const resp = await customFetch.get(`/conversation/${id}`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            })
            // console.log(resp.data);
            
            return resp.data;
        } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
            
        }
    }
)






// get conv of user
export const getConvOfUser = createAsyncThunk(
    'conv/getConvOfUser',
    async(id, thunkAPI) => {
        try {
            const resp = await customFetch.post(`/message/conversation`, id, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            console.log(resp.data);
            return resp.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)



// get specific user
export const getConvUser = createAsyncThunk(
    'conv/getConvUser',
    async(id, thunkAPI) => {
        try {
            const resp = await customFetch.get(`/user/${id}`, {
                headers : {
                    authorization : `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            // console.log(resp.data);
            return resp.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        logoutUser : (state, {payload}) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
            removeTokenFromLocalStorage();
            if(payload){
                toast.success(payload)
            }
          },
        handleChange : (state, {payload : {name, value}}) => {
            state[name] = value;
        },
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            addModeToLocalStorage(state.mode);
          }
    },

    extraReducers : (builder) => {
        builder
        .addCase(userImageUpload.fulfilled, (state, {payload}) => {
            const {src} = payload.image;
            state.dp = src;
            // console.log(state.dp);
        })
        .addCase(userImageUpload.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {user} = payload;
            const {token} = payload;
            state.user = user;
            addUserToLocalStorage(user);
            state.token = token;
            addTokenToLocalStorage(token);
            toast.success(`Welcome ${user.firstName} ${user.lastName}`)
        })
        .addCase(registerUser.rejected, (state, {payload}) => {
            state.isLoading = false
            toast.error(payload)
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {user} = payload;
            const {token} = payload;
            state.user = user;
            addUserToLocalStorage(user);
            state.token = token;
            addTokenToLocalStorage(token);
            toast.success(`Welcome back ${user.firstName} ${user.lastName}`)
        })
        .addCase(loginUser.rejected, (state, {payload}) => {
            state.isLoading = false
            // console.log(payload);
            toast.error(payload)
        })
        .addCase(postImageUpload.pending, (state) => {
            state.isLoading = true
        })
        .addCase(postImageUpload.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {src} = payload.image;
            state.postsPicture = src;
            // console.log(state.postsPicture);
        })
        .addCase(postImageUpload.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(createPost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createPost.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {posts} = payload;
            state.posts = posts;
            state.postsPicture = "";
            toast.success(`Post uploaded successfuly`);
        })
        .addCase(createPost.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            console.log(payload);
            
            const {posts} = payload;
            state.posts = posts;
        })
        .addCase(getAllPosts.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(getUserPosts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserPosts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {posts} = payload;
            state.posts = posts
        })
        .addCase(getUserPosts.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(addOrRemoveFreinds.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addOrRemoveFreinds.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {formattedFriends} = payload;
            state.friends = formattedFriends;
        })
        .addCase(addOrRemoveFreinds.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(getUsersfrinds.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUsersfrinds.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {formattedFriends} = payload;
            state.friends = formattedFriends
        })
        .addCase(getUsersfrinds.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(likeOrUnlikePost.rejected, (state, {payload}) => {
            toast.error(payload)
        })
        .addCase(getUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {user} = payload;
            state.currentUser = user
        })
        .addCase(getUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(getAllComments.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllComments.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {comments} = payload;
            state.comments = comments
            // console.log(comments);
                        
            // const {user} = payload;
        })
        .addCase(getAllComments.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
        .addCase(postComments.pending, (state) => {
            state.isLoading = true;
            state.upload = false;
        })
        .addCase(postComments.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {comment} = payload;
            state.commentss = comment;
            state.upload = true;
            toast.success("comment uploaded")
            getAllPosts()

        })
        .addCase(postComments.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
            state.upload = false
        })
        .addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {users} = payload;
            console.log(users);
            
            state.users = users;
        })
        .addCase(getAllUsers.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
            state.upload = false
        })
        .addCase(getAllConversations.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllConversations.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            // console.log(payload);
            
            const {conversations} = payload;
            state.conversations = conversations;
        })
        .addCase(getAllConversations.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
            state.upload = false
        })
        .addCase(getConvUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getConvUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {user} = payload;
            state.getUser = payload;
        } )
        .addCase(getConvUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
            state.upload = false
        })
        .addCase(getConvOfUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getConvOfUser.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            const {conversation} = payload;
            state.conversation = conversation;
        } )
        .addCase(getConvOfUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
            state.upload = false
        })
        
    }
});


export const {setMode, handleChange, logoutUser} = authSlice.actions;
export default authSlice.reducer;