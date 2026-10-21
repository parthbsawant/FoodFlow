// Customer Data

const defaultCustomers = [
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
    },
    {
        id: 6,
        name: "Neha Kulkarni",
        phone: "9876543215",
        email: "neha.kulkarni@example.com"
    },
    {
        id: 7,
        name: "Rohan Joshi",
        phone: "9876543216",
        email: ""
    }
];

// Menu Items Data

const defaultMenuItems = [
    {
        id: 101,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 260,
        description: "Classic cheese pizza with fresh basil",
        availability: "Available"
    },
    {
        id: 102,
        name: "Paneer Tikka",
        category: "Starters",
        price: 220,
        description: "Tandoor grilled paneer cubes",
        availability: "Available"
    },
    {
        id: 103,
        name: "Masala Dosa",
        category: "South Indian",
        price: 200,
        description: "Crispy dosa with potato masala",
        availability: "Available"
    },
    {
        id: 104,
        name: "Pav Bhaji",
        category: "Breakfast",
        price: 115,
        description: "Buttery bhaji served with two pav",
        availability: "Available"
    },
    {
        id: 105,
        name: "Veg Biryani",
        category: "Main Course",
        price: 200,
        description: "Dum cooked rice with vegetables",
        availability: "Available"
    },
    {
        id: 106,
        name: "Veg Hakka Noodles",
        category: "Chinese",
        price: 180,
        description: "",
        availability: "Available"
    },
    {
        id: 107,
        name: "Veg Manchurian",
        category: "Chinese",
        price: 190,
        description: "",
        availability: "Unavailable"
    },
    {
        id: 108,
        name: "Butter Naan",
        category: "Breads",
        price: 60,
        description: "",
        availability: "Available"
    },
    {
        id: 109,
        name: "Gulab Jamun",
        category: "Desserts",
        price: 90,
        description: "Two pieces, served warm",
        availability: "Low Stock"
    },
    {
        id: 110,
        name: "Cold Coffee",
        category: "Beverages",
        price: 120,
        description: "",
        availability: "Available"
    }
];

const menuCategories = [
    "Starters",
    "Main Course",
    "South Indian",
    "Pizza",
    "Chinese",
    "Breakfast",
    "Breads",
    "Desserts",
    "Beverages"
];

// Orders Data
const defaultOrders = [
    {
        id: 1030,
        customer: "Rahul Sharma",
        orderType: "dine-in",
        items: [
            { id: 101, name: "Margherita Pizza", price: 260, quantity: 1 },
            { id: 108, name: "Butter Naan", price: 60, quantity: 2 }
        ],
        amount: 380,
        specialInstructions: "Extra cheese",
        status: "Pending",
        createdAt: "2026-10-20T13:10:00"
    },
    {
        id: 1029,
        customer: "Neha Kulkarni",
        orderType: "take-away",
        items: [
            { id: 103, name: "Masala Dosa", price: 200, quantity: 2 },
            { id: 110, name: "Cold Coffee", price: 120, quantity: 1 }
        ],
        amount: 520,
        specialInstructions: "",
        status: "Preparing",
        createdAt: "2026-10-20T12:45:00"
    },
    {
        id: 1028,
        customer: "Priya Desai",
        orderType: "dine-in",
        items: [
            { id: 105, name: "Veg Biryani", price: 200, quantity: 1 },
            { id: 102, name: "Paneer Tikka", price: 220, quantity: 1 }
        ],
        amount: 420,
        specialInstructions: "Less spicy",
        status: "Ready",
        createdAt: "2026-10-20T12:30:00"
    },
    {
        id: 1027,
        customer: "Amit Patel",
        orderType: "take-away",
        items: [
            { id: 106, name: "Veg Hakka Noodles", price: 180, quantity: 2 },
            { id: 107, name: "Veg Manchurian", price: 190, quantity: 1 }
        ],
        amount: 550,
        specialInstructions: "",
        status: "Preparing",
        createdAt: "2026-10-20T12:15:00"
    },
    {
        id: 1026,
        customer: "Rahul Sharma",
        orderType: "dine-in",
        items: [
            { id: 104, name: "Pav Bhaji", price: 115, quantity: 2 },
            { id: 110, name: "Cold Coffee", price: 120, quantity: 2 }
        ],
        amount: 470,
        specialInstructions: "",
        status: "Completed",
        createdAt: "2026-10-19T19:40:00"
    },
    {
        id: 1025,
        customer: "Rahul Sharma",
        orderType: "dine-in",
        items: [
            { id: 101, name: "Margherita Pizza", price: 260, quantity: 2 },
            { id: 102, name: "Paneer Tikka", price: 220, quantity: 1 },
            { id: 108, name: "Butter Naan", price: 60, quantity: 1 }
        ],
        amount: 800,
        specialInstructions: "",
        status: "Completed",
        createdAt: "2026-10-18T20:05:00"
    },
    {
        id: 1024,
        customer: "Priya Desai",
        orderType: "take-away",
        items: [
            { id: 103, name: "Masala Dosa", price: 200, quantity: 1 },
            { id: 109, name: "Gulab Jamun", price: 90, quantity: 2 }
        ],
        amount: 380,
        specialInstructions: "",
        status: "Completed",
        createdAt: "2026-10-18T13:20:00"
    },
    {
        id: 1023,
        customer: "Amit Patel",
        orderType: "dine-in",
        items: [
            { id: 105, name: "Veg Biryani", price: 200, quantity: 2 },
            { id: 108, name: "Butter Naan", price: 60, quantity: 3 }
        ],
        amount: 580,
        specialInstructions: "",
        status: "Completed",
        createdAt: "2026-10-17T21:00:00"
    },
    {
        id: 1022,
        customer: "Sneha Verma",
        orderType: "dine-in",
        items: [
            { id: 104, name: "Pav Bhaji", price: 115, quantity: 1 },
            { id: 110, name: "Cold Coffee", price: 120, quantity: 1 }
        ],
        amount: 235,
        specialInstructions: "",
        status: "Completed",
        createdAt: "2026-10-17T11:30:00"
    },
    {
        id: 1021,
        customer: "Karan Mehta",
        orderType: "take-away",
        items: [
            { id: 106, name: "Veg Hakka Noodles", price: 180, quantity: 1 },
            { id: 101, name: "Margherita Pizza", price: 260, quantity: 1 }
        ],
        amount: 440,
        specialInstructions: "",
        status: "Cancelled",
        createdAt: "2026-10-16T11:10:00"
    }
];

// Browser Storage
const storageKeys = {
    customers: "foodflow-customers",
    menuItems: "foodflow-menu-items",
    orders: "foodflow-orders"
};

function loadData(key, defaultData){
    try{
        const savedData = localStorage.getItem(key);

        if(savedData){
            return JSON.parse(savedData);
        }
    }
    catch(error){
        console.log("Could not read " + key, error);
    }

    return defaultData.map(data => ({...data}));
}

function saveData(key, data){
    try{
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch(error){
        console.log("Could not save " + key, error);
    }
}

const customers = loadData(storageKeys.customers, defaultCustomers);
const menuItems = loadData(storageKeys.menuItems, defaultMenuItems);
const orders = loadData(storageKeys.orders, defaultOrders);

function saveCustomers(){
    saveData(storageKeys.customers, customers);
}

function saveMenuItems(){
    saveData(storageKeys.menuItems, menuItems);
}

function saveOrders(){
    saveData(storageKeys.orders, orders);
}

saveCustomers();
saveMenuItems();
saveOrders();
