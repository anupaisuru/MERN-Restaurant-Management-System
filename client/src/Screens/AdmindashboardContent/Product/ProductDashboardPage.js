import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../../../assets/images/logo.jpg";

function ProductDashboardPage() {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [varients, setVarients] = useState([]);
  const [prices, setPrices] = useState([]);

  // Fetch pizzas from server on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/products').then((result) => {
      setPizzas(result.data);
    });
  }, []);

  const handlePDF = () => {
    const doc = new jsPDF();

    // Table headers
    const headers = [['No', 'Pizza Name', 'Description']];

    // Table data
    const data = pizzas.map((pizza, index) => [index + 1, pizza.name, pizza.description]);

    // Add table to PDF document
    doc.autoTable({
      head: headers,
      body: data,
      startY: 70,
      styles: {
        halign: 'left',
        valign: 'middle',
        fontSize: 12,
        cellPadding: 5,
      },
    });

    doc.addImage(logo, "JPEG", 10, 10, 65, 50);

    doc.text("Product List", 85, 65);
    doc.setFontSize(9);
    doc.text("MealMatch Foods", 155, 30);
    doc.text("Colombo 07 127/4", 155, 35);
    doc.text("MealMatch@gmail.com", 155, 40);
    doc.text("0716775718", 155, 45);

    // Save PDF document
    doc.save('pizza_descriptions.pdf');
  };

  // Delete pizza by id
  const handleDelete = (id) => {
    const confirmInput = window.confirm("Are you sure that do you want to delete this food item ?");
    if (!confirmInput) {
      return;
    }

    axios.delete(`http://localhost:5000/api/products/${id}`).then((result) => {
      setPizzas(pizzas.filter((pizza) => pizza._id !== id));
    });
  };

  // Update pizza by id
  const handleUpdate = (pizza) => {
    setSelectedPizza(pizza);
    setName(pizza.name);
    setDescription(pizza.description);
    setImage(pizza.image);
    setCategory(pizza.category);
    setVarients(pizza.varients);
    setPrices(pizza.prices);
  };

  // Handle form submit to update pizza
  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedPizza = {
      name,
      description,
      image,
      category,
      varients,
      prices,
    };

    axios
      .put(`http://localhost:5000/api/products/${selectedPizza._id}`, updatedPizza)
      .then((result) => {
        setPizzas(pizzas.map((pizza) => (pizza._id === result.data._id ? result.data : pizza)));
        setSelectedPizza(null);
      });
  };

  return (
    <div className='hmenu' style={{ padding: '1rem' }}>
      <div className='m-1' style={{ float: 'left' }}>
        <Link to='/products/add'>
          <button className='btn-green btn uppercase'>add food item</button>
        </Link>
      </div>
      <div className='m-1' style={{ float: 'right' }}>
        <button className='btn-yellow btn uppercase hmenu' onClick={handlePDF}>
          PDF
        </button>
      </div>
      <div style={{ clear: 'both' }}></div>
      <div style={{ marginTop: '30px' }}>
        {pizzas.map((pizza, i) => (
          <div key={pizza._id} className='mb-3'>
            {(i === 0) ? <hr /> : null}
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <div className='m-1 ' style={{ float: 'right' }}>
              <Link to={'http://localhost:3000/products/update/' + pizza._id}>
                <button className='btn-green btn uppercase' onClick={() => handleUpdate(pizza)}>
                  update
                </button>
              </Link>
            </div>
            <div className='m-1' style={{ float: 'right' }}>
              <button className='btn-red btn uppercase' onClick={() => handleDelete(pizza._id)}>
                delete
              </button>
            </div>
            <div style={{ clear: 'both' }}></div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDashboardPage;