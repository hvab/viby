# link

Используется для создания различных типов ссылок.

## Модификаторы блока

| Модификатор                                                                                      | Описание                                                                                                             |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `link_pseudo`                                                                                    | Псевдоссылка. Отличается от обычной ссылки тем, что при клике по ссылке переход на новую страницу не осуществляется. |
| `link_disabled`                                                                                  | Неактивное состояние.                                                                                                |
| `link_size_s`, `link_size_m`, `link_size_l`                                                      | Размер блока.                                                                                                        |
| `link_view_minor`, `link_view_external`, `link_view_text`, `link_view_ghost`, `link_view_strong` | Тип визуального выделения ссылки.                                                                                    |

## Примеры

```html
<a href="#" class="link link_view_default">default</a>
<a href="#" class="link link_view_default" aria-disabled="true">default</a>
<br />
<a href="#" class="link link_view_minor">minor</a>
<a href="#" class="link link_view_minor" aria-disabled="true">minor</a>
<br />
<a href="#" class="link link_view_external">external</a>
<a href="#" class="link link_view_external" aria-disabled="true">external</a>
<br />
<a href="#" class="link link_view_text">text</a>
<a href="#" class="link link_view_text" aria-disabled="true">text</a>
<br />
<a href="#" class="link link_view_default link_pseudo">pseudo</a>
<br />
<a href="#" class="link link_view_default link_disabled">disabled</a>
```
