db.products.aggregate([
    {
        $match:{quantity:5}
    },
    {
        $group:{
            _id:'$quantity',
            priceTotal:{$sum:'$price'},
            priveAvg:{$avg:'$price'}
        }
    }
])


db.products.aggregate([
    {
        $match:{price:{$gt:1200}}
    },
    {
        _id:"category",
        totalprice:{$sum:"$price"},
    },
    {
        $sort:{totalprice:-1}
    }
])


db.products.aggregate([
    {
        $project:{
            price:1
        }
    }
])

db.products.aggregate([
    {$unwind:'$colors'},
    {$match:{price:{$gt:1200}}},
    {
        $group:{
            _id:'$price',
            allColors:{$addToset:'$colors'}
        }
    }
])

db.col.insertMany([
    
        {
          "_id": "64c23350e32f4a51b19b9201",
          "name": "Document 1",
          "values": [10, 20, 30, 40, 50]
        },
        {
          "_id": "64c23350e32f4a51b19b9202",
          "name": "Document 2",
          "values": [15, 25, 35, 45, 55]
        },
        {
          "_id": "64c23350e32f4a51b19b9203",
          "name": "Document 3",
          "values": [5, 15, 25, 35, 45]
        }
      
])
db.col.aggregate([
    {
      $project: {
        name: 1,
        thapaValue: {
          $filter: {
            input: "$values",
            as: "val",
            cond: { $gt: ["$$val", 30] }
          }
        }
      }
    }
  ]);
  