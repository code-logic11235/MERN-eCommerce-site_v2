class APIFilters {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword, //use regex to search in the model
                $options: 'i'
            } 
        }
        : 
        {};
        this.query = this.query.find({ ...keyword});

        return this;

    }

    filters(){
        let queryCopy = {...this.queryStr}
        delete queryCopy.keyword
        delete queryCopy.page

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(itemPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = itemPerPage * (currentPage -1);

        this.query = this.query.limit(itemPerPage).skip(skip);
        return this;
    }
}
export default APIFilters;