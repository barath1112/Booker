import  { useState, useEffect } from "react";
import axios from "axios";
import "./css/Admin.css"; // Updated CSS file
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9093/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get("http://localhost:9093/api/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <><Navbar/>
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* Users Table */}
      <div className="admin-section">
        <h2 className="admin-subtitle">Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Properties Table */}
      <div className="admin-section">
        <h2 className="admin-subtitle">Properties</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Property Type</th>
              <th>Sale or Rent</th>
              <th>Price</th>
              <th>Location</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.propertyType}</td>
                <td>{property.transactionType}</td>
                <td>₹{property.price}</td>
                <td>
                  {property.location.state}, {property.location.district}, {property.location.pincode}
                </td>
                <td>{property.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></>
  );
};

export default AdminDashboard;
