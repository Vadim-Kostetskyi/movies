export const PATHS = {
  homes:
    'https://api.themoviedb.org/3/movie/550?api_key=169f25cf5fe3e465b78878af422f41bc',
  id: 'https://api.themoviedb.org/3/movie/508/reviews?api_key=169f25cf5fe3e465b78878af422f41bc',
  detailes:
    'https://api.themoviedb.org/3/movie/508?api_key=169f25cf5fe3e465b78878af422f41bc',

  actorss:
    'https://api.themoviedb.org/3/movie/508/credits?api_key=169f25cf5fe3e465b78878af422f41bc',
  movieDay:
    'https://api.themoviedb.org/3/trending/movie/day?api_key=169f25cf5fe3e465b78878af422f41bc',
  register: '/registration',
  notes: '/notes',
  posts: '/posts',
  post: '/post/:id',
  myPage: '/my-page',
  noPage: '*',

  home: '/',
  fetchByName: '/movies',
  info: '/movies/:movieId',
  actors: '/movies/:movieId/cast',
  viues: '/movies/:movieId/reviews',
};
