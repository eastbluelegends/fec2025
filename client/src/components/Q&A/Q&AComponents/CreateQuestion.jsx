/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import {useSelector} from 'react-redux';

const CreateQuestion = () => {
  const Product = useSelector(store => store.Product);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit= (formData) => {
    const body = formData.get("body");
    const name = formData.get("name");
    const email = formData.get("email");
    if (!body || !name || !email) {
      alert('One or more of the fields are empty');
    }
    axios.post(process.env.API_URL + '/qa/questions', {body, name, email, product_id: Product.product.id},{headers: {Authorization:process.env.AUTH_SECRET} })
      .then((result) => {
        // console.log(result.data)
        setOpen(false);
        alert('Successfully submitted!!! 🎉')
      })
      .catch(() => alert('Error while submitting'))
  }
  return (
  <div data-testid="create-question">
    <button onClick={handleOpen}>Create Question</button>
    <Modal isOpen={open} onClose={handleClose}>
      <>
        {/* {console.log(Product)} */}
        <h1>Ask Your Question</h1>
        <h3>About the {Product.product.name}</h3>
        <form action={handleSubmit}>
          <label>Question:</label>
          <br/>
          <textarea name="body" maxLength="1000" minLength="1" rows="15" cols="30"></textarea>
          <br/>
          <br/>
          <label>Nickname:</label>
          <br/>
          <input placeholder="Example: jackson11!" name="name" maxLength="60" minLength="5"></input>
          <br/>
          <br/>
          <label>Email:</label>
          <br/>
          <input type="email" placeholder="Why did you like the product or not?" name="email" maxLength="60" minLength="3"></input>
          <br/>
          <p>For authentication reasons, you will not be emailed</p>
          <button type="submit">Submit Question</button>
        </form>
        <br/>
      </>
    </Modal>
  </div>
  );
};


export default CreateQuestion;