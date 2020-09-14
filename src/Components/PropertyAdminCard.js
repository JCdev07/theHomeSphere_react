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
   const [propertyStatus, setPropertyStatus] = useState({
      name: property.name,
      price: property.price,
      // address: property.address,
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

   const [modalIsOpen, setIsOpen] = React.useState(false);

   // useEffect(() => {

   // }, [property]);

   const handleChange = (e) => {
      // console.log(propertyStatus);
      setPropertyStatus({
         ...propertyStatus,
         [e.target.name]: e.target.value,
      });

      if (
         propertyStatus.name.length !== 0 &&
         propertyStatus.price.length !== 0 &&
         // propertyStatus.address.length !== 0 &&
         propertyStatus.category.length !== 0 &&
         propertyStatus.images.length !== 0 &&
         propertyStatus.bathroom.length !== 0 &&
         propertyStatus.bedroom.length !== 0 &&
         propertyStatus.carSlot.length !== 0 &&
         propertyStatus.floorArea.length !== 0 &&
         propertyStatus.landArea.length !== 0 &&
         propertyStatus.coverImage.length !== 0
      ) {
         setFormValid(true);
      }
   };

   const onDropCoverImage = (image) => {
      setPropertyStatus({
         ...propertyStatus,
         coverImage: image[0],
      });

      console.log(image);
   };

   const onDropImages = (imagesArr) => {
      setPropertyStatus({
         ...propertyStatus,
         images: [...imagesArr],
      });
   };

   function openModal() {
      setIsOpen(true);
   }

   function closeModal() {
      setIsOpen(false);
      setFormDisabled(true);
   }

   const handleEditBtn = () => {
      setFormDisabled(false);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      // console.log(typeof addPropertyStatus.images);

      if (formValid) {
         let formData = new FormData();
         formData.append("name", propertyStatus.name);
         formData.append("price", propertyStatus.price);
         formData.append("category", propertyStatus.category._id);
         // formData.append("address", propertyStatus.address);
         formData.append("coverImage", propertyStatus.coverImage);
         formData.append("details.bathroom", propertyStatus.bathroom);
         formData.append("details.bedroom", propertyStatus.bedroom);
         formData.append("details.carSlot", propertyStatus.carSlot);
         formData.append("details.floorArea", propertyStatus.floorArea);
         formData.append("details.landArea", propertyStatus.landArea);

         propertyStatus.images.forEach((image) => {
            formData.append("images", image);
         });

         console.log(formData);

         fetch(
            `https://thehomesphereapi.herokuapp.com/properties/${property._id}`,
            {
               method: "PUT",
               body: formData,
               headers: {
                  Authorization: `Bearer ${localStorage["userToken"]}`,
               },
            }
         )
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

   if (isRedirect) {
      return <Redirect to={`/properties/${property._id}`} />;
   }

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
                  value={propertyStatus.name}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="price"
                  type="number"
                  placeholder="Rate Per Night"
                  handleChange={handleChange}
                  value={propertyStatus.price}
                  formDisabled={formDisabled}
               />

               {/* <InputGroup
                  name="address"
                  type="text"
                  placeholder="Address"
                  handleChange={handleChange}
                  value={propertyStatus.address}
                  formDisabled={formDisabled}
               /> */}

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
                  label={`Choose to Update Existing Cover Image`}
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
                  label={`Choose to upade ${propertyStatus.images.length} Existing Images`}
               />

               <h6>Property Details</h6>
               <InputGroup
                  name="bathroom"
                  type="number"
                  placeholder="Bathroom Count"
                  handleChange={handleChange}
                  value={propertyStatus.bathroom}
                  formDisabled={formDisabled}
               />
               <InputGroup
                  name="bedroom"
                  type="number"
                  placeholder="Bedroom Count"
                  handleChange={handleChange}
                  value={propertyStatus.bedroom}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="carSlot"
                  type="number"
                  placeholder="Car Parking Slots"
                  handleChange={handleChange}
                  value={propertyStatus.carSlot}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="floorArea"
                  type="text"
                  placeholder="Floor Area"
                  handleChange={handleChange}
                  value={propertyStatus.floorArea}
                  formDisabled={formDisabled}
               />

               <InputGroup
                  name="landArea"
                  type="text"
                  placeholder="Land Area"
                  handleChange={handleChange}
                  value={propertyStatus.landArea}
                  formDisabled={formDisabled}
               />

               <FormBtn formValid={formValid} isLoading={isLoading} />
            </FormWrapper>
         </Modal>
      </>
   );
};

export default PropertyAdminCard;
