import React from 'react'
import Hero from '../Components/Hero'
import CategoryComp from '../Components/CategoryComp'
import FeaturedProducts from '../Components/FeaturedProducts'

function Home() {
  return (
    <div className='h-full min-h-screen w-full px-2 bg-bg-primary py-10 flex flex-col items-center'>
      <Hero />
      <CategoryComp />
      <FeaturedProducts />
    </div>
  )
}

export default Home
