const axios = require("axios");

const YAAD_API_KEY = process.env.YAAD_API_KEY;
const YAAD_PASSWORD = process.env.YAAD_PASSWORD;
const YAAD_TERMINAL_NUMBER = process.env.YAAD_TERMINAL_NUMBER;

const getYaadAPISignUrl = (payInfo) => {
  const url = `https://icom.yaad.net/p/?
action=APISign&
What=SIGN&
KEY=${YAAD_API_KEY}&
PassP=${YAAD_PASSWORD}&
Masof=${YAAD_TERMINAL_NUMBER}&
Order=12345678910&Info=${payInfo.info}&
Amount=${payInfo.netPrice}&
UTF8=True&
UTF8out=True&
ClientName=${payInfo.fullName}&
ClientLName=%20&
street=${payInfo.address}&
city=${payInfo.city}&
zip=${payInfo.zipCode}&
phone=${payInfo.phoneNumber}&
cell=%20&email=${payInfo.email}&
Tash=2&
FixTash=False&
ShowEngTashText=False&
Coin=1&
Postpone=False&
J5=false&
Sign=True&
MoreData=True&
sendemail=True&
SendHesh=True&
heshDesc=[0~משלוח~${payInfo.imagecount}~${45}]&
Pritim=True&
PageLang=HEB&
tmp=1`;
console.log(url);
console.log(url.replace(/\n/g, ''))
  return encodeURI(url.replace(/\n/g, ''));
}

exports.getApiSign = async (req, res) => {
  try {
    const {data} = await axios.get(getYaadAPISignUrl(req.body.payInfo));
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({
      success: "Something went wrong",
      status: 400,
    });
  }
};