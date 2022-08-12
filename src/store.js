import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
  name : "user",
  initialState: {name :"Kim", age: 26},
  reducers:{
    changeName(state){
       state.age += 1;
    }
  }
})

export let {changeName} = user.actions



let 찜 = createSlice({
  name : "찜목록",
  initialState: [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1},
  
  ],
  reducers:{
    addNumberFn:(state, action)=>{
      state.find(x => x.id === action.payload).count++;
    },
    addItemFn:(state,action) =>{
      if(state.find(x => x.name === action.payload.name)){
        state.find(x => x.name === action.payload.name).count++
      }else{
        state.push({id:action.payload.id, name: action.payload.name, count :1})
      }
    }
  }
})

export let { addNumberFn, addItemFn } = 찜.actions


export default configureStore({
  reducer: { 
    cart : 찜.reducer,
    user : user.reducer,
  }
}) 