import React from 'react';
import errorimg from "../../assets/error404.png";

const Error404 = () => {
    return (
        <section className='mainSection container-fluid error404'>

            <img src={errorimg} className='img-fluid w-50'></img>
        </section>
    );
};

export default Error404;