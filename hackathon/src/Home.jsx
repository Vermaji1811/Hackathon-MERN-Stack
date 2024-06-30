import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src="./mainlogo_1.png"
          alt="Event Logo"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="flex flex-col justify-center items-center bg-gray-300 border border-gray-400 rounded-md p-4 w-full ">
        <p className="text-red-500 text-3xl md:text-4xl lg:text-5xl text-center mb-10">
          Connection is what gives meaning to our lives!
        </p>
        <div className="flex flex-col md:flex-row md:space-x-12 lg:space-x-24">
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <img
              src="./signupimage.png"
              alt="Sign Up"
              className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
            />
            <Link to="/signup">
              <p className="text-blue-500 text-xl lg:text-2xl mt-4">Sign Up</p>
            </Link>
            <p className="text-stone-600 text-sm md:text-base mt-2">
              Become a part of your community
            </p>
          </div>
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <img
              src="./connect.png"
              alt="Connect"
              className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
            />
            <Link to="/connect">
              <p className="text-blue-500 text-xl lg:text-2xl mt-4">Connect</p>
            </Link>
            <p className="text-stone-600 text-sm md:text-base mt-2">
              Connect with your own people
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="./newsimage.png"
              alt="News"
              className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
            />
            <Link to="/news">
              <p className="text-blue-500 text-xl lg:text-2xl mt-4">News</p>
            </Link>
            <p className="text-stone-600 text-sm md:text-base mt-2">
              Check out all the recent news
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 w-full py-8">
        <img
          src="/sidelogo.png"
          alt="Side Logo"
          className="mx-auto w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
        />
        <p className="text-center text-4xl text-red-500 mt-10">Nexus.com- Made for the Locals </p>
        <p className="text-center text-1xl text-stone-600 mt-8">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore asperiores impedit laboriosam</p>
        <p className="text-center text-1xl text-stone-600 mt-1"> nihil optio rerum est natus debitis tenetur, odit, totam fuga corporis suscipit accusamus dignissimos perspiciatis</p> 
        <p className="text-center text-1xl text-stone-600 mt-1">minus consequuntur corrupti ipsa repellat. Tempore, voluptatum magnam ullam distinctio nostrum culpa minima. </p>
      </div>

      <div className="relative bg-gray-100 w-full" style={{ height: '450px', marginTop: '0' }}>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white flex items-center justify-center" style={{ width: '5cm', height: '2cm' }}>
          <p>Trusted by Millions</p>
        </div>
        <div className="absolute top-[5cm] left-[3cm] flex justify-start">
          <div className="text-center ml-[1cm] mt-1">
            <p className="text-center text-2xl text-black">Need help?</p>
            <div className="bg-black h-0.5 w-[3cm] mx-auto mt-1"></div>
            <div>
              <div className="mt-2"><Link to="/login">Member Login</Link></div>
              <div className="mt-2"><Link to="/signup">Sign Up</Link></div>
              <div className="mt-2"><a href="#">How to use Nexus.com</a></div>
              <div className="mt-2"><a href="#">FAQ</a></div>
              <div className="mt-2"><a href="#">Customer Support</a></div>
            </div>
          </div>
          <div className="text-center ml-[5cm] mt-1">
            <p className="text-xl text-black">Company</p>
            <div className="bg-black h-0.5 w-[3cm] mx-auto mt-1"></div>
            <div>
              <div className="mt-2"><a href="#">About Us</a></div>
              <div className="mt-2"><a href="#">Events Blog</a></div>
              <div className="mt-2"><Link to="/event">All Events</Link></div>
              
              <div className="mt-2"><a href="#">Contact Us</a></div>
            </div>
          </div>
          <div className="text-center ml-[5cm] mt-1">
            <p className="text-xl text-black">Privacy & You</p>
            <div className="bg-black h-0.5 w-[5cm] mx-auto mt-1"></div>
            <div>
              <div className="mt-2"><a href="#">Terms of Use</a></div>
              <div className="mt-2"><a href="#">Privacy Policy</a></div>
              
              <div className="mt-2"><a href="#">Report Misuse</a></div>
            </div>
          </div>
          <div className="text-center ml-[5cm] mt-1">
            <p className="text-xl text-black">More</p>
            <div className="bg-black h-0.5 w-[2cm] mx-auto mt-1"></div>
            <div>
              <div className="mt-2"><a href="#">Events Success Stories</a></div>
              <div className="mt-2"><a href="#">Events Live</a></div>
              <div className="mt-2"><a href="#">Event Centres</a></div>
             
            </div>
          </div>
        </div>
        </div>

      {/* Footer section */}
      <footer className="bg-gray-800 text-white w-full py-6 mt-8">
        <div className="flex flex-col items-center">
          <p className="text-center text-sm">© 2024 Nexus.com - All Rights Reserved</p>
          <div className="flex space-x-4 mt-4">
            <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
            <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;