import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function CreateShippingAddress() {
  const navigate = useNavigate();

  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    division: "",
    district: "",
    upazila: "",
    full_address: "",
    postal_code: "",
    label: "Home",
  });

  const getDivision = async () => {
    try {
      const res = await api.get("/division/");
      setDivision(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDistrict = async (divisionId) => {
    try {
      const res = await api.get(`/district/?division=${divisionId}`);
      setDistrict(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUpazila = async (districtId) => {
    try {
      const res = await api.get(`/upazila/?district=${districtId}`);
      setUpazila(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDivision();
  }, []);

  useEffect(() => {
    if (formData.division) {
      getDistrict(formData.division);
    } else {
      setDistrict([]);
      setUpazila([]);
    }
  }, [formData.division]);

  useEffect(() => {
    if (formData.district) {
      getUpazila(formData.district);
    } else {
      setUpazila([]);
    }
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "division") {
      setFormData((prev) => ({
        ...prev,
        division: value,
        district: "",
        upazila: "",
      }));
    }

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        upazila: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("shipping-address/", formData);

      alert("Address added successfully.");

      navigate("/checkout");
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to create address.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Add Shipping Address
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-5"
      >
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        {/* Division */}
        <select
          name="division"
          value={formData.division}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">Select Division</option>

          {division.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">Select District</option>

          {district.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">Select Upazila</option>

          {upazila.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Label */}
        <select
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="border p-3 rounded"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="full_address"
          value={formData.full_address}
          onChange={handleChange}
          placeholder="Full Address"
          rows="4"
          className="border p-3 rounded md:col-span-2"
          required
        />

        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={formData.postal_code}
          onChange={handleChange}
          className="border p-3 rounded md:col-span-2"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded md:col-span-2"
        >
          {isLoading ? "Saving..." : "Save Address"}
        </button>
      </form>
    </div>
  );
}