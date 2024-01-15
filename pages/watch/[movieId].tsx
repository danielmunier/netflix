import React from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string)

  console.log(data)


  const isYoutubeVideo = (url: string) => {
    return url && url.includes("youtube.com")
  }

   if(isYoutubeVideo(data?.videoUrl)) {

  }

  return (
        <div className="h-screen w-screen bg-black ">

          <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
            <FaArrowLeft className="text-white cursor-pointer" onClick={() => router.push("/")} size="30" />
            <p className="text-white text-1xl md:text-3xl font-bold">
              <span className="font-light">
              </span>
              {data?.title}
            </p>
          </nav>

          {isYoutubeVideo(data?.videoUrl) ? (
       
        <iframe
         className="w-full h-full"
          src={data?.videoUrl}
          allowFullScreen
          allow="autoplay"
        ></iframe>
      ) : (
    
        <video
          autoPlay
          controls
          className="h-full w-full"
          src={data?.videoUrl}
        >
          Seu navegador não suporta o elemento de vídeo.
        </video>
      )}
        </div>

  )

};


export default Watch
