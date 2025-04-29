const { default: api } = require("./api");

const MovieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        url: "/movie",
      }),
    }),
    getMovieId: builder.query({
      query: (id) => ({
        url: `/movie/${id}`,
      }),
    }),
  }),
});

export const { useGetMovieIdQuery, useGetMoviesQuery } = MovieApi;
