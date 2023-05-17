import { useState } from "react"
import useToast from "./useToast";

const useLocalStorage = <T>(key:string, initialState:T) =>{
    const { addToast } = useToast(); // 에러 처리를 따로 훅으로 만들었다면, catch 하는 부분에서 띄워주는게 좋을까 아니면 에러를 던지고 그 에러를 받는 컴포넌트에서 처리하는게 좋을까

    const [state,setState] = useState<T>(() =>{
        try{
            const json = localStorage.getItem(key);
            if(json === null) throw Error(`${key}값을 가진 데이터가 존재하지 않습니다.`)
    
            const data = JSON.parse(json) as T;
            return data
        }catch(error){
            if((error instanceof Error)) {
                addToast({
                    id: Number(new Date()),
                    message: error.message,
                    type: "error"
                })
            }

            return initialState;
        }
    
    });


    const setLocalStorage = (data:T) =>{
        setState(data);
        localStorage.setItem(key,JSON.stringify(data));
    }


    return { state, setLocalStorage }
}

export default useLocalStorage