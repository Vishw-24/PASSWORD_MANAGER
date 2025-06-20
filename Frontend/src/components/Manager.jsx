import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const input2Ref = useRef(null);

  const passwordRef = useRef()
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    try {
      const res = await fetch('http://localhost:3000/')
      const passwords = await res.json()
      console.log("Fetched passwords:", passwords);
      setPasswordArray(passwords)

    } catch (error) {
      console.error("Error fetching passwords:", error)
    }
  }

  useEffect(() => {
    getPasswords()
  }, [])

  const copyText = (text) => {
    toast('🦄 Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }



  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src);

    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "icons/hidden.png"
      passwordRef.current.type = "text"
    }
    // OR //
    // ref.current.src.includes("icons/hidden.png") ? ref.current.src = "icons/eye.png" : ref.current.src = "icons/hidden.png";
  }
  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: form.id })
      })

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" })
      toast('🦄 Password saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast('🦄 length should be greater > 3', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const deletePassword = async (id) => {
    let c = confirm("Are you sure to delete this data")
    if (c) {
      console.log("Deleting password with id: " + id);
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('🦄 Password deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const editPassword = (id) => {
    console.log("Editing password with id: " + id);
    setForm({...passwordArray.filter(i => i.id === id)[0] , id: id})
    setPasswordArray(passwordArray.filter(i => i.id !== id))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stop form submission
      nextRef.current?.focus(); // Focus next input
    }
  };

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className='mycontainer'>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>

          <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className="flex text-black flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, input2Ref)} placeholder='Enter website URL' type="text" className='rounded-full border border-green-500 w-full p-4 py-1' name='site' id='site' />
          <div className="sm:flex w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} ref={input2Ref}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)} placeholder='Enter Username' type="text" className='rounded-full border border-green-500 w-full p-4 py-1 my-2.5 sm:my-0' name='username' id='username' />
            <div className='relative'>
              <input ref={passwordRef} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  savePassword(); //  Final input submits the form
                }
              }} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-full border border-green-500 w-full p-4 py-1 px-1 sm:px-2.5 my-2.5 sm:my-0' name='password' id='password' />
              <span className='absolute sm:right-[3px] right-[6px] top-[13px] sm:top-[4px] cursor-pointer' onClick={showPassword}><img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" /></span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300 gap-1 cursor-pointer'>
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover">
            </lord-icon>Save Password</button>
        </div>

        <div className="passwords sm:w-[100%] w-[95%] mx-auto">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 ? <div> No Passwords to show</div> :
            <table className="table-auto w-full">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100 rounded-md overflow-hidden'>
                {passwordArray.map((item, index) => {

                  return <tr key={index}>
                    <td className='py-2 border border-white text-cente'>
                      <div className='flex justify-center items-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div onClick={() => { copyText(item.site) }} className='copybtn cursor-pointer size-7'>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px" }}
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex justify-center items-center'>
                        <span>{item.username}</span>
                        <div onClick={() => { copyText(item.username) }} className='copybtn cursor-pointer size-7'>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px" }}
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex justify-center items-center'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div onClick={() => { copyText(item.password) }} className='copybtn cursor-pointer size-7'>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px" }}
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/iubtdgvu.json"
                          colors="primary:#0f172a,secondary:#000000"
                          trigger="hover">
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px" }}
                          src="https://cdn.lordicon.com/xyfswyxf.json"
                          trigger="hover"
                        >
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>

      </div>
    </>
  )
}

export default Manager
