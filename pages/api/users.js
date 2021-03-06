import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
    //console.log(req);
    try {
      const { userId } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      
      //https://docs.mongodb.com/manual/reference/operator/query/and/
      //exclude the root user role and the currently logged in user from the results.
      const users = await User.find({$and: [{ _id: { $ne: userId } }, {role: { $ne: 'root' }}]}).sort({
        role: "asc"
      });

      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(403).send("Please login again");
    }
  };
  
