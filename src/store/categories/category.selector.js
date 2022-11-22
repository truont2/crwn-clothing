import { createSelector } from "reselect";

// selector to grab categories slice of redux store
const selectCategoryReducer = (state) => {
    // selector to grab the categories state from the redux store
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoryReducer],
  // will only run if category slice we get from the selector above, then we will rerun this
  (categorySlice) => {
    // grabs the categoires from the categories state
    return categorySlice.categories;
  }
);

// currently cateogires is taking in an array whihc is the data at its basic form
// in the selector we do our logic to transform the data into the form we want
// in this case, we want a map of the categories
// export const selectCategoriesMap = (state) =>
//   state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;

//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});

// will only run when categories array does not change
// it will reduce once in the beginning
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // code below will not rerender if selectCategories is not different
    return categories.reduce((acc, category) => {
      const { title, items } = category;

      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
