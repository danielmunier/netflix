import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import useCurrentUser from "@/hooks/userCurrentUser";
import { GetServerSideProps, GetServerSidePropsContext, NextPageContext } from "next"
import nextAuth, { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";
import { nextAuthOptions } from "./api/auth/[...nextauth]";
// Protege a rota /

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, nextAuthOptions);
  console.log(session)

  if(!session) {
    return {
      props: {
        session: await getSession()
      },
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

    const {data: movies = []} = useMovieList();
    const {data: favorites = []} = useFavorites();
    const {isOpen, closeModal} = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
          <MovieList title="Trending Now" data={movies}/>
          <MovieList title="My List" data={favorites}/>
      </div>
    </>

  )
}
