import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerForm() {
  //this is all the sate inisilization for the updation and data state change and update 
  const [pan, setPan] = useState('');
  const [inputName, setInputName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [panError, setPanError] = useState('');
  const [inputNameError, setInputNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [addressLine1Error, setAddressLine1Error] = useState('');
  const [postcodeError, setPostcodeError] = useState('');

  const [loading, setLoading] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  //its use  for navigating router functinality
  const navigate = useNavigate();


  //pan validation check(using regular expresion)  function here they can check the pan number as per indian patter like the 5 character 4 number and the on character like wise format check here 
  const validatePanFormat = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };

  // check the  pan valid using Api call 
  const validatePan = async (pan) => {
    //first it will check the pan number is in the valid format if not then going to else block
    if (validatePanFormat(pan)) {
      setLoading(true);
      try {
        //HTTP POST request to the specified URL to verify the PAN number
        const response = await fetch('http://lab.pixel6.co/api/verify-pan.php', {
          method: 'POST', // its  is specified a  what method is  this like get post
          headers: {
            'Content-Type': 'application/json', // declering header indication of  what type  of  content in this  we provided
          },
          //when we send the  request we pass data as in json format so we have to chnage here pan number into json
          //and the string send to request body
          body: JSON.stringify({ panNumber: pan }),
        });
        
        //waiting for the  response and  prse to json store into data veriable
        const data = await response.json();
        setLoading(false);
        
        //here  check the the response of the sattaus  nad the  isValid property are  true if  true then proceed  or else shoeing error
        if (data.status === 'Success' && data.isValid) {
          setPanError('');
        } else {
          setPanError('This is not a valid PAN number.');
        }

        //the  catch  block handle the error witch is occure during the  Api call
      } catch (error) {
        setLoading(false);
        setPanError('Error verifying PAN');
        console.error("Error verifying PAN", error);
      }
    } else {
      setPanError('Invalid PAN format. Format should be 5 letters, 4 numbers, and 1 letter.');
    }
  };
  

  
  //this  function are  for the check the  pan validation and add error  on chane of the input
  const handleChangePan = (e) => {
    //here  we  can  retrive th value  from the input from and  store in the newpan veriable
    const newPan = e.target.value;
    setPan(newPan);//update teh state of the newpan 


    //This checks if the length of the new PAN number is not equal to 10 characters.
    if (newPan.length !== 10) {
      setPanError('PAN number must be 10 characters long.');
      return;
    }
// This checks if the new PAN number does not match the required format using the
    if (!validatePanFormat(newPan)) {
      setPanError('Invalid PAN format. Format should be 5 letters, 4 numbers, and 1 letter.');
      return;
    }

    validatePan(newPan);
  };

  const validateFullName = (name) => {
    if (!name) {
      setInputNameError('Full name is required.');
      return false;
    }
    if (name.length > 140) {
      setInputNameError('Full name cannot exceed 140 characters.');
      return false;
    }
    setInputNameError('');
    return true;
  };

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setInputName(newName);
    validateFullName(newName);
  };

  //this is for eamil validation functinality are there on input change
  //take  email string as argumnet
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//this  is the pattern for emaile the  should be this  pattern otherwise  it will  get error
    if (!email) { //emaile value  empty then show  error
      setEmailError('Email is required.');
      return false;
    }
    if (!emailPattern.test(email)) {
      setEmailError('Invalid email format.');
      return false;//indecate sum of the problem  in verfying validation failed
    }
    setEmailError('');
    return true;// to indicate email validation has passed successfully.
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };


  //this  function is for the checking the mobile number functinality on input chnage 
  const validateMobileNumber = (mobileNumber) => {
    //mobile number string as its argument
    //the the  regular expression pattern to match valid mobile numbers and pattern checks for a format starting with 91 followed by exactly 10 digits
    const mobilePattern = /^\91\d{10}$/;
    if (!mobileNumber) {
      setMobileNumberError('Mobile number is required.');
      return false;
    }

    //This checks if the mobile number does not match the regular expression 
    if (!mobilePattern.test(mobileNumber)) {
      setMobileNumberError('Invalid mobile number format. It should be in the format 91XXXXXXXXXX.');
      return false;
    }
    setMobileNumberError('');
    return true;
  };

  

  const handleChangeMobileNumber = (e) => {
    const newMobileNumber = e.target.value;
    setMobileNumber(newMobileNumber);
    validateMobileNumber(newMobileNumber);
  };


  const handleChangePostcode = (e) => {
    const newPostcode = e.target.value;
    setPostcode(newPostcode);

    //This checks if the length of the new postcode is not equal to 6 char
    if (newPostcode.length !== 6) {
        setPostcodeError(newPostcode.length === 0 ? 'Postcode is required.' : 'Postcode must be exactly 6 characters long.');
        setCity('');
        setState('');
    } else {
        // Clear the error if length is exactly 6 are there
        setPostcodeError('');
        fetchCityAndState(newPostcode);
      // call  a  function and pass the  newpostcode  value  to it
    }
  };


  //this is the function for the reset form functinality it will reset form and ther state will be empty
