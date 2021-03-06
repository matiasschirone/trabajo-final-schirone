import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import { Button, Card, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [products, setProducts] = useState([]);
  const navegar = useNavigate()
  

  useEffect(() => {
    const db = getFirestore();

    const q = query(collection(db, "products"), where("precio", "<=", 120000));
    getDocs(q).then((snapshot) => {
      if (snapshot.size === 0) {
        console.log("No hay productos");
      }
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <>
      <div>
        <h1>Shop Musical</h1>
        <p> Aproveche los productos destacados</p>
      </div>
      <Row>
      {products.map((product) => ( 
        <Card style={{ width: "18rem"}} key={product.id}>
          <Card.Img variant="top" src={product.imagen} alt={product.nombre} style={{ maxWidth: "100% !important" }} className="card-img-top"  />
          <Card.Body>
            <Card.Title>{product.nombre}</Card.Title>
            <Card.Text>{product.precio}</Card.Text>
            <Button variant="info" onClick={()=>navegar(`/detalle/${product.id}`)}>Ver mas</Button>
          </Card.Body>
        </Card>
      ))}
      </Row>
    </>
     
  );
};

export default Home;
