/*global */
/*eslint no-undef: "error"*/
import React from 'react';
import Modal from '../../Reviews/PhotoModal.jsx';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types, no-unused-vars
const Photo = ({image}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <img data-testid="image" onClick={handleOpen} style={{height: '50px', width: 'auto'}} src="https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/23/2020/04/Common-Coqui1-web-sized.jpg" alt="coqui"></img>
      <Modal isOpen={open} onClose={handleClose}>
        <img data-testid="modal-image" style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain'}} src="https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/23/2020/04/Common-Coqui1-web-sized.jpg" alt="coqui"/>
      </Modal>
    </>
  );
};

Photo.propTypes = {
  image: PropTypes.string.isRequired
}

export default Photo;