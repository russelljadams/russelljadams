export interface Quote {
  text: string;
  author: string;
  type: "quote" | "poem";
}

export const quotes: Quote[] = [
  { text: "You are the reason someone smiles today.", author: "Anonymous", type: "quote" },
  { text: "In a sea of people, my eyes will always search for you.", author: "Anonymous", type: "quote" },
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher", type: "quote" },
  { text: "Whatever our souls are made of, yours and mine are the same.", author: "Emily Brontë", type: "quote" },
  { text: "I love you not because of who you are, but because of who I am when I am with you.", author: "Roy Croft", type: "quote" },
  { text: "You make the world feel less heavy.", author: "Anonymous", type: "quote" },
  { text: "Home is not a place. It's a person.", author: "Anonymous", type: "quote" },
  { text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.", author: "Angelita Lim", type: "quote" },
  { text: "If I had a flower for every time I thought of you, I could walk through my garden forever.", author: "Alfred Tennyson", type: "quote" },
  { text: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle", type: "quote" },
  { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", type: "quote" },
  { text: "I have found the one whom my soul loves.", author: "Song of Solomon", type: "quote" },
  { text: "You had me at hello.", author: "Jerry Maguire", type: "quote" },
  { text: "Every love story is beautiful, but ours is my favorite.", author: "Anonymous", type: "quote" },
  { text: "I choose you. And I'll choose you over and over. Without pause, without doubt, in a heartbeat.", author: "Anonymous", type: "quote" },
  { text: "To the world you may be one person, but to one person you are the world.", author: "Bill Wilson", type: "quote" },
  { text: "You are the finest, loveliest, tenderest person I have ever known.", author: "F. Scott Fitzgerald", type: "quote" },
  { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", type: "quote" },
  { text: "I look at you and see the rest of my life in front of my eyes.", author: "Anonymous", type: "quote" },
  { text: "You are my sun, my moon, and all of my stars.", author: "E.E. Cummings", type: "quote" },
  {
    text: "i carry your heart with me (i carry it in\nmy heart) i am never without it (anywhere\ni go you go, my dear; and whatever is done\nby only me is your doing, my darling)",
    author: "E.E. Cummings",
    type: "poem",
  },
  {
    text: "She walks in beauty, like the night\nOf cloudless climes and starry skies;\nAnd all that's best of dark and bright\nMeet in her aspect and her eyes.",
    author: "Lord Byron",
    type: "poem",
  },
  {
    text: "How do I love thee? Let me count the ways.\nI love thee to the depth and breadth and height\nMy soul can reach.",
    author: "Elizabeth Barrett Browning",
    type: "poem",
  },
  {
    text: "Doubt thou the stars are fire,\nDoubt that the sun doth move,\nDoubt truth to be a liar,\nBut never doubt I love.",
    author: "William Shakespeare",
    type: "poem",
  },
  {
    text: "Two roads diverged in a wood, and I—\nI took the one that led to you,\nAnd that has made all the difference.",
    author: "Adapted from Robert Frost",
    type: "poem",
  },
];

export function getDailyQuote(): Quote {
  const today = new Date().toISOString().split("T")[0];
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) | 0;
  }
  return quotes[Math.abs(hash) % quotes.length];
}

export function getRandomQuote(exclude?: Quote): Quote {
  const pool = exclude ? quotes.filter(q => q.text !== exclude.text) : quotes;
  return pool[Math.floor(Math.random() * pool.length)];
}
