import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"]
  },
  director_name: { 
    type: String, 
    required: [true, "Director name is required"]
  },
  production_house: { 
    type: String, 
    required: [true, "Production house is required"] 
  },
  release_date: { 
    type: String, 
    required: [true, "Release date is required"],
    validate: {
      validator: function(v) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid date format! Use YYYY-MM-DD.`
    }
  },
  rating: { 
    type: Number,
    min: [0.0, "Rating must be at least 0.0"],
    max: [10.0, "Rating must be at most 10.0"], 
    required: [true, "Rating is required"] 
  },
});
// Add a virtual property to calculate the age of the movie
movieSchema.virtual('movie_age').get(function() {
  const releaseYear = parseInt(this.release_date.split('-')[0]);
  const currentYear = new Date().getFullYear();
  return currentYear - releaseYear;
});

// Add a method to get a summary of the movie
movieSchema.methods.getMovieSummary = function() {
  return `${this.name} directed by ${this.director_name} was released in ${this.release_date} and has a rating of ${this.rating}.`;
};

// Add a static method to find movies by director
movieSchema.statics.findByDirector = function(directorName) {
  return this.find({ director_name: directorName });
};

// Add a pre-save hook to log when a movie is saved
movieSchema.pre('save', function() {
  console.log(`Saving movie: ${this.name}`);
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
