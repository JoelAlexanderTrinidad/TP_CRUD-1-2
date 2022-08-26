const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const toThousand = n => n.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* Se lee los productos que están en el json (o sea que están actualizados) para usarlos en el controlador que necesitemos */
const leerProductos = () => {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}
/* Se crea una función guardar para cuando necesitemos escribir en nuestro json */
const guardarProductos = (products) => fs.writeFileSync(productsFilePath, JSON.stringify(products,null,3));


const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = leerProductos();
		return res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const producto = leerProductos().find(producto => producto.id === +req.params.id);
		return res.render('detail',{
			producto,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const products = leerProductos();
		const {name, price, discount, description, category} = req.body;

		const nuevoProducto = {
			/* le estamos creando el id */
			id: products[products.length -1].id + 1,
			name: name.trim(),
			description: description.trim(),
			price: +price,
			discount: +discount,
			image: req.file ? req.file.filename : "default-image.png",
			category
		};

		products.push(nuevoProducto);
		guardarProductos(products);

		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const products = leerProductos();
		const producto = products.find(producto => producto.id === +req.params.id);
		return res.render('product-edit-form',{
			producto
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const products = leerProductos();
		const {name, price, category, discount, description} = req.body;

		const product = products.find(producto => producto.id === +req.params.id);

		const productoModificado = products.map(producto => {
			if(producto.id === +req.params.id ) {
				const productoAmodificar = {
					...producto,
					name: name.trim(),
					price: +price,
					discount: +discount,
					description: description.trim(),
					image: req.file ? req.file.filename : producto.image,
					category
				};
				return productoAmodificar;
			}
			return producto;
		});

		if(req.file && product.image !== "default-image.png"){
			if(fs.existsSync('./public/images/products/' + product.image)){
				fs.unlinkSync('./public/images/products/' + product.image);
			}
		}
		
		guardarProductos(productoModificado);

		return res.redirect('/products');
		
	},


	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const products = leerProductos();
		const productosModificados = products.filter(producto => producto.id !== +req.params.id);
		
		guardarProductos(productosModificados);

		return res.redirect('/products');
	}
};

module.exports = controller;
