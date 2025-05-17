import { useEffect, useState } from "react";
import { createContext } from "react";
import { fetchCategories } from "../services/CategoryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategoryData() {
      const response = await fetchCategories();
      setCategories(response.data);
    }
    loadCategoryData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
