import Event from '../Models/eventModel.js'
import jwt from 'jsonwebtoken'
export const createEvent = async (req, res) => {
    try {
      const { name, date, token } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const event = new Event({
        name, 
        creator: decoded?.userId,
        date
      });
      await event.save();
      res.send('Event created successfully');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

export const allEvents=async(req,res)=>{
    try {
        const { page, limit = 3, name, sort = 'date',order} = req.body;
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }
    }
    const sortPrefix = sort[0] == '-' ? "-" : "";
    const sortField = sort.replace(/^-/, "");
    const sortOption = { [sortField]: `${order}` }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitValue = parseInt(limit);

    const events = await Event.find(query).sort(sortOption).skip(skip).limit(limitValue).lean();

    return res.status(200).json({success:true,events:events})
        // const products = await Event.find({
        // });
        // if (products.length) {
        //   return res.status(200).json({ success:true, events: products });
        // }
        // return res
        //   .status(404)
        //   .json({ success:false, message: "No Products found" });
      } catch (error) {
        return res.status(500).json({ success:false, message: error });
      }
}