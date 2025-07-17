import React,{ useContext, useEffect, useState } from "react";

import './CountryDetail.css'
import { useLocation, useParams } from "react-router";
import { Link } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";
import CountryDetailShimmer from './CountryDetailShimmer'

export default function CountryDetail(){

     const params = useParams()
     const {state} = useLocation()
     const countryName= params.country
    const [isDark] = useContext(ThemeContext)

     const [countryData, setCountryData] = useState(null)
     const [notFound, setNotFound] = useState(false)

     function updateCountryData (data){
       setCountryData({
               name: data.name.common || data.name,
               nativeName: Object.values(data.name.nativeName || {})[0]?.common,
               population: data.population,
               region: data.region,
               flag: data.flags.svg,
               subregion: data.subregion,
               capital: data.capital,
               tld: data.tld,
               languages: Object.values(data.languages || {}).join(', '),
               currencies: Object.values(data.currencies || {})
                 .map((currency) => currency.name)
                 .join(', '),
                 borders: []
          })
          if(!data.borders){
               data.borders = []
          }
             Promise.all(
               data.borders.map((border) => {
               return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
               .then((res) => res.json())
               .then(([bordercountry]) =>  bordercountry.name.common)       
               }))
               .then((borders) =>{
                    setTimeout (() => 
                         setCountryData((prevstate) => ({...prevstate, borders})))
               })
     }

     useEffect(() => {
          if(state) {
               updateCountryData(state)
               return
          }

      fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)  
      .then((res) => res.json())
      .then(([data]) => {
          // console.log(data)
          updateCountryData(data)
             })
      .catch(err =>{
          console.log(err)
         setNotFound(true)
      }) 
}    , [countryName])

      if(notFound){
          return <div>Country Not Found</div>
      }
      
     return (
       <main className={`${isDark ? 'dark':''}`}>
          <div className="country-details-container">
               <span className="back-button" onClick={() => history.back()}>
               <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp; Back
               </span>
              {countryData === null ? (
            <CountryDetailShimmer />
        ) : ( 
          <div className="country-details">
               <img src={countryData.flag} alt={`${countryData.name} flag`} />
               <div className="details-text-container">
                  <h1>{countryData.name}</h1>
               <div className="country-info">
                 <p><b>Native Name: {countryData.nativeName} </b><span className="native-name"></span></p>
                 <p><b>Population: {countryData.population.toLocaleString('en-IN')} </b><span className="Population"></span></p>
                 <p><b>Region:{countryData.region} </b><span className="region"></span></p>
                 <p><b>Subregion:{countryData.subregion} </b><span className="sub-Region"></span></p>
                 <p><b>Capital: {countryData.capital?.join(', ')}</b><span className="capital"></span></p>
                 <p><b>Top Level Domain:{countryData.tld} </b><span className="top-level-domain">.</span></p>
                 <p><b>Currencies:{countryData.currencies} </b><span className="currencies"></span></p>
                 <p><b>Languages:{countryData.languages} </b><span className="languages"></span></p>
               </div>
                 {countryData.borders.length !== 0 && ( 
                    <div className="border-countries">
                       <b>Border Countries: </b>&nbsp;
                       {
                       countryData.borders.map((border) => (
                       <Link key={border} to={`/${border}`} > 
                       {border} </Link>
                       ))}
                    </div>
                  )}
               </div>
               </div>
         )}
          </div>  
     </main>   
     )
}