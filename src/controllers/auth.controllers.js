const { AuthServices } = require('../services');

const userLogin = async (req, res, next) =>{
    try {
        const credentials = req.body;
        const result = await AuthServices.authenticate(credentials)
    if(result){
      const { id, firstName, lastName, email, phone } = result.result; 
      const user = { id, firstName, lastName, email, phone };
      const token = AuthServices.genToken(user);
      user.token = token;
      res.json({ ...user });
    }
    res.status(400).json({message: 'Información invalida.'})  
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'Email o contraseña inválida'
      })  
    }
}

module.exports = {
    userLogin,
}