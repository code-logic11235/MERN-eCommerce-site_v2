import React, { useEffect } from "react";
import MetaData from "./metaData";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/productItem";
import Loader from "./loader";
import toast from "react-hot-toast";

const Home = () =>{
    const {data, isLoading, error, isError} = useGetProductsQuery();
    useEffect(()=>{
        if(isError) {
            toast.error(error?.data?.message)
        }
    },[isError])

    if(isLoading) return <Loader/>
    return (
        <>
        <MetaData title={"buy Best Products Online"}/>
            <div className="container">
        <div className="row">
            <div className="col-12 col-sm-6 col-md-12">
            <h1 id="products_heading" className="text-secondary">Latest Products</h1>

            <section id="products" className="mt-5">
                <div className="row">

                    {data?.products?.map((product, key)=>(
                        <ProductItem product={product} key={key}/>
                    ))}
                

                </div>
            </section>
            </div>
        </div>
        </div>
        </>
    )
}

export default Home;