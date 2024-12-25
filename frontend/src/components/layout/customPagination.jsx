import React, { useEffect, useState } from 'react'
import{useNavigate, useSearchParams} from 'react-router-dom'
import Pagination from "react-js-pagination"

const customPagination = ({resPerPage, filteredProductsCount}) => {
    const [currentPage, setCurrentPage] = useState(1)
    let [searchParams] = useSearchParams(); // gets params from url such ass localhost:3000/product?page=1, would return page: 1
    const navigate = useNavigate();
    
    const page = Number(searchParams.get('page')) || 1; // get the param ?page=1 and cast it to a number
    
    useEffect(() => {
        setCurrentPage(page)
    }, [page])
    // function to set url with correct page number we select 
    function setCurrentPageNo (pageNumber){
        setCurrentPage(pageNumber);

        if(searchParams.has("page")) {
            searchParams.set("page", pageNumber)
        }else {
            searchParams.append("page", pageNumber);
        }
        const path = window.location.pathname + "?" + searchParams.toString();

        navigate(path)
    }
    return (
        <div className='d-flex justify-content-center my-5 '>
            
            {filteredProductsCount > resPerPage && (
            <Pagination 
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={filteredProductsCount}

              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass='page-item'
              linkClass='page-link'
            />
            )}
        </div>
    )
}

export default customPagination
