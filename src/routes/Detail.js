import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap'

import {addItemFn} from './../store';



function Detail({shoes}) {
  


  let [load, setLoad] = useState("");
  let [tab, setTab] = useState(0);

  let cart = useSelector((state)=> state.cart);

  let dispatch = useDispatch();
 


  useEffect(()=>{
   let a =  setTimeout(() => {
      setAlert(false)
    }, 2000);
    return()=>{
      clearTimeout(a)
    }
  },[])

  let [alert, setAlert] = useState(true);

  let [inputVal, setInputVal] = useState('');
  let [isNum, setIsNum] = useState(false);

  let {id} = useParams();
  const filteredItem = shoes.find((el) => el.id === parseInt(id));

  const local = ()=>{
    const saved = [...JSON.parse(localStorage.getItem('watched'))];
    saved.push(filteredItem.id)
    const uniqueArr = [...new Set(saved)]
    localStorage.setItem('watched',JSON.stringify(uniqueArr)) 
  }
  useEffect(()=>{
    local();
  },[load])

  const inputTarget = (e)=> {
    setInputVal(e.target.value);
  }
 
  useEffect(()=>{
    if(inputVal != Number(inputVal)){
      setIsNum(true);
    }else{
      setIsNum(false);
    }
  },[inputVal])
  useEffect(()=>{
    let b = setTimeout(() => {
      setLoad("end");
    }, 100);
    return()=>{
      setLoad("");
      clearTimeout(b);
    }
  },[])

  return (
    <div className={`container start ${load}`}>
     {alert ?  
        <div className="alert alert-warning">
            2초 이내 구매시 할인
        </div> 
      : null}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${filteredItem.id+1}.jpg`} width="100%" />
        </div>
        {isNum ? <div className="btn-danger">경고 : 숫자만 입력하세요</div> : null}
        <input type="text" onChange={(e)=>{inputTarget(e)}} value={inputVal} />
        <div className="col-md-6">
          <h4 className="pt-5">{filteredItem.title}</h4>
          <p>{filteredItem.content}</p>
          <p>{filteredItem.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItemFn({id : filteredItem.id, name : filteredItem.title}))
          }}>주문하기</button> 
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{setTab(0)}} >Option 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>{setTab(1)}} >Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" onClick={()=>{setTab(2)}} >Option 3</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div> 
  )
}

function TabContent({tab}){

  let [fade, setFade] = useState('');

  useEffect(()=>{
    let a = setTimeout(() => {
      setFade("end");
    }, 100);
    return()=>{
      setFade("");
      clearTimeout(a);
    }
  },[tab])

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]}
    </div>
    )
}

export default Detail