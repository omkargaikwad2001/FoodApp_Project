import React, { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const ExploreFood = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={(e)=>e.preventDefault()}>
              <div className="input-group mb-3">
                {/* Use value instead of selected */}
                <select 
                  className="form-select" 
                  style={{ maxWidth: '170px' }} 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Burger">Burger</option>
                  <option value="Cake">Cakes</option>
                  <option value="Ice Cream">Ice Cream</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                </select>
                <input type="text" className="form-control" placeholder="Search Food..." 
                onChange={(e)=>setSearchText(e.target.value)} value={searchText}/>
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={selectedCategory} searchText={searchText}/>
    </>
  );
};

export default ExploreFood;
