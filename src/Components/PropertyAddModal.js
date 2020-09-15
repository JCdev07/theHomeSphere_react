import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ModalAddProperty from "./SubComponents/ModalAddProperty";
import CloseButton from "./SubComponents/CloseButton";
import FormBtn from "./SubComponents/FormBtn";
import InputGroup from "./SubComponents/InputGroup";
import ImageUploader from "react-images-upload";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import cogoToast from "cogo-toast";

const FormWrapper = styled.form`
   text-align: center;
   margin-top: 2rem;
   & input,
   button {
      width: 50%;
      border-radius: 120px;
   }

   & .fileContainer {
      box-shadow: none;
   }

   & button.chooseFileButton {
      background: #519e8a;
      color: #fff;
      border: 2px solid #fff;
      width: 50%;
      margin-top: 1em;
      padding: 8px 0px;
      font-size: 1em;
      font-weight: lighter;
      letter-spacing: 1px;
      margin-bottom: 0.25em;
      transition: all 0.3s ease;

      &:hover {
         color: #519e8a;
         background-color: #fff;
         border: 2px solid #519e8a;
      }
   }
   & button:hover {
      color: #519e8a;
      background-color: #fff;
      border: 2px solid #519e8a;
   }

   & button[disabled] {
      border: 1px solid #8ebaaf;
      background-color: #8ebaaf;
      color: #666666;
   }
`;

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "90vh",
      width: "80vw",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
   },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function PropertyModal({ categories }) {
   const [addPropertyStatus, setAddPropertyStatus] = useState({
      name: "",
      price: "",
      address: "",
      category: "",
      coverImage: "",
      images: [],
      bathroom: "",
      bedroom: "",
      carSlot: "",
      floorArea: "",
      landArea: "",
   });

   const [property, setProperty] = useState({});
   const [formValid, setFormValid] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const [isRedirect, setIsRedirect] = useState(false);

   const [errMsg, setErrMsg] = useState({});

   const [modalIsOpen, setIsOpen] = React.useState(false);

   const onDropCoverImage = (image) => {
      setAddPropertyStatus({
         ...addPropertyStatus,
         coverImage: image[0],
      });
   };

   const onDropImages = (imagesArr) => {
      setAddPropertyStatus({
         ...addPropertyStatus,
         images: [...imagesArr],
      });
   };

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
   }

   const handleChange = (e) => {
      setAddPropertyStatus({
         ...addPropertyStatus,
         [e.target.name]: e.target.value,
      });
   };

   useEffect(() => {
      let {
         name,
         price,
         address,
         category,
         coverImage,
         images,
         bathroom,
         bedroom,
         carSlot,
         floorArea,
         landArea,
      } = addPropertyStatus;
      if (
         name.length !== 0 &&
         price.length !== 0 &&
         address.length !== 0 &&
         category.length !== 0 &&
         images.length !== 0 &&
         bathroom.length !== 0 &&
         bedroom.length !== 0 &&
         carSlot.length !== 0 &&
         floorArea.length !== 0 &&
         landArea.length !== 0 &&
         coverImage.length !== 0
      ) {
         setFormValid(true);
      }

      return function cleanup() {
         setFormValid(false);
      };
   }, [addPropertyStatus]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      // console.log(typeof addPropertyStatus.images);

      if (formValid) {
         let formData = new FormData();
         formData.append("name", addPropertyStatus.name);
         formData.append("price", addPropertyStatus.price);
         formData.append("category", addPropertyStatus.category);
         formData.append("address", addPropertyStatus.address);
         formData.append("coverImage", addPropertyStatus.coverImage);
         formData.append("details.bathroom", addPropertyStatus.bathroom);
         formData.append("details.bedroom", addPropertyStatus.bedroom);
         formData.append("details.carSlot", addPropertyStatus.carSlot);
         formData.append("details.floorArea", addPropertyStatus.floorArea);
         formData.append("details.landArea", addPropertyStatus.landArea);

         addPropertyStatus.images.forEach((image) => {
            formData.append("images", image);
         });

         fetch("https://thehomesphereapi.herokuapp.com/properties", {
            method: "POST",
            body: formData,
            headers: {
               Authorization: `Bearer ${localStorage["userToken"]}`,
            },
         })
            .then((response) => {
               if (response.status === 200) {
                  cogoToast.success("Successfully Created a Property");
                  // addToast("Successfully Created a Property", {
                  //    appearance: "success",
                  //    autoDismiss: true,
                  //    autoDismissTimeout: 7000,
                  //    placement: "top-center",
                  // });
               } else {
                  cogoToast.error("Error! Please check your inputs");
                  // addToast("Please check your inputs", {
                  //    appearance: "error",
                  //    autoDismiss: true,
                  //    autoDismissTimeout: 7000,
                  //    placement: "top-center",
                  // });
                  setIsLoading(false);
               }
               return response.json();
            })
            .then((data) => {
               if (data.request === "success") {
                  setProperty(data.property);
                  setIsLoading(false);
                  setIsRedirect(true);
               }
            });
      }
   };

   if (isRedirect) {
      return <Redirect to={`/properties/${property._id}`} />;
   }

   let categoryList = categories.map((category) => {
      return (
         <option value={category._id} key={category._id}>
            {category.name}
         </option>
      );
   });

   return (
      <>
         {/* Add Property Modal */}
         <ModalAddProperty openModal={openModal} />
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <CloseButton onClick={closeModal} />
            <h3 className="text-center">Create Property</h3>
            <FormWrapper onSubmit={handleSubmit}>
               <InputGroup
                  name="name"
                  type="text"
                  placeholder="Property Name"
                  handleChange={handleChange}
               />

               <InputGroup
                  name="price"
                  type="number"
                  placeholder="Rate Per Night"
                  handleChange={handleChange}
               />

               <InputGroup
                  name="address"
                  type="text"
                  placeholder="Address"
                  handleChange={handleChange}
               />

               <div className="input-group w-50 mx-auto">
                  <div className="input-group-prepend">
                     <label className="input-group-text" htmlFor="Category">
                        Category
                     </label>
                  </div>
                  <select
                     className="custom-select"
                     id="Category"
                     name="category"
                     onChange={handleChange}
                  >
                     <option value="">--Select Category Name--</option>
                     {categoryList}
                  </select>
               </div>

               <ImageUploader
                  withIcon={true}
                  name="coverImage"
                  buttonText="Choose image"
                  onChange={onDropCoverImage}
                  imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                  maxFileSize={5242880}
                  withPreview={true}
                  label="Choose Cover Image (Max: 5mb)"
                  singleImage={true}
               />

               <ImageUploader
                  withIcon={true}
                  name="images"
                  singleImage={false}
                  buttonText="Choose images"
                  onChange={onDropImages}
                  imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                  maxFileSize={5242880}
                  withPreview={true}
                  label="Choose Images for Property (Max: 5mb)"
               />

               <h6>Property Details</h6>
               <InputGroup
                  name="bathroom"
                  type="number"
                  placeholder="Bathroom Count"
                  handleChange={handleChange}
                  formError={errMsg.bathroom}
               />
               <InputGroup
                  name="bedroom"
                  type="number"
                  placeholder="Bedroom Count"
                  handleChange={handleChange}
                  formError={errMsg.bedroom}
               />

               <InputGroup
                  name="carSlot"
                  type="number"
                  placeholder="Car Parking Slots"
                  handleChange={handleChange}
                  formError={errMsg.carSlot}
               />

               <InputGroup
                  name="floorArea"
                  type="text"
                  placeholder="Floor Area"
                  handleChange={handleChange}
                  formError={errMsg.floorArea}
               />

               <InputGroup
                  name="landArea"
                  type="text"
                  placeholder="Land Area"
                  handleChange={handleChange}
                  formError={errMsg.landArea}
               />

               <FormBtn formValid={formValid} isLoading={isLoading} />
            </FormWrapper>
         </Modal>
      </>
   );
}
export default PropertyModal;
