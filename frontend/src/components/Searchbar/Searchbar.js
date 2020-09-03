import React, { useEffect, useState, useRef, useContext } from 'react';
 import styles from './Searchbar.module.scss';
import {ProductContext} from '../api/context';


//todo this is a work in progress. 


const Searchbar = () => {
    let {storeProducts} = useContext(ProductContext);
    const [display, setDisplay] = useState(false);
    //const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef= useRef(null);


    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if ( wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    }

    const updateSearch = ducks => {
        setSearch(ducks);
        setDisplay(false);
    };

    return (
        <div ref={wrapperRef} className={styles.container}>
            <input id="auto" onClick={() => setDisplay(!display)} placeholder="Search..." value={search}
                            onChange={event => setSearch(event.target.value)} />
            {display && (
                <div className={styles.autoContainer}>
                    {storeProducts.filter(({title }) => title.indexOf(search.toLowerCase()) > -1 )
                        .map((value, id) => {
                            return (
                                <div
                                    onClick={() => updateSearch(value.title)}
                                    className={styles.options}
                                    key={id}
                                    tabIndex="0"
                                    >
                                        <span>{value.title}</span>
                                    </div>
                            );
                        })
                    
                    }
                </div>
            )}
        </div>
    );
};

export default Searchbar;