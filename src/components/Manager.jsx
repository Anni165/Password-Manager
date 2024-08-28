import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiEdit2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site:"", username:"", password:""})
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords=localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])
  

  const showPassword=()=>{
    passwordRef.current.type="text"
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src="icons/eye.png"
      passwordRef.current.type="password"
    }
    else{
      ref.current.src="icons/hidden.png"
      passwordRef.current.type="text"
    }
  }

  const savePassword=() => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
      setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
      console.log([...passwordArray, form]);
      setform({site:"", username:"", password:""})
      toast('Saved succesfully...😼', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    else{
      toast('error, password not saved...😿',{
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark",
      });
    }
  }

  const deletePassword=(id) => {
    console.log("deleting pass with id", id);
    let c=confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast('Password Deleted...😾', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }
  const editPassword=(id) => {
    console.log("editing pass with id", id);
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  }
  

  const copyText=(text) => {
    toast('Copied to clipboard...😸', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
  }
  
  

  const handleChange= (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }
  

  return (
    <div className="text-white flex items-center flex-col min-h-[40.25vw]">
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition= "Bounce"/><ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <div className="mx-auto max-w-4xl pt-[110px]">
        <h1 className="text-3xl font-bold text-center"><span className="text-green-300">&lt;</span>
            Pass
          <span className="text-green-300">Man/&gt;</span></h1>
        <p className="font-bold text-lg ">Your own Password Manager</p>
      </div> 

      <div className="flex flex-col pt-[50px] gap-2 justify-center items-center">
        <input value={form.site} name="site" onChange={handleChange} placeholder="Enter Website Name" type="text" className="rounded-full border border-green-500 w-[700px] text-black p-4 py-1" />
        <div className="flex justify-around gap-[60px]">
          <input value={form.username} name="username" onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 w-80 text-black p-4 py-1" type="text" />
          
          <div className="relative">
            <input ref={passwordRef} value={form.password} name="password" onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 w-80 text-black p-4 py-1" type="password" />
            <span className="absolute right-3 top-0.5 cursor-pointer" onClick={showPassword}> 
              <img ref={ref} width={28} src="/icons/eye.png" alt="" />
            </span>
          </div>

        </div>
        <button onClick={savePassword} className="flex justify-center items-center bg-green-400 hover:bg-green-600 hover:text-white rounded-full px-1 py-1 gap-1 w-[200px] text-black">
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            colors="">
          </lord-icon>
          Add Password</button>
      </div>
      <div className="passwords py-8">
        <h1 className="font-bold text-2xl py-4">Your Passwords</h1>
        {passwordArray.length === 0 && <div className="w-[700px] font-semibold">No Passwords to show...😒</div>}
        {passwordArray.length != 0 && 
        <table className="table-auto w-[700px] rounded-md overflow-hidden">
          <thead className="bg-green-500 text-black">
            <tr>
              <th className="text-center py-1 px-2">Site</th>
              <th className="text-center py-1 px-2">Username</th>
              <th className="text-center py-1 px-2">Passwords</th>
              <th className="text-center py-1 px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-green-200 text-black">
            {passwordArray.map((item, index)=>{
              return <tr key={index}>
              <td className="text-center py-1"><div className="flex justify-center items-center"><a href={item.site}>{item.site}</a><div className="cursor-pointer" onClick={()=>{copyText(item.site)}}><FaCopy /></div></div></td>
              <td className="text-center py-1"><div className="flex justify-center items-center">{item.username}<div className="cursor-pointer" onClick={()=>{copyText(item.username)}}><FaCopy /></div></div></td>
              <td className="text-center py-1"><div className="flex justify-center items-center">{item.password}<div className="cursor-pointer" onClick={()=>{copyText(item.password)}}><FaCopy /></div></div></td>
              <td className="justify-center text-center py-1"><div className="flex justify-center"><span className="cursor-pointer" onClick={()=>{editPassword(item.id)}}><RiEdit2Fill/></span><span className="mx-1 cursor-pointer" onClick={()=>{deletePassword(item.id)}}><RiDeleteBin5Fill/></span></div></td>
              </tr>
            })}
          </tbody>
        </table>
        }
      </div>
    </div>
  );
};

export default Manager;
