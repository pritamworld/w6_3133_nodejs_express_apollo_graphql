import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'A movie object',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    director_name: { type: new GraphQLNonNull(GraphQLString) },
    production_house: { type: new GraphQLNonNull(GraphQLString) },
    release_date: { type: new GraphQLNonNull(GraphQLString) },
    rating: { type: new GraphQLNonNull(GraphQLFloat) }
  })
});

export default MovieType;