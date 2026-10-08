// Recent Orders Table : Dashbaord
const recentOrders = [
    {
        id: 1025,
        customer: "Rahul Sharma",
        items: 3,
        amount: 745,
        status: "Preparing",
        time: "12:30 PM"
    },
    {
        id: 1024,
        customer: "Priya Desai",
        items: 2,
        amount: 420,
        status: "Pending",
        time: "12:15 PM"
    },
    {
        id: 1023,
        customer: "Amit Patel",
        items: 4,
        amount: 980,
        status: "Ready",
        time: "11:50 AM"
    },
    {
        id: 1022,
        customer: "Sneha Verma",
        items: 1,
        amount: 280,
        status: "Completed",
        time: "11:30 AM"
    },
    {
        id: 1021,
        customer: "Karan Mehta",
        items: 3,
        amount: 650,
        status: "Completed",
        time: "11:10 AM"
    }
];

//Popular Menu Items Table : Dashboard 
const popularMenuItems = [
    {
        rank: 1,
        item: "Masala Dosa",
        category: "South Indian",
        orders: 100,
        revenue: 20000
    },
    {
        rank: 2,
        item: "Pav Bhaji",
        category: "Breakfast",
        orders: 200,
        revenue: 23000
    },
    {
        rank: 3,
        item: "Paneer Tikka",
        category: "Starters",
        orders: 42,
        revenue: 8400
    },
    {
        rank: 4,
        item: "Veg Biryani",
        category: "Main Course",
        orders: 38,
        revenue: 7600
    }
];

//Summary Cards Section : Dashboard
const dashboardStats = [
    {
        id: "total-orders",
        title: "Total Orders",
        value: 48,
        change: "12%",
        comparison: "Yesterday"
    },
    {
        id: "total-revenue",
        title: "Today's Revenue",
        value: 18450,
        change: "8%",
        comparison: "Yesterday"
    },
    {
        id: "pending-orders",
        title: "Pending Orders",
        value: 12,
        change: "20%",
        comparison: "Yesterday"
    },
    {
        id: "completed-orders",
        title: "Completed Orders",
        value: 36,
        change: "10%",
        comparison: "Yesterday"
    }
];


// All Orders Table : Orders Page

const orders = [
    {
        id: 1025,
        customer: "Rahul Sharma",
        items: 3,
        amount: 745,
        status: "Preparing"
    },
    {
        id: 1024,
        customer: "Priya Desai",
        items: 2,
        amount: 420,
        status: "Pending"
    },
    {
        id: 1023,
        customer: "Amit Patel",
        items: 4,
        amount: 980,
        status: "Ready"
    },
    {
        id: 1022,
        customer: "Sneha Verma",
        items: 1,
        amount: 280,
        status: "Completed"
    },
    {
        id: 1021,
        customer: "Karan Mehta",
        items: 3,
        amount: 650,
        status: "Cancelled"
    },
    {
        id: 10321,
        customer: "Peter Shinde",
        items: 5234,
        amount: 61331450,
        status: "Cancelled"
    }
];

//Order Page : Order Stats Data
// const orderPageStats = [
//     {
//         title: "Total Orders",
//         value: 48,
//         change: 12
//     },
//     {
//         title: "Preparing Orders",
//         value: 10,
//         change: 8
//     },
//     {
//         title: "Pending Orders",
//         value: 12,
//         change: 20
//     },
//     {
//         title: "Completed Orders",
//         value: 36,
//         change: 10
//     }
// ];