import User from '../models/users.model.js';


export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const newUser = await User.create({ fullName, email, password });
        res.status(201).json({ newUser });
    } catch (error) {
       next(error);
    }
}