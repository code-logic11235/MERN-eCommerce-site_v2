import React, { useEffect } from "react";
import MetaData from "./metaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/productItem";
import Loader from "./loader";
import toast from "react-hot-toast";
import CustomPagination from "./customPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./filters";

const Home = () =>{

    let [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 1; 
    const keyword = searchParams.get("keyword") || ""; 
    const min = searchParams.get("min") ; 
    const max = searchParams.get("max") ; 
    const category = searchParams.get("category") ;

    const params = {page, keyword}; // turn it into params obj to pass to our query
    
    min !== null && (params.min = min);
    max !== null && (params.max = max);
    category !== null && (params.category = category)

  console.log(params)
    const {data, isLoading, error, isError} = useGetProductsQuery( params);
    useEffect(()=>{
        if(isError) {
            toast.error(error?.data?.message)
        }
    },[isError])
    
    if(isLoading) return <Loader/>
    const columnSize = keyword ? 4 : 3;

    return (
          <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.productCount} Products found with keyword: ${keyword}`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} columnSize={columnSize} />
              ))}
            </div>
          </section>

          <CustomPagination resPerPage={data?.itemPerPage} filteredProductsCount={data?.productCount}/>
        </div>
      </div>
    </>
    )
}

export default Home;