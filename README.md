# References

https://www.apollographql.com/docs/apollo-server/getting-started

https://medium.com/better-programming/a-simple-crud-app-using-graphql-nodejs-mongodb-78319908f563

https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

# Sample Queries

### 1. Query all movies
```
query {
  movies {
    id
    name
    director_name
    production_house
    release_date
    rating
  }
}
```

### 2. Query a single movie by ID
```
query {
  movie(id: "60f48f8b7b45c2322f1a9b2d") {
    id
    name
    director_name
    production_house
    release_date
    rating
  }
}
```

### 3. Mutation to add a new movie
```
mutation {
  addMovie(
    name: "Interstellar",
    director_name: "Christopher Nolan",
    production_house: "Paramount Pictures",
    release_date: "2014-11-07",
    rating: 8.6
  ) {
    id
    name
    director_name
    production_house
    release_date
    rating
  }
}
```

### 4. Mutation to update a movie
```
mutation {
  updateMovie(
    id: "60f48f8b7b45c2322f1a9b2d",
    name: "Interstellar (Updated)",
    director_name: "Christopher Nolan",
    production_house: "Warner Bros.",
    release_date: "2014-11-07",
    rating: 9.0
  ) {
    id
    name
    director_name
    production_house
    release_date
    rating
  }
}
```

### 5. Mutation to delete a movie
```
mutation {
  deleteMovie(id: "60f48f8b7b45c2322f1a9b2d") {
    id
    name
    director_name
    production_house
    release_date
    rating
  }
}
```

### More queries
```
query Movies{
  __typename
  movies {
    __typename
    id
    name
    production_house
    rating
    release_date
  }

  a: movie(id: "67abe736d20bfd54ba53ee95") {
     ...MovieFields
  }

  b: movie(id: "67ae7dcfa052c72aef43187e") {
   ...MovieFields
  }
}

fragment MovieFields on Movie{
  id
  name
  director_name
}
```
```
mutation($id: ID!, $name: String!, $directorName: String!, $productionHouse: String!, $releaseDate: String!, $rating: Float!) {
  updateMovie(id: $id, name: $name, director_name: $directorName, production_house: $productionHouse, release_date: $releaseDate, rating: $rating) {
    id
    name
    director_name
    rating
    release_date
    production_house
  }
}
** Variables **
{
  "id": "67ae7dcfa052c72aef43187e",
  "name": "The Dark Knight",
  "directorName": "Christopher Nolan",
  "productionHouse": "Warner Bros.",
  "releaseDate": "2008-07-18",
  "rating": 9.5,
}
```