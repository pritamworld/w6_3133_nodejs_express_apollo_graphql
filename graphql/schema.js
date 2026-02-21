//Combining Everything
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import movieQueries from './queries/MovieQuery.js';
import movieMutations from './mutations/MovieMutation.js';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...movieQueries
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...movieMutations
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

export default schema;