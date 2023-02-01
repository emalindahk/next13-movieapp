import React from 'react'
import Image from 'next/image'

export async function generateStaticParams(){
    const data = await fetch(`${process.env.API_URL}/movie/popular?api_key=${process.env.API_KEY}`)
    const res = await data.json()

    return res.results.map((movie) => ({
        movie: toString(movie.id)
    }))
}

async function page({params}) {
  const movie= params.movie
  const imagePath = "https://image.tmdb.org/t/p/original"

  const data = await fetch(`${process.env.API_URL}/movie/${movie}?api_key=${process.env.API_KEY}`,
  {next: {
    revalidate: 60
  }})
  const res = await data.json()

  console.log(res)
  return (
    <div>
        <h2 className='text-2xl'>{res.title}</h2>
        <h2 className='text-lg'>{res.release_date}</h2>
        <h2>Runtime: {res.runtime} minutes</h2>
        <h2 className='bg-green-500 inline-block my-2 py-2 px-4 rounded-md'>{res.status}</h2>
        <Image 
        className='my-12 w-full' 
        src={imagePath + res.backdrop_path} 
        width={1000} 
        height={1000}
        priority
        />
        <p>{res.overview}</p>
    </div>
  )
}

export default page