import {
  Action,
  Comedy,
  Drama,
  HxH,
  JJK,
  Midnight,
  Naruto,
  OnePis,
  SciFi,
  Sharq,
  Solo,
  Trailer,
  User,
} from "./images";

// Mock API data
export const data = {
  users: {
    1: {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      phone: "+123456789",
      image: User,
      role: "admin",
      subscription: 2,
    },
    2: {
      id: 2,
      username: "alice_smith",
      email: "alice@example.com",
      phone: "+987654321",
      image: null,
      role: "user",
      subscription: 1,
    },
  },

  movies: {
    1: {
      id: 1,
      title: "One Piece",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      year: 2003,
      country: "Yaponiya",
      views: 1200000,
      status: "published",
      releaseDate: "2003-07-16",
      ageLimit: "13+",
      rating: 9,
      genre: {},
      trailerUrl: "https://youtube.com/trailer",
      series: null,
      coverImage: OnePis,
    },
    2: {
      id: 2,
      title: "Naruto",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      year: 2004,
      country: "Yaponiya",
      views: 1500000,
      status: "published",
      releaseDate: "2004-07-18",
      ageLimit: "13+",
      rating: 9.9,
      genre: 1,
      trailerUrl: "https://www.youtube.com/watch?v=oSVdGgCumW8",
      series: null,
      coverImage: Naruto,
    },
    3: {
      id: 3,
      title: "Solo leveling",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      year: 2023,
      country: "Yaponiya",
      views: 1000000,
      status: "published",
      releaseDate: "2014-11-07",
      ageLimit: "13+",
      rating: 8.7,
      genre: 2,
      trailerUrl: "https://youtube.com/trailer",
      series: null,
      coverImage: Solo,
    },
    4: {
      id: 4,
      title: "HunterxHunter",
      description:
        "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      year: 2006,
      country: "Yaponiya",
      views: 900000,
      status: "published",
      releaseDate: "2006-10-20",
      ageLimit: "13+",
      rating: 8.5,
      genre: 3,
      trailerUrl: "https://youtube.com/trailer",
      series: 1,
      coverImage: HxH,
    },
    5: {
      id: 5,
      title: "Jujutsu Kaisen",
      description:
        "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      year: 2020,
      country: "Yaponiya",
      views: 800000,
      status: "published",
      releaseDate: "2020-09-03",
      ageLimit: "13+",
      rating: 7.8,
      genre: 1,
      trailerUrl: "https://youtube.com/trailer",
      series: null,
      coverImage: JJK,
    },
  },

  comments: {
    1: {
      id: 1,
      userId: 2,
      movieId: 1,
      text: "Great movie, highly recommend!",
      createdAt: "2023-05-15",
    },
    2: {
      id: 2,
      userId: 1,
      movieId: 1,
      text: "One of the best movies I've ever seen. The concept is mind-blowing and the execution is flawless.",
      createdAt: "2023-06-20",
    },
    3: {
      id: 3,
      userId: 2,
      movieId: 2,
      text: "Heath Ledger's performance as the Joker is legendary.",
      createdAt: "2023-07-10",
    },
  },

  watchlists: {
    1: {
      id: 1,
      userId: 1,
      movieId: 1,
      status: "watching",
      addedAt: "2024-01-15",
    },
    2: {
      id: 2,
      userId: 1,
      movieId: 2,
      status: "planned",
      addedAt: "2024-02-20",
    },
    3: {
      id: 3,
      userId: 1,
      movieId: 3,
      status: "completed",
      addedAt: "2024-03-05",
    },
    4: {
      id: 4,
      userId: 2,
      movieId: 1,
      status: "completed",
      addedAt: "2024-01-10",
    },
  },

  ratings: {
    1: {
      id: 1,
      userId: 1,
      movieId: 1,
      value: 9,
    },
    2: {
      id: 2,
      userId: 2,
      movieId: 1,
      value: 8,
    },
    3: {
      id: 3,
      userId: 1,
      movieId: 2,
      value: 10,
    },
  },

  genres: {
    1: {
      id: 1,
      name: "Action",
      image: Action,
    },
    2: {
      id: 2,
      name: "Sci-Fi",
      image: SciFi,
    },
    3: {
      id: 3,
      name: "Thriller",
      image: Trailer,
    },
    4: {
      id: 4,
      name: "Drama",
      image: Drama,
    },
    5: {
      id: 5,
      name: "Comedy",
      image: Comedy,
    },
  },

  series: {
    1: {
      id: 1,
      part: 1,
      video: "https://example.com/series1.mp4",
    },
  },

  subscriptions: {
    1: {
      id: 1,
      enddate: "2025-06-30",
      plan: 2,
      transaction: 5,
    },
  },

  plans: {
    1: {
      id: 1,
      name: "Basic",
      amount: 5000,
      discount: 0,
      duration: 30,
    },
    2: {
      id: 2,
      name: "Premium",
      amount: 10000,
      discount: 2000,
      duration: 30,
    },
  },

  posts: {
    1: {
      id: 1,
      title: "Yarim tunda yurakni sozlang",
      content: "Here are our picks for the best movies released last year...",
      authorId: 1,
      createdAt: "2026-01-05",
      image: Midnight,
    },
    2: {
      id: 2,
      title: "Sharqda bo'ri Denisa",
      content:
        "Check out these highly anticipated movies coming soon to our platform...",
      authorId: 1,
      createdAt: "2024-02-10",
      image: Sharq,
    },
  },
};

// Enums
export const UserRole = {
  ADMIN: "admin",
  DUBBER: "dubber",
  USER: "user",
};

export const MovieStatus = {
  COMPLETED: "completed",
  CONTINUE: "continue",
  WAITING: "waiting",
};

export const WatchlistStatus = {
  WATCHING: "watching",
  COMPLETED: "completed",
  PLANNED: "planned",
};

export const PaymentGateway = {
  PAYPAL: "paypal",
  STRIPE: "stripe",
  PAYME: "payme",
  CLICK: "click",
};

export const TransactionStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
};
