import Login from './../Pages/Login/Login';

export  function ProtectedRouting(props) {
    if(localStorage.getItem('token')){
        return props.children;
    }else{
        return <Login/>
    }
}
