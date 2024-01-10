import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import useCurrentUser from "@/hooks/userCurrentUser";
import { NextPageContext } from "next"
import nextAuth, { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils";
import { nextAuthOptions } from "./api/auth/[...nextauth]";
// Protege a rota /

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
