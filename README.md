<h1>Калькулятор расчета цены доставки</h1>
настроить параметры можно через
<pre>
<code>
var CalcuatorConfig = {
            url: "/calc/sdk/mrozk/ajax.php", // url к обработчику ajax.php
            imageFolder: '/calc/images/companylogos/', //
            itemMark: '<div><img src="{image}"/> , {price}, {duration}, {companyname}, {companyid}</div>',

        };
</code>
</pre>
url - путь к файлу ajax.php который находится в папке sdk

imageFolder - папка с картинками компаний

itemMark - Для того чтобы настроить верстку елементов результирующих компаний нужно переопределить параметр, Элементы в скобках
соответствуют переменным;


<h1>Можно обрабатывать следующие  события путем переопределения методов объекта DDeliveryCalculator:</h1>
1. Перед поиском города cityBeforeSend: function(xhr)
2. После поиска города onCityChange
3. Перед поиском компаний метод companyBeforeSend(xhr)
4. После поска компаний на сервере onCompanyChange

<p>Если такая возможность не требуется то можно удалить методы из примера</p>

