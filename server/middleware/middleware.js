var jwt = require('jsonwebtoken');

const Users = require('../models/admin/users')

exports.authencate = async (req, res, next) => {
//     console.log('jakdljlaksdL')
    
// console.log(req.headers.authorization)
    try {
        if (req.headers.authorization) {
            const verfyToken = jwt.verify(req.headers.authorization, process.env.SECRET_JWT_KEY)
            const rootUser = await Users.findOne({
                _id: verfyToken._id,
            })
            // console.log(rootUser)
            if (!rootUser) {
                return  res.status(400).send('You are not authorised person')
            }
            req.rootUser = rootUser
            req.userId = rootUser._id
        } else {
            return res.status(400).send('You are not authorised person')
        }
        next()
    } catch (error) {
        return  res.status(400).send('unauthorised token')
    }
}