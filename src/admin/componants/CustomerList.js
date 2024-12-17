import React, { useEffect, useState, useMemo, useRef } from 'react';
import { AgGridReact } from "@ag-grid-community/react";
import { Toast } from '../../ToasterService.js';
import { admin_logged_data } from '../../Configuration';
import { admin_post_data } from '../../ApiServices.js';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    MenuModule,
    RowGroupingModule,
    SetFilterModule,
    ExcelExportModule
]);

function CustomerList() {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    
    const gridApi = useRef(null);
    const gridColumnApi = useRef(null);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        filter: true,
    }), []);

    const autoGroupColumnDef = useMemo(() => ({
        minWidth: 200,
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await admin_post_data('/admin/CustomerList', { "list_type": "pending" }, admin_logged_data());
                const data = JSON.parse(response.data);

                if (data.status) {
                    const fetchedData = data.result;

                    setRowData(fetchedData);

                    if (fetchedData.length > 0) {
                        const dynamicColumns = Object.keys(fetchedData[0]).map((key) => ({
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            field: key,
                            filter: 'agTextColumnFilter',
                        }));

                        setColumnDefs(dynamicColumns);
                    }
                } else {
                    Toast(2, data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                Toast(2, error?.response?.data?.error || 'An error occurred');
            }
        };

        fetchData();
    }, []);

    const onGridReady = (params) => {
        gridApi.current = params.api;
        gridColumnApi.current = params.columnApi;

        if (gridColumnApi.current) {
            setTimeout(() => {
                autoSizeAllColumns();
            }, 0);
        }
    };

    const autoSizeAllColumns = () => {
        if (gridColumnApi.current) {
            const allColumns = gridColumnApi.current.getAllColumns();
            if (allColumns && gridApi.current) {
                gridApi.current.autoSizeColumns(allColumns);
            }
        }
    };

    const onExportToExcel = () => {
        if (gridApi.current) {
            gridApi.current.exportDataAsExcel({
                allColumns: true,
                fileName: 'CustomerList.xlsx',
            });
        } 
    };

    return (
        <>
            <div className="pagetitle">
                <h1>User List</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>

            <section className="section dashboard">
                <div style={{ width: "100%", height: "100vh" }}>
                    <div style={{ height: "100%", width: "100%" }} className={"ag-theme-quartz"}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            autoGroupColumnDef={autoGroupColumnDef}
                            sideBar={"columns"}
                            pagination={true}
                            paginationPageSize={10}
                            domLayout='autoHeight'
                            onGridReady={onGridReady}
                        />
                    </div>
                </div>
            </section>

            <div style={{ marginTop: '20px' }}>
                <button onClick={autoSizeAllColumns} className="btn btn-primary">Auto Size Columns</button>
                <button onClick={onExportToExcel} className="btn btn-success">Export to Excel</button>
            </div>
        </>
    );
}

export default CustomerList;
