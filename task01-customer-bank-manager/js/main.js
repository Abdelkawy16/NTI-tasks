const customerController = (function () {
    let customer = function (id, name, balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
    let data = { customers: [] }
    let saveDataToStorage = (data) => {
        localStorage.setItem('customers', JSON.stringify(data))
    }
    let getDataFromStorage = () => {
        let customers
        try {
            customers = JSON.parse(localStorage.getItem('customers'))
            if (!Array.isArray(customers)) throw new Error()
        }
        catch (e) {
            customers = []
        }
        return customers
    }
    return {
        addCustomer(name, balance) {
            let id, newCustomer;
            let dt = new Date();
            id = dt.getMilliseconds();
            newCustomer = new customer(id, name, balance);
            data.customers = getDataFromStorage()
            data.customers.push(newCustomer);
            saveDataToStorage(data.customers);
            return newCustomer;
        },
        delCustomer(id) {
            data.customers = getDataFromStorage().filter(customer => customer.id != id)
            saveDataToStorage(data.customers);
        },
        withdraw(id, balance) {
            let newBalance
            data.customers = getDataFromStorage();
            data.customers.forEach(customer => {
                if (customer.id == id) {
                    newBalance = Number(customer.balance)
                    if (balance > newBalance)
                        throw new Error('Cannot withdraw this balance!');
                    newBalance -= balance;
                    customer.balance = newBalance
                }
            })
            saveDataToStorage(data.customers)
            return newBalance;
        },
        addBalance(id, balance) {
            let newBalance
            data.customers = getDataFromStorage();
            data.customers.forEach(customer => {
                if (customer.id == id) {
                    newBalance = Number(customer.balance)
                    if (balance > 10000)
                        throw new Error('Cannot add this balance!');
                    newBalance += balance;
                    customer.balance = newBalance
                }
            })
            saveDataToStorage(data.customers)
            return newBalance
        },
        getCustomers() {
            return getDataFromStorage()
        }
    }
})()

const UIController = (function () {
    return {
        addListItem({ id, name, balance }) {
            let htmlObject = document.createElement('tr')
            htmlObject.innerHTML = `<th scope="row">${id}</th>
            <td>${name}</td>
            <td>${balance}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-danger del" id="del-${id}">Delete</button>
                    <button type="button" class="btn btn-primary addBal" id="add-${id}">Add</button>
                    <button type="button" class="btn btn-primary withdraw" id="withdraw-${id}">Withdraw</button>
                </div>
            </td>`;
            document.querySelector('tbody').append(htmlObject);
            return document.querySelector('tbody').lastChild
        },
        delItem(item) {
            item.remove()
        },
        updateBalance(item, newBalance) {
            item.textContent = newBalance
        }
    }
})()

const controller = (function (UIctrl, customerCtrl) {
    let deleteCustomer = (listItem, id) => {
        UIctrl.delItem(listItem)
        customerCtrl.delCustomer(id)
    }
    let withdraw = (id, itemToUpdate) => {
        try {
            let balance = Number((prompt('Withdraw')))
            let newBalance = customerCtrl.withdraw(id, balance)
            UIctrl.updateBalance(itemToUpdate, newBalance)
        } catch (error) {
            alert('Cannot withdraw this balance!')
        }
    }
    let add = (id, itemToUpdate) => {
        try {
            let balance = Number((prompt('Add')))
            let newBalance = customerCtrl.addBalance(id, balance)
            UIctrl.updateBalance(itemToUpdate, newBalance)
        } catch (error) {
            alert('Cannot add this balance!')
        }
    }
    let setupEventListener = () => {
        // Add Customer
        document.querySelector('.add__btn').addEventListener('click', () => {
            const name = document.querySelector('.add__name')
            const balance = document.querySelector('.add__value')
            let listItem = UIctrl.addListItem(customerCtrl.addCustomer(name.value, balance.value))
            name.value = ''
            balance.value = ''
            name.focus()
            let descendants = [...listItem.querySelectorAll("*")]
            //console.log(descendants);
            let id = descendants[0].textContent
            // Delete Customer
            descendants[5].addEventListener('click', () => {
                deleteCustomer(listItem, id)
            })
            // Withdraw
            descendants[7].addEventListener('click', () => { withdraw(id, descendants[2]) })
            // Add Balance
            descendants[6].addEventListener('click', () => { add(id, descendants[2]) })
        })
    }
    let firstActions = () => {
        // delete
        let delBtns = document.querySelectorAll('.del');
        let addBtns = document.querySelectorAll('.addBal');
        let withdrawBtns = document.querySelectorAll('.Withdraw');
        if (delBtns) {
            delBtns.forEach(delBtn => {
                delBtn.addEventListener('click', (e) => {
                    let item = e.target
                    let listItem = item.parentNode.parentNode.parentNode
                    let id = item.id.slice(4, item.id.length)
                    deleteCustomer(listItem, id)
                })
            })
        }
        if (addBtns) {
            addBtns.forEach(addBtn => {
                addBtn.addEventListener('click', (e) => {
                    let item = e.target
                    let listItem = item.parentNode.parentNode.parentNode
                    let itemToUpdate = [...listItem.querySelectorAll("*")][2]
                    let id = item.id.slice(4, item.id.length)
                    add(id, itemToUpdate)
                })
            })
        }
        if (withdrawBtns) {
            withdrawBtns.forEach(withdrawBtn => {
                withdrawBtn.addEventListener('click', (e) => {
                    let item = e.target
                    let listItem = item.parentNode.parentNode.parentNode
                    let itemToUpdate = [...listItem.querySelectorAll("*")][2]
                    let id = item.id.slice(9, item.id.length)
                    withdraw(id, itemToUpdate)
                })
            })
        }
    }
    return {
        init: () => {
            customerCtrl.getCustomers().forEach(element => {
                UIctrl.addListItem(element)
            });
            firstActions()
            setupEventListener()
        }
    }
})(UIController, customerController)

controller.init()