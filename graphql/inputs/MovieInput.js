import { GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLInputObjectType
 } from "graphql";

const MovieInput = new GraphQLInputObjectType({
    name: 'MovieInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        director_name: { type: new GraphQLNonNull(GraphQLString) },
        production_house: { type: new GraphQLNonNull(GraphQLString) },
        release_date: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: new GraphQLNonNull(GraphQLFloat) }
    }
});

export default MovieInput;