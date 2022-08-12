import './App.css';
import { Navbar,Container,Nav,Row ,Col} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import shoesData from './data';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';



function App() {

 useEffect(()=>{
   if(!localStorage.getItem('watched')){
    localStorage.setItem('watched',JSON.stringify([]));
   }
 },[])



  let [shoes,setShoes] = useState(shoesData);

  let navigate = useNavigate();
  let [clickNum , setClickNum] = useState(2);
  let [loading, setLoding] = useState(true);
  

  const sortFn=()=>{
    const copyShoes = [...shoes];
    const sortBy = copyShoes.sort(function(a, b){return a.title < b.title ? -1 : a.title > b.title ? 1 : 0});
    setShoes(sortBy);
  };

  const addData = async()=>{
    setLoding(false)
    setClickNum(clickNum+1);
    let {data:data} = await axios.get(`https://codingapple1.github.io/shop/data${clickNum}.json`);
    let addShoes = shoes.concat(data);
    setShoes(addShoes);
    setLoding(true)
  }


 



  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">M-Guard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}} >Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}} >cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
        <>
          <div className="main-bg"></div>
          <button onClick={sortFn}>가나다순</button>
          <Container>
            <Row style={{overflow:"hidden"}}>
              {shoes.map((ele,idx)=>(
                <Card idx={idx}  shoes={shoes}  key={idx}/>
              ))}
            </Row>
          </Container>
         {loading ? (clickNum <= 3 ? <button onClick={addData}>더보기</button> : null) : <div>Loading...</div>}
        </>
      } />
        
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </div>
  );
}


  function Card({idx,shoes}){
    return(
      <Col md={4}>
          <Link to={`/detail/${idx}`}>
            <img  src={`https://codingapple1.github.io/shop/shoes${shoes[idx].id+1}.jpg`} width="70%"/>
            <h4>{shoes[idx].title}</h4>
            <p>{shoes[idx].price}원</p>
          </Link>
        </Col>
    )
  }




export default App;