const resetForm = () => {
  setPan('');
  setInputName('');
  setEmail('');
  setMobileNumber('');
  setAddressLine1('');
  setAddressLine2('');
  setPostcode('');
  setCity('');
  setState('');
  setPanError('');
  setInputNameError('');
  setEmailError('');
  setMobileNumberError('');
  setAddressLine1Error('');
  setPostcodeError('');
};

  
  
  
//this function usede for fetching the city and state using the postcode serach Api
//this  fuunction takes the  argument as post code wich we will enter
  const fetchCityAndState = async (postcode) => {
    setLoading(true);
    try {
      //here we declerd teh fetch to fetching the Api data  and that store into the response
      const response = await fetch('http://lab.pixel6.co/api/get-postcode-details.php', {
        method: 'POST',//it will indicated th request is  post 
        headers: {
          'Content-Type': 'application/json',//wich contain we  hav eto pass that declered
        },
        body: JSON.stringify({ postcode }),//we have to pass data as  json so we used the json stringfy its convert our post code to string
      });

      const data = await response.json();//response store into the data veraible and  response  parce  into json format
      setLoading(false);

      //This checks if the API response indicates a successful operation. The condition checks 
      if (data.status === 'Success' && data.statusCode === 200) {
        //if the API response is successful
        // this  is  ann give us an array and sets the city name from the first element
        setCity(data.city[0].name);
        setState(data.state[0].name);
      } else {
        setCity('');
        setState('');
      }
    } catch (error) {
      setLoading(false);
      setCity('');
      setState('');
      console.error("Error fetching city and state", error);
    }
  };

  // this is the function wich is  handling the form submition
  const handleSubmit = (e) => {
    e.preventDefault();//  its preventing the behaviour of the  for  refresing and all that things

    let isValid = true; // crete the  verable  witch is track the overall validitry of the from inputs

    // its check the input is empty or not if its  then it will show error
    if (!pan) {
      setPanError('PAN number is required.');
      isValid = false;
    }

    if (!validateFullName(inputName)) {
      isValid = false;
    }

    if (!validateEmail(email)) {
      isValid = false;
    }

    if (!validateMobileNumber(mobileNumber)) {
      isValid = false;
    }

    if (!addressLine1) {
      setAddressLine1Error('Address Line 1 is required.');
      isValid = false;
    } else {
      setAddressLine1Error('');
    }

    

    if (!postcode) {
      setPostcodeError('Postcode is required.');
      isValid = false;
    }

    if (panError || emailError || mobileNumberError || inputNameError || addressLine1Error || postcodeError) {
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Retrieve the existing records from local storage 
    const existingRecords = JSON.parse(localStorage.getItem('customerRecords')) || [];

    // Add new record into the array
    const newRecord = { pan, inputName, email, mobileNumber, addressLine1, addressLine2, postcode, city, state };
    existingRecords.push(newRecord);

    // Store the record and updated records in local storage
    localStorage.setItem('customerRecords', JSON.stringify(existingRecords));//converting array into  json string

    // redirect to the to the customer list 
    navigate('/customer-list', { state: newRecord });
  };

  const handleChangeAddressLine1 = (e) => {
    setAddressLine1(e.target.value);
  };

  const handleChangeAddressLine2 = (e) => {
    setAddressLine2(e.target.value);
  };

 

  return (
    //the form functinality start hear
    <div className="container p-4 rounded-5 w-25 mx-auto shadow-lg border border-dark custom-bacgraound">
      <form className='custom-from' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">PAN Number <span className="required-asterisk">*</span></label>
          <input
            className="form-control border border-dark "
            type="text"
            placeholder="Enter PAN Number"
            value={pan}
            onChange={handleChangePan}
          />
          {loading && <span>Loading...</span>}
          {panError && <span style={{ color: 'red' ,fontSize: '15px'}}>{panError}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name <span className="required-asterisk">*</span></label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="Enter Full Name"
            value={inputName}
            onChange={handleChangeName}
          />
          {inputNameError && <span style={{ color: 'red' ,fontSize: '15px'}}>{inputNameError}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email <span className="required-asterisk">*</span></label>
          <input
            className="form-control border border-dark"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChangeEmail}
          />
          {emailError && <span style={{ color: 'red' ,fontSize: '15px'}}>{emailError}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile Number <span className="required-asterisk">*</span></label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="+91 Mobile Number"
            value={mobileNumber}
            onChange={handleChangeMobileNumber}
          />
          {mobileNumberError && <span style={{ color: 'red' ,fontSize: '15px' }}>{mobileNumberError}</span>}
          </div>
        <div className="mb-3">
          <label className="form-label">Address Line 1 <span className="required-asterisk">*</span></label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="Enter Address Line 1"
            value={addressLine1}
            onChange={handleChangeAddressLine1}
            />
            {addressLine1Error && <span style={{ color: 'red',fontSize: '15px'  }}>{addressLine1Error}</span>}

        </div>
        <div className="mb-3">
          <label className="form-label">Address Line 2</label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="Enter Address Line 2 (optional)"
            value={addressLine2}
            onChange={handleChangeAddressLine2}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Postcode <span className="required-asterisk">*</span></label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="Postcode"
            value={postcode}
            onChange={handleChangePostcode}
          />
      {postcodeError && <span style={{ color: 'red' ,fontSize: '15px'}}>{postcodeError}</span>}

        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="State"
            value={state}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            className="form-control border border-dark"
            type="text"
            placeholder="City"
            value={city}
            readOnly
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
  <button type="submit" className="btn btn-primary" disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
  <button 
    type="button" 
    className="btn btn-warning ms-3"
    onClick={resetForm}
  >
    Reset
  </button>
</div>

      </form>
    </div>
  );
}
