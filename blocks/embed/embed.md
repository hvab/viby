# embed

Блок для встраиваемых компонентов на сайт через `iframe`, `embed`, `object`, `video`.

## Модификаторы блока

| Модификатор | Описание |
|-------------|----------|
| `embed_ratio_21by9`, `embed_ratio_16by9`, `embed_ratio_4by3`, `embed_ratio_1by1` | Соотношения сторон встраиваемого объекта. |

## Примеры

```html
<em>16by9:</em>
<div class="embed embed_ratio_16by9 text text_paragraph">
  <iframe class="embed__object" src="//www.youtube.com/embed/FnzHOsiaJns?rel=0" allowfullscreen></iframe>
</div>

<em>1by1:</em>
<div class="embed embed_ratio_1by1">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.8936016034904!2d30.30429631619258!3d59.93390766944212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696311b867a3a49%3A0x1db57252b47d25e9!2z0JjRgdCw0LDQutC40LXQstGB0LrQuNC5INGB0L7QsdC-0YA!5e0!3m2!1sru!2s!4v1486669961920" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
</div>
```
