import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './login.css';

async function loginUser(credentials) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email: email.toLowerCase(),
      password
    });
    if (token.authorized) {
      navigate('/dashboard', { state: token.data });
    }
    // setToken(token);
  }

  return (
    <div>
      <header className="bg-[#f3f4f6] font-family-karla h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-1/2">
            <img className="object-cover w-full h-screen hidden md:block" src="https://images.unsplash.com/photo-1614533422292-c9c305e68469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-4/5 flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p className="text-center text-4xl">Crypto Tracker</p>
              <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                <div className="flex flex-col pt-4">
                  <label htmlFor="username" className="text-lg">Email</label>
                  <input
                    type="email"
                    id="username"
                    placeholder="Email"
                    onChange={e => { setEmail(e.target.value) }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex flex-col pt-4">
                  <label htmlFor="password" className="text-lg">Password</label>
                  <input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <input type="submit" value="Log In" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
              </form>
              <div className="text-center pt-12 pb-12">
                <p>Don't have an account?
                  <Link to='/register' className="underline font-semibold">Register here.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

  )
}

export default Login;