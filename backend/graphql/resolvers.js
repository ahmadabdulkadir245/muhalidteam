const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const Banner = require('../models/banner_image');
const User = require('../models/user');
const db = require('../util/database')


module.exports = {
  createUser: async function({ userInput }, req, res) {
    // if (!validator.isEmail(userInput.email)) {
    //   errors.push({ message: 'E-Mail is invalid.' });
    // }
    // if (
    //   validator.isEmpty(userInput.password) ||
    //   !validator.isLength(userInput.password, { min: 5 })
    // ) {
    //   errors.push({ message: 'Password too short!' });
    // }
    // if (errors.length > 0) {
    //   const error = new Error('Invalid input.');
    //   error.data = errors;
    //   error.code = 422;
    //   throw error;
    // }

    const userExist = await User.userExist(userInput.email).then(([user]) => {
      return user[0]
    })
    .catch(err => console.log(err))

    if(userExist) {
      // const error = new Error('user has been created with this email');
      // error.code = 401;
      // throw error;

      return  {
        id: '',
        email: false,
        password: '',
        isAdmin: '',
      }
    }
  
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User(null, userInput.email,
     hashedPw, '');

    await user.save();
    return {
      id: '',
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin
    };
  },
  login: async function({ email, password }) {
    const user = await User.userExist(email).then(([user]) => {
      return user[0]
    })
    .catch(err => console.log(err))
    if (!user) {
      const error = new Error('Email has  not been register.');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Email or Password is incorrect.');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    return { token: token, userId: user.id };
  },
    createProduct: async function({ productInput }, req) {

        const product = new Product(null, productInput.title, productInput.imageUrl, productInput.description, productInput.price, productInput.category, productInput.quantity, 1);

         await product.save()
    
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          creator: 1,
          // createdAt: createdProduct.createdAt.toISOString(),
          // updatedAt: createdProduct.updatedAt.toISOString()
        };
      },

      products: async function({ page, perPage }, req) {
        if (!page) {
          page = 1;
        }
        // const productPerPage = perPage
        const offset =  (page - 1 ) * perPage 
        
        const products = await Product.findAndCountAll(perPage, offset).then(([rows, fieldData]) => {
          return {data: rows}
        })
        .catch(err => console.log(err));

        const totalProducts = await Product.fetchAll().then(([rows, fieldData]) => {
          return rows
        })
        .catch(err => console.log(err));

        const totalPosts = 5
        const totalPages = Math.ceil(totalProducts.length / perPage);
        console.log(totalPages);
        
        return {
          products: products.data.map(product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                imageUrl: product.imageUrl,
                description: product.description,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString()
            };
          }),
          totalProducts: totalPages
        };
      },
      product: async function({ id }, req) {
        const product = await   Product.findById(id)
        .then(([product]) => {
          return product[0]
        })
        .catch(err => console.log(err))

        // if (!product) {
        //   const error = new Error('No post found!');
        //   error.code = 404;
        //   throw error;
        // }
        return {  
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString()
        };
      },

      createBanner: async function({ bannerInput }, req) {
 
        const banner = new Banner(null,  bannerInput.category,bannerInput.image ,1);

         await banner.save()
    
        return {
          id: banner.id,
          category: banner.category,
          image: banner.image,
          userId: 1,
        };
      },

      banners: async function( req) {
        const banners = await Banner.fetchAll() .then(([rows, fieldData]) => {
          return rows
        })
        .catch(err => console.log(err));
        return {
          banners: banners.map(banner => {
            return {
                id: banner.id,
                category: banner.category,
                image: banner.image,
                userId: banner.userId,
                // createdAt: banner.createdAt.toISOString(),
                // updatedAt: banner.updatedAt.toISOString()
            };
          }),
        };
      },
      deleteProduct: async function( {id}, req) {
         Product.deleteById(id);
        return true
      },
      updateProduct: async function ({id, productInput}, req) {
        const product = new Product(null, productInput.title, productInput.imageUrl, productInput.description, productInput.price, productInput.category, productInput.quantity, 1);

         await product.updateById(id)
    
        return {
          id: id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          creator: 1,
          // createdAt: createdProduct.createdAt.toISOString(),
          // updatedAt: createdProduct.updatedAt.toISOString()
        };
      }
}