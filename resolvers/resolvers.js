import MovieModel from '../models/movie.js';

// Define resolvers for GraphQL
const movieResolvers = {
  Query: {
    // Resolver to get all movies
    movies: async () => {
      try {
        return await MovieModel.find();
      } catch (error) {
        throw new Error(`Failed to fetch movies: ${error.message}`);
      }
    },
    // Resolver to get a movie by ID
    movie: async (_, { id }) => {
      try {
        const movie = await MovieModel.findById(id);
        if (!movie) {
          throw new Error('Movie not found');
        }
        return movie;
      } catch (error) {
        throw new Error(`Failed to fetch movie: ${error.message}`);
      }
    },
    // Resolver to get movies by director
    moviesByDirector: async (_, { director_name }) => {
      try {
        return await MovieModel.findByDirector(director_name);
      } catch (error) {
        throw new Error(`Failed to fetch movies by director: ${error.message}`);
      }
  },
  },
  Mutation: {
    // Resolver to create a new movie
    createMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = new MovieModel({ name, director_name, production_house, release_date, rating });    
        return await newMovie.save();
      } catch (error) {
        throw new Error(`Failed to create movie: ${error.message}`);
      }
    },
    // Resolver to update an existing movie
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(
          id,
          { name, director_name, production_house, release_date, rating },
          { new: true }
        );
        if (!updatedMovie) {
          throw new Error('Movie not found');
        }
        return updatedMovie;
      } catch (error) {
        throw new Error(`Failed to update movie: ${error.message}`);
      }
    },
    // Resolver to delete a movie
    deleteMovie: async (_, { id }) => {
      try {
        const deletedMovie = await MovieModel.findByIdAndDelete(id);
        if (!deletedMovie) {
          throw new Error('Movie not found');
        }
        return deletedMovie;
      } catch (error) {
        throw new Error(`Failed to delete movie: ${error.message}`);
      } 
  },
}
};

export default movieResolvers;