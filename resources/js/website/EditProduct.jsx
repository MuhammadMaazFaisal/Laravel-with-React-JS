import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`/api/products/${id}`, formData)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });
    };
    useEffect(() => {
        axios
            .get(`/api/products/${id}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
                setFormData({
                    name: response.data.product_name,
                    price: response.data.price,
                    description: response.data.description,
                });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);
    return (
        <>
            <form className="container-fluid" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Name"
                            name="name"
                            value={product.product_name}
                            onChange={(e) => {
                                setProduct({
                                    product_name: e.target.value,
                                });
                                setFormData({
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">Price</label>
                        <input
                            type="number"
                            step={0.01}
                            className="form-control"
                            id="inputPassword4"
                            placeholder="Price"
                            name="price"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    price: e.target.value,
                                });
                                setFormData({
                                    price: e.target.value,
                                });
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputAddress">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        name="description"
                        value={product.description}
                        onChange={(e) => {
                            setProduct({
                                description: e.target.value,
                            });
                            setFormData({
                                description: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="row justify-content-end">
                    <button
                        type="submit"
                        className="col-md-2 mx-2 btn btn-primary"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    );
}
