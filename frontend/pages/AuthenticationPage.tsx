import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

const AuthenticationPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const balls = document.querySelectorAll(".ball");
    if (balls.length) {
      balls.forEach((ball) => {
        gsap.to(ball, {
          x: `+=${Math.random() * 400 - 200}`,
          y: `+=${Math.random() * 400 - 200}`,
          duration: Math.random() * 6 + 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, []); // Ensures this runs only once on mount

  const handleEmailSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Email submitted:", email);
    setOtpSent(true);
    // Trigger backend API call to send OTP here
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("OTP submitted:", otp);
    // Trigger backend API call to verify OTP here
  };

  return (
    <>
      <section className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-black via-black to-gray-950">
        <div className="text-4xl font-bold p-4 px-8 absolute text-white z-10">
          <a href="/">CryptoBetz</a>
        </div>
        <div className="flex h-screen items-center justify-center flex-wrap z-10 px-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-white z-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
            {!otpSent ? (
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onInput={(e) => {
                      e.preventDefault(); // Prevent default behavior
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded mt-4 text-center text-white font-semibold"
                >
                  Get OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">OTP</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded mt-4 text-center text-white font-semibold"
                >
                  Verify OTP
                </button>
              </form>
            )}
            <div className="mt-6 text-center">
              <p className="text-sm mb-4">Or</p>
              <div className="flex justify-center items-center">
                <button
                  className="flex items-center bg-gray-100 text-black py-3 px-6 rounded hover:bg-gray-200 w-full justify-center"
                  onClick={() => console.log("Login with Google")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
        {[...Array(16)].map((_, index) => (
          <div
            key={index}
            className="ball rounded-full bg-blue-950 opacity-50 absolute"
            style={{
              width: `${Math.random() * 20 + 50}px`,
              height: `${Math.random() * 20 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(12px)",
            }}
          ></div>
        ))}
      </section>
    </>
  );
};

export default AuthenticationPage;
