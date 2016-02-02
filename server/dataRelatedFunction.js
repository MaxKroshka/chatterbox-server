var exports = module.exports = {};
var dataRelatedFunction = function() {
  var dataObject = {};
  var data = [
     {
      username: "Yolo",
      text: "initial message",
      roomname: 'lobby',
      createdAt: Date.now()
    },
         {
      username: "Yolo",
      text: "initial message",
      roomname: 'lobby',
      createdAt: Date.now()
    },
         {
      username: "Yolo",
      text: "initial message",
      roomname: 'lobby',
      createdAt: Date.now()
    },
         {
      username: "Yolo",
      text: "initial message",
      roomname: 'lobby',
      createdAt: Date.now()
    }
  ];
  dataObject.data = data;

  dataObject.add = function(value) {
    data.push(value);
  };
  dataObject.returnData = function(url) {
    if(!url){
      return data;
    } else {
      var newData = data.slice();
      if(url.match(/order=-createdAt/)){
        newData.sort(function(a,b){
          return b.createdAt - a.createdAt;
        });
      }
      if(url.match(/limit=/)){
        var limit = +url[url.match(/limit=/).index+6];
        newData = newData.slice(0,limit);
      }
      return newData;
    }
  };

  return dataObject;
};

exports.dataRelatedFunction = dataRelatedFunction;