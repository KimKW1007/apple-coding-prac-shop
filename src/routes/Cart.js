import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNumberFn, changeName } from '../store';

function Cart() {

  let cart = useSelector((state)=> state.cart);
  let user = useSelector((state)=> state.user);
  let dispatch = useDispatch();

 
  return (
    <div>
      <p>{user.name}의 장바구니</p>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
        {cart.map((ele,idx)=>(
          <tr key={idx}>
            <td>{ele.id}</td>
            <td>{ele.name}</td>
            <td>{ele.count}</td>
            <td><button onClick={()=>{
               dispatch(addNumberFn(ele.id));
            }} >추가</button></td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Cart