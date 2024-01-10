import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import {FaInfoCircle} from "react-icons/fa"
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard();
  const {openModal} = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  }, [openModal, data?.id])

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
        autoPlay
        muted
        loop
        className="
            w-full
            h-[56.25vw]
            object-cover
            brightness-[60%]
            "
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p
          className="
                text-white
                 text-1xl
                  md:text-5xl
                   h-full 
                   w-[50%]
                    lg:text-6xl 
                    font-bold 
                    drop-shadow-xl"
        >
          {data?.title}
        </p>
        <p className="
        text-white
        text-[8px]
        md:text-lg
        mt-3
        md:mt-8
        w-[80%]
        md:w-[90%]
        lg:w-[50%]
        drop-shadow-xl


        ">{data?.description}</p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-4">
            <button onClick={handleOpenModal} className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center
            hover:bg-opacity-20
            transition
            ">
                <FaInfoCircle className="mr-1"/>
                More Info
            </button>

            <PlayButton movieId={data?.id}/>
            
        </div>
      </div>
    </div>
  );
};

export default Billboard;
