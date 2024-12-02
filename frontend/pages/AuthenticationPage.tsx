import { useOkto, type OktoContextType } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const AuthenticationPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { sendEmailOTP, verifyEmailOTP, authenticate } = useOkto() as OktoContextType;
  const ballsRef = useRef<HTMLDivElement[]>([]); // Store references to the balls

  useEffect(() => {
    ballsRef.current.forEach((ball) => {
      gsap.to(ball, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        duration: Math.random() * 6 + 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    try {
      const response = await sendEmailOTP(email);
      setOtpToken(response.token);
      setOtpSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
      console.error("Send OTP Error:", err);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    setError(null);
    try {
      const success = await verifyEmailOTP(email, otp, otpToken!);
      if (success) {
        setOtpSent(false);
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to verify OTP";
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    authenticate(idToken, (authResponse, error) => {
      if (authResponse) {
        setAuthToken(authResponse.auth_token);
      } else if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  // Pre-calculate ball styles
  const ballStyles = useRef(
    [...Array(16)].map(() => ({
      width: `${Math.random() * 20 + 50}px`,
      height: `${Math.random() * 20 + 50}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      filter: "blur(12px)",
    })),
  );

  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-black via-black to-gray-950">
      <div className="text-4xl font-bold p-4 px-8 absolute text-white z-10">
        <a href="/">
          <img src="../../public/logo.png" className="w-44 h-auto" alt="" />
        </a>
      </div>
      <div className="flex h-screen items-center justify-center flex-wrap z-10 px-4">
        <div className="bg-zinc-900 bg-opacity-75 p-6 rounded-lg shadow-lg max-w-sm w-full text-white z-20">
          <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {!otpSent ? (
            <form onSubmit={handleSendOTP}>
              <div className="mb-4">
                <label className="block text-lg  mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  value={email}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 transition-all rounded mt-4 text-center text-white font-semibold"
              >
                Get OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">OTP</label>
                <input
                  type="text"
                  className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 transition-all rounded mt-4 text-center text-white font-semibold"
              >
                Verify OTP
              </button>
            </form>
          )}
          <div className="mt-6 flex flex-col text-center ">
            <p className="text-md mb-4">Or</p>
            <div className="flex w-full justify-center scale-105 hover:bg-opacity-25 transition-all">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                useOneTap={false}
                onError={() => console.error("Google login error")}
              />
            </div>
          </div>
        </div>
      </div>
      {ballStyles.current.map((style, index) => (
        <div
          key={index}
          className="ball rounded-full bg-blue-950 opacity-50 absolute"
          style={style}
          ref={(el) => el && (ballsRef.current[index] = el)}
        ></div>
      ))}
    </section>
  );
};

export default AuthenticationPage;
