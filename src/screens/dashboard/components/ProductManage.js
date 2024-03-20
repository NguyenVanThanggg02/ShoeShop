
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import AddProduct from '../../AddProduct';
import { useGetParams } from '../../hooks';
import { Dropdownz, GridForm, Inputz } from './forrm/ForrmList';
import ImportProduct from './inventory/ImportProduct';

const Header = ({ setParams }) => {
    const [filter, setFilter] = useState({ key_search: '', floor: '' })

    return (
        <>
            <div className="flex flex-wrap align-items-center justify-content-between gap-2 m-2">
                <span className="text-3xl text-900 font-bold">Products Manage</span>
            </div>
            <hr />
            <div className='m-3'>
                <GridForm setParams={setParams} filter={filter} setFilter={setFilter} className="lg:col-12">
                    <Inputz
                        value={filter.key_search}
                        placeholder="Find by name"
                        onChange={(e) => setFilter({ ...filter, key_search: e.target.value })}
                    />
                    <Dropdownz
                        value={filter.status}
                        // options={status}
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
const ProductManage = () => {
    const [first, setFirst] = useState(0);
    const [visibledDialog, setVisibledDialog] = useState(false);
    const rows = 10;
    const initParam = useGetParams()
    const [params, setParams] = useState(initParam)
    const [visible, setVisible] = useState(false);
    const onHide = () => {
        setVisible(false);
    };
    const [sampleData, setSampleData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/inventory/getAll')
            .then((resp) => resp.json())
            .then((data) => {
                setSampleData(data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [visible, visibledDialog]);
    console.log(sampleData);
    const TimeBody = (inputDate) => {

        const dateObject = new Date(inputDate);

        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };
    const formatCurrency = (value) => {
        if (value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
        return '';
    };

    const imageBodyTemplate = (product) => {
        return <img src={product.image} alt={product.image} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.price);
    };

    const ratingBodyTemplate = (product) => {
        return <Rating value={product.rating} readOnly cancel={false} />;
    };

    // const statusBodyTemplate = (product) => {
    //     return <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>;
    // };
    const handleEyeClick = (rowData) => {
        // setSelectedOrder(rowData);
        setVisible(true);
    };

    const dialogFooter = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={onHide} />
        </div>
    );
    const orderDetail = {
        "name": "Ultraboost Light",
        "image": "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/4eb226710c1d4baab6256b741b7d0be7_9366/gi%C3%A0y-ultraboost-light.jpg",
        "price": 65.00,
        "category": "Accessories",
        "unitsInStock": 10,
        "products": [
            {
                "product_id": 101,
                "product_name": "Product A",
                "quantity": 2,
                "unit_price": 30
            },
            {
                "product_id": 102,
                "product_name": "Product B",
                "quantity": 1,
                "unit_price": 50
            }
        ],
        "total_cost": 110,
        "status": "Processing",
        "payment_method": "Credit Card",


        "description": "Urgent delivery requested",
        "estimated_delivery_date": "2024-02-15T12:00:00.000Z",
        "transport_fee": 10,
        "tax": 5,
        "discount": 15
    };
    const InputForm = (props) => {
        const { label, id, placeholder, type, className, required, onChange, value = '', ...inputprop } = props

        return (
            <div className="mb-3 px-2 change-disabled">
                {label && (
                    <div className="w-full flex justify-content-between">
                        <label htmlFor={id} className="font-medium w-full">
                            {label}
                        </label>
                    </div>
                )}
                <InputText
                    id={id}
                    className={classNames(' mt-2 w-full', { 'p-invalid': required }, className)}
                    // placeholder={placeholder || (label && `Nhập ${label.toLowerCase()}`)}
                    value={value}
                    type={type}
                    style={{ minHeight: '50px' }}

                    {...inputprop}
                />
            </div>
        )
    }

    const ActionBody = (rowData) => {
        return (
            <>
                <Button
                    type="button"
                    icon="pi pi-eye"
                    className='bg-white'
                    rounded
                    outlined
                    onClick={() => handleEyeClick(rowData)}
                />
            </>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const statusBodyTemplate = (data) => {
        if (data.inventoryStatus) {
            return (
                <Tag value={data.inventoryStatus} severity={getSeverity(data)}></Tag>
            );
        } else {
            return (
                data === 'LOWSTOCK' ? (
                    <Tag className=' mt-2 w-5rem h-2rem' severity="info" value="LOWSTOCK"></Tag>
                ) : (
                    <Tag className=' mt-2 w-5rem h-2rem' severity="success" value="INSTOCK"></Tag>
                )
            );
        }
    };

    const OrderDetail = (obj) => {
        const product = obj && obj.products ? obj.products : null
        return (
            <div className="card bg-color m-4 ">
                <div class="formgrid grid m-3">
                    <div class="field col">
                        <InputForm
                            id="name"
                            value={obj.name}
                            label="Name"
                        />
                        <InputForm
                            id="imgage"
                            value={obj.image}
                            label="Image "
                        />
                        <InputForm
                            id="price "
                            value={TimeBody(obj.price)}
                            label="Price "
                        />
                        <InputForm
                            id="Category"
                            value={obj.category}
                            label="Category"
                        />

                        <div className="mb-3 px-2 change-disabled">
                            <div className="w-full flex justify-content-between">
                                <label className="font-medium w-full">
                                    Status
                                </label>
                            </div>
                            <div >
                                {statusBodyTemplate(obj.status)}
                            </div>
                        </div>
                    </div>
                    <div class="field col">
                        {/* <div>Shipping Information: {obj.shipping_info}</div> */}
                        <InputForm
                            id="description"
                            value={priceBodyTemplate(obj.description)}
                            label="Description"
                        />
                        <InputForm
                            id="Units_in_Stock"
                            value={(obj.unitsInStock)}
                            label="Units in Stock"
                        />


                        <InputForm
                            id="Reviews "
                            value={priceBodyTemplate(obj.total_cost)}
                            label="Reviews "
                        />

                    </div>
                </div>
                <hr />
                <div className="m-3 mt-2 px-2 change-disabled">
                    <div className="w-full flex justify-content-between">
                        <label className="text-4xl w-full mb-2">
                            Cart
                        </label>
                    </div>
                    <div className="w-full border-round border-solid border-1 surface-border">
                        <DataTable
                            className='m-2'
                            value={sampleData}
                            first={first}
                            rows={rows}
                            onPage={(e) => setFirst(e.first)}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            paginator
                            currentPageReportTemplate={`In total there are ${sampleData ? sampleData.length : 0} orders.`}
                        >
                            <Column field="product_id" header="Product ID"></Column>
                            <Column field="product_name" header="Product Name"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                            <Column field='unit_price' header="Unit Price" body={(rowData) => priceBodyTemplate(rowData.unit_price)} />
                            <Column header="Total Cost" body={(rowData) => priceBodyTemplate(rowData.unit_price * rowData.quantity)} />

                        </DataTable>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div className="w-full border-round border-solid border-1 surface-border">
            <Header setParams={setParams} />
            <hr />
            <Button
                onClick={() => setVisible(true)}
                icon="pi pi-plus"
                label="Add New Product"
                size="small"
                severity="info"
                raised
                type="button"
                className='m-2 ml-4'
            />
            <Button
                onClick={() => setVisibledDialog(true)}
                icon="pi pi-plus"
                label="Import Product"
                size="small"
                severity="info"
                raised
                type="button"
                className='m-2'
            />
            <DataTable
                className='m-2'
                value={sampleData}
                // header={header}
                first={first}
                rows={rows}
                onPage={(e) => setFirst(e.first)}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                paginator
                currentPageReportTemplate={`In total there are ${sampleData ? sampleData.length : 0} products.`}
            >
                <Column field="name" header="Name" style={{ minWidth: "15rem" }}></Column>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="import_price" header="Import Price" body={(rowData) => formatCurrency(rowData.import_price)}></Column>
                <Column field="export_price" header="Export Price" body={(rowData) => formatCurrency(rowData.export_price)}></Column>

                <Column field="size" header="Size"></Column>
                <Column header="Units in Stock" field="quantity"></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
                <Column header="Operation" body={ActionBody}></Column>
            </DataTable>
            {visible === true && (
                <AddProduct visible={visible} setVisible={setVisible} />
            )}
            {visibledDialog === true && (
                <ImportProduct visible={visibledDialog} setVisible={setVisibledDialog} />
            )}
        </div>
    );
}
export default ProductManage