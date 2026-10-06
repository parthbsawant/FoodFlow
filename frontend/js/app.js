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