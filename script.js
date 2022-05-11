const url = 'https://catalognodejs2022-matheustostes.vercel.app/products/'
let response = {}
const tableElements = document.getElementById('products-table')
const searchInput = document.getElementById('search-input')

const getApi = async () => {
    const responseFull = await axios.get(url)
    response = responseFull.data
}

const populateItems = async (data) => {
    data.map(item => {
        let product = `
            <div class='item-row'>
                <div class='row-header'>
                    <p class='product-id'>${item.product_id}</p>
                    <button class='row-delete' onCLick='deleteProduct(event)'>X</button>
                </div>
                <p>nome: <input class='product-name' value=${item.name}></p>
                <p>preço: <input class='product-price' value=${item.price}></p>
                <p>descrição: <input class='product-description' value='${item.description}'></p>
                <p>url da imagem: <input class='product-image' value=${item.image}></p>
                <p>categoria: <input class='product-category' value=${item.category}></p>
                <p>promoção: <input class='product-promo' value=${item.promo}></p>
                <button class='row-update' onClick='productUpdateForm(event)'>ALTERAR</button>
            </div>
        `
        tableElements.insertAdjacentHTML('beforeend', product)
    })
}

const searchItems = () => {
    const searchValue = searchInput.value

    const responseFiltered = response.filter((item) => {
        return item.name.includes(searchValue)
    })

    tableElements.innerHTML = ''
    populateItems(responseFiltered)
}

searchInput.addEventListener('input', searchItems)

const productUpdateForm = (event) => {
    const productElement = event.target.parentElement
    const product_id = parseInt(productElement.getElementsByClassName("product-id")[0].innerText)
    const name = productElement.getElementsByClassName("product-name")[0].value
    const price = productElement.getElementsByClassName("product-price")[0].value
    const description = productElement.getElementsByClassName("product-description")[0].value
    const image = productElement.getElementsByClassName("product-image")[0].value
    const category = productElement.getElementsByClassName("product-category")[0].value
    const promo = productElement.getElementsByClassName("product-promo")[0].value

    const data = { product_id, name, price, description, image, category, promo }

    updateProduct(product_id, data)
}

const updateProduct = (product_id, data) => {
    const urlProduct =  url+product_id
    
    axios.put(urlProduct, data)
    // .then(response => {
    //     console.log('update');
    // })
}

const deleteProduct = (event) => {
    const product = event.target.parentElement.parentElement
    const product_id = product.getElementsByClassName("product-id")[0].innerText

    const urlProduct =  url+product_id
    
    axios.delete(urlProduct)
    product.remove()
}

window.onload = async () => {
    await getApi()
    await populateItems(response)
}