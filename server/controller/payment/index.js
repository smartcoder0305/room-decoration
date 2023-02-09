const axios = require("axios");

const YAAD_API_KEY = process.env.YAAD_API_KEY;
const YAAD_PASSWORD = process.env.YAAD_PASSWORD;
const YAAD_TERMINAL_NUMBER = process.env.YAAD_TERMINAL_NUMBER;

const TRANZILA_PW = process.env.TRANZILA_PW;
const TRANZILA_SUPPLIER = process.env.TRANZILA_SUPPLIER;

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

// expdate: 0423 MMYY
const getTranzilaPaymentUrlUsingCard = (amount, card) => {
  const url = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?
supplier=${TRANZILA_SUPPLIER}&
tranmode=A&
ccno=${card.no}&
expdate=${card.expdate}&
sum=${amount}&
currency=1&
cred_type=1&
mycvv=${card.cvv}&
TranzilaPW=${TRANZILA_PW}&
email=${card.email}
`;
console.log(url.replace(/\n/g, ''));
  return url.replace(/\n/g, '');
}

exports.payWithCard = async (req, res) => {
  try {
    const {amount, card} = req.body;
    console.log('Pay Amount', amount);
    console.log('Card Info', card);
    const {data} = await axios.get(getTranzilaPaymentUrlUsingCard(amount, card));
    const responseParams = data.split('&');
    if (responseParams[0] === 'Response=000') {
      return res.json('Payment Success!')
    }
    return res.json({
      success: "Payment Failed",
      status: 400,
    })
  } catch (err) {
    console.log(err);
    return res.json({
      success: "Payment Failed",
      status: 400,
    })
  }
}

const getTranzilaCardVerifyUrl = (amount, card) => {
  const url = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?
supplier=${TRANZILA_SUPPLIER}&
tranmode=V&
ccno=${card.no}&
expdate=${card.expdate}&
sum=${amount}&
currency=1&
cred_type=1&
mycvv=${card.cvv}&
TranzilaPW=${TRANZILA_PW}
`;
  console.log(url.replace(/\n/g, ''));
  return url.replace(/\n/g, '');
}

exports.verifyCard = async (req, res) => {
  try {
    const {amount, card} = req.body;
    console.log('Pay Amount', amount);
    console.log('Card Info', card);
    const {data} = await axios.get(getTranzilaCardVerifyUrl(amount, card));
    const responseParams = data.split('&');
    if (responseParams[0] === 'Response=000') {
      return res.json('Verify Success!');
    }
    return res.status(400).send('Verify Failed');
  } catch (err) {
    console.log(err);
    return res.status(400).send('Verify Failed');
  }
}