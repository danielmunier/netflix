import useCurrentUser from "@/hooks/userCurrentUser";
import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";

// Protege a rota /
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
    const data = useCurrentUser();
    console.log(data?.data)
  return (
    <>
      <h1 className="bg-white">Netflix {data?.data?.name}</h1>
     <p className="bg-white">Name: {data?.data?.name}</p>
      <p className="bg-white">Email: {data?.data?.email}</p> 

      <button className="h-10 w-full bg-white" onClick={() => signOut()}>Logout</button>
    </>

  )
}
