use("aggregation");
db.products.aggregate([
  {
    $match: { _id: "101" },
  }
]);

db.products.aggregate([
  {
    $match: { _id: "101" }
  }
]);
