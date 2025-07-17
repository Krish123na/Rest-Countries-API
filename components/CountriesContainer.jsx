import CountriesContainerShimmer from "./CountriesContainerShimmer";
import CountryCard from "./CountryCard"
import { useState, useEffect } from "react";

export default function CountriesContainer({query}){

      const [countriesData, setCountriesData] = useState([])


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,region,subregion,tld,flags,population,capital,languages,borders')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)
      })
  }, [])

  if (!countriesData.length) {
    return <CountriesContainerShimmer />
  }

  return (
    <>
      <div className="countries-container">
        {countriesData
          .filter((country) =>
            country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
          )
          .map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                data={country}
              />
            )
          })}
      </div>
    </>
  )
}