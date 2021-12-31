import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

async function registerUser(credentials) {
  try {
    return fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  } catch (error) {
    throw new Error('Unable to create user profile in DB');
  }
}

function Register() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === confirmPass && password.length) {
      const token = await registerUser({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password
      });

      if (token.authorized) {
        console.log(token);
        navigate('/login');
      }
    }

  }

  return (
    <div>
      <header className="bg-[#f3f4f6] font-family-karla h-screen">
        <div className="w-full flex flex-wrap">
          <div className="w-1/2">
            <img className="object-cover w-full h-screen hidden md:block" src="https://images.unsplash.com/photo-1614533422292-c9c305e68469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="w-4/5 md:w-full lg:w-4/6 flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p className="text-center text-4xl">Create an Account!</p>
              <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleRegister}>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={e => { setFirstName(e.target.value) }}
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={e => { setLastName(e.target.value) }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={e => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      onChange={e => { setPassword(e.target.value) }}
                    />
                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="c_password">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                      onChange={e => { setConfirmPass(e.target.value) }}
                    />
                  </div>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link to='/ForgotPass' className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">Forgot Password?</Link>
                </div>
                <div className="text-center">
                  <Link to='/login' className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">Already have an account? Login!</Link>
                </div>

                <input type="submit" value="Register Account" className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Register;