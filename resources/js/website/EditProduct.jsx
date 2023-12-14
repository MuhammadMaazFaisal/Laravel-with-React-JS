import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
    const {id}  = useParams();
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
                setFormData({
                    name: response.data.product_name,
                    price: response.data.price,
                    description: response.data.description,
                });
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
                setFormData({
                    name: response.data.product_name,
                    price: response.data.price,
                    description: response.data.description,
                });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [id]);
    return (
        <>
            <form className="container-fluid" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData(
                                    (prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    })
                                );
                            }}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Price</label>
                        <input
                            type="number"
                            step={0.01}
                            className="form-control"
                            id="inputPassword4"
                            placeholder="Price"
                            name="price"
                            value={formData.price}
                            onChange={(e) => {
                                setFormData(
                                    (prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    })
                                );
                            }}
                           
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        name="description"
                        value={formData.description}
                        onChange={(e) => {
                            setFormData(
                                (prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                })
                            );
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
