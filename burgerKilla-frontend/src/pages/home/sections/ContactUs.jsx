import { useState } from 'react';
import toast from 'react-hot-toast';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    toast.success('Form sent!');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  }

  return (
    <section className="h-auto md:h-screen w-full bg-[linear-gradient(90deg,#fffff0f3_0%,#ffffe4f3_25%,#ffffd8f3_50%,#ffffe4f3_75%,#fffff0f3_100%)]">
      <div className="max-w-[1250px] w-full mx-auto h-full">
        <div className="flex flex-col items-center justify-center w-full h-full gap-10 px-5 py-0 sm:px-10 md:px-0 md:py-20 md:flex-row md:gap-0">
          <div className="flex items-center h-full px-5 md:flex-1/3 justify-evenly md:block">
            <h2 className="flex flex-col items-start justify-center text-2xl sm:text-4xl md:text-3xl lg:text-[3rem] font-poetsen ">
              <span className="text-amber-500 text-shadow-2xs text-shadow-amber-800">
                Spill the Sauce,
              </span>
              <span className="text-gray-600 text-shadow-2xs text-shadow-gray-900">
                We’re Listening
              </span>
            </h2>
            <img
              src={`${import.meta.env.VITE_BACKEND}public/img/home/contact-us.png`}
              className="w-50 h-50 sm:h-100 sm:w-100"
            />
          </div>
          <div className="w-full h-full px-0 pb-20 sm:px-5 md:pb-0 md:flex-2/3">
            <div className="w-full h-full bg-gray-200/60 rounded-xl shadow-[1px_5px_10px_1px] shadow-gray-500">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start justify-start w-full h-full gap-2 px-3 py-5 sm:py-10 sm:px-10 lg:px-20 md:gap-5"
              >
                <div className="flex flex-col-reverse items-center justify-start w-full gap-1">
                  <input
                    id="name"
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 font-semibold tracking-wide text-gray-500 bg-white border-b-2 rounded-sm outline-none peer border-b-transparent focus:border-b-green-500 focus:invalid:border-b-rose-500"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="w-full px-3 font-semibold text-gray-400 transition-all duration-300 ease-linear peer-placeholder-shown:translate-y-7 peer-placeholder-shown:opacity-0"
                  >
                    Name
                  </label>
                </div>
                <div className="flex flex-col-reverse items-center justify-start w-full gap-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 font-semibold tracking-wide text-gray-500 bg-white border-b-2 rounded-sm outline-none peer border-b-transparent focus:border-b-green-500 focus:invalid:border-b-rose-500"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="w-full px-3 font-semibold text-gray-400 transition-all duration-300 ease-linear peer-placeholder-shown:translate-y-7 peer-placeholder-shown:opacity-0"
                  >
                    Email
                  </label>
                </div>
                <div className="flex flex-col-reverse items-center justify-start w-full gap-1">
                  <input
                    id="phone"
                    type="number"
                    placeholder="phone number (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 font-semibold tracking-wide text-gray-500 bg-white border-b-2 rounded-sm outline-none peer border-b-transparent focus:border-b-green-500 focus:invalid:border-b-rose-500"
                  />
                  <label
                    htmlFor="name"
                    className="w-full px-3 font-semibold text-gray-400 transition-all duration-300 ease-linear peer-placeholder-shown:translate-y-7 peer-placeholder-shown:opacity-0"
                  >
                    Phone
                  </label>
                </div>
                <textarea
                  placeholder="Message"
                  className="w-full px-5 py-2 mt-5 font-semibold text-gray-500 placeholder-gray-400 bg-white rounded-lg resize-none md:mt-6 placeholder:font-semibold focus:outline-gray-300"
                  rows="5"
                  cols="30"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
                <button className="py-3 mx-auto mt-5 text-xl font-semibold tracking-wider text-white transition-colors duration-300 ease-linear cursor-pointer md:mt-0 bg-amber-500 px-15 rounded-xl hover:bg-amber-500/80">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
