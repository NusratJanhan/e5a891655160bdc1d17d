import React,{useCallback} from "react";

 const Posts=props=>{
    const fetchPostsHandler=useCallback(()=>{
       const response=await fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&pae=0");
       const data= response.json();
       console.log(data)
    },[]);

}




export default Posts;