const {check} = require ('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Debes ingresar un nombre').bail()
        .isLength({min: 3}).withMessage('Debe ingresar un mínimo de 5 caracteres'),
    check('lastName')
        .notEmpty().withMessage('Debes ingresar un apellido').bail()
        .isLength({min: 3}).withMessage('Debe ingresar un mínimo de 5 caracteres'),
    check('email')
        .notEmpty().withMessage('Debe completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    check('password')
        .notEmpty().withMessage('Debe ingresar una contraseña').bail()
        .isLength({min: 3}).withMessage('La contraseña debe tener al menos 5 caracteres')
];