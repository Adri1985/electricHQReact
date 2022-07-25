
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ItemCount from '../ItemConunt/ItemCount';



const ItemProduct = ({data}) => {
  console.log("imagen ", data.imageName);  
  return (
      
      
<Card style={{ width: '18rem', height: '30rem',margin: '10px'}}>
      <Card.Img variant="top" src={`/assets/images/${data.imageName}`}/>
      <Card.Body>
        <Card.Title>{data.marca} {data.modelo}</Card.Title>
        <Card.Text>
          {data.topFeature1}
        </Card.Text>
        <Card.Text>
          stock: {data.stock}
        </Card.Text>
        <Button variant="warning">Add To Cart</Button>
      </Card.Body>
      <ItemCount stock={data.stock}/>
    </Card>
  
)}
  export default ItemProduct;