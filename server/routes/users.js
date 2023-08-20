import express from 'express';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users.js';

const router = express.Router();

//Register a user
router.post('/register', async (req, res) => {

    //Get username and password from req body
    const username = req.body.username;
    const password = req.body.password;
    //Hash entered password
    const hashedPassword = await bcrypt.hash(password, 10)
    //Check if username already exists in db.
    const user = await UserModel.findOne({ username })

    try {
        //If user already exists, return 400
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        //Else, store new user to database
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save()
        //Send response to client
        res.json({ message: "User registered" })
    } catch (err) {
        console.error(err)
    }
});

//Login a user
router.post('/login', async (req, res) => {
    //Get body from request at /login route.
    const { username, password } = req.body;
    //Check if username exists in the db.
    const user = await UserModel.findOne({ username });

    try {
        //If no user, send 400 response.
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        //Decrpyt password and check if it is the same as the one entered.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        //If no, send response saying invalid password.
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }
        //res.send(user)
        //If valid user and password, grant the user access token.
        const token = jwt.sign({ id: user._id }, "secret");
        res.json({ token, userID: user._id });

    } catch (err) {
        console.error(err)
        alert('User does not exist! Please register')
    }
});

//Get users
router.get('/users', async (req, res) => {
    //Finds all job postings in DB.
    const user = await UserModel.find({})
    try {
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//Get user information based on ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.send(user)
    } catch (err) {
        res.send(err)
    }
})


//Updates user based on it's id -> This http request pushes data into savedJobs array in usermodel
router.patch("/user/update/:id", async (req, res) => {
    const query = { _id: req.params.id };
    const updates = {
        $push: req.body
    };
    let user = await UserModel.updateOne(query, updates);
    res.json(user)
});


//Removes savedjob from document savedjobs array
router.patch("/user/savedjobs/:id", async (req, res) => {
    //ID of user
    const { id } = req.params;
    //Job ID we want to remove.
    const { job_id } = req.body;

    //Query
    const user = await UserModel.findByIdAndUpdate(
        id,
        { $pull: { savedJobs: { job_id: job_id } } },
        //Updates the response from the request to show the updated savedjobs array
        { new: true }
    );
    return res.json(user);
});

export { router as userRouter };
