import { useState } from "react"

const useLocalStorage = <T>(key:string, initialState:T) =>{
    // const { toast } = useToast(); // 에러 처리를 따로 훅으로 만들었다면, catch 하는 부분에서 띄워주는게 좋을까 아니면 에러를 던지고 그 에러를 받는 컴포넌트에서 처리하는게 좋을까
    // toast를 띄워주고 싶지 않은 경우도 있지 않음? 선택권을 주겠음...
    const [error, setError] = useState({isError:false, message:""})
    const [state,setState] = useState<T>(() =>{
        try{
            const json = localStorage.getItem(key);
            if(json === null) throw Error(`${key}값을 가진 데이터가 존재하지 않습니다.`)
    
            const data = JSON.parse(json) as T;
            return data
        }catch(error){
            if((error instanceof Error)) {
                setError({
                    isError:true,
                    message:error.message
                })
            }

            return initialState;
        }
    });


    const setLocalStorage = (data:T) =>{
        setState(data);
        localStorage.setItem(key,JSON.stringify(data));
    }


    return { state, error, setLocalStorage }
}

export default useLocalStorage