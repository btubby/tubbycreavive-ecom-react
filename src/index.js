
import React, { useState, useCallback, useEffect  } from "react";
import ReactDOM from "react-dom/client";
import Gallery from "react-photo-gallery";
import SelectedImage from "./SelectedImage";
import { Header, Container, TitleContainer, TitleImage, PreviewImage, Floater,GalleryContainer } from "./App.styles"; 
import { reveal as Menu } from "react-burger-menu";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import titleImage from "./tubbycreativeblack.png";
import "./App.css";

function App() {
  // const [selectAll, setSelectAll] = useState(false);
  const [photosx, setphotosx] = useState([]);
  const [photosfethed, setphotosfethed] = useState(false);
  //const [] = useState();
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  // const [menuopen, setMenuopen] = useState(false);
  // const [opacity, setOpacity] = useState(1);

  const [selectedImages, setselectedImages] = useState([]);
  const [totalCost, setTotalCost] = useState(0);


  useEffect(() => {
    // Update the document title using the browser API
    !photosfethed && getPhotos()
  })



  function addToBasket(id) {
    const arr = [...selectedImages];
    arr.push(id);
    setselectedImages(arr);
    // console.log(selectedImages.length)
    setTotalCost(totalCost+20.00)
  };
  function removeFromBasket(id) {
    const arr = [...selectedImages];
    var index = arr.indexOf(id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    setselectedImages(arr);
    setTotalCost(totalCost-20.00)
    // console.log(selectedImages)
  };
  
  function getPhotos() {
    //const tag = "storyboards";
    const url =
      "https://api.flickr.com/services/rest/?method=flickr.photos.search&" +
      "&api_key=f29dc69a4a6889fb21115bc54e8f432b" +
      // "&user_id=willtubby" +
     // "&api_key=52f7e77ccc225a2c6cda920bb6173fb5" +
      "&user_id=tubbycreative" +
      "&sort=date-taken-desc" +
      // "&tags=" +
      // tag +
      "&tag_mode=all" +
      "&extras=tags,date_upload,date_taken,media,url_n,url_l,url_z,url_o&per_page=300&page=1" +
      "&format=json" +
      "&nojsoncallback=1";
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        let ourArray = result.photos.photo.map(processFickrImagesOrVideo);
        console.log(ourArray)
        setphotosx(ourArray);
      });
      setphotosfethed(true)
  };
  // function openNav ()  { document.getElementById("myNav").style.display = "block";};
  // function closeNav ()  { document.getElementById("myNav").style.display = "none";};

  // function closeLightbox () {
  //   setCurrentImage(0)
  //   setLightboxIsOpen(false);

  // };
  // function gotoPrevious () {
  //   setCurrentImage(currentImage -1)
  // };
  // function gotoNext () { 
  //   setCurrentImage(currentImage + 1)
  // };
  // function closeMenu () {
  //   console.log("closing the menu");
  //   setMenuopen(false)
  //   setMenuopen(false)
  // };


  function processFickrImagesOrVideo (entry)  {
    // https://code.flickr.net/2008/05/01/videos-in-the-flickr-api/
    return {
      media: entry.media,
      id: entry.id,
      src: entry.url_z,
      hires: entry.url_l,
      height: parseInt(entry.height_z),
      width: parseInt(entry.width_z),
      tags: entry.tags,
      key: entry.index
    };
  };

  function openLightbox(index) {
    console.log("OPENING LIGHTBOX")
      setCurrentImage(index);
      setLightboxIsOpen(true);

  };
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <div>
        <PreviewImage>
          <button onClick={() => openLightbox(index)}>Preview</button>
        </PreviewImage>
        <SelectedImage
          // selected={selectAll ? true : false}
          addToCheckedCategories= {addToBasket}
          removeFromCheckedCategories = {removeFromBasket}
          key={key}
          margin={"2px"}
          index={index}
          photo={photo}
          left={left}
          top={top}
        />
      </div>
    ),
    // [selectAll]
  );

  return (
    <>
      <Floater>
  
        <pre>
          Basket contains { selectedImages.length} item(s).  
        </pre> 
        <a href="https://buy.stripe.com/test_5kA7vA3oYgAReSAaEE">
          Click here to CHECKOUT with stripe (£{totalCost})
        </a>
        <pre>
          Shirts are all 20 quid all in (includes shipping and tax)
        </pre>
      </Floater>
 
      <GalleryContainer>
        <Gallery photos={photosx} renderImage={imageRenderer} />
      </GalleryContainer>

    </>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);