import React, { useState } from 'react'
import { BsPeopleFill, BsCreditCard } from "react-icons/bs";
import { IoBagCheckSharp } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import './WhyYouShould.scss'
;

const WhyYouShould = () => {

  const [scroll, setScroll] = useState(false)

  const scrollItems = () => {
    if(window.scrollY >= 122){
      setScroll(true)
    }
  }

  window.addEventListener('scroll', scrollItems)

    const arr = [
      {
        logo: BsPeopleFill,
        number: "100000+",
        words: "Happy Customers",
      },
      {
        logo: IoBagCheckSharp,
        number: "100%",
        words: "Cheapest Games",
      },
      {
        logo: FiRefreshCw,
        number: "100%",
        words: "Full Refund",
      },
      {
        logo: BsCreditCard,
        number: "100%",
        words: "Secure Payment",
      },
    ];
    
  return (
    <div className=" p-5 w-75 m-auto">
      <h2>Why You Should Buy In Our Store?</h2>
      <hr className="hr" />
      <section className="d-flex flex-lg-row flex-column justify-content-around gap-5  ">
        {arr.map((l) => (
          <div
            className={
              scroll
                ? "d-flex flex-column icon-logo roll-in-left"
                : "d-flex flex-column icon-logo invisible"
            }
            key={l.logo}
          >
            <div className="icon-color">{l.logo()}</div>
            <span className="number">{l.number}</span>
            <span className="words">{l.words}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default WhyYouShould