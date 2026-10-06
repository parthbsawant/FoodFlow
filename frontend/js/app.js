//Dashboard
//Recent Orders Table 

const recentOrdersTable = document.querySelector('.recent-orders-section tbody');

renderRecentOrdersTable(recentOrders);

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

openOrderModalButton.addEventListener("click", function(){
    orderModal.hidden = false;
});

closeOrderModalButton.addEventListener("click", function(){
    closeOrderModal();
})

cancelOrderModalButton.addEventListener("click", function(){
    closeOrderModal();
})

orderModal.addEventListener("click", function(event){
    if(event.target === orderModal){
        closeOrderModal();
    }
});


