import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [statusText, setStatusText] = useState('Loading...')
    const [defaultFormState, setDefaultFormState] = useState({name: "", bio: ""});

    useEffect(() => {
        axios.get(API_URL)
        .then(res => {
            if (!res.data.length) {
                setStatusText("No users found.");
                return false;
            } 
            setUsers(res.data);
        })
        .catch(err => console.error(err))
    }, []);

    const remove = (id) => {
        axios.delete(`${API_URL}/${id}`)
        .then(res => {
            const nUsers = users.filter(user => user.id !== res.data.id)
            setUsers(nUsers);
        })
        .catch(err => console.log(err));
    }

    const updateUsers = user => {
        if (defaultFormState.id) {
            const nUsers = users.map(u => {
                if (u.id === user.id) return user;
                return u;
            })
            setUsers(nUsers);
            return true;
        }
        setUsers([
            ...users,
            {...user}
        ])
    }

    return (
        <Wrapper>
            <UserForm defaultState={defaultFormState} updateState={updateUsers} />
            <ul className="user-list">
                {users.map(user => <User 
                    key={user.id} {...user} 
                    remove={remove}
                    edit={setDefaultFormState} />
                )}
            </ul>
        </Wrapper>
    )
}

const UserForm = ({defaultState, updateState}) => {
    const [newUser, setNewUser] = useState(defaultState);
    
    useEffect(() => {
        setNewUser(defaultState);
    }, [defaultState])

    const handleChange = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const reset = e => {
        if (e) e.preventDefault();
        setNewUser({name: "", bio: ""});
    }

    const handleSubmit = e => {
        e.preventDefault();
        const isEdit = !(!newUser.id);
        const url = isEdit ? `${API_URL}/${newUser.id}` : API_URL;
        const method = isEdit ? 'put' : 'post';
        axios[method](url, newUser)
        .then(res => {
            updateState(res.data);
            reset()
        })
        .catch(err => console.log(err));
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>{newUser.id ? 'Edit' : 'Add new user'}</h2>
            <div className="field mb-20">
                <input 
                    onChange={handleChange} 
                    type="text" name="name" 
                    value={newUser.name}/>
                <label>Name</label>
            </div>
            <div className="field">
                <textarea 
                    onChange={handleChange} 
                    name="bio" 
                    value={newUser.bio}>    
                </textarea>
                <label>Bio</label>
            </div>
            <div className="action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button onClick={reset} type="reset" className="btn btn-default">Cancel</button>
            </div>
        </form>
    )
}

const User = ({id, name, bio, edit, remove}) => {
    
    return(
        <li className="user-list__item">
            <img src={`${process.env.PUBLIC_URL}/images/img_avatar.png`} alt="Avatar" className="avatar" />
            <div>
                <p className="name">{name}</p>
                <p className="bio">{bio}</p>
                <p className="action">
                    <span 
                        onClick={() => edit({id, name, bio})} 
                        className="btn btn-primary small lightenblue">
                            Edit
                    </span>
                    <span onClick={e => remove(id)} className="btn btn-danger small lightenred">Delete</span>
                </p>
            </div>
        </li>
    )
};

const Wrapper = styled.div`
    padding: 30px 0 0;
    form {
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 6px solid #f1f1f1; 
        .action {
            margin-top: 30px;
        }
        .action button:first-child {
            margin-right: 15px;
        }
        h2 {
            margin-bottom: 30px;
        }
    }
    .field {
        position: relative;
        display: flex;
        flex-direction: column;
        
    }
    .mb-20 {
        margin-bottom: 20px;
    }
    label {
        position: absolute;
        top: -7px; left: 10px;
        padding: 2.5px 15px;
        font-size: 0.65rem;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #cccccc;
        border-radius: 4px;
        transition: .3s;
    }
    input, textarea {
        width: 100%;
        max-width: 450px;
        border: 2px solid #cccccc;
        padding: 13px;
        font-size: 1rem;
        border-radius: 5px;
        transition: .3s;
        &:focus {
            border-color: rgba(21, 101, 192, 0.8);
        }
        &:focus + label {
            background-color: rgba(21, 101, 192, 1);
            color: #fff;
        }
    }
    textarea {
        height: 90px;
    }
    .user-list {
        &__item {
            display: flex;
            padding: 15px 0;
            position: relative;
            padding-left: 75px;
        }
        .name {
            font-size: 1rem;
            font-weight: bold
        }
        .bio {
            margin: 10px 0;
        }
        .action {
            margin-top: 15px;
            span:first-child {
                margin-right: 5px;
            }
        }
    }
    .btn {
        text-transform: uppercase;
        font-size: 0.85rem;
        font-weight: bold;
        padding: 10px 20px;
        transition: .3s;
        border-radius: 3px;
        cursor: pointer;

        &.small {
            font-size: 0.65rem;
            padding: 5px;
        }

        &-primary {
            background: rgba(21, 101, 192, 0.8);
            color: #ffff;
            border: 2px solid transparent;
            &:hover {
                background: rgba(21, 101, 192, 1);
            }
        }

        &-default {
            background-color: #ffff;
            border: 2px solid rgba(21, 101, 192, 0.8);
            color: rgba(21, 101, 192, 0.8);
            &:hover {
                background-color: rgba(21, 101, 192, 0.3);
                border-color: transparent;
            } 
        }

        &-danger {
            background: rgba(229, 57, 53, 1);
            color: #ffff;
        }

    }
    .lightenblue {
        background: rgba(21, 101, 192, 0.1);
        color: #1565c0;
        &:hover {
            background: rgba(21, 101, 192, 0.3);
        }
    }
    .lightenred {
        background: rgba(229, 57, 53, 0.1);
        color: rgba(229, 57, 53, 1);
        &:hover {
            background: rgba(229, 57, 53, 0.3);
        }
    }
    .avatar {
        display: block;
        width: 60px;
        height: 60px;
        background-color: #cccccc;
        border-radius: 50%;
        content: " ";
        position: absolute;
        left: 0;
    }
`

const H1 = styled.h1`
    width: 100%;
    padding: 200px 0;
    color: #9e9e9e;
    text-align: center;
`;

export default Users;