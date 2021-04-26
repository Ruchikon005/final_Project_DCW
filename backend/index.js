
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


let reviwes_pk = {
    list: [
        {id: 1, content : "go",author: "game" ,like: 1},
        {id: 2, content : "travel",author: "X1" ,like: 2},
    ]
}

let reviwes_ch = {
    list: [
        {id: 1, content : "go",author: "Dew" },
        {id: 2, content : "travel",author: "X2" },
    ]
}

let reviwes_kb = {
    list: [
        {id: 1, content : "go",author: "Fon" },
        {id: 2, content : "travel",author: "X3" },
    ]
}

/////reviwes_pk/////
router.route('/reviwes_pk')
    .get((req, res) => res.json(reviwes_pk))
    .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => { 
        let id = (reviwes_pk.list.length)?reviwes_pk.list[reviwes_pk.list.length-1].id+1:1
        let content = req.body.content
        let author = req.user.username

        reviwes_pk = { list: [ ...reviwes_pk.list, {id, content, author }] }

        res.json(reviwes_pk)
    });

router.route('/reviwes_pk/:rv_id')
    
    .get((req, res) => {
        let ID = reviwes_pk.list.findIndex( item => (item.id === +req.params.rv_id))
        if(ID >= 0)
        {
           res.json(reviwes_pk.list[ID])
        }
        else
           res.json({status: "Fail, get not found!"})
    })
    .put((req, res) => {

        let ID = reviwes_pk.list.findIndex( item => ( item.id === +req.params.rv_id))
    
        if(ID >= 0)
        {
            reviwes_pk.list[ID].content = req.body.content
            res.json(reviwes_pk)  
        }
        else
        {
            res.json({status: "Fail, Student not found!"})
        }    
    }) 
    .delete((req, res) => {
        let ID = reviwes_pk.list.findIndex( item => ( item.id === +req.params.rv_id))
        if(ID >= 0)
        {
            reviwes_pk.list = reviwes_pk.list.filter( item => item.id !== +req.params.rv_id )
            res.json(reviwes_pk)
        }
        else
        {
            res.json({status: "Fail, reviwes_pk not found!"})
        }
    })

/////reviwes_pk/////
router.route('/reviwes_ch')
    .get((req, res) => res.json(reviwes_ch))
    .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => { 
        let id = (reviwes_ch.list.length)?reviwes_ch.list[reviwes_ch.list.length-1].id+1:1
        let content = req.body.content
        let author = req.user.username

        reviwes_ch = { list: [ ...reviwes_ch.list, {id, content, author }] }

        res.json(reviwes_ch)
    });

router.route('/reviwes_ch/:rv_id')
    
    .get((req, res) => {
        let ID = reviwes_ch.list.findIndex( item => (item.id === +req.params.rv_id))
        if(ID >= 0)
        {
           res.json(reviwes_ch.list[ID])
        }
        else
           res.json({status: "Fail, get not found!"})
    })
    .put((req, res) => {

        let ID = reviwes_ch.list.findIndex( item => ( item.id === +req.params.rv_id))
    
        if(ID >= 0)
        {

            reviwes_ch.list[ID].content = req.body.content
            res.json(reviwes_ch)
            
            
        }
        else
        {
            res.json({status: "Fail, Student not found!"})
        }

           
    }) 
    .delete((req, res) => {
        

        let ID = reviwes_ch.list.findIndex( item => ( item.id === +req.params.rv_id))

        
        if(ID >= 0)
        {
            reviwes_ch.list = reviwes_ch.list.filter( item => item.id !== +req.params.rv_id )
            res.json(reviwes_ch)
            
        }
        else
        {
            
            res.json({status: "Fail, reviwes_ch not found!"})
        }
            

    })

/////reviwes_kb/////
router.route('/reviwes_kb')
    .get((req, res) => res.json(reviwes_kb))
    .post(
    passport.authenticate('jwt', { session: false }),
    (req, res) => { 
        let id = (reviwes_kb.list.length)?reviwes_kb.list[reviwes_kb.list.length-1].id+1:1
        let content = req.body.content
        let author = req.user.username

        reviwes_kb = { list: [ ...reviwes_kb.list, {id, content, author }] }

        res.json(reviwes_kb)
    });

router.route('/reviwes_kb/:rv_id')
    
    .get((req, res) => {
        let ID = reviwes_kb.list.findIndex( item => (item.id === +req.params.rv_id))
        if(ID >= 0)
        {
           res.json(reviwes_kb.list[ID])
        }
        else
           res.json({status: "Fail, get not found!"})
    })
    .put((req, res) => {

        let ID = reviwes_kb.list.findIndex( item => ( item.id === +req.params.rv_id))
    
        if(ID >= 0)
        {

            reviwes_kb.list[ID].content = req.body.content
            res.json(reviwes_kb)
            
            
        }
        else
        {
            res.json({status: "Fail, Student not found!"})
        }

           
    }) 
    .delete((req, res) => {
        

        let ID = reviwes_kb.list.findIndex( item => ( item.id === +req.params.rv_id))

        
        if(ID >= 0)
        {
            reviwes_kb.list = reviwes_kb.list.filter( item => item.id !== +req.params.rv_id )
            res.json(reviwes_kb)
            
        }
        else
        {
            
            res.json({status: "Fail, reviwes_kb not found!"})
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

