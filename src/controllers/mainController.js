const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const productosVisitados = products.filter(producto => producto.category === 'visited');
		const productosEnVenta = products.filter(producto => producto.category === 'in-sale');
		return res.render('index',{
			productosVisitados,
			productosEnVenta,
			toThousand
		})
	},
	search: (req, res) => {
		const {keywords} = req.query;
		/*  */
		const resultado = products.filter(producto => producto.name.toLowerCase().includes(keywords.toLowerCase()) || producto.description.toLowerCase().includes(keywords.toLowerCase()));
		return res.render('results',{
			resultado,
			keywords,
			toThousand
		})
	},
};

module.exports = controller;
