import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CustomerList() {
  // const location = useLocation();
  const navigate = useNavigate();// redirecting on component to another
  const [records, setRecords] = useState([]); // empty array to hold the records
  const [editingIndex, setEditingIndex] = useState(null);//track which record is edited
  const [editRecord, setEditRecord] = useState(null);//o store the details of the record  edited

  const handleBackClick = () => {
    navigate('/'); // back to the  form page
  };

  useEffect(() => {
    // Retrieve records from local storage parce  into json
    const storedRecords = JSON.parse(localStorage.getItem('customerRecords')) || [];
    setRecords(storedRecords);
  }, []);

  const handleDelete = (index) => {
    // Remove the record at the specific index
    const updatedRecords = records.filter((_, i) => i !== index);

    // Update local storage with the new records
    localStorage.setItem('customerRecords', JSON.stringify(updatedRecords));

    // Update the state
    setRecords(updatedRecords);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditRecord({ ...records[index] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedRecords = records.map((record, index) =>
      index === editingIndex ? editRecord : record
    );

    // Update local storage with the new records value
    localStorage.setItem('customerRecords', JSON.stringify(updatedRecords));

    // here is Update the state
    setRecords(updatedRecords);
    setEditingIndex(null);
    setEditRecord(null);
  };

  return (
    <div className="container mt-4 table-container">
    
      <div className="bg-dark text-white text-center py-3 mb-4 rounded">
        <h1>Customer List </h1>
        <button onClick={handleBackClick} type="button" className="btn btn-primary btn-lg custom-button">Back</button>
      </div>
      {/* this  table is conditionaly render  */}

      {records.length > 0 ? (
        <table className="table table-dark table-striped table-bordered">
          <thead>
            <tr>
              <th>Index</th>
              <th>PAN Number</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>Postcode</th>
              <th>City</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="pan"
                      value={editRecord.pan}
                      onChange={handleChange}
                      className="form-control"
                      readOnly
                    />
                  ) : (
                    record.pan
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="inputName"
                      value={editRecord.inputName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.inputName
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="email"
                      value={editRecord.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.email
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="mobileNumber"
                      value={editRecord.mobileNumber}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.mobileNumber
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="addressLine1"
                      value={editRecord.addressLine1}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.addressLine1
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="addressLine2"
                      value={editRecord.addressLine2}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.addressLine2
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="postcode"
                      value={editRecord.postcode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.postcode
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="city"
                      value={editRecord.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.city
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="state"
                      value={editRecord.state}
                      onChange={handleChange}
                      className="form-control"
                    />
                  ) : (
                    record.state
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button
                      onClick={handleSave}
                      className="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <div className="d-flex">
                      <button
                        onClick={() => handleEdit(index)}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No data available</p>
      )}
    </div>
  );
}
