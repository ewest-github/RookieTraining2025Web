import express from 'express'

export default[
  async(req:express.Request,res:express.Response)=>{
    // if(req.query.type=='1'){
    //   res.send("sayounara")
    // }
    switch(req.query.type){
      case '1':
        res.json([
          {
            "id": 1,
            "title": "買い物",
            "complete_flag": false,
          },
          {
             "id": 2,
             "title": "部屋掃除",
             "complete_flag": true
           }
        ]
        );
        break;
      case '2':
        res.json({
          "id": 1,
          "title": "買い物",
          "complete_flag": false
        });
        break;
      case '3':
        res.json({
          "id": 2,
          "title": "部屋掃除",
          "complete_flag": true
        });
        break;
      case '4':
        res.json({
          "id": 3,
          "title": "部屋掃除",
          "complete_flag": true
        });
        break;
      case '4':
        res.json({
          "id": 3,
          "title": "お風呂",
          "complete_flag": true
        })
        break;
      default:
        res.send("default")
    }
  }
]