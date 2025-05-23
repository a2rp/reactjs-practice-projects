import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";

// Styled Components
const Container = styled.div`
    background-color: #fff;
    color: #000;
    padding: 30px;
    max-width: 900px;
    margin: auto;
`;

const Main = styled.div`
    max-width: 900px;
    margin: auto;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const OutputSection = styled.div`
    margin-top: 15px;
    max-height: 200px;
    overflow-y: auto;
    /* border: 1px solid #ddd; */
    border-radius: 6px;
    padding: 10px;
`;

const SearchedItem = styled.div`
    padding: 8px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const Products = styled.div`
    margin-top: 30px;
`;

const AllProductsTitle = styled.h3`
    margin-bottom: 15px;
`;

const Product = styled.div`
    background-color: #fafafa;
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid #1976d2;
`;

const InfoRow = styled.div`
    margin-bottom: 5px;
`;

const SearchAutoComplete = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchBy, setSearchBy] = useState("Brand");
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://dummyjson.com/products?limit=10"
                );
                setProducts(response.data.products);
                setFilteredProducts(response.data.products); // Initialize with all products
            } catch (error) {
                toast.error("Failed to load products");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (searchTerm.trim().length === 0) {
            setSearchedProducts([]);
            if (isFiltered) {
                setFilteredProducts(products); // Reset to all products when search is cleared
                setIsFiltered(false);
            }
            return;
        }

        const filteredData = products.filter((product) => {
            const term = searchTerm.toLowerCase();
            if (searchBy === "Brand")
                return product.brand.toLowerCase().includes(term);
            if (searchBy === "Category")
                return product.category.toLowerCase().includes(term);
            if (searchBy === "Title")
                return product.title.toLowerCase().includes(term);
            return false;
        });

        setSearchedProducts(filteredData);
    }, [searchTerm, searchBy, products, isFiltered]);

    const handleSearchedItemClick = (product) => {
        let filterValue;
        if (searchBy === "Brand") {
            setSearchTerm(product.brand);
            filterValue = product.brand;
        }
        if (searchBy === "Category") {
            setSearchTerm(product.category);
            filterValue = product.category;
        }
        if (searchBy === "Title") {
            setSearchTerm(product.title);
            filterValue = product.title;
        }

        // Filter products based on the selected value
        const relatedProducts = products.filter((p) => {
            if (searchBy === "Brand") return p.brand === filterValue;
            if (searchBy === "Category") return p.category === filterValue;
            if (searchBy === "Title") return p.title === filterValue;
            return false;
        });

        setFilteredProducts(relatedProducts);
        setIsFiltered(true);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredProducts(products);
        setIsFiltered(false);
    };

    return (
        <Container>
            <Main>
                <Title>Search Auto Complete</Title>
                <SearchContainer>
                    <FormControl sx={{ width: "120px" }}>
                        <InputLabel id="search-by-label">Search by</InputLabel>
                        <Select
                            labelId="search-by-label"
                            value={searchBy}
                            label="Search by"
                            onChange={(e) => {
                                setSearchBy(e.target.value);
                                handleClearSearch();
                            }}
                        >
                            <MenuItem value="Brand">Brand</MenuItem>
                            <MenuItem value="Category">Category</MenuItem>
                            <MenuItem value="Title">Title</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        label="Enter search term here"
                        placeholder="Enter search term here"
                        fullWidth
                    />

                    {searchTerm.length > 0 && (
                        <Tooltip title="Clear">
                            <IconButton
                                onClick={handleClearSearch}
                                sx={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "10px",
                                }}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    <OutputSection>
                        {searchedProducts.map((item) => (
                            <SearchedItem
                                key={item.id}
                                onClick={() => handleSearchedItemClick(item)}
                            >
                                {searchBy === "Brand" && item.brand}
                                {searchBy === "Category" && item.category}
                                {searchBy === "Title" && item.title}
                            </SearchedItem>
                        ))}
                    </OutputSection>
                </SearchContainer>

                {filteredProducts.length > 0 && (
                    <Products>
                        <AllProductsTitle>
                            {isFiltered ? "Related Products" : "All Products"}
                        </AllProductsTitle>
                        {filteredProducts.map((product) => (
                            <Product key={product.id}>
                                <InfoRow>
                                    <b>Id:</b> {product.id}
                                </InfoRow>
                                <InfoRow>
                                    <b>Brand:</b> {product.brand}
                                </InfoRow>
                                <InfoRow>
                                    <b>Category:</b> {product.category}
                                </InfoRow>
                                <InfoRow>
                                    <b>Title:</b> {product.title}
                                </InfoRow>
                            </Product>
                        ))}
                    </Products>
                )}
            </Main>
        </Container>
    );
};

export default SearchAutoComplete;