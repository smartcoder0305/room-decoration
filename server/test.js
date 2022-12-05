const filestack = require("filestack-js");
const filestack_client = filestack.init("AbUWMKsQDSg2HbtzgqaQhz"); // Champ

const myFile = './public/images/1339NityanandaChaitanyaRadhaKrishna.jpg';

filestack_client.upload(myFile).then(
  function(result){
    console.log(result);
  },
  function(error){
    console.log(error);
  }
);