//todo HOOKS VERSION

import React, {useState, useEffect} from 'react'
//import {storeProducts, detailProduct, bannerSmall, bannerLarge} from './data';

 import axios from 'axios';
import { getDefaultNormalizer } from '@testing-library/react';


export const ProductContext = React.createContext();

//Provider  
//todo || CONSERNSSSS!!! WITH USESTATE()()()() &&&&& VALUE={{CONTENT}}
export const ProductProvider = ({children}) => {
    // const [products] = useState({
    //     // products: storeProducts,
    //     // detailProduct: detailProduct
    //     storeProducts,
    //     detailProduct
    //  })
//
//
//
//
 //  const [products, setProducts] = useState({storeProducts})
    // const [deetProducts] = useState({detailProduct})
    // const [bSmall] = useState({bannerSmall})
    // const [bLarge] = useState({bannerLarge})
   // const [pickles, setPickles] = useState([]);
     //const [products, setProducts] = useState({storeProducts});
    // const [termsValidation, setTermsValidation] = useState(false);
      //  const [products, setProducts] = useState([]);
                // useEffect(() => {

               
                //        const retrieveTutorials = () => {
                //         TutorialDataService.getAll()
                //           .then(response => {
                //             setTutorials(response.data);
                //             console.log(response.data);
                //           })
                //           .catch(e => {
                //             console.log(e);
                //           });
                //       };
                //     },[])

                // useEffect(() => {
                //     axios("/api/storeProducts")
                //     .then(result => {
                //         console.log(result);
                //         setPickles(result.data)
                //     })
                // }, [setPickles])

                
                // useEffect(() => {
                //     const fetchData = async () => {
                //         const { data } = await axios.get("/api/storeProducts")
                //         setPickles(data);
                //     }
                //     fetchData();
                //     return () => {
                //     };
                // }, [setPickles])

                
                // useEffect(() => {
                //     if (!termsValidation) {
                //         const fetchData = async () => {
                //             const { data } = await axios.get("/api/storeProducts");
                //             setPickles(data);
                //             console.log(data)
                //         }
                //         fetchData();
                //     }
                // }, [termsValidation])

                // useEffect(() => {
                //     axios.get("/api/storeProducts").then((resp) => setPickles(resp.data));
                    
                //     // return () => {
                //     //     cleanup
                //     // }
                // }, [])
                




                //     const fetchData = async (pickle) => {
                //         const { data } = await axios.get("/api/storeProducts")
                       
                //         setPickles(data);
                       
                //     }
                
                    
                //     useEffect(() => {
                //         fetchData(pickle);
                // }, [pickle])


                // useEffect(() => {
                //     (async pickles => {
                //         const {data} = await axios.get("/api/storeProducts");
                //         setPickles(data);
                //     })(pickles);
                // }, [pickles])


                    //    console.log(pickles);
                      //  console.log(products)
                    


//                     const [apple, setApple] = useState([]);
// useEffect(() => {
//     axios({
//         method: "GET",
//         url: "http://localhost:5001/",
//         headers: {
//             "content-Type": "application/json"
//         }
//     }).then(res => {
//         setApple(res.data)
//     });
//     }, [])
// console.log(apple);

    // useEffect(() => {
    //     fetch("http://localhost:5001/")
    //     .then(response => response.json())
    //     .then(responseJson => {
    //         setApple(responseJson.data)
    //     });
    //     return () => {
    //        //
    //     }
    // }, [setApple])

  //
  //
  //
  //
  //  
    // useEffect(() => {
    //         let tempProducts = [];

    //         storeProducts.forEach(item => {
    //              const singleItem = { ...item};
    //             tempProducts = [...tempProducts, singleItem];
    //         })
    //     return () => {
    //         setProducts(tempProducts)
    //     }
    // },[])

    // const getItem = id => {
    //     const product = products.find(item => item.id === id);
    //     return product
    // }

    // const handleDetail = (id) => {
    //     // console.log('hello from detail');
    //     const product = getItem(id);
    //     setProducts(() => {
    //         return{detailProduct: product}
    //     })
    // }

    // const addToCart = (id) => {
    //     // console.log('hello from add to cart');
    //     console.log(`hello from add to cart.id is ${id} `);
        
    // }

    //? start of hopefully last
// useEffect(() => {
//     fetch("/api/storeProducts")
//     .then(res => res.json())
//     .then(data => setProducts(data))
// },[])
//? uhhh
// const [loading, setLoading] = useState(false);

// const getAff = async () => {
//     setLoading(true)
//     const noop = await =.get('/api/storeProducts');
//     setProducts(noop)
//     setLoading(false)
// }

// useEffect(() => {
//     getAff()

// }, [])


//? agian..

// useEffect(() => {
//     fetch("/api/storeProducts")
//     .then(res => res.json())
//     .then(data => setProducts(data))
// },[])


//? fuck
// const [data, setData] = useState([]);

// useEffect(async () => {
    
//     const response = await fetch('/api/storeProducts').json();
//     setData(response)

// }, [])


//? another one
// //const [loading, setLoading] = useState(true);
// const [categories, setCategories] = useState([]);
// useEffect(() => {
//     fetch('api/storeProducts')
//     .then((response)=> {
//         setCategories(response.json());
//     })
//     //setLoading(categories === ([]) ? true : false)
// },[]);









// console.log(categories)
//???? again....
// const [myData, setMyData] = useState([]);

// const getData = () => {
//     return axios(getInstance('GET', '/api/storeProducts')
//     .then(res => res.data).catch(err => {
//         console.log(err)
//     }))
// }


// useEffect(() => {
//     const fetchMyData = async () => {
//         const { dataValue } = await getData();

//         if (dataValue) {
//             setMyData(dataValue);
//         } else {

//         }
//     }
// })
const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);
const [test, setTest] = useState([]);
useEffect(() => {
    (async () => {
        setGlobalSpinner(true)
        // fetch("/api/storeProducts")
        // .then(res => res.json())
        // .then(data => setTest(data))
        const result = await fetch('/api/storeProducts')
        const data = await result.json()
        setTest(data)
        setGlobalSpinner(false)
    })()
},[setGlobalSpinner])

