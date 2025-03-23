import { useState, createContext } from "react";

const StatesContext = createContext();

const ContextProvider = ({ children }) => {
  const [postsType, setPostsType] = useState("all");
  const [selectValue, setSelectValue] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  return (
    <StatesContext.Provider
      value={{
        postsType,
        setPostsType,
        selectValue,
        setSelectValue,
        companyWebsite,
        setCompanyWebsite,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};
export { StatesContext, ContextProvider };
