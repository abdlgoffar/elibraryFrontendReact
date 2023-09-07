import { Navigate } from "react-router-dom";

const Secure = (props) => {


    async function getUserAuth(token) {
        
        try {

            const requestGetUser = await fetch("http://127.0.0.1:8000/api/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            
            });

           if (requestGetUser.status !== 200) return <Navigate to={"/login"}/>

            } catch (error) {
                //console.log(error);
            }
    }


    const authentication = localStorage.getItem("token");
    if (authentication === null) {
        return <Navigate to={"/login"}/>
    } else {

        const token = localStorage.getItem("token");
        getUserAuth(token)
        
        return props.children;
        
    }
    
}
export default Secure;