import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import MovieType from '../types/MovieType.js';
import Movie from '../../models/Movie.js';

const movieQueries = {
  movies: {
    type: new GraphQLList(MovieType),
    resolve: async () => await Movie.find()
  },
  movie: {
    type: MovieType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_, { id }) => await Movie.findById(id)
  },
  moviesByDirector: {
    type: new GraphQLList(MovieType),
    args: { director_name: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_, { director_name }) => await Movie.find({ director_name })
  }
};

export default movieQueries;