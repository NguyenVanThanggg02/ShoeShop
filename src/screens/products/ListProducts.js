import axios from 'axios';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Image } from "primereact/image";
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdownz, GridForm, Inputz } from '../dashboard/components/forrm/ForrmList';
import { useGetParams } from '../hooks';

const Header = ({ setParams }) => {
    const [filter, setFilter] = useState({ key_search: '', floor: '' })
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9999/brands/listBrand')
            .then(response => setBrands(response.data))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    return (
        <>
            <div className='m-3'>
                <GridForm setParams={setParams} filter={filter} setFilter={setFilter} className="lg:col-12">
                    <Inputz
                        value={filter.key_search}
                        placeholder="Find by name"
                        onChange={(e) => setFilter({ ...filter, key_search: e.target.value })}
                    />
                    <Dropdownz
                        value={filter.status}
                        options={brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        placeholder="Status"
                    />
                    <Dropdownz
                        value={filter.status}
                        // options={status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        placeholder="Category"
                    />
                    <Dropdownz
                        value={filter.status}
                        // options={status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        placeholder="Reviews"
                    />
                </GridForm>
            </div>
        </>
    )
}
const ListProducts = () => {
    const initParam = useGetParams()
    const [params, setParams] = useState(initParam)
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:9999/products')
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
    }, []);

    const items = [
        { label: "Products" },
    ];
    const home = { icon: "pi pi-home", url: "http://localhost:3000/" };
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState(12);
    const [first, setFirst] = useState(0);
    const productsOnPage = products.slice(first, first + rows);
    const totalRecords = products.length;
    const onPageChange = (event) => {
        setFirst(event.first);
        setCurrentPage(event.page + 1);
    };
    const renderProducts = () => {
        return productsOnPage.map((p) => {
            return (
                <div key={p.id} className="col-3 flex align-items-center justify-content-center">
                    <div className="m-2 border-round-md">
                        <Image
                            className="border-round-md"
                            src={p.images[0].url}
                            alt="Image"
                            width="280"
                            preview
                        />
                        <Link to={`/detail/${p._id}`} style={{ textDecoration: "none" }}>
                            <div className="font-bold text-base" style={{ color: "black" }}>{p.name}</div>
                            <div className="text-xl text-red-400 inline-block font-bold">{(p.price) * 0.5}$</div>{" "}
                            <span className="line-through text-base text-color inline-block">{p.price}$</span>{" "}
                        </Link>

                    </div>
                </div>
            );
        });
    };
    return (
        <div
            className="container"
            style={{ paddingTop: "15px", paddingBottom: "20px" }}
        >
            <div className="m-2 w-full">
                <BreadCrumb model={items} home={home} />
            </div>
            <div>
                <Header setParams={setParams} />
            </div>
            <hr />
            <div className="grid mt-2 surface-ground p-3 surface-0 shadow-2">
                {renderProducts()}
            </div>
            <div className="p-mt-2">
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={totalRecords}
                    onPageChange={onPageChange}
                    className="p-mt-2"
                    currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} products`}
                />
            </div>
        </div>
    )
}

export default ListProducts
