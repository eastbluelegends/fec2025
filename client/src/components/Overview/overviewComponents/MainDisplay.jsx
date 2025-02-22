import React, { useState, useEffect}  from 'react';
import { useSelector} from 'react-redux';

import Modal from './MainDisplayModal.jsx';
import GalleryAlt from './GalleryAlt.jsx';
import Gallery from './Gallery.jsx';
const MainDisplay = () => {

  const PictureData = useSelector(store => store.PictureData);

  const [moused, setMoused] = useState(false);
  const [expanded, setExpanded] = useState(0);
  const [style, setStyle] = useState({
    backgroundSize: "contain",
    width: "40000%"
  });


  const [divStyle, setDivStyle] = useState({});

  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState(<Gallery/>)
  const toggleOpen = () => {
    setOpen(!open)
    if(!open){
      setGallery('');
    } else {
      setGallery(<Gallery/>)

    }
  };

  useEffect(() => {

    if(expanded === 0){
      setDivStyle({
         width: "98%",
         height: "100%",
        float: 'left',
        background: "linear-gradient(rgba(144, 144, 144, 1), rgb(0, 0, 0))",
        border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: "2px solid black",

        overflow: "hide",
        objectFit: "contain"


      });
      setStyle({
        height: "100%",
        width: "100%",
        objectFit: "contain",
        float: 'left',
        transform:"scale(1)"
      });

    } else if(expanded === 1) {

      setDivStyle({
        width: "240%",
        height: "100%",
       float: 'left',
       background: "linear-gradient(rgba(144, 144, 144, 1), rgb(0, 0, 0))",

       border: "2px solid #000",
       borderRadius: "10px",
       boxShadow: "2px solid black",

       overflow: "hide",
       objectFit: "contain"

     });
     setStyle({
       height: "100%",
       width: "100%",
       objectFit: "contain",

       float: 'left',
       //transform:"scale(1)"
     });
    } else {

      toggleOpen();

    }
  },[expanded])
  useEffect(() => {
    if(moused) {
      const zoom = document.querySelector("#mainDisplayModal");
      if(zoom!==null){

        zoom.addEventListener("mousemove", (e) => {
          const container = document.querySelector("#mainDisplayExpandedContainer");
          const rect = container.getBoundingClientRect();
          const height = zoom.clientHeight *1.0;
          const width = zoom.clientWidth * 1.0;

          const focusX = ((e.clientX - rect.left)/width)*100;
          const focusY = ((e.clientY - rect.top) / height) * 100;

          setStyle({
            position: "absolute",
            width:"100%",
            height:"100%",


            transformOrigin: `${focusX}% ${focusY}%`,
            transform:"scale(2.5)",
            cursor: "crosshair"
          })

        });
        zoom.removeEventListener("mousemove",()=>{});
      }
    }
  },[moused]);





  if(!open && !PictureData.Picture) {
    return(

      <div style= {divStyle} id ='mainDisplayContainer'>
        <img  id='mainDisplay' data-testid="mainDisplay" src='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
        onClick={()=>{
          if(expanded>1){
            setExpanded(0);
          } else {
            setExpanded(expanded + 1);
          }
        }}
        style={style}
        />
        {gallery}
      </div>
    );
  }
  if(!open && PictureData) {
    return(

      <div style= {divStyle} id ='mainDisplayContainer'>
        <img  id='mainDisplay' data-testid="mainDisplay" src={PictureData.Picture}
        onClick={()=>{
          if(expanded>1){
            setExpanded(0);
          } else {
            setExpanded(expanded + 1);
          }
        }}
        style={style}
        />
        {gallery}
      </div>
    );
  }
  return(
    <div style= {divStyle} id ='mainDisplayContainer'>
      <Modal isOpen={open}>
        <img
        id='mainDisplayModal'
        style={style}
        onMouseEnter={()=>{
          setMoused(true);
        }}
        onMouseLeave={()=>{
          setMoused(false);

          setStyle({
            width: "100%",
            height: "100%",

            transformOrigin:"top left",
            transform:"scale(1)"
          })
        }}

        data-testid="mainDisplayModal" src={PictureData.Picture}
        onClick={()=>{

          if(expanded>1){
            setExpanded(0);
            toggleOpen();
          } else {
            setExpanded(expanded + 1);
          }
        }}
      />
      <GalleryAlt/>
      </Modal>

    </div>
  );
}

export default MainDisplay;