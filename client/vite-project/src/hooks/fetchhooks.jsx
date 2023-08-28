import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.REACT_APP_SERVER_DOMAIN

export default function useFetch (query){
    useState({ isLoading: false, apiDelta: undefined, status: null, serverError: null })

    useEffect(() => {
      if(!query) return;

      const fetchData = async () => {
        try{
           setData(prev => ({ ...prev, isLoading: true }));
           const { data, status } = await axios.get(`/api/${query}`);
           
           if(status === 201){
            setData(prev => ({ ...prev, isLoading: false}));
            setData(prev => ({ ...prev, apiData: data, status: status })); 
           }

            setData(prev => ({ ...prev, isLoading: false }));
        } catch(error){
            setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            
        }
      }
    }, [query])
}








