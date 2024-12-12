import React, { useEffect, useState,useCallback, useMemo } from 'react';
import { createRoot } from "react-dom/client";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    MenuModule,
    RowGroupingModule,
    SetFilterModule,
  ]);
function UsersList() {
    const [yData, setYData] = useState('');
    useEffect(() => {

    }, []);



    const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([

                {
                    field: "athlete",
                    filter: "agTextColumnFilter",
                    enableRowGroup: true,
                    enablePivot: true,
                    minWidth: 150,
                },
                { field: "age", enableRowGroup: true, enablePivot: true },
                {
                    field: "country",
                    enableRowGroup: true,
                    enablePivot: true,
                    minWidth: 125,
                },
 
                { field: "year", enableRowGroup: true, enablePivot: true },
                {
                    field: "date",
                    enableRowGroup: true,
                    enablePivot: true,
                    minWidth: 180,
                },
        { field: "sport", enableRowGroup: true, enablePivot: true, minWidth: 125 },

                { field: "gold", enableValue: true },
                { field: "silver", enableValue: true },
                { field: "bronze", enableValue: true },
                { field: "total", enableValue: true },
    ]);
    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        filter: true,
    }), []);
    const autoGroupColumnDef = useMemo(() => ({
        minWidth: 200,
    }), []);

    const onGridReady = useCallback((params) => {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);


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
                <div style={containerStyle}>
                    <div style={gridStyle} className={"ag-theme-quartz"}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            autoGroupColumnDef={autoGroupColumnDef}
                            sideBar={"columns"}
                            onGridReady={onGridReady}
                            pagination={true}  // Enable pagination
                            paginationPageSize={10}  // Set default page size (e.g., 10 rows per page)
                            domLayout='autoHeight'  // Optional: helps auto-adjust grid size based on content
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default UsersList;