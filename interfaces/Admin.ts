
export interface IAdminDashboard {
    orders:       Orders;
    products:     Products;
    totalClients: number;
}

interface Orders {
    total:   number;
    paid:    number;
    pending: number;
}

interface Products {
    total:        number;
    outOfStock:   number;
    lowInventory: number;
}
