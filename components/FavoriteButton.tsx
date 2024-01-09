import axios from "axios"
import React, {useCallback, useMemo} from "react"
import {FaPlus, FaCheck} from "react-icons/fa"

import useCurrentUser from "@/hooks/userCurrentUser"
import useFavorites from "@/hooks/useFavorites"

interface FavoriteButtonProps {
    movieId: string
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites} = useFavorites();
    const { data: currentUser, mutate} = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(movieId)
    }, [currentUser, movieId])


    const toggleFavorites = useCallback(async () => {
        let response;

        if(isFavorite) {
            response = await axios.delete("/api/favorite", {data: {movieId}})
            console.log("DELETE")
            console.log(response)
        } else {
            response = await axios.post("/api/favorite", {movieId});
            console.log("POST")
            console.log(response)

        }

        const updatedFavoritesIds = response?.data?.favoritesIds


        mutate({
            ...currentUser,
            favoritesIds: updatedFavoritesIds
        })

        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? FaCheck : FaPlus

    return (
        <div
        onClick={toggleFavorites}
        className="
        cursor-pointer
        group/item
        w-6
        g-6
        lg:w-10
        lg:h-10
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
        hover:scale-110
        ">
            <Icon className="text-white"/>
        </div>
    )
}

export default FavoriteButton