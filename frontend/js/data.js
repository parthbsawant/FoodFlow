// Customer Data

const customers = [
    {
        id: 1,
        name: "Rahul Sharma",
        phone: "9876543210",
        email: "rahul.sharma@example.com"
    },
    {
        id: 2,
        name: "Priya Desai",
        phone: "9876543211",
        email: "priya.desai@example.com"
    },
    {
        id: 3,
        name: "Amit Patel",
        phone: "9876543212",
        email: "amit.patel@example.com"
    },
    {
        id: 4,
        name: "Sneha Verma",
        phone: "9876543213",
        email: "sneha.verma@example.com"
    },
    {
        id: 5,
        name: "Karan Mehta",
        phone: "9876543214",
        email: "karan.mehta@example.com"
    }
];

// Menu Items Data

const menuItems = [
    {
        id: 101,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 260,
        available: true
    },
    {
        id: 102,
        name: "Paneer Tikka",
        category: "Starters",
        price: 220,
        available: true
    },
    {
        id: 103,
        name: "Masala Dosa",
        category: "South Indian",
        price: 200,
        available: true
    },
    {
        id: 104,
        name: "Pav Bhaji",
        category: "Breakfast",
        price: 115,
        available: true
    },
    {
        id: 105,
        name: "Veg Biryani",
        category: "Main Course",
        price: 200,
        available: true
    },
    {
        id: 106,
        name: "Veg Hakka Noodles",
        category: "Chinese",
        price: 180,
        available: true
    },
    {
        id: 107,
        name: "Veg Manchurian",
        category: "Chinese",
        price: 190,
        available: true
    },
    {
        id: 108,
        name: "Butter Naan",
        category: "Breads",
        price: 60,
        available: true
    }
];

// Popular Menu Items Table
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


// Orders Data
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
    }
];
