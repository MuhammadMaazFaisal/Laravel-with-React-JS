import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home(props) {
    const [products, setProducts] = useState([]);
    const handleDelete = (id) => {
        return (e) => {
            e.preventDefault();
            axios
                .delete(`/api/products/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setProducts(products.filter((product) => product.id !== id));
                })
                .catch((error) => {
                    console.error("Error deleting data: ", error);
                });
        };
    };
    useEffect(() => {
        console.log("useEffect called");
        axios
            .get("/api/products")
            .then((response) => {
              console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount Price</th>
                        <th scope="col">Short Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.product_name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.discount_price ? product.discount_price : "N/A"}</td>
                                    <td>{product.short_description}</td>
                                    <td>
                                        <a href={`/products/${product.id}/edit`} className="btn btn-primary">Edit</a>
                                        <a onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</a>

                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    );
}
