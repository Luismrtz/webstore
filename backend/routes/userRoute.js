

import express from 'express';
import User from '../models/userModel';
import {getToken, isAuth} from '../util'
const router = express.Router();







//?get Specific post
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        res.json(user)
    } catch (error) {
        res.json({message: error});
    }
});

// //? get ALL post
router.get("/", async (req, res) => {
    // User.find() for promise version?
    try {
        const user = await User.find({});
        res.json(user);

    } catch (error) {
        res.json({msg: error.message})
    }
});


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
router.get("/createadmin", async (req, res) => {
    // User.find() for promise version?
    try {
        const newUser = await User.find();
        res.json(newUser);

    } catch (error) {
        res.json({msg: error.message})
    }
});

//? 
//* post signin

router.post('/signin', async(req, res) => {
    try {

        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });
        if(signinUser) {
            res.json({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            });
        }

    } catch(error) {
        res.status(401).send({msg: 'Invalid Email or Password.'});
    }
});




router.put('/:id', isAuth, async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.emali;
            user.password = req.body.password || user.password;
            const updatedUser = await user.save();

            res.send({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: getToken(updatedUser),
            });

        }
    } catch(error) {
        res.status(404).send({msg: 'User Not Found'});
    }
});









//? REGISTER: push to db 
router.post('/register', async (req, res) => {
    try {
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        });
        const newUser = await user.save();
        if (newUser) {
        res.json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
        }
    }catch(error)  {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  });








router.get("/:id", async (req, res) => {
    try {
 const product = await Product.findOne({_id: req.params.id});
        res.json(product);

    }
   catch (error) {
            res.status(404).send({msg: "Product Not Found."})
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




 //delete specific post
router.delete('/:id', async (req, res) => {
    try {
       const remove = await User.findByIdAndDelete(req.params.id)
        
        res.json({remove})
    } catch(error) {
        res.json({message: error})
    }
});


// router.post('/update/:id', async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         user.name = req.body.name;
//         user.email = req.body.email;
//         user.password = req.body.password;
//         user.isAdmin = req.body.isAdmin;
        
//         const saveUser = await user.save();
//         res.json(saveUser);
//     } catch (error) {
//         res.json({message: error});
//     }
// })



//? update revised
router.patch('/update/:id', async(req,res) => {
    try {
        const user = await User.updateOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(user);
    } catch (err) {
        res.json({ message: err})
    }

});



///! Just to push an admin
//router.post(...
router.get("/createadmin", async(req, res) => {
    try {
        const user = new User({
            name: 'test4',
            email: 'four@goo.com',
            password:'four',
            isAdmin: true
        });
        const newUser = await user.save();
        res.json(newUser);
    } catch(error) {
        res.json({msg: error.message})
    }
})





export default router;