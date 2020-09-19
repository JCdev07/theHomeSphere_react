import React, { useState } from "react";
import Modal from "react-modal";
import ModalPropertyToggler from "./SubComponents/ModalPropertyToggler";
import LinkToSingleProp from "./SubComponents/LinkToSingleProp";
import CloseButton from "./SubComponents/CloseButton";
import EditButton from "./SubComponents/EditButton";
import FormBtn from "./SubComponents/FormBtn";
import InputGroup from "./SubComponents/InputGroup";
import ImageUploader from "react-images-upload";
import { useToasts } from "react-toast-notifications";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import DeleteButton from "./SubComponents/DeleteButton";

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

const ImgForm = styled.img`
   height: 300px;
   border-radius: 8px;
`;

const FormWrapper = styled.form`
   text-align: center;
   margin-top: 2rem;
   & input,
   button {
      width: 50%;
      border-radius: 120px;
      margin: auto;
   }

   /* & img {
      width: 100%;
      height: 100%;
   } */

   & .fileContainer {
      box-shadow: none;
   }

   & button.chooseFileButton {
      background: #330066;
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
         color: #330066;
         background-color: #fff;
         border: 2px solid #330066;
      }
   }
   & button {
      background-color: #330066;
      color: #fff;
      border: 2px solid #fff;
      font-weight: 600;
      width: 100%;
      margin-top: 1em;
      padding: 8px 0px;
      font-size: 1em;
      font-weight: lighter;
      letter-spacing: 1px;
      margin-bottom: 0.25em;
      transition: all 0.3s ease;
      border-radius: 120px;

      &:hover {
         color: #330066;
         background-color: #fff;
         border: 2px solid #330066;
      }

      &:disabled,
      &[disabled] {
         border: 1px solid #7851a9;
         background-color: #7851a9;
      }
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

   const [deletePropRedirect, setDeletePropRedirect] = useState(false);

   const [formDisabled, setFormDisabled] = useState(true);

   const [modalIsOpen, setIsOpen] = React.useState(false);

   // useEffect(() => {

   // }, [property]);

   const handleChange = (e) => {
      // console.log();
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

   const handleDeleteBtn = () => {
      fetch(
         `https://thehomesphereapi.herokuapp.com/properties/${property._id}`,
         {
            method: "delete",
            headers: {
               Authorization: `Bearer ${localStorage["userToken"]}`,
            },
         }
      )
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setDeletePropRedirect(true);
         });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);

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

   if (deletePropRedirect) {
      return <Redirect to={`/property-control`} />;
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
            <div className="d-flex justify-content-between align-items-center">
               <CloseButton onClick={closeModal} />
               <EditButton handleClick={handleEditBtn} />
               <DeleteButton handleClick={handleDeleteBtn} />
               <LinkToSingleProp link={`/properties/${property._id}`} />
            </div>
            <div className="col-12 mx-auto text-center">
               <ImgForm
                  src={`https://thehomesphereapi.herokuapp.com/${property.coverImage}`}
                  alt=""
               />
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

               <div className="input-group w-50 mx-auto mt-4">
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

               <div className="col-12 mx-auto w-50">
                  <FormBtn formValid={formValid} isLoading={isLoading} />
               </div>
            </FormWrapper>
         </Modal>
      </>
   );
};

export default PropertyAdminCard;
