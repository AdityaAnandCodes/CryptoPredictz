/* eslint-disable react/no-unknown-property */
import { Center, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Error404 } from "../components/Error404";
import { Link } from "react-router-dom"; // For routing
import { Bloom, EffectComposer } from "@react-three/postprocessing"; // Import postprocessing effects
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Navmini from "@/components/Navmini";

// Spotlight that follows the mouse position
const AnimatedSpotlight = () => {
  const spotlightRef = useRef();
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [isMouseInside, setIsMouseInside] = useState(true); // State to track if the mouse is inside the canvas

  // Update mouse position when the user moves the mouse
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };

    const handleMouseEnter = () => {
      setIsMouseInside(true); // Mouse entered the canvas
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false); // Mouse left the canvas
    };

    const canvas = document.querySelector('canvas'); // Select the canvas element
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Clean up event listeners when component unmounts
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Move spotlight based on mouse position only if mouse is inside the canvas
  useFrame(() => {
    if (spotlightRef.current && isMouseInside) {
      const [x, y,] = mousePosition;
      spotlightRef.current.position.x = x * 10;  // Adjust multiplier for range
      spotlightRef.current.position.y = y * 10;  // Adjust multiplier for range
      spotlightRef.current.position.z = 25;      // Keep z fixed for spotlight effect
    }
  });

  // Return the spotlight only if the mouse is inside the canvas
  return isMouseInside ? <spotLight ref={spotlightRef} intensity={500} visible={true} // Hide the actual light source
      castShadow={true} penumbra={1} /> : null;
};

const Error404Page = () => {
  return (
    <>
    <Navbar />
    <Navmini />
    <section className="min-h-screen w-full flex justify-center items-center">
      {/* Main container with horizontal layout */}
      <div className="w-full h-full flex flex-col xl:flex-row items-center justify-center">
        {/* Canvas for 3D model */}
        <div className="xl:w-[50vw] xl:h-[90vh] w-full  max-sm:h-[60vh]">
          <Canvas className="w-full h-full" camera={{ position: [0, 0, 50], fov: 50 }}>
            <ambientLight intensity={1} />
            
            {/* Animated Spotlight */}
            <AnimatedSpotlight />

            {/* Post-processing effects */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} enableDamping={false} />
            <EffectComposer>
              <Bloom intensity={1} width={300} height={300} kernelSize={3} />
            </EffectComposer>

            {/* 3D model */}
            <Center>
              <Error404 scale={30} />
            </Center>
          </Canvas>
        </div>

        {/* Content section on the right */}
        <div className="text-center text-white w-[40vw] max-sm:w-full xl:px-0  px-4 pb-10">
          <h1 className="text-4xl font-semibold mb-4">Oops! Page Not Found</h1>
          <p className="mb-6 text-lg">
            The page you are looking for doesn't exist. It seems like you've reached a broken link.
          </p>
          <Link
            to="/"
            className="bg-rose-600 text-white py-2 px-4 rounded font-semibold hover:bg-rose-500 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Error404Page;
