import Head from "next/head"
import Header from "../../components/Header"

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/router";



const AddProduct = () => { 
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {prodId,  title, oldImage, category, price, description, quantity} = router.query;
  const [isUpdate, setIsUpdate] = useState(false)
  useEffect(() => {
    if(prodId) {
      setProductData({
        title: title,
        price: price,
        category: category,
        quantity: Number(quantity),
        imageUrl: oldImage,
        description: description
      })
      setImage(oldImage)
      setContent(description)
      setIsUpdate(true)
    }
  }, [prodId, title, price, category, quantity, oldImage, description])


  const [productData, setProductData] = useState({
    title:  "",
    price:  "",
    category:  "",
    quantity:  "",
    imageUrl:  "",
    description:  "",
  })
  const [success, setSuccess] = useState(false)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState('');
  if(prodId) {
    console.log(image === oldImage)
  }


  const handleFileInputChange = (event) => {
    setImage(event.target.files[0]);
  };

  const addProductHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData();
    formData.append('image', image);

    fetch(process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(fileResData => {
      let image
      return  image = fileResData.image || 'undefined';
    })
    .then(image => {

    let graphqlQuery = {
    query: `
    mutation CreateProduct($title: String!, $price: Int!, $imageUrl: String!, $description: String!, $category: String, $quantity: Int) {
      createProduct(productInput: {title: $title, price: $price, imageUrl: $imageUrl, description: $description, category: $category, quantity: $quantity}) {
        title
        price
        quantity
        category
        imageUrl
        description
      }
    }
  `,
    variables: {
      title: productData.title,
      price:Number(productData.price),
      quantity:Number(productData.quantity),
      category: productData.category,
      imageUrl: image,
      description: content,
    }
  };

 fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphqlQuery)
  })
    .then(res => {
      return res.json();
    })
    .then(result => {
      setProductData({
        title: "",
        price: "",
        quantity: "",
        category: ""
      })
      setContent("")
    setLoading(false)
      setTimeout(() => {
        setSuccess(true)
      }, 1000);
      setTimeout(() => {
        setSuccess(false)
      }, 8000);
    })
    })
    .catch(err => console.log(err))
}

const updateDataHandler = () => {

  setLoading(true)
  if(image === oldImage){
    const formData = new FormData();
    formData.append('image', image);

    fetch(process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(fileResData => {
      let image
      return  image = fileResData.image || 'undefined';
    })
    .then(image => {
      let graphqlQuery = {
        query: `
        mutation UpdateProduct($id: Int!,$title: String!, $price: Int!, $imageUrl: String!, $description: String!, $category: String, $quantity: Int) {
          updateProduct(id: $id, productInput: {title: $title, price: $price, imageUrl: $imageUrl, description: $description, category: $category, quantity: $quantity}) {
            id
            title
            price
            imageUrl
            description
            category
            quantity
          }
        }
      `,
        variables: {
          id: Number(prodId),
          title: productData.title,
          price:Number(productData.price),
          quantity:Number(productData.quantity),
          category: productData.category,
          imageUrl: image,
          description: content
        }
      };
      fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      })
        .then(res => {
          return res.json();
        })
        .then(result => {
          setProductData({
            title: "",
            price: "",
            quantity: "",
            category: ""
          })
          setContent("")
        setLoading(false)
          setTimeout(() => {
            setSuccess(true)
          }, 0);
          setTimeout(() => {
            setSuccess(false)
          }, 7000);
        })
        .catch(err => console.log(err))
      })
  }
  else {
    let graphqlQuery = {
      query: `
      mutation UpdateProduct($id: Int!,$title: String!, $price: Int!, $imageUrl: String!, $description: String!, $category: String, $quantity: Int) {
        updateProduct(id: $id, productInput: {title: $title, price: $price, imageUrl: $imageUrl, description: $description, category: $category, quantity: $quantity}) {
          id
          title
          price
          imageUrl
          description
          category
          quantity
        }
      }
    `,
      variables: {
        id: Number(prodId),
        title: productData.title,
        price:Number(productData.price),
        quantity:Number(productData.quantity),
        category: productData.category,
        imageUrl: image,
        description: content
      }
    };
    fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        setProductData({
          title: "",
          price: "",
          quantity: "",
          category: ""
        })
        setContent("")
      setLoading(false)
        setTimeout(() => {
          setSuccess(true)
        }, 0);
        setTimeout(() => {
          setSuccess(false)
        }, 7000);
      })
      .catch(err => console.log(err))
  }
}

    const productInputHandler = (inputIdentifier, e) => {
      setProductData((currentInputs) => {
        return {
          ...currentInputs,
          [inputIdentifier]: e.target.value,
        };
      });
    };

    if(loading) {
      return <p>Loading</p>
    }

  return (
    <>
    <Header/>
    <div className="">

          <Head>
           {/* fonts import */}
           <link rel='preconnect' href='https://fonts.googleapis.com' />
      </Head>


    <form  className="px-[10px]">
      <h2 className="text-center text-xl uppercase text-gray-500  my-5 [word-spacing: 10px] ">
        {isUpdate ? 'update product' : 'add product'}
        <div className="w-[120px] h-[1px] bg-yellow-500 m-auto"></div>
      </h2>
      {success &&
          <p className="text-center text-xl text-green-400 mt-2 transition-all duration-300 ease-out">product add successfully </p>
      }
          <input
        type='text'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex mb-5 lg:my-5'
        placeholder='product name'
        required
        name="title"
        value={productData.title}
        onChange={productInputHandler.bind(this, 'title')}
      />
      <div className="flex space-x-4 mb-5">
      <input
        type='number'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-[50%]  m-auto flex  lg:my-8'
        placeholder='price'
        name="price"
        required
        value={productData.price}
        onChange={productInputHandler.bind(this, 'price')}
      />
      <input
        type='number'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-[50%]  m-auto flex  lg:my-8'
        placeholder='quantity'
        name="quantity"
        required
        value={productData.quantity}
        onChange={productInputHandler.bind(this, 'quantity')}
      />
      </div>

      <input
        type='text'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex mb-5 lg:my-5'
        placeholder='product category'
        required
        name="category"
        value={productData.category}
        onChange={productInputHandler.bind(this, 'category')}
      />

      <input
        type='file'
        className='bg-gray-200 lg:border-[1px] rounded-lg  outline-none px-4 py-[16px] w-full  m-auto flex my-6 lg:my-8'
        placeholder='image url'
        name="imageUrl"
        required
        // value={image}
        onChange={handleFileInputChange}
      />

      <div className="  font-semibold text-gray-500 h-[300px] overflow-y-scroll shadow-md border border-gray-400 rounded-md overflow-hidden">
      <QuillNoSSRWrapper modules={modules} onChange={setContent} value={content} theme="snow" 
      // value={content}
        />
      </div>

      {isUpdate ? (
        <button
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-gray-500 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-[#ffcb05] 2xl:w-[300px] mb-20'
          onClick={updateDataHandler}
        >
          Update
        </button>
      ) : (
        <button type="submit"
          className='flex justify-center m-auto mt-5 lg:mt-5  bg-yellow-400 w-56 rounded-full text-white  px-2 py-3 2xl:p-3 outline-none transition-all duration-300 ease-in-out hover:bg-yellow-500 2xl:w-[300px] mb-20'
          onClick={addProductHandler}
        >
          Add
        </button>
      )}
    </form>
    </div>
    </>
  )
}

export default AddProduct