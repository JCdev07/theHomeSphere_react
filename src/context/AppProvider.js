import React, { createContext } from "react";

export const AppContext = createContext();

// export const AppProvider = (props) => {
//    const [user, setUser] = useState({
//       isAuth: false,
//       id: "",
//       firstname: "",
//       lastname: "",
//       email: "",
//       isAdmin: false,
//    });

//    let userCredentials = localStorage["userToken"];
//    useEffect(() => {
//       if (userCredentials) {
//          fetch("https://thehomesphereapi.herokuapp.com/profile", {
//             headers: {
//                Authorization: `Bearer ${userCredentials}`,
//             },
//          })
//             .then((response) => {
//                return response.json();
//             })
//             .then((data) => {
//                if (data.user) {
//                   setUser({
//                      isAuth: true,
//                      id: data.user._id,
//                      firstname: data.user.firstname,
//                      lastname: data.user.lastname,
//                      email: data.user.email,
//                      isAdmin: data.user.isAdmin,
//                   });
//                }
//             });
//       }
//    }, []);

//    return (
//       <AppContext.Provider value={[user, setUser]}>
//          {props.children}
//       </AppContext.Provider>
//    );
// };

// // export const userLogout = () => {

// // }
