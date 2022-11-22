// import { createContext, useState, useEffect } from "react";
// import { addCollectionAndDocuments, getCategoriesandDocuments } from "../utils/firebase/firebase.utils.js";

// // import SHOP_DATA from '../shop-data.js'

// export const CategoriesContext = createContext({
//     categoriesMap: {},
// })

// export const CategoriesProvider = ({children}) => {
//     const [categoriesMap, setCategoriesMap] = useState({});

//     // call to set seed data into the database
//     // useEffect(() => {
//     //     addCollectionAndDocuments('categories', SHOP_DATA)
//     // },[])

//     // move to shop page
//     // useEffect(() => {
//     //     const getCategoriesMap = async() => {
//     //         const categoryMap  = await getCategoriesandDocuments();
//     //         setCategoriesMap(categoryMap);
//     //     }
//     //     getCategoriesMap();
//     // },[])


//     const value = {categoriesMap};
//     return (
//         <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
//     )
// }