import { useRouteError } from "react-router"

export default function Error(){
     const error = useRouteError()
     console.log(error);
     return(
        <div>Something went wrong.{error.status}</div>  
     )
}