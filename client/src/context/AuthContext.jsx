import {createContext,useContext,useEffect,useState} from 'react';
import api from '../services/api';
const AuthContext=createContext(null);
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[ready,setReady]=useState(false);
 useEffect(()=>{const token=localStorage.getItem('imovies_token');if(token)api.get('/auth/me').then(r=>setUser(r.data.data.user)).catch(()=>localStorage.removeItem('imovies_token')).finally(()=>setReady(true));else setReady(true);},[]);
 async function login(email,password){const r=await api.post('/auth/login',{email,password});localStorage.setItem('imovies_token',r.data.data.token);setUser(r.data.data.user);return r.data.data.user;}
 async function register(name,email,password){const r=await api.post('/auth/register',{name,email,password});localStorage.setItem('imovies_token',r.data.data.token);setUser(r.data.data.user);return r.data.data.user;}
 function logout(){localStorage.removeItem('imovies_token');setUser(null);}
 return <AuthContext.Provider value={{user,ready,login,register,logout,setUser}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
