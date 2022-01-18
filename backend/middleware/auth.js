const jwt = require('jsonwebtoken')

module.exports= (req , res ,next ) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'Random_token_secret');
        const userId = decodedToken.userId;
        req.auth ={userId};
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable'
        }else{
            next();
        }
    } catch(error){
        res.status(401).json({ error: error |'requete non authentifier' })
    }
}