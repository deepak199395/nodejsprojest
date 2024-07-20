import React,{Suspense,lazy} from 'react'
const RegisterForm= lazy(()=>import('./RegisterForm'))
const Todo = lazy(()=>import("./Todo"))
//import RegisterForm from "../Components/RegisterForm"
const LassyLoading = () => {
  return (
    <div>
    <div>
    <Suspense fallback={<div>
        please wait.....
        </div>}>
    <RegisterForm/>
    </Suspense></div>
    <h1>lassy loading</h1>

    
    <Suspense fallback={<div>
        please wait.....
        </div>}>
    <Todo/>
    </Suspense>
     
    </div>
  )
}

export default LassyLoading
