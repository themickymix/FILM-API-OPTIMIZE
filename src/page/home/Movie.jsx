import React from 'react';
import { GetApi } from '../../custom-hooks/GetApi'; // Adjust the import path as necessary
import Card1 from '../../shared/card/Card1';
import "boxicons";
import { Link } from 'react-router-dom';

const Movie = () => {
  const { data, error } = GetApi('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2');

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Movies</h1>

        <Link to='/movie'>
        <div className='justify-self-end flex items-center text-white cursor-pointer hover:text-purple-500'> 
            More
          <box-icon name="chevron-right" color="#ffffff"></box-icon>
        </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.results.slice(0, 12).map((movie) => (
          <Card1
            key={movie.id}
            id={movie.id}
            name={movie.title}
            img={movie.poster_path}
            type="movie"
          />
        ))}
      </div>
    </div>
  );
};

export default Movie;
