
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let students = {
    list: [
        {id: 1, fname: "Jone",surname: "pony",major: "CoE", GPA: 2.8, author: "Sompon"},
        {id: 2, fname: "Dew",surname: "Ding",major: "CoE", GPA: 4.0, author: "Don"}
    ]
}

let reviwes = {
    list: [
        {id: 1, content : "go",author: "Don" },
        {id: 2, content : "travel",author: "XXX" },
    ]
}
/////reviwes/////
router.route('/reviwes')
    .get((req, res) => res.json(reviwes))
router.post('/reviwes',
    passport.authenticate('jwt', { session: false }),
    (req, res) => { 
        let id = (reviwes.list.length)?reviwes.list[reviwes.list.length-1].id+1:1
        let content = req.body.content
        let author = req.user.username

        reviwes = { list: [ ...reviwes.list, {id, content, author }] }

        res.json(reviwes)
    });

    router.route('/reviwes/:rv_id')
    
    .get((req, res) => {
        let ID = reviwes.list.findIndex( item => (item.id === +req.params.rv_id))
        if(ID >= 0)
        {
           res.json(reviwes.list[ID])
        }
        else
           res.json({status: "Fail, get not found!"})
    })
    .put((req, res) => {

        let ID = reviwes.list.findIndex( item => ( item.id === +req.params.rv_id))
    
        if(ID >= 0)
        {

            reviwes.list[ID].content = req.body.content
            reviwes.list[ID].author = req.user.username
            res.json(reviwes)
            
            
        }
        else
        {
            res.json({status: "Fail, Student not found!"})
        }

           
    }) 
    .delete((req, res) => {

        let ID = reviwes.list.findIndex( item => ( item.id === +req.params.std_id))

        
        if(ID >= 0)
        {
            reviwes.list = reviwes.list.filter( item => item.id !== +req.params.std_id )
            res.json(reviwes)
            
        }
        else
        {
            
            res.json({status: "Fail, reviwes not found!"})
        }
            

    })

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => { 
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => { 
        res.send( req.user)
    });




router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body 
            if (!username || !email || !password)
                return res.json( {message: "Cannot register with empty string"})
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        return res.json({ message: "foo" })
    });

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

