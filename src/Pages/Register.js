import React from 'react';
import { Link } from 'react-router-dom';

function Register() {

  const handleRegister = async (e) => {
    e.preventDefault();
    // const token = await registerUser({
    //   username,
    //   password
    // })
  }

  return (
    <div>
      <header className="bg-[#f3f4f6] font-family-karla h-screen">
        <div class="w-full flex flex-wrap">
          <div class="w-1/2">
            <img class="object-cover w-full h-screen hidden md:block" src="https://images.unsplash.com/photo-1614533422292-c9c305e68469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
          </div>

          <div class="w-full md:w-1/2 flex flex-col">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p class="text-center text-4xl">Create an Account!</p>
              <form class="flex flex-col pt-3 md:pt-8" onSubmit={handleRegister}>
                <div class="mb-4 md:flex md:justify-between">
                  <div class="mb-4 md:mr-2 md:mb-0">
                    <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                      First Name
                    </label>
                    <input
                      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="md:ml-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                      Last Name
                    </label>
                    <input
                      class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="mb-4">
                  <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                    Email
                  </label>
                  <input
                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mb-4 md:flex md:justify-between">
                  <div class="mb-4 md:mr-2 md:mb-0">
                    <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                      Password
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    <p class="text-xs italic text-red-500">Please choose a password.</p>
                  </div>
                  <div class="md:ml-2">
                    <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                      Confirm Password
                    </label>
                    <input
                      class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <Link to='/ForgotPass' class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">Forgot Password?</Link>
                </div>
                <div class="text-center">
                  <Link to='/login' class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">Already have an account? Login!</Link>
                </div>

                <input type="submit" value="Register Account" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Register;