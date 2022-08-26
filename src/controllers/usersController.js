const fs = require('fs');
const path = require('path');
const users = require('../data/userDataBase.json');
const {validationResult} = require('express-validator');

const controller = {
    register: (req, res) => {
        
        return res.render('singUp')
    },
    registerProcess: (req, res) => {
        const {name, lastName, email, password} = req.body;
        let errors = validationResult(req);
       if(errors.isEmpty()){
           let newUser = {
               name,
               lastName,
               email,
               password
           }
           users.push(newUser);
           fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'userDataBase.json'),JSON.stringify(users,null,3),'utf-8');
           return res.redirect('/');
       }else{
            return res.render('singUp',{
                errors: errors.mapped(),
                old: req.body
            })
       }

    }
}

module.exports = controller;