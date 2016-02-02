var exports = module.exports = {};
var dataRelatedFunction = function() {
  var dataObject = {};
  var data = [
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
  dataObject.returnData = function() {
    return data;
  };

  return dataObject;
};

exports.dataRelatedFunction = dataRelatedFunction;