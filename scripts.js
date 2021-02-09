/* Objeto open and close new transaction */
const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document /* document pasa de toda la estructura de html para buscar*/
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        // Fechar modal
        // Remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(), // transactions, // Trago o array transactions porque ele não vai existir mais na frente
    
    add(transaction){
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes() {
        let income = 0;
        // pegar todas as transacoes
        // para cada transacao
        Transaction.all.forEach(transaction => {
            // se for maior que zero
            if( transaction.amount > 0 ) {
                // somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses() {
        let expense = 0;
        // pegar todas as transacoes
        // para cada transacao
        Transaction.all.forEach(transaction => {
            // se for maior que zero
            if( transaction.amount < 0 ) {
                // somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })        
        return expense;
    },
    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

// Array transactions
/*const transactions = [
    {
        //id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        //id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        //id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
]*/

// Total transactions

// Substituir os dados do HTML com os dados do JS
// DOM Document Object Model
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),


    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTranssaction(transaction, index)
        tr.dataset.index = index

        
        DOM.transactionsContainer.appendChild(tr)
        
    },
    innerHTMLTranssaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick ="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
        </td>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total() )
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        // value = Number(value) * 100
        value = Number(value.replace(/\,\./g,"")) * 100
        return value
    },

    formatDate(date) {
        const splittedDate = date.split("-")
        
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
        
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        // Replace solo troca o primer achado se coloco
        // expresão REGULAR OU SEJA dentro de "/" seguido de "g" será global
        // "\D" para achar tudo o que não é numero
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100 // Para pegar decimais
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}


const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }

    },
    validateFields() {
        const { description, amount, date } = Form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
        
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }

    },

    saveTransaction(transaction) {
        Transaction.add(transaction)

    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()
        
        try {
            Form.validateFields() // Revisa os dados do formulario
            const transaction = Form.formatValues() // Adiciona transacao na array
            Form.saveTransaction(transaction) /*Transaction.add(transaction)*/ // Salva transacao
            Form.clearFields() // Limpa os dados
            Modal.close() // modal feche
           
    
        } catch (error) {
            alert(error.message)
        }
    
    }
}

const App = {
    init() {
        Transaction.all.forEach(DOM.addTransaction)
          
        DOM.updateBalance()

        Storage.set(Transaction.all)
        

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

/*
Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200,
    date: '23/01/2021',
})        
*/



 
        
