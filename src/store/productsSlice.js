import { createSlice } from "@reduxjs/toolkit";
import { addDoc, db, collection, getDocs, where, query, doc, deleteDoc, orderBy, updateDoc, limit } from '../firebase/utils';

// This slice is responsible for adding, fetching the products from API
const initialState = {
  products: [],
  productsFetchSuccess: false,
  productsFetchError: null,

  productsByAdmin: [],
  productsByAdminFetchSuccess: false,
  productsByAdminError: null,

  productAddError: null,
  productAddSuccess: false,
  
  productEditError: null,
  productEditSuccess: false,

  productDeleteError: null,
  productDeleteSuccess: false,
}

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    addProductsToStore(state, action) {
      state.products = action.payload;
      state.productsFetchSuccess = true;
    },
    setProductsFetchSuccess(state, action) {
      state.productsFetchSuccess = action.payload;
    },
    setProductsFetchError(state, action) {
      state.productsFetchError = action.payload;
    },
    addAdminProductsToStore(state, action) {
      state.productsByAdmin = action.payload;
      state.productsByAdminFetchSuccess = true;
      state.productsByAdminError = null;
    },
    setAdminProductsFetchSuccess(state, action) {
      state.productsByAdminFetchSuccess = action.payload
    },
    setAdminProductsFetchError(state, action) {
      state.productsByAdminError = action.payload;
    },
    setAddProductSuccess(state, action){
      state.productAddSuccess = action.payload;
    },
    setAddProductError(state, action){
      state.productAddError = action.payload;
    },
    setEditProductSuccess(state, action){
      state.productEditSuccess = action.payload;
    },
    setEditProductError(state, action){
      state.productEditError = action.payload;
    },
    setProductDeleteSuccess(state, action) {
      state.productsByAdmin = state.productsByAdmin.filter(product => product.id !== action.payload);
      state.productDeleteSuccess = true;
    },
    setProductDeleteError(state, action) {
      state.productsByAdmin = action.payload;
    },
  }
});

export default productsSlice;
export const productsActions = productsSlice.actions;

// Only admin can add a product
export const handleAddProduct = product => {
  return async (dispatch) => {
    try{
      await addDoc(collection(db, "products"), product);
      dispatch(productsActions.setAddProductSuccess(true));
    }catch(error){
      dispatch(productsActions.setAddProductError(error.message ? error.message : error));  
    }
  }
}

// Only admin can add a product
export const handleEditProduct = productDetails => {
  const { adminId, productData } = productDetails
  return async (dispatch) => {
    try{
      const userRef = doc(db, "products", productData.id);
      await updateDoc(userRef, {
        ...productData
      });

      dispatch(productsActions.setEditProductSuccess(true));
    }catch(error){
      dispatch(productsActions.setEditProductError(error.message ? error.message : error));
    }
  }
}

// Fetching products created by current admin user

export const getAdminProducts = id => {
  return async (dispatch) => {
    try{
      const adminProducts = [];
      const q = query(collection(db, "products"), where("adminUID", "==", id), orderBy("name"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        adminProducts.push({id: doc.id, ...doc.data()});
      });
      dispatch(productsActions.addAdminProductsToStore(adminProducts));
    }catch(error){
      dispatch(productsActions.setAdminProductsFetchError(error.message ? error.message : error));
    }
  }
}


// Deleting product created by current admin user
export const deleteProduct = productId => {
  return async (dispatch) => {
    try{
      await deleteDoc(doc(db, "products", productId));
      dispatch(productsActions.setProductDeleteSuccess(productId))
    }catch(error){
      dispatch(productsActions.setProductDeleteError(error.message ? error.message : error));
    }
  }
}

//Fetching all the products
export const getAllProducts = (category) => {
  return async (dispatch) => {
    try{
      let productsQuery = query(collection(db, "products"), where("category", "==", category), orderBy("price", "desc"));
      if(category === "all" || !category){
        productsQuery = query(collection(db, "products"), orderBy("price", "desc"));
      }
      const products = [];
      const q = productsQuery;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        products.push({id: doc.id, ...doc.data()});
      });
      dispatch(productsActions.addProductsToStore(products));
    }catch(error){
      dispatch(productsActions.setProductsFetchError(error.message ? error.message : error));
    }
  }
}

