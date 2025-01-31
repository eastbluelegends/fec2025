/*global process*/
/*eslint no-undef: "error"*/
import React, {useState, useEffect}  from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {ProductActions} from '../../../store/ProductSlice.js';

import axios from 'axios';

const ProductForm = () => {
  const [quantity, setQuantity] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('');
  const [notify, setNotify] = useState('\n');

  const [inStock, setInStock] =useState(true);
  const [purchase, setPurchase] =useState('');
  const [quantities, setQuantities] = useState([]);
  const GalleryData = useSelector(store => store.GalleryData);

  useEffect(() => {

    if(GalleryData.Gallery.name){
      var tempSizes = [{size:'select size'},...Object.keys(GalleryData.Gallery.skus).map((key) => GalleryData.Gallery.skus[key])];
      var tempSizesUpdated = [];
      var tempSizesListed = {};
      for(var i = 0; i < tempSizes.length; i++){
        if(tempSizesListed[tempSizes[i].size]){
          //add to where that size was
          tempSizesUpdated[tempSizesListed[tempSizes[i].size]].quantity+=tempSizes[i].quantity;
        } else {
          tempSizesListed[tempSizes[i].size] = i;
          tempSizesUpdated.push({size:tempSizes[i].size,quantity:tempSizes[i].quantity})
        }
      }
      console.log(tempSizesUpdated);
      setSizes(tempSizesUpdated);
    }
  },[GalleryData]);


  useEffect(() => {
    if(inStock){//pretty sure this won't work for products not actually in stock, but...
      setPurchase(<button type="button" onClick={()=>{
        if(size!=='' && size!=='select size'){
          //add to cart I guess?

          var sku = 0;

          Object.keys(GalleryData.Gallery.skus).map((key) => {
            if(GalleryData.Gallery.skus[key].size === size)
              sku = key;
            })
          //send sku to cart for each quantity (I saw no way to send them en masse).
          for(var i = 0; i < quantity; i++){
            axios.post(process.env.API_URL + '/cart'  ,{sku_id:sku}, {headers: {Authorization:process.env.AUTH_SECRET} })
            .then((res)=>{
              console.log(res.status);
            })
            .catch((err)=>{
              console.log(err);
            })
          }


        } else {
          // console.log(size);
          setNotify('please select a size');
        }
      }}>add to cart</button>)
    } else {
      setPurchase('');
    }
  },[size])
  if(GalleryData.Gallery.name !== undefined){
    return(
      <form data-testid="productForm">
        <p>{notify}</p>
        <select name="sizes" onChange={(e)=>{

          setSize(e.target.value);
          var index = -1;
          for(var i = 0; i < sizes.length; i++) {
            if(sizes[i].size === e.target.value){
              index = i;
            }
          }
          const tempQuantity = sizes[index].quantity;
          var tempQuantities = [];
          for(i = 1; i <= tempQuantity; i++){
            tempQuantities.push(i);
          }
          setQuantities(tempQuantities);
          if(tempQuantity>0){
            setQuantity(1);
            setInStock(true);
          }
          else{
            setInStock(false);
          }
        }} >

          {sizes.map((size)=>{
            return(
            <option value={size.size} key={GalleryData.Gallery.name + size.size}> {size.size} </option>
          )})}
        </select>

        <select name="quantity"onChange={(e)=>{
          setQuantity(e.target.value);
        }} >
          {quantities.map((amount)=>(
            <option value={amount} key={amount}> {amount} </option>
          ))}
        </select>
        {purchase}
      </form>
    );
  }
}

export default ProductForm;