//ALl Calculations Rquired : 
function completeStats(){
    const pendingOrders = orders.filter(order => order.status === "Pending").length;
    const preparingOrders = orders.filter(order => order.status === "Preparing").length;
    const readyOrders = orders.filter(order => order.status === "Ready").length;
    const completedOrders = orders.filter(order => order.status === "Completed").length;
    const cancelledOrders = orders.filter(order => order.status === "Cancelled").length;

    const totalRevenue = orders.reduce((total, order) => total + order.amount, 0);
    const totalOrders = orders.length;


    return{
        pendingOrders,
        preparingOrders,
        readyOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue,
        totalOrders
    }
}

const orderStats = completeStats();

//Dashboard
//Recent Orders Table : Dashboard
const recentOrdersTable =
    document.querySelector(".recent-orders-section tbody");

if(recentOrdersTable){
    renderRecentOrdersTable(orders);
}

function renderRecentOrdersTable(data){

    recentOrdersTable.innerHTML = "";

    for(let i = 0; i < data.length; i++){
        //
        const totalItemQuantity = Array.isArray(data[i].items) ? data[i].items.reduce((total, item) => total + item.quantity, 0) : data[i].items;
        const row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].customer}</td>
                        <td>${totalItemQuantity} Items</td>
                        <td>Rs.${data[i].amount}</td>
                        <td>
                            <span class="status-badge ${data[i].status.toLowerCase()}">
                                ${data[i].status}
                            </span>
                        </td>
                        <td>
                            <button type="button" class="edit-button">
                                Edit
                            </button>
                        </td>
                    </tr>`;

        recentOrdersTable.innerHTML += row;                
    }
}

//Popular Menu Items Table : Dashboard
const popularMenuItemsTable = document.querySelector(".popular-menu-section tbody");

if(popularMenuItemsTable){
    renderPopularMenuItemsTable(popularMenuItems);
}

function renderPopularMenuItemsTable(data){

    popularMenuItemsTable.innerHTML = "";

    for(let i = 0; i < data.length; i++){
        const row = `<tr>
                        <td>${data[i].rank}</td>
                        <td>${data[i].item}</td>
                        <td>${data[i].category}</td>
                        <td>${data[i].orders}</td>
                        <td>${data[i].revenue}</td> 
                    </tr>`
        
        popularMenuItemsTable.innerHTML += row;
    }
}

//Summary Cards Section : Dashboard
const summaryCardsDashboardPage = document.querySelectorAll(".dashboard-page .summary-card");

const dashboardStats = [
    orderStats.totalOrders,
    orderStats.totalRevenue,
    orderStats.pendingOrders,
    orderStats.completedOrders
];

if(summaryCardsDashboardPage.length > 0){
    dashboardStats.forEach((stat, index) => {
        summaryCardsDashboardPage[index].querySelector(".summary-value").textContent = stat;
    });
}

//Quick Actions Section : Add New Order Modal
const openNewOrderModalButton = document.querySelector("#new-order-quick-action");
const newOrderModalOverlay = document.querySelector(".new-order-modal-overlay");
const closeNewOrderModalButton = document.querySelector(".close-new-order");
const cancelNewOrderModalButton = document.querySelector(".cancel-new-order");

const inputNewOrderCustomerName = document.querySelector("#customer-name");
const inputNewOrderCustomerOrderType = document.querySelector("#order-type");
const inputNewOrderMenuItem = document.querySelector("#menu-item");
const inputNewOrderItemQuantity = document.querySelector("#item-quantity");
const buttonNewOrderAddItem = document.querySelector(".add-item-button");
const inputNewOrderSpecialInstructions = document.querySelector("#special-instructions");
const createOrderButton = document.querySelector(".create-new-order");
const selectedItemsList = document.querySelector(".selected-items-list");
const newOrderTotalDisplay = document.querySelector("#new-order-total");

const selectedOrderItems = [];

function updateNewOrderTotal(){
    const totalAmount = selectedOrderItems.reduce(function(total, item){
        return total + item.price * item.quantity;
    }, 0);

    newOrderTotalDisplay.textContent = `Rs. ${totalAmount}`;
}

function renderSelectedItems(){
    selectedItemsList.innerHTML = "";

    selectedOrderItems.forEach(function(item, index){
        const selectedItem = document.createElement("div");
        selectedItem.className = "selected-item";

        selectedItem.innerHTML = `
            <div class="selected-item-info">
                <p>${item.name}</p>
                <span>Rs. ${item.price} × ${item.quantity}</span>
            </div>
            <div class="selected-item-actions">
                <span class="selected-item-total">Rs. ${item.price * item.quantity}</span>
                <button type="button" class="remove-item-button" data-index="${index}" aria-label="Remove ${item.name}">×</button>
            </div>
        `;

        selectedItemsList.appendChild(selectedItem);
    });
}

if(buttonNewOrderAddItem){
    buttonNewOrderAddItem.addEventListener("click", function(){
        const newOrderMenuItem = inputNewOrderMenuItem.value;
        const newOrderItemQuantity = Number(inputNewOrderItemQuantity.value);

        const selectedMenuItem = menuItems.find(menuItem => menuItem.id === Number(newOrderMenuItem));

        if(!selectedMenuItem || newOrderItemQuantity < 1 || !Number.isInteger(newOrderItemQuantity)){
            return;
        }

        const selectedItemData = {
            id: selectedMenuItem.id,
            name: selectedMenuItem.name,
            price: selectedMenuItem.price,
            quantity: newOrderItemQuantity
        };

        selectedOrderItems.push(selectedItemData);
        updateNewOrderTotal();
        renderSelectedItems();
    });
}

if(selectedItemsList){
    selectedItemsList.addEventListener("click", function(event){
        if(event.target.classList.contains("remove-item-button")){
            const itemIndex = Number(event.target.dataset.index);
            selectedOrderItems.splice(itemIndex, 1);
            renderSelectedItems();
            updateNewOrderTotal();
        }
    });
}

if(createOrderButton){
    createOrderButton.addEventListener("click", function(){
        const newOrderCustomerName = inputNewOrderCustomerName.value;
        const newOrderCustomerOrderType = inputNewOrderCustomerOrderType.value;
        const newOrderSpecialInstructions = inputNewOrderSpecialInstructions.value;

        if(!newOrderCustomerName.trim() || selectedOrderItems.length === 0){
            return;
        }

        const newOrderTotalAmount = selectedOrderItems.reduce(function(total, item){
            return total + item.price * item.quantity;
        }, 0);

        const orderData = {
            id: orders.length ? Math.max(...orders.map(order => order.id)) + 1 : 1,
            customer: newOrderCustomerName,
            orderType: newOrderCustomerOrderType,
            items: selectedOrderItems.map(item => ({...item})),
            amount: newOrderTotalAmount,
            specialInstructions: newOrderSpecialInstructions,
            status: "Pending"
        };

        orders.push(orderData);
        renderRecentOrdersTable(orders);
        selectedOrderItems.length = 0;
        renderSelectedItems();
        closeNewOrderModal();
        updateNewOrderTotal();
    });
}

function closeNewOrderModal(){
    newOrderModalOverlay.hidden = true;
}

function openNewOrderModal(){
    newOrderModalOverlay.hidden = false;
}

if(openNewOrderModalButton){
    openNewOrderModalButton.addEventListener("click", function(){
        openNewOrderModal();
    });
}

if(closeNewOrderModalButton){
    closeNewOrderModalButton.addEventListener("click", function(){
        closeNewOrderModal();
    });
}

if(cancelNewOrderModalButton){
    cancelNewOrderModalButton.addEventListener("click", function(){
        closeNewOrderModal();
    });
}

if(newOrderModalOverlay){
    newOrderModalOverlay.addEventListener("click", function(event){
        if(event.target === newOrderModalOverlay){
            closeNewOrderModal();
        }
    });
}

document.addEventListener("keydown", function(event){
    if(newOrderModalOverlay && event.key === "Escape"){
        closeNewOrderModal();
    }
});




//Quick Actions Section : Add New Menu Item Modal
const openAddMenuItemModalButton = document.querySelector("#add-menu-quick-action");
const addMenuItemOverlay = document.querySelector("#add-menu-modal-overlay");
const closeAddMenuItemModalButton = document.querySelector(".close-add-menu");
const cancelAddmenuItemModalButton = document.querySelector(".cancel-add-menu");

const menuItemName = document.querySelector("#item-name");
const menuItemCategory = document.querySelector("#item-category");
const menuItemPrice = document.querySelector("#item-price");
const menuItemDescription = document.querySelector("#item-description");
const addMenuItemButton = document.querySelector(".add-menu-item");

if(addMenuItemButton){
    addMenuItemButton.addEventListener("click", function(){
        const itemName = menuItemName.value;
        const itemCategory = menuItemCategory.value;
        const itemPrice = Number(menuItemPrice.value);
        const itemDescription = menuItemDescription.value;

        const newMenuItemData = {
            id : menuItems.length+1,
            name : itemName,
            category : itemCategory,
            price : itemPrice,
            available: true
        }

        menuItems.push(newMenuItemData);

        closeAddMenuModal();
    })
}

function openAddMenuModal(){
    addMenuItemOverlay.hidden = false;
}

function closeAddMenuModal(){
    addMenuItemOverlay.hidden = true;
}

if(openAddMenuItemModalButton){
    openAddMenuItemModalButton.addEventListener("click", function(){
        openAddMenuModal();
    })
}

if(closeAddMenuItemModalButton){
    closeAddMenuItemModalButton.addEventListener("click", function(){
        closeAddMenuModal();
    })
}

if(cancelAddmenuItemModalButton){
    cancelAddmenuItemModalButton.addEventListener("click", function(){
        closeAddMenuModal();
    })
}

if(addMenuItemOverlay){
    addMenuItemOverlay.addEventListener("click", function(event){
        if(event.target === addMenuItemOverlay){
            closeAddMenuModal();
        }
    })
}

if(document){
    document.addEventListener("keydown", function(event){
        if(addMenuItemOverlay && event.key === "Escape"){
            closeAddMenuModal();
        }
    })
}


//Quick Actions Section : Add New Customer
const addCustomerModalOverlay = document.querySelector("#add-customer-modal-overlay");
const openAddCustomerModalButton = document.querySelector("#add-customer-quick-action");
const closeAddCustomerModalButton = document.querySelector(".close-add-customer");
const cancelAddCustomerModalButton = document.querySelector(".cancel-add-customer");

const inputNewCustomerName = document.querySelector("#new-customer-name");
const inputNewCustomerPhone = document.querySelector("#customer-phone");
const inputNewCustomerEmail = document.querySelector("#customer-email");
const addCustomerModalButton = document.querySelector(".add-customer-button");


if(addCustomerModalButton){
    addCustomerModalButton.addEventListener("click", function(){
        const customerName = inputNewCustomerName.value;
        const customerPhone = inputNewCustomerPhone.value;
        const customerEmail = inputNewCustomerEmail.value;

        const customersData = {
            id: customers.length + 1,
            name: customerName,
            phone: customerPhone,
            email: customerEmail
        }

        customers.push(customersData);


        closeAddCustomerModal();
    });
}

function openAddCustomerModal(){
    addCustomerModalOverlay.hidden = false;
}

function closeAddCustomerModal(){
    addCustomerModalOverlay.hidden = true;
}

if(openAddCustomerModalButton){
    openAddCustomerModalButton.addEventListener("click", function(){
        openAddCustomerModal();
    })
}

if(closeAddCustomerModalButton){
    closeAddCustomerModalButton.addEventListener("click", function(){
        closeAddCustomerModal();
    })
}

if(cancelAddCustomerModalButton){
    cancelAddCustomerModalButton.addEventListener("click", function(){
        closeAddCustomerModal();
    })
}

if(addCustomerModalOverlay){
    addCustomerModalOverlay.addEventListener("click", function(event){
        if(event.target === addCustomerModalOverlay){
            closeAddCustomerModal();
        }
    })
}

document.addEventListener("keydown", function(event){
    if(addCustomerModalOverlay && event.key === "Escape"){
        closeAddCustomerModal();
    }
})

//Quick Actions Section : View Orders Button
const viewAllOrdersButton = document.querySelector("#view-all-order-quick-action");

if(viewAllOrdersButton){
    viewAllOrdersButton.addEventListener("click", function(){
        window.location.href = "orders.html"
    })
}


// Add New Order Modal Functionality
const openOrderModalButton = document.getElementById("open-order-modal");
const orderModal = document.getElementById("order-modal");
const closeOrderModalButton = document.getElementById("close-order-modal");
const cancelOrderModalButton = document.getElementById("cancel-order-modal");

function closeOrderModal(){
    orderModal.hidden = true;
}

function openOrderModal(){
    orderModal.hidden = false;
}

if(openOrderModalButton){
    openOrderModalButton.addEventListener("click", function(){
        orderModal.hidden = false;
    });
}

if(closeOrderModalButton){
    closeOrderModalButton.addEventListener("click", function(){
        closeOrderModal();
    });
}

if(cancelOrderModalButton){
    cancelOrderModalButton.addEventListener("click", function(){
        closeOrderModal();
    });
}

if(orderModal){
    orderModal.addEventListener("click", function(event){
        if(event.target === orderModal){
            closeOrderModal();
        }
    });
}


//Order-Status Section : Dashboard Page
const orderStatusSectionCards = document.querySelectorAll(".order-section-card");

const orderStatusSectionValues = [
    orderStats.pendingOrders,
    orderStats.preparingOrders,
    orderStats.readyOrders,
    orderStats.completedOrders,
    orderStats.cancelledOrders
];

if(orderStatusSectionCards.length > 0){
    orderStatusSectionCards.forEach((card, index) => {
        card.querySelector(".status-count").textContent = orderStatusSectionValues[index];
    })
}

//Orders Page
//All Orders Table
const allOrdersTable = document.querySelector(".all-orders tbody");

if(allOrdersTable){
    renderAllOrdersTable(orders);
}

function renderAllOrdersTable(data){

    allOrdersTable.innerHTML = "";    

    for(let i = 0; i < data.length; i++){
        const row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].customer}</td>
                        <td>${data[i].items} Items</td>
                        <td>Rs.${data[i].amount}</td>
                        <td>
                            <span class="status-badge ${data[i].status.toLowerCase()}">
                                ${data[i].status}
                            </span>
                        </td>
                        <td>
                            <button
                                type="button"
                                class="edit-button"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>`
        
        allOrdersTable.innerHTML += row;
    }

}

//Summary Cards : Orders Page
const summaryCardsOrdersPage = document.querySelectorAll(".orders-page .summary-card");

if(summaryCardsOrdersPage.length > 0){

    const orderStatusCounts = [
        orderStats.totalOrders,
        orderStats.preparingOrders,
        orderStats.pendingOrders,
        orderStats.completedOrders
    ]

    const percentPendingOrders = ((orderStats.pendingOrders/orderStats.totalOrders) * 100);
    const percentPreparingOrders = ((orderStats.preparingOrders/orderStats.totalOrders) * 100);
    const percentCompletedOrders = ((orderStats.completedOrders/orderStats.totalOrders) * 100);

    const orderStatusPercentages = [
        100,
        percentPreparingOrders,
        percentPendingOrders,
        percentCompletedOrders
    ];

    orderStatusCounts.forEach((count, index) => {
        summaryCardsOrdersPage[index].querySelector(".summary-value").textContent = count;
        summaryCardsOrdersPage[index].querySelector(".percent-of-total").textContent = `${orderStatusPercentages[index].toFixed(2)}%`;
    })
}