//Dashboard
//Recent Orders Table : Dashboard

const recentOrdersTable =
    document.querySelector(".recent-orders-section tbody");

if(recentOrdersTable){
    renderRecentOrdersTable(recentOrders);
}

function renderRecentOrdersTable(data){

    recentOrdersTable.innerHTML = "";

    for(let i = 0; i < data.length; i++){
        const row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].customer}</td>
                        <td>${data[i].items}</td>
                        <td>${data[i].amount}</td>
                        <td>
                            <span class="status-badge ${data[i].status.toLowerCase()}">${data[i].status}</span>
                        </td>
                        <td>${data[i].time}</td> 
                        <td>
                            <button type="button" class="edit-button">
                                Edit 
                            </button>
                        </td>
                    </tr>`

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

if(summaryCardsDashboardPage.length > 0){
    dashboardStats.forEach((stat, index) => {
        summaryCardsDashboardPage[index].querySelector(".summary-value").textContent = stat.value;
        summaryCardsDashboardPage[index].querySelector(".change-comparison p").textContent = stat.change;
    });
}


// Orders Page 
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
    const pendingOrders = orders.filter(order => order.status === "Pending").length;
    const preparingOrders = orders.filter(order => order.status === "Preparing").length;
    const readyOrders = orders.filter(order => order.status === "Ready").length;
    const completedOrders = orders.filter(order => order.status === "Completed").length;
    const totalOrders = orders.length;

    const orderStatusCounts = [
        totalOrders,
        preparingOrders,
        pendingOrders,
        completedOrders
    ]

    const percentPendingOrders = ((pendingOrders/totalOrders) * 100);
    const percentPreparingOrders = ((preparingOrders/totalOrders) * 100);
    const percentCompletedOrders = ((completedOrders/totalOrders) * 100);

    const orderStatusPercentages = [
        100,
        percentPreparingOrders,
        percentPendingOrders,
        percentCompletedOrders
    ];

    orderStatusCounts.forEach((count, index) => {
        summaryCardsOrdersPage[index].querySelector(".summary-value").textContent = count;
        summaryCardsOrdersPage[index].querySelector(".percent-of-total").textContent = `${orderStatusPercentages[index]}%`;
    })
}



//Quick Actions Section : Add New Order Modal

const openNewOrderModalButton = document.querySelector("#new-order-quick-action");
const newOrderModalOverlay = document.querySelector(".new-order-modal-overlay");
const closeNewOrderModalButton = document.querySelector(".close-new-order");
const cancelNewOrderModalButton = document.querySelector(".cancel-new-order");

function closeNewOrderModal(){
    newOrderModalOverlay.hidden = true;
}

function openNewOrderModal(){
    newOrderModalOverlay.hidden = false;
}

if(openNewOrderModalButton){
    openNewOrderModalButton.addEventListener("click", function(){
        openNewOrderModal();
    })
}

if(closeNewOrderModalButton){
    closeNewOrderModalButton.addEventListener("click", function(){
        closeNewOrderModal();
    })
}

if(cancelNewOrderModalButton){
    cancelNewOrderModalButton.addEventListener("click", function(){
        closeNewOrderModal();
    })
}

if(newOrderModalOverlay){
    newOrderModalOverlay.addEventListener("click", function(event){
        if(event.target === newOrderModalOverlay){
            closeNewOrderModal();
        }
    })
}

document.addEventListener("keydown", function(event){
    if(newOrderModalOverlay && event.key == "Escape"){
        closeNewOrderModal();
    }
})

//Quick Actions Section : Add New Menu Item Modal

const openAddMenuItemModalButton = document.querySelector("#add-menu-quick-action");
const addMenuItemOverlay = document.querySelector("#add-menu-modal-overlay");
const closeAddMenuItemModalButton = document.querySelector(".close-add-menu");
const cancelAddmenuItemModalButton = document.querySelector(".cancel-add-menu")

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



