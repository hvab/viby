# media

Используется для создания блока с картинкой (или другим медиа-объектом) слева или справа от текста.

## Модификаторы элементов

| Модификатор | Описание |
|-------------|----------|
| `media__object_align_middle` | Выравнивает объект вертикально по центру. |
| `media__object_align_bottom` | Прижимает объект к низу. |


## Примеры

### Обычное расположение
```html
<div class="media">
  <div class="media__object"><img src="http://via.placeholder.com/100x100" width="100" height="100" alt="image"></div>
  <div class="media__body">
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
  </div>
</div>
```

### Объект справа и вертикально по центру
```html
<div class="media">
  <div class="media__body">
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
  </div>
  <div class="media__object media__object_align_middle"><img src="http://via.placeholder.com/100x100" width="100" height="100" alt="image"></div>
</div>
```
