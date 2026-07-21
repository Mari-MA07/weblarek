import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { CatalogModel } from './components/Models/CatalogModel';
import { CartModel } from './components/Models/CartModel';
import { BuyerModel } from './components/Models/BuyerModel';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';    

console.log('CatalogModel');
const catalog = new CatalogModel();
catalog.setItems(apiProducts.items);
console.log('1. Все товары каталога после setItems:', catalog.getItems());

const firstId = apiProducts.items[0]?.id;
if (firstId) {
  const found = catalog.getItem(firstId);
  console.log(`2. Поиск товара с id="${firstId}":`, found);
}
const missing = catalog.getItem('несуществующий-id');
console.log('3. Поиск несуществующего товара:', missing);

if (catalog.getItems().length > 0) {
  const previewItem = catalog.getItems()[0];
  catalog.setPreview(previewItem);
  console.log('4. Товар для превью после setPreview:', catalog.getPreview());
}

const emptyCatalog = new CatalogModel();
console.log('5. Превью у нового экземпляра (должен быть null):', emptyCatalog.getPreview());


console.log('CartModel');

const cart = new CartModel();

console.log('1. Пустая корзина:');
console.log('   - getItems:', cart.getItems());      
console.log('   - getCount:', cart.getCount());     
console.log('   - getTotal:', cart.getTotal());     
console.log('   - hasItem(любой):', cart.hasItem('1')); 

const itemA = apiProducts.items[0];
const itemB = apiProducts.items[1];

if (itemA && itemB) {
  cart.addItem(itemA);
  console.log('2. После добавления первого товара:');
  console.log('   - getItems:', cart.getItems());
  console.log('   - getCount:', cart.getCount());    
  console.log('   - hasItem(itemA.id):', cart.hasItem(itemA.id)); 

  cart.addItem(itemB);
  console.log('3. После добавления второго товара:');
  console.log('   - getCount:', cart.getCount());    
  console.log('   - Общая стоимость:', cart.getTotal());

 
  cart.addItem(itemA);
  console.log('4. После повторного добавления itemA (количество не должно измениться):');
  console.log('   - getCount:', cart.getCount());    

  
  console.log('5. hasItem для существующего товара:', cart.hasItem(itemA.id)); 
  console.log('   hasItem для несуществующего:', cart.hasItem('фейк-id'));     

  cart.removeItem(itemA.id);
  console.log('6. После удаления первого товара:');
  console.log('   - getItems:', cart.getItems());
  console.log('   - getCount:', cart.getCount());   
  console.log('   - hasItem(itemA.id):', cart.hasItem(itemA.id)); 

  cart.clear();
  console.log('7. После полной очистки корзины:');
  console.log('   - getItems:', cart.getItems());    
  console.log('   - getCount:', cart.getCount());   
  console.log('   - getTotal:', cart.getTotal());    
}


console.log('BuyerModel');

const buyer = new BuyerModel();

console.log('1. Начальные данные покупателя:', buyer.getData());

const initialErrors = buyer.validate();
console.log('2. Ошибки валидации на пустых данных:', initialErrors);

buyer.setData({ payment: 'card', email: 'test@example.com' });
console.log('3. После частичного заполнения (payment + email):', buyer.getData());

const partialErrors = buyer.validate();
console.log('   Ошибки валидации (должны остаться phone и address):', partialErrors);

buyer.setData({ phone: '+79991234567', address: 'ул. Пушкина, д. 10' });
console.log('4. После полного заполнения:', buyer.getData());

const fullErrors = buyer.validate();
console.log('   Ошибки валидации (должно быть null):', fullErrors);

buyer.clear();
console.log('5. После вызова clear():', buyer.getData());


console.log('Получение данных с сервера');

const baseApi = new Api(API_URL); 

const webApi = new WebLarekApi(baseApi);

const catalogModel = new CatalogModel();

webApi.getProducts()
    .then((data) => {
        catalogModel.setItems(data.items);
        console.log('Каталог товаров, загруженный с сервера:', catalogModel.getItems());
    })
    .catch((err) => {
        console.error('Ошибка получения товаров:', err);
    });