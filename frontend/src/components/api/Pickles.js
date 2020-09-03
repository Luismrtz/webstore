import React, {useState, useEffect} from 'react'
// import axios from 'axios';
const Pickles = () => {
    // useEffect(() => {
        //     const fetchData = async () => {
            //         const { data } = await axios.get("/api/storeProducts")
            //         setPick(data);
            //     }
            //     fetchData();
            //     return () => {
                //     };
                // }, [setPick])
                
const [pickles, setPickles] = useState([]);
    useEffect(() => {
        fetch("/api/storeProducts")
        .then(res => res.json())
        .then(data => setPickles(data))
    },[])
    
    
    console.log(pickles)
    
    
    return (
        <div>

        {pickles.storeProducts && pickles.storeProducts.map( pick => {
            return   <p key={pick.id}>{pick.title}</p>
        })}
        hello
        hello
        hello
        hello
        hello
        hello
        hello
    </div>
    )

}

export default Pickles
