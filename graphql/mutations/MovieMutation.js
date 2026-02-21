import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import Movie from '../../models/Movie.js';
import MovieType from '../types/MovieType.js';
import MovieInput from '../inputs/MovieInput.js';

const movieMutations = {
    createMovie: {
        type: MovieType,
        args: {
            input: { type: new GraphQLNonNull(MovieInput) }
        },
        resolve(parent, args) {
            const movie = new Movie({
                name: args.input.name,
                director_name: args.input.director_name,
                production_house: args.input.production_house,
                release_date: args.input.release_date,
                rating: args.input.rating
            });
            return movie.save();
        }
    },
    updateMovie: {
        type: MovieType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
            input: { type: new GraphQLNonNull(MovieInput) }
        },
        resolve(parent, args) {
            return Movie.findByIdAndUpdate(args.id, args.input, { new: true });
        }
    },
    deleteMovie: {
        type: MovieType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve(parent, args) {
            return Movie.findByIdAndRemove(args.id);
        }
    }
};

export default movieMutations;