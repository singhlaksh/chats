import React,{useRef, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'; 
import { ChatEngine}  from 'react-chat-engine'; 
import {auth} from '../firebase';


import {useAuth} from '../contexts/AuthContext'  
import axios from 'axios';

const Chats =() => {
    const history =useHistory();
    const { user } =useAuth(); 
    const [ loading ,setLoading ]=useState(true); 

    const getFile=async (url) =>{
        const response =await fetch(url);
        const data = await response.blob();

        return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
    }
console.log(user);
    const handleLogout = async()=>{
        await auth.signOut();

        history.push('/');    
    }
    
    useEffect(() => {
           if(!user){         
           history.push('/');   
           return;
    }
           axios.get('https://api.chatengine.io/users/me',{      
                headers:{     
                   "project-id":"1a6189ae-77ee-4d5f-b112-37c133f8e17c",
                   "user-name" : user.email,
                   "user-secret": user.uid, 
                   "private-key":"97e94f4e-9e34-48e8-ae42-ba0e41cb41be",
          
                }
            })

            .then(() =>{
                setLoading(false); 
            })
            .catch(() =>{   
                let formdata =new FormData();
                formdata.append('email',user.email);
                formdata.append('username',user.email);
                formdata.append('secret',user.uid);

                getFile(user.photoURL)
               
                        .then((avatar) =>{
                              formdata.append ('avatar',avatar,avatar.name);


                              axios.post('https://api.chatengine.io/users',
                                    formdata,
                                    {headers:{"private-key":"97e94f4e-9e34-48e8-ae42-ba0e41cb41be"}}

                                )
                                .then(() => setLoading(false))
                                .catch((error)  => console.log(error))
                     })
           })
    
       },[user,history]);
    
    if(!user || loading) return 'loading...'; 

    return (
        <div className="chats-page">
    <div className="nav-bar">
        <div className="logo-tab">
            Chats
            </div>
            <div onClick ={handleLogout} className="logout-tab"> 
                Logout
            </div>
        </div>
        <ChatEngine
        height="calc(100vh-66px)"
        projectID="1a6189ae-77ee-4d5f-b112-37c133f8e17c"
        userName={user.email}  
        userSecret={user.uid} 
        />
   
        </div>    
        );
}

export default Chats;