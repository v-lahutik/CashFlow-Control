export const authenticateUser = async (req, res, next) => {

    try {
      const cookies = req.headers.cookie;
      if (!cookies) {
        return res.status(400).json({
          status: "failure",
          msg: "Cookie does not exist",
        });
      }
      const token = cookies.split('; ').find(row => row.startsWith('token=')).split('=')[1];
      
      if (!token) {
        return res.status(400).json({
          status: "failure",
          msg: "Token does not exist in cookies",
        });
      }
      
      const token_payload = await verifyToken(token, process.env.JWT_SECRET);
      
  
  
      const user = await User.findById(token_payload.id); 
      
      if (!user) {
        
        throw createError("User not found!", 404);
      }
  
      req.token_payload = token_payload; 
      next();
    } catch (error) {
      next(error);
    }
  };