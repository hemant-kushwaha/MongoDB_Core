use("aggregation");

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      total: { 
        $sum:'$price'
       },
    },
    $project: {
      
    }
  },
]);
