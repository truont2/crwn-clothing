import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
// import { CategoriesProvider } from "../../contexts/categories.context";

// import { getCategoriesandDocuments} from '../../utils/firebase/firebase.utils'
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  // perfect example of where to use redux thunk
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
      <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element={<Category />} />
      </Routes>
  );
};

export default Shop;
