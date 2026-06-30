// ====================
// BOOK DATABASE
// js/books.js
// ====================

const books = [
    {
        id: 1,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "biography",
        price: 299,
        originalPrice: 499,
        rating: 4.8,
        reviews: 2341,
        image: "images/books/wings-of-fire.jpg",
        description: "The autobiography of A.P.J. Abdul Kalam, India's former president and aerospace scientist, detailing his inspiring journey from Rameswaram to the presidency.",
        inStock: true
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "fiction",
        price: 349,
        originalPrice: 499,
        rating: 4.7,
        reviews: 5012,
        image: "images/books/the-alchemist.jpg",
        description: "A magical fable about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure, teaching us the importance of listening to our hearts.",
        inStock: true
    },
    {
        id: 3,
        title: "Atomic Habits",
        author: "James Clear",
        category: "education",
        price: 499,
        originalPrice: 799,
        rating: 4.9,
        reviews: 8420,
        image: "images/books/atomic-habits.jpg",
        description: "An extremely practical guide that teaches how to build good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        inStock: true
    },
    {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "education",
        price: 599,
        originalPrice: 899,
        rating: 4.6,
        reviews: 12450,
        image: "images/books/sapiens.jpg",
        description: "A brilliant narrative that explores the history of humankind, from the first evolution of Homo sapiens to the scientific revolutions that shape modern civilization.",
        inStock: true
    },
    {
        id: 5,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "business",
        price: 350,
        originalPrice: 499,
        rating: 4.5,
        reviews: 6800,
        image: "images/books/rich-dad.jpg",
        description: "A personal finance classic that challenges traditional beliefs about money and teaches how to build wealth through financial education and investing.",
        inStock: true
    },
    {
        id: 6,
        title: "Five Point Someone",
        author: "Chetan Bhagat",
        category: "fiction",
        price: 199,
        originalPrice: 299,
        rating: 4.3,
        reviews: 9200,
        image: "images/books/five-point.jpg",
        description: "A humorous novel about three friends at IIT Delhi who struggle to cope with the rigorous academic system and find their own paths in life.",
        inStock: false
    },
    {
        id: 7,
        title: "The Power of Subconscious Mind",
        author: "Joseph Murphy",
        category: "education",
        price: 249,
        originalPrice: 399,
        rating: 4.6,
        reviews: 4100,
        image: "images/books/subconscious.jpg",
        description: "A groundbreaking spiritual and psychological guide showing how to harness the infinite intelligence of the subconscious mind to achieve success and happiness.",
        inStock: true
    },
    {
        id: 8,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        category: "business",
        price: 299,
        originalPrice: 499,
        rating: 4.7,
        reviews: 7300,
        image: "images/books/think-grow.jpg",
        description: "One of the most famous success guides of all time, sharing the philosophies of wealth creation based on interviews with over 500 successful figures.",
        inStock: true
    },
    {
        id: 9,
        title: "Train to Pakistan",
        author: "Khushwant Singh",
        category: "fiction",
        price: 150,
        originalPrice: 250,
        rating: 4.5,
        reviews: 1800,
        image: "images/books/train-pakistan.jpg",
        description: "A historical fiction masterpiece depicting the human tragedy of the partition of India in 1947 through the life of a small border village.",
        inStock: true
    },
    {
        id: 10,
        title: "The Guide",
        author: "R.K. Narayan",
        category: "fiction",
        price: 199,
        originalPrice: 299,
        rating: 4.6,
        reviews: 2200,
        image: "images/books/the-guide.jpg",
        description: "R.K. Narayan's award-winning novel following the transformation of Raju from a corrupt tour guide to a respected spiritual guide in the fictional town of Malgudi.",
        inStock: true
    },
    {
        id: 11,
        title: "Corporate Chanakya",
        author: "Radhakrishnan Pillai",
        category: "business",
        price: 250,
        originalPrice: 399,
        rating: 4.4,
        reviews: 1400,
        image: "images/books/corporate-chanakya.jpg",
        description: "An insightful book translating Chanakya's ancient political and administrative wisdom into actionable leadership and management practices for modern businesses.",
        inStock: true
    },
    {
        id: 12,
        title: "Becoming",
        author: "Michelle Obama",
        category: "biography",
        price: 599,
        originalPrice: 899,
        rating: 4.9,
        reviews: 4500,
        image: "images/books/becoming.jpg",
        description: "A deeply personal and inspiring memoir of the former First Lady of the United States, tracing her journey from the South Side of Chicago to the White House.",
        inStock: true
    }
];

console.log(`Loaded ${books.length} books successfully.`);
