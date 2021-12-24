import './App.css';

function App() {
  return (
    <div className="">
      <header className="bg-[#f3f4f6] font-family-karla h-screen">
        <div class="w-full flex flex-wrap">
          <div class="w-1/2">
            <img class="object-cover w-full h-screen hidden md:block" src="https://images.unsplash.com/photo-1614533422292-c9c305e68469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
          </div>

          <div class="w-full md:w-1/2 flex flex-col">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
              <p class="text-center text-4xl">Crypto Tracker</p>
              <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                <div class="flex flex-col pt-4">
                  <label for="username" class="text-lg">Username</label>
                  <input type="text" id="username" placeholder="Username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <div class="flex flex-col pt-4">
                  <label for="password" class="text-lg">Password</label>
                  <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                </div>

                <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
              </form>
              <div class="text-center pt-12 pb-12">
                <p>Don't have an account? <a href="register.html" class="underline font-semibold">Register here.</a></p>
              </div>
            </div>

          </div>



        </div>
      </header>
    </div>
  );
}

export default App;
