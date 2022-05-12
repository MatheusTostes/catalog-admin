const url = 'https://catalognodejs2022-matheustostes.vercel.app/products/'
let response = {}
const tableElements = document.getElementById('products-table')
const searchInput = document.getElementById('search-input')
const btnCreateProduct = document.getElementById('btn-product-create')
const btnClearInputs = document.getElementById('empty-create')

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

                

                <form>
                    <p>nome: <input class='product-name' value=${item.name} required></p>
                    <p>preço: <input type="number" class='product-price' value=${item.price} required></p>
                    <p>descrição: <input class='product-description' value='${item.description}' required></p>
                    <p>url da imagem: <input class='product-image' value=${item.image} required></p>
                    <p>categoria: 
                        <select class='product-category' value=${item.category} required>
                            <option value="lanches">Lanches</option>
                            <option value="porções">Porções</option>
                            <option value="bebidas">Bebidas</option>
                            <option value="sobremesas">Sobremesas</option>
                        </select>
                    </p>
                    <p>promoção: 
                        <select class='product-promo' value=${item.promo} required>
                            <option value="y">sim</option>
                            <option value="n">não</option>
                        </select>
                    </p>
                    <input type="submit" class='row-update' onClick='productUpdateForm(event)'>
                 </form>
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
    event.preventDefault()
    const productElement = event.target.parentElement.parentElement
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
}

const deleteProduct = (event) => {
    const product = event.target.parentElement.parentElement
    const product_id = product.getElementsByClassName("product-id")[0].innerText

    const urlProduct =  url+product_id
    
    axios.delete(urlProduct)
    product.remove()
}

const createProduct = async (event) => {
    event.preventDefault()
    const productElement = event.target.parentElement
    const name = productElement.getElementsByClassName("product-name")[0].value
    const price = productElement.getElementsByClassName("product-price")[0].value
    const description = productElement.getElementsByClassName("product-description")[0].value
    const image = productElement.getElementsByClassName("product-image")[0].value
    const category = productElement.getElementsByClassName("product-category")[0].value
    const promo = productElement.getElementsByClassName("product-promo")[0].value

    const data = { name, price, description, image, category, promo }

    if (name !== '' & price !== '' & description !== '' & image !== '') {
        await axios.post(url, data)
    
        tableElements.innerHTML = ''
        await getApi()
        await populateItems(response)
    }
}
btnCreateProduct.addEventListener('click', createProduct)

const clearInputs = (event) => {
    const productElement = event.target.parentElement.parentElement

    // console.log(productElement);
    productElement.getElementsByClassName("product-name")[0].value = ''
    productElement.getElementsByClassName("product-price")[0].value = 0
    productElement.getElementsByClassName("product-description")[0].value = ''
    productElement.getElementsByClassName("product-image")[0].value = ''
}
btnClearInputs.addEventListener('click', clearInputs)


window.onload = async () => {
    await getApi()
    await populateItems(response)
}