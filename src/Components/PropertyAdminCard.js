import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ModalPropertyToggler from "./SubComponents/ModalPropertyToggler";
import LinkToSingleProp from "./SubComponents/LinkToSingleProp";
import CloseButton from "./SubComponents/CloseButton";
import EditButton from "./SubComponents/EditButton";
import FormBtn from "./SubComponents/FormBtn";
import InputGroup from "./SubComponents/InputGroup";
import ImageUploader from "react-images-upload";
import { useToasts } from "react-toast-notifications";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";

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

const FormWrapper = styled.form`
   text-align: center;
   margin-top: 2rem;
   & input,
   button {
      width: 50%;
      border-radius: 120px;
   }

   /* & img {
      width: 100%;
      height: 100%;
   } */

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

const PropertyAdminCard = ({ property, categories }) => {
   const [addPropertyStatus, setAddPropertyStatus] = useState({
      name: property.name,
      price: property.price,
      address: property.address,
      category: property.category,
      coverImage: property.coverImage,
      images: property.images,
      bathroom: property.details.bathroom,
      bedroom: property.details.bedroom,
      carSlot: property.details.carSlot,
      floorArea: property.details.floorArea,
      landArea: property.details.landArea,
   });

   const { addToast } = useToasts();

   const [formValid, setFormValid] = useState(false);

   const [isLoading, setIsLoading] = useState(false);

   const [isRedirect, setIsRedirect] = useState(false);

   const [formDisabled, setFormDisabled] = useState(true);

   const [errMsg, setErrMsg] = useState({});

   const [modalIsOpen, setIsOpen] = React.useState(false);

   const onDropCoverImage = (image) => {
      setAddPropertyStatus({
         ...addPropertyStatus,
         coverImage: image[0],
      });

      console.log(image);
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

   const handleEditBtn = () => {
      setFormDisabled(false);
   };

   // useEffect(() => {
   //    let {
   //       name,
   //       price,
   //       address,
   //       category,
   //       coverImage,
   //       images,
   //       bathroom,
   //       bedroom,
   //       carSlot,
   //       floorArea,
   //       landArea,
   //    } = addPropertyStatus;
   //    if (
   //       name.length !== 0 &&
   //       price.length !== 0 &&
   //       address.length !== 0 &&
   //       category.length !== 0 &&
   //       images.length !== 0 &&
   //       bathroom.length !== 0 &&
   //       bedroom.length !== 0 &&
   //       carSlot.length !== 0 &&
   //       floorArea.length !== 0 &&
   //       landArea.length !== 0 &&
   //       coverImage.length !== 0
   //    ) {
   //       setFormValid(true);
   //    }

   //    return function cleanup() {
   //       setFormValid(false);
   //    };
   // }, [addPropertyStatus]);

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
                  console.log(response);
                  addToast("Successfully Created a Property", {
                     appearance: "success",
                     autoDismiss: true,
                     autoDismissTimeout: 7000,
                     placement: "top-center",
                  });
               } else {
                  addToast("Please check your inputs", {
                     appearance: "error",
                     autoDismiss: true,
                     autoDismissTimeout: 7000,
                     placement: "top-center",
                  });
                  setIsLoading(false);
               }
               return response.json();
            })
            .then((data) => {
               console.log(data);
               if (data.request === "success") {
                  setIsLoading(false);
                  setIsRedirect(true);
               }
            });
      }
   };

   let categoryList = categories.map((category) => {
      return (
         <option value={category._id} key={category._id}>
            {category.name}
         </option>
      );
   });

   return (
      <>
         <ModalPropertyToggler property={property} openModal={openModal} />
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <img
               src={`https://thehomesphereapi.herokuapp.com/${property.coverImage}`}
               alt=""
            />
            <div className="d-flex justify-content-between align-items-center">
               <CloseButton onClick={closeModal} />
               <EditButton handleClick={handleEditBtn} />
               <LinkToSingleProp link={`/properties/${property._id}`} />
            </div>
            <FormWrapper onSubmit={handleSubmit}>
               <InputGroup
                  name="name"
                  type="text"
                  placeholder="Property Name"
                  handleChange={handleChange}
                  formError={errMsg.name}
                  value={property.name}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="price"
                  type="number"
                  placeholder="Rate Per Night"
                  handleChange={handleChange}
                  formError={errMsg.price}
                  value={property.price}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="address"
                  type="text"
                  placeholder="Address"
                  handleChange={handleChange}
                  formError={errMsg.address}
                  value={property.address}
                  formDisabled={formDisabled}
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
                     disabled={formDisabled}
                  >
                     {categoryList}
                  </select>
               </div>

               <ImageUploader
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
                  value={property.details.bathroom}
                  formDisabled={formDisabled}
               />
               <InputGroup
                  name="bedroom"
                  type="number"
                  placeholder="Bedroom Count"
                  handleChange={handleChange}
                  formError={errMsg.bedroom}
                  value={property.details.bedroom}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="carSlot"
                  type="number"
                  placeholder="Car Parking Slots"
                  handleChange={handleChange}
                  formError={errMsg.carSlot}
                  value={property.details.carSlot}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="floorArea"
                  type="text"
                  placeholder="Floor Area"
                  handleChange={handleChange}
                  formError={errMsg.floorArea}
                  value={property.details.floorArea}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="landArea"
                  type="text"
                  placeholder="Land Area"
                  handleChange={handleChange}
                  formError={errMsg.landArea}
                  value={property.details.landArea}
                  formDisabled={formDisabled}
               />

               <FormBtn formValid={formValid} isLoading={isLoading} />
            </FormWrapper>
         </Modal>
      </>
   );
};

export default PropertyAdminCard;