console.log(test)
console.log(test.storeProducts && test.storeProducts.length)
//console.log(products)
//console.log(products.storeProducts.length)
    return (
        <ProductContext.Provider value={{
            ...test, isGlobalSpinnerOn
            //...pickles
            // ...deetProducts,
            // ...bSmall,
            // ...bLarge
            // handleDetail,
            // addToCart
            //
            //handleDetail: this.handleDetail,
            //addToCart: this.addToCart
        }}>
            {children}
        </ProductContext.Provider>
    )
}


// export class ProductProvider extends React.Component{
//     // const [products] = useState({
//     //     // products: storeProducts,
//     //     // detailProduct: detailProduct
//     //     storeProducts,
//     //     detailProduct
//     // })
//    state= {
//        products: [],
//        detailProduct: detailProduct
//    };
// componentDidMount() {
//     this.setProducts();
// }

// setProducts = () => {
//     let tempProducts = [];
//     storeProducts.forEach(item => {
//      const singleItem = { ...item};
//     tempProducts = [...tempProducts, singleItem];

// });
//     this.setState(() => {
//      return {
//         products: tempProducts
//             }
//     });
// };


//      handleDetail = () => {
//         console.log('hello from detail');
//     }

//      addToCart = () => {
//         console.log('hello from add to cart');
//     }
//     render() {

//         return (
//             <ProductContext.Provider value={{
//                 ...this.state,
//                 // handleDetail,
//                 // addToCart
//                 //
//                 //handleDetail: this.handleDetail,
//                 //addToCart: this.addToCart
//             }}>
//                 {this.props.children}
//             </ProductContext.Provider>
//         )
//     }
// }


//!Consumer  DO I NEED?????
//todo find out if .consumer is needed wtih react HOOks
//export const ProductConsumer = ProductContext.Consumer;


//todo CLASS VERSION
// import React, {Component} from 'react'

// const ProductContext = React.createContext();



// //Provider
// class ProductProvider extends Component {
    


//     render() {
//         return (
//             <ProductContext.Provider value="hello from context">
//                 {this.props.children}
//             </ProductContext.Provider>
//         )
//     }

// }
// //Consumer
// const ProductConsumer = ProductContext.Consumer;

// export { ProductProvider, ProductConsumer};