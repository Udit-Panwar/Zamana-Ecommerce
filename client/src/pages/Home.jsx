import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Explore from '../components/Explore'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import OffersPage from '../components/OffersPage'

const Home = () => {
  return (
    <div>
     <Hero/>
     <LatestCollection/>
     <OffersPage/>
     <OurPolicy/>
     <Explore/>
     <NewsletterBox/>
    </div>
  )
}

export default Home


