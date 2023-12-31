import useSWR from "swr";
import axios from "axios"
import fetcher from "@/lib/fetcher";
import { config } from "process";

const useCurrentUser = () => {
 try{
  const { data, error } = useSWR("http://localhost:3000/api/current", fetcher);
  
  return {
    data,
    error,
  };
 } catch(e) {
  console.log("Erro ao consultar usuario atual")
  console.log(e)
  return {

  }
 }
};




export default useCurrentUser