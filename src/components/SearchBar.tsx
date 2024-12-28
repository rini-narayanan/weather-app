import React, { useState } from "react"; 
import logo from '../../src/logo.png' 
import "./SearchBar.css";  
  
interface SearchBarProps {  
  onSearch: (searchCity: string) => void;  
}  
  
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {  
  const [searchTerm, setSearchTerm] = useState<string>("");  
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {  
   e.preventDefault();  
   onSearch(searchTerm);  
   setSearchTerm("");
  };  
  
  return (  
   <div className="search-bar">  
   <img src={logo} alt="Logo" className="logo" /> 
    <form onSubmit={handleSearch}>  
      <input  
       type="text"  
       value={searchTerm}  
       onChange={(e) => setSearchTerm(e.target.value)}  
       placeholder="Search for a city"  
      />  
      <button type="submit">Search</button>  
    </form>  
   </div>  
  );  
};  
  
export default SearchBar;
