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
    orderPageStats.forEach((stat, index) => {
        summaryCardsOrdersPage[index].querySelector(".summary-value").textContent = stat.value;
        summaryCardsOrdersPage[index].querySelector(".change-comparison p").textContent = stat.change;
    });
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

if(document){
    document.addEventListener("keydown", function(event){
        if(event.key == "Escape"){
            closeNewOrderModal();
        }
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


