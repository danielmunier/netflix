import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios"
import {signIn} from "next-auth/react"
import {FcGoogle} from "react-icons/fc"
import {FaGit, FaGithub} from "react-icons/fa"
import { useRouter } from "next/router";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login")

  const router = useRouter();
  
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "login" ? "signup" : "login"))
  }, [])


const register = useCallback(async() => {
try {
  await axios.post('/api/register', {
    email, 
    name,
    password
  }) 
  console.log("Successfull register")
  router.push("/")

} catch(e) {
  console.log("Error trying to register")
  console.log(e)
}
  }, [email, name, password])

  
const login = useCallback(async()=> {
  	try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: "/profiles"
      })
      console.log("Successful login")
    } catch(e) {
      console.log("Error trying to login")
      console.log(e)
    }
}, [email, password])


const recruiterLogin = useCallback(async () => {
  try {
    await signIn("credentials", {
      email: "recruiter@gmail.com",
      password: "123",
      redirect: true,
      callbackUrl: "/profiles",
    });
    console.log("Successful recruiter login");
  } catch (e) {
    console.log("Error trying to login as recruiter");
    console.log(e);
  }
}, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h1 className="text-white text-5lx mb-5 font-semibold">{variant === 'login'? 'Sign in' : 'Create an account'}</h1>

            <div className="flex flex-col gap-4">
              {variant === 'signup' && (
                  <Input
                  label="Name"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  type="name"
                  value={name}
                  />
              )}
             
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button onClick={variant === "login" ? login:register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover: bg-red-700 transition">
              {variant === "login" ? "Login" : "Register"}
            </button>
        
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', {callbackUrl: "/profiles"})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer h over:opacity-80 transition"> <FcGoogle size={30} /></div>
              <div onClick={() => signIn('github', {callbackUrl: "/profiles"})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer h over:opacity-80 transition"> <FaGithub size={30} /></div>
            </div>
          
            <p className="text-neutral-500 mt-5">
              {variant === 'login' ? "Don't have an account? " : "Already have an account?"}
              <span onClick={toggleVariant} className="text-white cursor-pointer">
                {variant === 'login' ? 'Sign up' : 'Login'}
              </span>
            </p>
              
            <p className="text-neutral-500 mt-5">
              Are you a recruiter?
            <span onClick={recruiterLogin} className="text-white cursor-pointer"> Sign in instantly</span>

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
