import React, { useCallback } from "react";
import { FaPlay } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import {FaInfoCircle} from "react-icons/fa"
import useInfoModal from "@/hooks/useInfoModal";


interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();

  const {openModal} = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-100
      w-full
      h-[12vw]
    "
      />
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-200
      z-10
      invisible
      sm:visible
      delay-100
      w-full
      scale-0
      group-hover:scale-125
      group-hover:-translate-y-[6vw]
      group-hover:translate-x-[2vw]
      group-hover:opacity-100
    "
      >
        <img
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[12vw]
      "
        />
        <div
          className="
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        "
        >
          <div className="flex flex-row items-center gap-3">
            <div onClick={()=> router.push(`/watch/${data?.id}`)} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300 hover:scale-110">
              <FaPlay className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={handleOpenModal}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 rounded-full flex justify-center items-center transition hover:border-neutral-300 hover:scale-110"
            >
              <FaInfoCircle className="text-white"/>

            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
