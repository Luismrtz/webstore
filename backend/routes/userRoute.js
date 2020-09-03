// import express from 'express';
// import User from '../models/userModel';

// const router = express.Router();

// router.get("/createadmin", async (req, res) => {
//     // User.find() for promise version?
//     try {
//         // const name = req.body.name;
//         // const email = req.body.email;
//         // const password = req.body.password;
//         // const isAdmin = req.body.isAdmin;
        

//         const user = new User({
//             name:'Luise',
//             email:'abc123@yahoo.com',
//             password:'1234',
//             isAdmin: true
//             // name,
//             // email,
//             // password,
//             // isAdmin
//         });
        
//         const newUser = await user.save();
//         res.json(newUser);

//     } catch (error) {
//         res.json({msg: error.message})
//     }


// });

// export default router;

import express from 'express';
import User from '../models/userModel';

const router = express.Router();



//? .then.catch apprach
// router.get('/', (req, res) => {
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.post('/add', (req,res) => {
//      const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const isAdmin = req.body.isAdmin;

//     const newUser = new User({name,
//        email,password, isAdmin
//     });

//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


// //? try catch approach
router.get("/", async (req, res) => {
    // User.find() for promise version?
    try {
        const newUser = await User.find();
        res.json(newUser);

    } catch (error) {
        res.json({msg: error.message})
    }
});


//? submits a post
router.post("/add", async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    try {
    const user = new User({
        name,
        email,
        password,
        isAdmin
    //  name : req.body.name,
    //  email : req.body.email,
    //  password : req.body.password,
    //  isAdmin : req.body.isAdmin
    });
   
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        res.json({message: error})
    }
});


//get Specific post
    router.get('/:id', async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.json(user)
        } catch (error) {
            res.json({message: error});
        }
    });

 //delete specific post
router.delete('/:id', async (req, res) => {
    try {
       const remove = await User.findByIdAndDelete(req.params.id)
        
        res.json({remove})
    } catch(error) {
        res.json({message: error})
    }
});


router.post('/update/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.isAdmin = req.body.isAdmin;
        
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        res.json({message: error});
    }
})





export default router;