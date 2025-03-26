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
            "value": "買い物",
            "checked": false,
            "removed":false
          },
          {
             "id": 2,
             "value": "部屋掃除",
             "checked": true,
             "removed":false
           }
        ]);
        break;
      case '2':
        res.json([
          {
            "id": 2,
            "value": "部屋掃除",
            "checked": true,
            "removed":false
          }
        ]);
        break;
      case '3':
        res.json([
          {
            "id": 1,
            "value": "買い物",
            "checked": false,
            "removed":false
          }
        ]);
        break;
      case '4':
        res.json([
          {
            "id": 3,
            "value": "お風呂",
            "checked": false,
            "removed":true
          }
        ])
        break;
      // default:
      //   res.send("default")
    }
  }
]