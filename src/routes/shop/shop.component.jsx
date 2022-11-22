import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import { CategoriesProvider } from "../../contexts/categories.context";

import { getCategoriesandDocuments} from '../../utils/firebase/firebase.utils'
import { useEffect } from "react";
import { setCategories } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async() => {
        const categoriesArray  = await getCategoriesandDocuments();
        dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
},[])

  return (
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
  );
};

export default Shop;
