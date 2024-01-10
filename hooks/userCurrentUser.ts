import useSWR from "swr";
import axios from "axios"
import fetcher from "@/lib/fetcher";
import { config } from "process";

const useCurrentUser = () => {
 try{
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
 } catch(e) {
  console.log("Erro ao consultar usuario atual")
  console.log(e)
  return {

  }
 }
};




export default useCurrentUser