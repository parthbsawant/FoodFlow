//Helpers
function formatPrice(amount){
    return `Rs. ${Number(amount).toLocaleString("en-IN")}`;
}

function escapeHTML(text){
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function getTotalItemQuantity(order){
    if(Array.isArray(order.items)){
        return order.items.reduce((total, item) => total + item.quantity, 0);
    }

    return order.items;
}

function getSortedOrders(){
    return [...orders].sort((a, b) => b.id - a.id);
}

function getNextId(data, startId){
    return data.length ? Math.max(...data.map(item => item.id)) + 1 : startId;
}

function getPercent(value, total){
    if(!total){
        return 0;
    }

    return (value / total) * 100;
}

function getInitials(name){
    return name
        .trim()
        .split(" ")
        .filter(word => word)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join("");
}

function formatDateTime(date){
    if(!date){
        return "-";
    }

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function showToast(message){
    let toast = document.querySelector(".toast");

    if(!toast){
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.innerHTML = icon("check") + escapeHTML(message);
    toast.classList.add("show");

    clearTimeout(toast.timer);
    toast.timer = setTimeout(function(){
        toast.classList.remove("show");
    }, 2500);
}

function showFieldError(input){
    input.classList.add("input-error");
    input.focus();
}

function clearFieldError(event){
    if(event.target.classList && event.target.classList.contains("input-error")){
        event.target.classList.remove("input-error");
    }
}

document.addEventListener("input", clearFieldError);
document.addEventListener("change", clearFieldError);

function getAllCategories(){
    const categories = [...menuCategories];

    menuItems.forEach(function(item){
        if(!categories.includes(item.category)){
            categories.push(item.category);
        }
    });

    return categories;
}

function getMenuItemStats(){
    const itemStats = {};

    orders.forEach(function(order){
        if(order.status === "Cancelled" || !Array.isArray(order.items)){
            return;
        }

        order.items.forEach(function(item){
            if(!itemStats[item.id]){
                itemStats[item.id] = {
                    name: item.name,
                    orders: 0,
                    revenue: 0
                };
            }

            itemStats[item.id].orders += item.quantity;
            itemStats[item.id].revenue += item.price * item.quantity;
        });
    });

    return itemStats;
}

//ALl Calculations Rquired :
function completeStats(){
    const pendingOrders = orders.filter(order => order.status === "Pending").length;
    const preparingOrders = orders.filter(order => order.status === "Preparing").length;
    const readyOrders = orders.filter(order => order.status === "Ready").length;
    const completedOrders = orders.filter(order => order.status === "Completed").length;
    const cancelledOrders = orders.filter(order => order.status === "Cancelled").length;

    const validOrders = orders.filter(order => order.status !== "Cancelled");
    const totalRevenue = validOrders.reduce((total, order) => total + order.amount, 0);
    const totalOrders = orders.length;

    const today = new Date().toDateString();
    const todayOrders = orders.filter(order => order.createdAt && new Date(order.createdAt).toDateString() === today).length;

    const averageOrderValue = validOrders.length ? Math.round(totalRevenue / validOrders.length) : 0;

    return{
        pendingOrders,
        preparingOrders,
        readyOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue,
        totalOrders,
        todayOrders,
        averageOrderValue
    }
}

//Dashboard
//Greeting : Dashboard
const greetingText = document.querySelector("#greeting-text");

if(greetingText){
    const currentHour = new Date().getHours();
    let greeting = "Good evening";

    if(currentHour < 12){
        greeting = "Good morning";
    }
    else if(currentHour < 17){
        greeting = "Good afternoon";
    }

    greetingText.textContent = `${greeting}, Parth!`;
}

//Recent Orders Table : Dashboard
const recentOrdersTable = document.querySelector(".recent-orders-section tbody");

function renderRecentOrdersTable(data) {
    if (!recentOrdersTable) {
        return;
    }

    recentOrdersTable.innerHTML = "";

    if(data.length === 0){
        recentOrdersTable.innerHTML = `<tr><td colspan="6" class="empty-row">No orders yet</td></tr>`;
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
            <td class="cell-strong">#${data[i].id}</td>
            <td>${escapeHTML(data[i].customer)}</td>
            <td class="cell-muted">${getTotalItemQuantity(data[i])} Items</td>
            <td class="cell-strong cell-number">${formatPrice(data[i].amount)}</td>
            <td>
                <span class="badge badge-dot badge-${data[i].status.toLowerCase()}">${data[i].status}</span>
            </td>
            <td>
                <button type="button" class="btn btn-secondary btn-sm edit-button" data-order-id="${data[i].id}">
                    ${icon("edit")}Edit
                </button>
            </td>
        </tr>`;

        recentOrdersTable.innerHTML += row;
    }
}

//Popular Menu Items Table : Dashboard
const popularMenuItemsTable = document.querySelector(".popular-menu-section tbody");

function getPopularMenuItems(){
    const itemStats = getMenuItemStats();

    return Object.keys(itemStats)
        .map(function(itemId){
            const menuItem = menuItems.find(item => item.id === Number(itemId));

            return {
                item: menuItem ? menuItem.name : itemStats[itemId].name,
                category: menuItem ? menuItem.category : "-",
                orders: itemStats[itemId].orders,
                revenue: itemStats[itemId].revenue
            }
        })
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 5);
}

function renderPopularMenuItemsTable(data){
    if(!popularMenuItemsTable){
        return;
    }

    popularMenuItemsTable.innerHTML = "";

    if(data.length === 0){
        popularMenuItemsTable.innerHTML = `<tr><td colspan="5" class="empty-row">No items ordered yet</td></tr>`;
        return;
    }

    for(let i = 0; i < data.length; i++){
        const row = `<tr>
                        <td class="cell-muted">${i + 1}</td>
                        <td class="cell-strong">${escapeHTML(data[i].item)}</td>
                        <td class="cell-muted">${escapeHTML(data[i].category)}</td>
                        <td class="cell-number">${data[i].orders}</td>
                        <td class="cell-strong cell-number">${formatPrice(data[i].revenue)}</td>
                    </tr>`

        popularMenuItemsTable.innerHTML += row;
    }
}

//Summary Cards Section : Dashboard
const summaryCardsDashboardPage = document.querySelectorAll(".dashboard-page .stat-card");

function renderDashboardSummary(){
    if(summaryCardsDashboardPage.length === 0){
        return;
    }

    const orderStats = completeStats();

    const dashboardStats = [
        orderStats.totalOrders,
        formatPrice(orderStats.totalRevenue),
        orderStats.pendingOrders,
        orderStats.completedOrders
    ];

    const dashboardComparisons = [
        orderStats.todayOrders,
        formatPrice(orderStats.averageOrderValue),
        `${getPercent(orderStats.pendingOrders, orderStats.totalOrders).toFixed(0)}%`,
        `${getPercent(orderStats.completedOrders, orderStats.totalOrders).toFixed(0)}%`
    ];

    dashboardStats.forEach((stat, index) => {
        summaryCardsDashboardPage[index].querySelector(".stat-value").textContent = stat;
        summaryCardsDashboardPage[index].querySelector(".stat-pill").textContent = dashboardComparisons[index];
    });
}

//Order-Status Section : Dashboard Page
const orderStatusSectionCards = document.querySelectorAll(".status-tile");

function renderOrderStatusSection(){
    if(orderStatusSectionCards.length === 0){
        return;
    }

    orderStatusSectionCards.forEach(function(card){
        const statusCount = orders.filter(order => order.status === card.dataset.status).length;

        card.querySelector(".status-tile-count").textContent = statusCount;
        card.querySelector(".status-tile-bar span").style.width = `${getPercent(statusCount, orders.length)}%`;
    })
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
const customerList = document.querySelector("#customer-list");

const selectedOrderItems = [];

function fillNewOrderOptions(){
    if(inputNewOrderMenuItem){
        inputNewOrderMenuItem.innerHTML = `<option value="" selected disabled>Select Menu Item</option>`;

        menuItems
            .filter(item => item.availability !== "Unavailable")
            .forEach(function(item){
                inputNewOrderMenuItem.innerHTML += `<option value="${item.id}">${escapeHTML(item.name)} - ${formatPrice(item.price)}</option>`;
            });
    }

    if(customerList){
        customerList.innerHTML = "";

        customers.forEach(function(customer){
            customerList.innerHTML += `<option value="${escapeHTML(customer.name)}"></option>`;
        });
    }
}

function updateNewOrderTotal(){
    const totalAmount = selectedOrderItems.reduce(function(total, item){
        return total + item.price * item.quantity;
    }, 0);

    newOrderTotalDisplay.textContent = formatPrice(totalAmount);
}

function renderSelectedItems(){
    selectedItemsList.innerHTML = "";

    if(selectedOrderItems.length === 0){
        selectedItemsList.innerHTML = `<p class="line-items-empty">No items added yet</p>`;
        return;
    }

    selectedOrderItems.forEach(function(item, index){
        const selectedItem = document.createElement("div");
        selectedItem.className = "line-item";

        selectedItem.innerHTML = `
            <div>
                <div class="line-item-name">${escapeHTML(item.name)}</div>
                <div class="line-item-meta">Rs. ${item.price} × ${item.quantity}</div>
            </div>
            <div class="line-item-actions">
                ${formatPrice(item.price * item.quantity)}
                <button type="button" class="btn btn-ghost btn-icon btn-sm remove-item-button" data-index="${index}" aria-label="Remove ${escapeHTML(item.name)}">${icon("close")}</button>
            </div>
        `;

        selectedItemsList.appendChild(selectedItem);
    });
}

function resetNewOrderForm(){
    inputNewOrderCustomerName.value = "";
    inputNewOrderCustomerOrderType.value = "dine-in";
    inputNewOrderItemQuantity.value = 1;
    inputNewOrderSpecialInstructions.value = "";
    selectedOrderItems.length = 0;
    renderSelectedItems();
    updateNewOrderTotal();
}

if(buttonNewOrderAddItem){
    buttonNewOrderAddItem.addEventListener("click", function(){
        const newOrderMenuItem = inputNewOrderMenuItem.value;
        const newOrderItemQuantity = Number(inputNewOrderItemQuantity.value);

        const selectedMenuItem = menuItems.find(menuItem => menuItem.id === Number(newOrderMenuItem));

        if(!selectedMenuItem){
            showFieldError(inputNewOrderMenuItem);
            return;
        }

        if(newOrderItemQuantity < 1 || !Number.isInteger(newOrderItemQuantity)){
            showFieldError(inputNewOrderItemQuantity);
            return;
        }

        const alreadyAdded = selectedOrderItems.find(item => item.id === selectedMenuItem.id);

        if(alreadyAdded){
            alreadyAdded.quantity += newOrderItemQuantity;
        }
        else{
            selectedOrderItems.push({
                id: selectedMenuItem.id,
                name: selectedMenuItem.name,
                price: selectedMenuItem.price,
                quantity: newOrderItemQuantity
            });
        }

        inputNewOrderMenuItem.value = "";
        inputNewOrderItemQuantity.value = 1;

        updateNewOrderTotal();
        renderSelectedItems();
    });
}

if(selectedItemsList){
    selectedItemsList.addEventListener("click", function(event){
        const removeButton = event.target.closest(".remove-item-button");

        if(removeButton){
            const itemIndex = Number(removeButton.dataset.index);
            selectedOrderItems.splice(itemIndex, 1);
            renderSelectedItems();
            updateNewOrderTotal();
        }
    });
}

if(createOrderButton){
    createOrderButton.addEventListener("click", function(){
        const newOrderCustomerName = inputNewOrderCustomerName.value.trim();
        const newOrderCustomerOrderType = inputNewOrderCustomerOrderType.value;
        const newOrderSpecialInstructions = inputNewOrderSpecialInstructions.value.trim();

        if(!newOrderCustomerName){
            showFieldError(inputNewOrderCustomerName);
            return;
        }

        if(selectedOrderItems.length === 0){
            showFieldError(inputNewOrderMenuItem);
            return;
        }

        const newOrderTotalAmount = selectedOrderItems.reduce(function(total, item){
            return total + item.price * item.quantity;
        }, 0);

        const orderData = {
            id: getNextId(orders, 1001),
            customer: newOrderCustomerName,
            orderType: newOrderCustomerOrderType,
            items: selectedOrderItems.map(item => ({...item})),
            amount: newOrderTotalAmount,
            specialInstructions: newOrderSpecialInstructions,
            status: "Pending",
            createdAt: new Date().toISOString()
        };

        orders.push(orderData);
        saveOrders();

        resetNewOrderForm();
        closeNewOrderModal();
        refreshPage();
        showToast(`Order #${orderData.id} created`);
    });
}

function closeNewOrderModal(){
    newOrderModalOverlay.hidden = true;
    document.body.classList.remove("modal-open");
}

function openNewOrderModal(){
    fillNewOrderOptions();
    renderSelectedItems();
    newOrderModalOverlay.hidden = false;
    document.body.classList.add("modal-open");
    inputNewOrderCustomerName.focus();
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
        resetNewOrderForm();
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


//Quick Actions Section : Add New Menu Item Modal (also used for Edit on Menu Page)
const openAddMenuItemModalButton = document.querySelector("#add-menu-quick-action, #open-add-menu-item");
const addMenuItemOverlay = document.querySelector("#add-menu-modal-overlay");
const closeAddMenuItemModalButton = document.querySelector(".close-add-menu");
const cancelAddmenuItemModalButton = document.querySelector(".cancel-add-menu");
const addMenuModalTitle = document.querySelector(".add-menu-header .modal-title");
const addMenuModalText = document.querySelector(".add-menu-header .modal-subtitle");

const menuItemName = document.querySelector("#item-name");
const menuItemCategory = document.querySelector("#item-category");
const menuItemPrice = document.querySelector("#item-price");
const menuItemAvailability = document.querySelector("#item-availability");
const menuItemDescription = document.querySelector("#item-description");
const addMenuItemButton = document.querySelector(".add-menu-item");

let editingMenuItemId = null;

function fillCategoryOptions(selectElement, firstOption){
    if(!selectElement){
        return;
    }

    selectElement.innerHTML = firstOption;

    getAllCategories().forEach(function(category){
        selectElement.innerHTML += `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`;
    });
}

function resetAddMenuForm(){
    fillCategoryOptions(menuItemCategory, `<option value="" selected disabled>Select category</option>`);

    menuItemName.value = "";
    menuItemPrice.value = "";
    menuItemDescription.value = "";

    if(menuItemAvailability){
        menuItemAvailability.value = "Available";
    }
}

if(addMenuItemButton){
    addMenuItemButton.addEventListener("click", function(){
        const itemName = menuItemName.value.trim();
        const itemCategory = menuItemCategory.value;
        const itemPrice = Number(menuItemPrice.value);
        const itemDescription = menuItemDescription.value.trim();
        const itemAvailability = menuItemAvailability ? menuItemAvailability.value : "Available";

        const sameNameItem = menuItems.find(item => item.name.toLowerCase() === itemName.toLowerCase() && item.id !== editingMenuItemId);

        if(!itemName || sameNameItem){
            showFieldError(menuItemName);
            return;
        }

        if(!itemCategory){
            showFieldError(menuItemCategory);
            return;
        }

        if(!itemPrice || itemPrice <= 0){
            showFieldError(menuItemPrice);
            return;
        }

        if(editingMenuItemId !== null){
            const selectedMenuItem = menuItems.find(item => item.id === editingMenuItemId);

            selectedMenuItem.name = itemName;
            selectedMenuItem.category = itemCategory;
            selectedMenuItem.price = itemPrice;
            selectedMenuItem.description = itemDescription;
            selectedMenuItem.availability = itemAvailability;

            showToast(`${itemName} updated`);
        }
        else{
            const newMenuItemData = {
                id : getNextId(menuItems, 101),
                name : itemName,
                category : itemCategory,
                price : itemPrice,
                description : itemDescription,
                availability: itemAvailability
            }

            menuItems.push(newMenuItemData);
            showToast(`${itemName} added to menu`);
        }

        saveMenuItems();
        closeAddMenuModal();
        refreshPage();
    })
}

function openAddMenuModal(){
    editingMenuItemId = null;
    resetAddMenuForm();

    addMenuModalTitle.textContent = "Add New Menu Item";
    addMenuModalText.textContent = "Add a new menu item to your restaurant menu";
    addMenuItemButton.textContent = "Add Item";

    addMenuItemOverlay.hidden = false;
    document.body.classList.add("modal-open");
    menuItemName.focus();
}

function openEditMenuModal(itemId){
    const selectedMenuItem = menuItems.find(item => item.id === Number(itemId));

    if(!selectedMenuItem || !addMenuItemOverlay){
        return;
    }

    resetAddMenuForm();
    editingMenuItemId = selectedMenuItem.id;

    menuItemName.value = selectedMenuItem.name;
    menuItemCategory.value = selectedMenuItem.category;
    menuItemPrice.value = selectedMenuItem.price;
    menuItemDescription.value = selectedMenuItem.description || "";

    if(menuItemAvailability){
        menuItemAvailability.value = selectedMenuItem.availability;
    }

    addMenuModalTitle.textContent = "Edit Menu Item";
    addMenuModalText.textContent = "Update the details of this menu item";
    addMenuItemButton.textContent = "Save Changes";

    addMenuItemOverlay.hidden = false;
    document.body.classList.add("modal-open");
}

function closeAddMenuModal(){
    addMenuItemOverlay.hidden = true;
    editingMenuItemId = null;
    document.body.classList.remove("modal-open");
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


//Quick Actions Section : Add New Customer (also used for Edit on Customers Page)
const addCustomerModalOverlay = document.querySelector("#add-customer-modal-overlay");
const openAddCustomerModalButton = document.querySelector("#add-customer-quick-action, #open-add-customer");
const closeAddCustomerModalButton = document.querySelector(".close-add-customer");
const cancelAddCustomerModalButton = document.querySelector(".cancel-add-customer");
const addCustomerModalTitle = document.querySelector(".add-customer-header .modal-title");
const addCustomerModalText = document.querySelector(".add-customer-header .modal-subtitle");

const inputNewCustomerName = document.querySelector("#new-customer-name");
const inputNewCustomerPhone = document.querySelector("#customer-phone");
const inputNewCustomerEmail = document.querySelector("#customer-email");
const addCustomerModalButton = document.querySelector(".add-customer-button");

let editingCustomerId = null;

if(addCustomerModalButton){
    addCustomerModalButton.addEventListener("click", function(){
        const customerName = inputNewCustomerName.value.trim();
        const customerPhone = inputNewCustomerPhone.value.trim();
        const customerEmail = inputNewCustomerEmail.value.trim();

        const samePhoneCustomer = customers.find(customer => customer.phone === customerPhone && customer.id !== editingCustomerId);

        if(!customerName){
            showFieldError(inputNewCustomerName);
            return;
        }

        if(!/^[0-9]{10}$/.test(customerPhone) || samePhoneCustomer){
            showFieldError(inputNewCustomerPhone);
            return;
        }

        if(customerEmail && !inputNewCustomerEmail.checkValidity()){
            showFieldError(inputNewCustomerEmail);
            return;
        }

        if(editingCustomerId !== null){
            const selectedCustomer = customers.find(customer => customer.id === editingCustomerId);
            const oldName = selectedCustomer.name;

            selectedCustomer.name = customerName;
            selectedCustomer.phone = customerPhone;
            selectedCustomer.email = customerEmail;

            if(oldName !== customerName){
                orders.forEach(function(order){
                    if(order.customer === oldName){
                        order.customer = customerName;
                    }
                });
                saveOrders();
            }

            showToast(`${customerName} updated`);
        }
        else{
            const customersData = {
                id: getNextId(customers, 1),
                name: customerName,
                phone: customerPhone,
                email: customerEmail
            }

            customers.push(customersData);
            showToast(`${customerName} added`);
        }

        saveCustomers();
        closeAddCustomerModal();
        refreshPage();
    });
}

function resetAddCustomerForm(){
    inputNewCustomerName.value = "";
    inputNewCustomerPhone.value = "";
    inputNewCustomerEmail.value = "";
}

function openAddCustomerModal(){
    editingCustomerId = null;
    resetAddCustomerForm();

    addCustomerModalTitle.textContent = "Add New Customer";
    addCustomerModalText.textContent = "Add a new customer to your restaurant";
    addCustomerModalButton.textContent = "Add Customer";

    addCustomerModalOverlay.hidden = false;
    document.body.classList.add("modal-open");
    inputNewCustomerName.focus();
}

function openEditCustomerModal(customerId){
    const selectedCustomer = customers.find(customer => customer.id === Number(customerId));

    if(!selectedCustomer || !addCustomerModalOverlay){
        return;
    }

    editingCustomerId = selectedCustomer.id;

    inputNewCustomerName.value = selectedCustomer.name;
    inputNewCustomerPhone.value = selectedCustomer.phone;
    inputNewCustomerEmail.value = selectedCustomer.email || "";

    addCustomerModalTitle.textContent = "Edit Customer";
    addCustomerModalText.textContent = "Update the customer details";
    addCustomerModalButton.textContent = "Save Changes";

    addCustomerModalOverlay.hidden = false;
    document.body.classList.add("modal-open");
}

function closeAddCustomerModal(){
    addCustomerModalOverlay.hidden = true;
    editingCustomerId = null;
    document.body.classList.remove("modal-open");
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

//Quick Actions Section : View Orders Button
const viewAllOrdersButton = document.querySelector("#view-all-order-quick-action");

if(viewAllOrdersButton){
    viewAllOrdersButton.addEventListener("click", function(){
        window.location.href = "orders.html"
    })
}


//Orders Page
//All Orders Table
const allOrdersTable = document.querySelector(".all-orders tbody");
const orderSearchInput = document.querySelector("#order-searchbar");
const orderStatusFilter = document.querySelector("#order-status");
const orderCountText = document.querySelector("#order-count-text");

function getFilteredOrders(){
    const searchText = orderSearchInput.value.trim().toLowerCase().replace("#", "");
    const statusValue = orderStatusFilter.value;

    return getSortedOrders().filter(function(order){
        const matchesSearch = String(order.id).includes(searchText) || order.customer.toLowerCase().includes(searchText);
        const matchesStatus = statusValue === "all" || order.status.toLowerCase() === statusValue;

        return matchesSearch && matchesStatus;
    });
}

function renderAllOrdersTable() {
    if (!allOrdersTable) {
        return;
    }

    const data = getFilteredOrders();

    allOrdersTable.innerHTML = "";

    if(data.length === 0){
        allOrdersTable.innerHTML = `<tr><td colspan="7" class="empty-row">No orders found</td></tr>`;
    }

    for (let i = 0; i < data.length; i++) {
        const row = `<tr>
            <td class="cell-strong">#${data[i].id}</td>
            <td>${escapeHTML(data[i].customer)}</td>
            <td class="cell-muted">${getTotalItemQuantity(data[i])} Items</td>
            <td class="cell-strong cell-number">${formatPrice(data[i].amount)}</td>
            <td>
                <span class="badge badge-dot badge-${data[i].status.toLowerCase()}">${data[i].status}</span>
            </td>
            <td class="cell-muted">${formatDateTime(data[i].createdAt)}</td>
            <td>
                <button type="button" class="btn btn-secondary btn-sm edit-button" data-order-id="${data[i].id}">
                    ${icon("edit")}Edit
                </button>
            </td>
        </tr>`;

        allOrdersTable.innerHTML += row;
    }

    orderCountText.textContent = `Showing ${data.length} of ${orders.length} orders`;
}

if(orderSearchInput){
    orderSearchInput.addEventListener("input", renderAllOrdersTable);
}

if(orderStatusFilter){
    orderStatusFilter.addEventListener("change", renderAllOrdersTable);
}

//Summary Cards : Orders Page
const summaryCardsOrdersPage = document.querySelectorAll(".orders-page .stat-card");

function renderOrdersSummary(){
    if(summaryCardsOrdersPage.length === 0){
        return;
    }

    const orderStats = completeStats();

    const orderStatusCounts = [
        orderStats.totalOrders,
        orderStats.preparingOrders,
        orderStats.pendingOrders,
        orderStats.completedOrders
    ]

    const orderStatusPercentages = [
        orderStats.totalOrders ? 100 : 0,
        getPercent(orderStats.preparingOrders, orderStats.totalOrders),
        getPercent(orderStats.pendingOrders, orderStats.totalOrders),
        getPercent(orderStats.completedOrders, orderStats.totalOrders)
    ];

    orderStatusCounts.forEach((count, index) => {
        summaryCardsOrdersPage[index].querySelector(".stat-value").textContent = count;
        summaryCardsOrdersPage[index].querySelector(".stat-pill").textContent = `${orderStatusPercentages[index].toFixed(2)}%`;
    })
}

//Edit Order Modal : Dashboard Page and Orders Page
const editOrderModalOverlay = document.querySelector("#edit-order-modal-overlay");

const editOrderCustomer = document.querySelector("#edit-order-customer");
const editOrderStatus = document.querySelector("#edit-order-status");
const editOrderInstructions = document.querySelector("#edit-order-instructions");

const closeEditOrderButton = document.querySelector(".close-edit-order");
const cancelEditOrderButton = document.querySelector(".cancel-edit-order");
const saveEditOrderButton = document.querySelector(".save-edit-order");
const deleteEditOrderButton = document.querySelector(".delete-edit-order");

let selectedOrderId = null;

function openEditOrderModal(orderId) {
    const selectedOrder = orders.find(order => order.id === Number(orderId));

    if (!selectedOrder || !editOrderModalOverlay) {
        return;
    }

    selectedOrderId = selectedOrder.id;

    editOrderCustomer.value = selectedOrder.customer;
    editOrderStatus.value = selectedOrder.status;
    editOrderInstructions.value = selectedOrder.specialInstructions || "";

    editOrderModalOverlay.hidden = false;
    document.body.classList.add("modal-open");
}

function closeEditOrderModal() {
    if (!editOrderModalOverlay) {
        return;
    }

    editOrderModalOverlay.hidden = true;
    selectedOrderId = null;
    document.body.classList.remove("modal-open");
}

function handleEditOrderClick(event) {
    const editButton = event.target.closest(".edit-button");

    if (!editButton) {
        return;
    }

    openEditOrderModal(editButton.dataset.orderId);
}

if (recentOrdersTable) {
    recentOrdersTable.addEventListener("click", handleEditOrderClick);
}

if (allOrdersTable) {
    allOrdersTable.addEventListener("click", handleEditOrderClick);
}

if (saveEditOrderButton) {
    saveEditOrderButton.addEventListener("click", function () {
        const customerName = editOrderCustomer.value.trim();

        if (!customerName) {
            showFieldError(editOrderCustomer);
            return;
        }

        const selectedOrder = orders.find(order => order.id === selectedOrderId);

        if (!selectedOrder) {
            closeEditOrderModal();
            return;
        }

        selectedOrder.customer = customerName;
        selectedOrder.status = editOrderStatus.value;
        selectedOrder.specialInstructions = editOrderInstructions.value.trim();

        saveOrders();
        showToast(`Order #${selectedOrder.id} updated`);
        closeEditOrderModal();
        refreshPage();
    });
}

if (deleteEditOrderButton) {
    deleteEditOrderButton.addEventListener("click", function () {
        if (selectedOrderId === null) {
            return;
        }

        const shouldDelete = window.confirm("Are you sure you want to delete this order?");

        if (!shouldDelete) {
            return;
        }

        const orderIndex = orders.findIndex(order => order.id === selectedOrderId);

        if (orderIndex !== -1) {
            orders.splice(orderIndex, 1);
            saveOrders();
            showToast("Order deleted");
        }

        closeEditOrderModal();
        refreshPage();
    });
}

if (closeEditOrderButton) {
    closeEditOrderButton.addEventListener("click", closeEditOrderModal);
}

if (cancelEditOrderButton) {
    cancelEditOrderButton.addEventListener("click", closeEditOrderModal);
}

if (editOrderModalOverlay) {
    editOrderModalOverlay.addEventListener("click", function (event) {
        if (event.target === editOrderModalOverlay) {
            closeEditOrderModal();
        }
    });
}


//Menu Page
const menuItemsTable = document.querySelector(".menu-items-table tbody");
const menuTableView = document.querySelector(".menu-table-view");
const menuCardView = document.querySelector(".menu-card-view");
const menuSearchInput = document.querySelector("#menu-searchbar");
const menuCategoryFilter = document.querySelector("#menu-category-filter");
const menuAvailabilityFilter = document.querySelector("#menu-availability-filter");
const menuSortSelect = document.querySelector("#menu-sort");
const menuCountText = document.querySelector("#menu-count-text");
const menuViewButtons = document.querySelectorAll(".view-button");
const summaryCardsMenuPage = document.querySelectorAll(".menu-page .stat-card");

const menuLetterColors = ["icon-red", "icon-blue", "icon-purple", "icon-orange", "icon-green", "icon-amber"];

function getCategoryColor(category){
    return getAllCategories().indexOf(category) % 6;
}

function getAvailabilityClass(availability){
    return availability.toLowerCase().replace(" ", "-");
}

function getFilteredMenuItems(itemStats){
    const searchText = menuSearchInput.value.trim().toLowerCase();
    const categoryValue = menuCategoryFilter.value;
    const availabilityValue = menuAvailabilityFilter.value;
    const sortValue = menuSortSelect.value;

    const filteredItems = menuItems.filter(function(item){
        const matchesSearch = item.name.toLowerCase().includes(searchText) || item.category.toLowerCase().includes(searchText);
        const matchesCategory = categoryValue === "all" || item.category === categoryValue;
        const matchesAvailability = availabilityValue === "all" || item.availability === availabilityValue;

        return matchesSearch && matchesCategory && matchesAvailability;
    });

    const getOrders = item => itemStats[item.id] ? itemStats[item.id].orders : 0;

    if(sortValue === "name"){
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if(sortValue === "price-low"){
        filteredItems.sort((a, b) => a.price - b.price);
    }
    else if(sortValue === "price-high"){
        filteredItems.sort((a, b) => b.price - a.price);
    }
    else if(sortValue === "orders"){
        filteredItems.sort((a, b) => getOrders(b) - getOrders(a));
    }

    return filteredItems;
}

function renderMenuSummary(){
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter(item => item.availability === "Available").length;
    const lowStockItems = menuItems.filter(item => item.availability === "Low Stock").length;
    const unavailableItems = menuItems.filter(item => item.availability === "Unavailable").length;
    const usedCategories = new Set(menuItems.map(item => item.category)).size;

    const menuStats = [totalItems, availableItems, lowStockItems, unavailableItems];
    const menuComparisons = [
        usedCategories,
        `${getPercent(availableItems, totalItems).toFixed(0)}%`,
        `${getPercent(lowStockItems, totalItems).toFixed(0)}%`,
        `${getPercent(unavailableItems, totalItems).toFixed(0)}%`
    ];

    menuStats.forEach((stat, index) => {
        summaryCardsMenuPage[index].querySelector(".stat-value").textContent = stat;
        summaryCardsMenuPage[index].querySelector(".stat-pill").textContent = menuComparisons[index];
    });
}

function renderMenuPage(){
    if(!menuItemsTable){
        return;
    }

    renderMenuSummary();

    const itemStats = getMenuItemStats();
    const data = getFilteredMenuItems(itemStats);

    menuItemsTable.innerHTML = "";
    menuCardView.innerHTML = "";

    if(data.length === 0){
        menuItemsTable.innerHTML = `<tr><td colspan="7" class="empty-row">No menu items found</td></tr>`;
        menuCardView.innerHTML = `<p class="empty-row" style="grid-column: 1 / -1">No menu items found</p>`;
    }

    for(let i = 0; i < data.length; i++){
        const item = data[i];
        const itemOrders = itemStats[item.id] ? itemStats[item.id].orders : 0;
        const availabilityClass = `badge badge-dot badge-${getAvailabilityClass(item.availability)}`;
        const categoryColor = getCategoryColor(item.category);
        const categoryClass = `tag tag-${categoryColor}`;
        const ordersText = itemOrders === 1 ? "1 order" : `${itemOrders} orders`;

        menuItemsTable.innerHTML += `<tr>
            <td class="cell-muted">${i + 1}</td>
            <td>
                <div class="cell-stack">
                    <span class="cell-title">${escapeHTML(item.name)}</span>
                    <span class="cell-subtitle">${escapeHTML(item.description || "")}</span>
                </div>
            </td>
            <td><span class="${categoryClass}">${escapeHTML(item.category)}</span></td>
            <td class="cell-strong cell-number">${formatPrice(item.price)}</td>
            <td><span class="${availabilityClass}">${item.availability}</span></td>
            <td class="col-center cell-number">${itemOrders}</td>
            <td>
                <div class="row-actions">
                    <button type="button" class="btn btn-secondary btn-sm edit-button" data-item-id="${item.id}">${icon("edit")}Edit</button>
                    <button type="button" class="btn btn-danger btn-sm delete-button" data-item-id="${item.id}">${icon("trash")}Delete</button>
                </div>
            </td>
        </tr>`;

        menuCardView.innerHTML += `<div class="card menu-card">
            <div class="menu-card-top">
                <span class="icon-box ${menuLetterColors[categoryColor]}">${escapeHTML(item.name[0].toUpperCase())}</span>
                <span class="${availabilityClass}">${item.availability}</span>
            </div>
            <span class="menu-card-name">${escapeHTML(item.name)}</span>
            <span class="menu-card-description">${escapeHTML(item.description || item.category)}</span>
            <div class="menu-card-info">
                <span class="${categoryClass}">${escapeHTML(item.category)}</span>
                <span class="menu-card-price">${formatPrice(item.price)}</span>
            </div>
            <div class="menu-card-footer">
                <span>${ordersText}</span>
                <div class="row-actions">
                    <button type="button" class="btn btn-secondary btn-sm btn-icon edit-button" data-item-id="${item.id}" aria-label="Edit ${escapeHTML(item.name)}">${icon("edit")}</button>
                    <button type="button" class="btn btn-danger btn-sm btn-icon delete-button" data-item-id="${item.id}" aria-label="Delete ${escapeHTML(item.name)}">${icon("trash")}</button>
                </div>
            </div>
        </div>`;
    }

    menuCountText.textContent = `Showing ${data.length} of ${menuItems.length} menu items`;
}

function handleMenuActionClick(event){
    const editButton = event.target.closest(".edit-button");
    const deleteButton = event.target.closest(".delete-button");

    if(editButton){
        openEditMenuModal(editButton.dataset.itemId);
    }

    if(deleteButton){
        const itemIndex = menuItems.findIndex(item => item.id === Number(deleteButton.dataset.itemId));

        if(itemIndex === -1){
            return;
        }

        const shouldDelete = window.confirm(`Delete ${menuItems[itemIndex].name} from the menu?`);

        if(!shouldDelete){
            return;
        }

        const deletedItem = menuItems.splice(itemIndex, 1)[0];
        saveMenuItems();
        refreshPage();
        showToast(`${deletedItem.name} deleted`);
    }
}

if(menuItemsTable){
    fillCategoryOptions(menuCategoryFilter, `<option value="all">All Categories</option>`);

    menuItemsTable.addEventListener("click", handleMenuActionClick);
    menuCardView.addEventListener("click", handleMenuActionClick);

    menuSearchInput.addEventListener("input", renderMenuPage);
    menuCategoryFilter.addEventListener("change", renderMenuPage);
    menuAvailabilityFilter.addEventListener("change", renderMenuPage);
    menuSortSelect.addEventListener("change", renderMenuPage);

    menuViewButtons.forEach(function(button){
        button.addEventListener("click", function(){
            menuViewButtons.forEach(viewButton => viewButton.classList.remove("active"));
            button.classList.add("active");

            menuTableView.hidden = button.dataset.view !== "table";
            menuCardView.hidden = button.dataset.view !== "card";
        });
    });
}


//Customers Page
const customersTable = document.querySelector(".customers-table tbody");
const customerSearchInput = document.querySelector("#customer-searchbar");
const customerTypeFilter = document.querySelector("#customer-type-filter");
const customerSortSelect = document.querySelector("#customer-sort");
const customerCountText = document.querySelector("#customer-count-text");
const summaryCardsCustomersPage = document.querySelectorAll(".customers-page .stat-card");

function getCustomerStats(customer){
    const customerOrders = orders.filter(order => order.customer.toLowerCase() === customer.name.toLowerCase());
    const totalSpent = customerOrders
        .filter(order => order.status !== "Cancelled")
        .reduce((total, order) => total + order.amount, 0);

    let lastOrder = null;

    customerOrders.forEach(function(order){
        if(order.createdAt && (!lastOrder || new Date(order.createdAt) > new Date(lastOrder))){
            lastOrder = order.createdAt;
        }
    });

    let type = "New";

    if(customerOrders.length >= 3){
        type = "Loyal";
    }
    else if(customerOrders.length >= 1){
        type = "Regular";
    }

    return {
        totalOrders: customerOrders.length,
        totalSpent,
        lastOrder,
        type
    }
}

function renderCustomersSummary(customerData){
    const totalCustomers = customerData.length;
    const orderedCustomers = customerData.filter(customer => customer.stats.totalOrders > 0).length;
    const newCustomers = customerData.filter(customer => customer.stats.type === "New").length;
    const loyalCustomers = customerData.filter(customer => customer.stats.type === "Loyal").length;
    const customerRevenue = customerData.reduce((total, customer) => total + customer.stats.totalSpent, 0);
    const averageSpent = orderedCustomers ? Math.round(customerRevenue / orderedCustomers) : 0;

    const customerStats = [totalCustomers, formatPrice(customerRevenue), newCustomers, loyalCustomers];
    const customerComparisons = [
        `${getPercent(orderedCustomers, totalCustomers).toFixed(0)}%`,
        formatPrice(averageSpent),
        `${getPercent(newCustomers, totalCustomers).toFixed(0)}%`,
        `${getPercent(loyalCustomers, totalCustomers).toFixed(0)}%`
    ];

    customerStats.forEach((stat, index) => {
        summaryCardsCustomersPage[index].querySelector(".stat-value").textContent = stat;
        summaryCardsCustomersPage[index].querySelector(".stat-pill").textContent = customerComparisons[index];
    });
}

function renderCustomersPage(){
    if(!customersTable){
        return;
    }

    const customerData = customers.map(customer => ({...customer, stats: getCustomerStats(customer)}));

    renderCustomersSummary(customerData);

    const searchText = customerSearchInput.value.trim().toLowerCase();
    const typeValue = customerTypeFilter.value;
    const sortValue = customerSortSelect.value;

    const data = customerData.filter(function(customer){
        const matchesSearch = customer.name.toLowerCase().includes(searchText)
            || customer.phone.includes(searchText)
            || (customer.email || "").toLowerCase().includes(searchText);
        const matchesType = typeValue === "all" || customer.stats.type === typeValue;

        return matchesSearch && matchesType;
    });

    if(sortValue === "name"){
        data.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if(sortValue === "orders"){
        data.sort((a, b) => b.stats.totalOrders - a.stats.totalOrders);
    }
    else if(sortValue === "spent"){
        data.sort((a, b) => b.stats.totalSpent - a.stats.totalSpent);
    }
    else if(sortValue === "recent"){
        data.sort((a, b) => b.id - a.id);
    }

    customersTable.innerHTML = "";

    if(data.length === 0){
        customersTable.innerHTML = `<tr><td colspan="7" class="empty-row">No customers found</td></tr>`;
    }

    for(let i = 0; i < data.length; i++){
        const customer = data[i];
        const ordersText = customer.stats.totalOrders === 1 ? "1 order" : `${customer.stats.totalOrders} orders`;

        customersTable.innerHTML += `<tr>
            <td>
                <div class="cell-person">
                    <span class="avatar avatar-${customer.id % 5}">${escapeHTML(getInitials(customer.name))}</span>
                    <div class="cell-stack">
                        <span class="cell-title">${escapeHTML(customer.name)}</span>
                        <span class="cell-subtitle">${escapeHTML(customer.email || "No email")}</span>
                    </div>
                </div>
            </td>
            <td class="cell-muted">+91 ${customer.phone}</td>
            <td>
                <a href="orders.html?search=${encodeURIComponent(customer.name)}" class="card-link orders-link">${ordersText}</a>
            </td>
            <td class="cell-strong cell-number">${formatPrice(customer.stats.totalSpent)}</td>
            <td class="cell-muted">${formatDateTime(customer.stats.lastOrder)}</td>
            <td><span class="badge badge-${customer.stats.type.toLowerCase()}">${customer.stats.type}</span></td>
            <td>
                <div class="row-actions">
                    <button type="button" class="btn btn-secondary btn-sm edit-button" data-customer-id="${customer.id}">${icon("edit")}Edit</button>
                    <button type="button" class="btn btn-danger btn-sm delete-button" data-customer-id="${customer.id}">${icon("trash")}Delete</button>
                </div>
            </td>
        </tr>`;
    }

    customerCountText.textContent = `Showing ${data.length} of ${customers.length} customers`;
}

if(customersTable){
    customersTable.addEventListener("click", function(event){
        const editButton = event.target.closest(".edit-button");
        const deleteButton = event.target.closest(".delete-button");

        if(editButton){
            openEditCustomerModal(editButton.dataset.customerId);
        }

        if(deleteButton){
            const customerIndex = customers.findIndex(customer => customer.id === Number(deleteButton.dataset.customerId));

            if(customerIndex === -1){
                return;
            }

            const shouldDelete = window.confirm(`Delete ${customers[customerIndex].name}? Their past orders will stay.`);

            if(!shouldDelete){
                return;
            }

            const deletedCustomer = customers.splice(customerIndex, 1)[0];
            saveCustomers();
            refreshPage();
            showToast(`${deletedCustomer.name} deleted`);
        }
    });

    customerSearchInput.addEventListener("input", renderCustomersPage);
    customerTypeFilter.addEventListener("change", renderCustomersPage);
    customerSortSelect.addEventListener("change", renderCustomersPage);
}


//Header Search : All Pages
const headerSearchInput = document.querySelector("#searchbar");
const pageSearchInput = document.querySelector("#order-searchbar, #menu-searchbar, #customer-searchbar");
const searchFromUrl = new URLSearchParams(window.location.search).get("search");

if(pageSearchInput && searchFromUrl){
    pageSearchInput.value = searchFromUrl;
}

function getSearchPage(searchText){
    const text = searchText.toLowerCase().replace("#", "");

    if(menuItems.some(item => item.name.toLowerCase().includes(text))){
        return "menu.html";
    }

    if(orders.some(order => String(order.id).includes(text) || order.customer.toLowerCase().includes(text))){
        return "orders.html";
    }

    if(customers.some(customer => customer.name.toLowerCase().includes(text) || customer.phone.includes(text))){
        return "customers.html";
    }

    return "orders.html";
}

if(headerSearchInput){
    headerSearchInput.addEventListener("input", function(){
        if(pageSearchInput){
            pageSearchInput.value = headerSearchInput.value;
            pageSearchInput.dispatchEvent(new Event("input"));
        }
    });

    headerSearchInput.addEventListener("keydown", function(event){
        const searchText = headerSearchInput.value.trim();

        if(event.key === "Enter" && !pageSearchInput && searchText){
            window.location.href = `${getSearchPage(searchText)}?search=${encodeURIComponent(searchText)}`;
        }
    });
}


//Escape Key : Close any open modal
document.addEventListener("keydown", function(event){
    if(event.key !== "Escape"){
        return;
    }

    if(newOrderModalOverlay && !newOrderModalOverlay.hidden){
        closeNewOrderModal();
    }

    if(addMenuItemOverlay && !addMenuItemOverlay.hidden){
        closeAddMenuModal();
    }

    if(addCustomerModalOverlay && !addCustomerModalOverlay.hidden){
        closeAddCustomerModal();
    }

    if(editOrderModalOverlay && !editOrderModalOverlay.hidden){
        closeEditOrderModal();
    }
});


//Render everything on the current page
function refreshPage(){
    renderRecentOrdersTable(getSortedOrders().slice(0, 5));
    renderPopularMenuItemsTable(getPopularMenuItems());
    renderDashboardSummary();
    renderOrderStatusSection();
    renderAllOrdersTable();
    renderOrdersSummary();
    renderMenuPage();
    renderCustomersPage();
}

refreshPage();
