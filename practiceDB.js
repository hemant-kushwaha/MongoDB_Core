// ===================================================
// LARGE SAMPLE PRACTICE DATABASE FOR MONGODB
// Generates thousands of realistic random documents.
// Run with:  mongosh < large-practice-db.js
// ===================================================

use("practiceDB");

// ---------- helpers ----------
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Kolkata",
  "Jaipur",
];
const firstNames = [
  "Amit",
  "Ravi",
  "Sita",
  "Neha",
  "Karan",
  "Priya",
  "Rohan",
  "Anjali",
  "Vikram",
  "Pooja",
  "Arjun",
  "Deepa",
  "Suresh",
  "Meena",
  "Manoj",
  "Kavita",
  "Sanjay",
  "Divya",
  "Nikhil",
  "Riya",
];
const hobbiesPool = [
  "cricket",
  "chess",
  "football",
  "reading",
  "painting",
  "dancing",
  "cooking",
  "gaming",
  "cycling",
  "travel",
];
const categories = [
  "Electronics",
  "Furniture",
  "Stationery",
  "Clothing",
  "Grocery",
  "Books",
  "Sports",
];
const productNames = {
  Electronics: [
    "Laptop",
    "Phone",
    "Tablet",
    "Headphones",
    "Smartwatch",
    "Camera",
  ],
  Furniture: ["Desk", "Chair", "Sofa", "Bookshelf", "Bed", "Wardrobe"],
  Stationery: ["Notebook", "Pen", "Marker", "Sticky Notes", "Folder"],
  Clothing: ["T-Shirt", "Jeans", "Jacket", "Shoes", "Cap"],
  Grocery: ["Rice", "Wheat Flour", "Sugar", "Cooking Oil", "Tea"],
  Books: ["Novel", "Biography", "Textbook", "Comic", "Cookbook"],
  Sports: ["Football", "Bat", "Racket", "Yoga Mat", "Dumbbells"],
};

// ---------- USERS (2000 docs) ----------
db.users.drop();
let users = [];
for (let i = 1; i <= 2000; i++) {
  const numHobbies = randInt(0, 4);
  const hobbies = [
    ...new Set(Array.from({ length: numHobbies }, () => rand(hobbiesPool))),
  ];
  const city = rand(cities);
  users.push({
    userId: i,
    name: rand(firstNames) + " " + i,
    age: randInt(18, 60),
    city: city,
    hobbies: hobbies,
    address: { city: city, pin: randInt(100000, 799999) },
    isActive: Math.random() > 0.3,
    joined: randDate(2019, 2024),
  });
}
db.users.insertMany(users);

// ---------- PRODUCTS (500 docs) ----------
db.products.drop();
let products = [];
let pid = 1;
for (const cat of categories) {
  for (const name of productNames[cat]) {
    for (let v = 1; v <= randInt(10, 20); v++) {
      products.push({
        productId: pid++,
        name: name + " v" + v,
        category: cat,
        price: randInt(50, 60000),
        stock: randInt(0, 200),
        rating: (Math.random() * 5).toFixed(1) * 1,
      });
    }
  }
}
db.products.insertMany(products);

// ---------- ORDERS (10000 docs, referencing real userId/productId) ----------
db.orders.drop();
const allUserIds = users.map((u) => u.userId);
const allProducts = products;
let orders = [];
for (let i = 1; i <= 10000; i++) {
  const p = rand(allProducts);
  const qty = randInt(1, 5);
  orders.push({
    orderId: i,
    userId: rand(allUserIds),
    productId: p.productId,
    productName: p.name,
    category: p.category,
    quantity: qty,
    amount: qty * p.price,
    status: rand(["pending", "shipped", "delivered", "cancelled"]),
    date: randDate(2022, 2024),
  });
}
// insert in batches (faster + avoids payload limits)
const batchSize = 1000;
for (let i = 0; i < orders.length; i += batchSize) {
  db.orders.insertMany(orders.slice(i, i + batchSize));
}

// ---------- Indexes for practice ----------
db.users.createIndex({ city: 1 });
db.users.createIndex({ age: 1 });
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ productId: 1 });
db.products.createIndex({ category: 1 });

print("Large practice DB ready!");
print("users: " + db.users.countDocuments());
print("products: " + db.products.countDocuments());
print("orders: " + db.orders.countDocuments());
