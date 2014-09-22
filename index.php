<?php
/**
 * Created by PhpStorm.
 * User: mrozk
 * Date: 9/18/14
 * Time: 4:58 PM
 */

$cities = array(
                '1' => 'Москва',
                '2' => 'Санкт-Петербург',
                '3' => 'Ростов на Дону',
                '4' => 'Казань',
                '5' => 'Нижний Новгород',
                '6' => 'Новосибирск',
                '7' => 'Омск',
                '8' => 'Самара',
                '9' => 'Челябинск',
                '10' => 'Екатеринбург'
);
?>

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="calculator.js"></script>
<link rel="stylesheet" type="text/css" href="calculator.css">

<script type="text/javascript">
        var CalcuatorConfig = {
            url: "/calc/sdk/mrozk/ajax.php", // url к обработчику ajax.php
            imageFolder: '/calc/images/companylogos/',
            itemMark: '<div><img src="{image}"/> , {price}, {duration}, {companyname}, {companyid}</div>',

        };

        $( document).ready(function(){


            DDeliveryCalculator.onCompanyChange = function(e, data){
                console.log('oncompanyChange');
            }

            DDeliveryCalculator.onCityChange = function(e, data){
                console.log('onCityChange');
            }

            DDeliveryCalculator.companyBeforeSend = function(xhr){
                console.log('companyBeforeSend');
            }

            DDeliveryCalculator.cityBeforeSend = function(xhr){
                console.log('cityBeforeSend');
            }

            DDeliveryCalculator.init(CalcuatorConfig);

        });
</script>

<div>
        <div>
            Откуда
            <select id="ddcalc_from" name="ddcalc_from" class="ddfield" >
                <?foreach( $cities as $key=>$item ):?>
                    <option value="<?=$key?>"><?=$item?></option>
                <?endforeach?>
            </select>
        </div>
        <div>
            Куда
            <div>
                <input type="hidden" id="ddcalc_to" name="ddcalc_to" class="ddfield int" value="0" />
                <input placeholder="Введите город" id="ddcalc_search" autocomplete="off" name="name" type="text" class="" />
            </div>
            <!-- Контейнер для списка городов -->
            <div id="ddcalc_citylistcont" style="position: relative"></div>
            <!-- end -->
        </div>

        <div>
            Оценочная стоимость
            <input placeholder="" name="ddcalc_payment" type="text" class="ddfield int" value="1500" />
        </div>
        <div>
            Вес (кг)
            <input placeholder="" name="ddcalc_weight" type="text" class="ddfield float" value="0.8" />
        </div>

        <div>
            Ширина (см)
            <input placeholder="" name="ddcalc_width" type="text" class="ddfield int" value="15" />
        </div>

        <div>
            Высота (см)
            <input placeholder="" name="ddcalc_height" type="text" class="ddfield int" value="6" />
        </div>

        <div>
            Длина (см)
            <input placeholder="" name="ddcalc_length" type="text" class="ddfield int" value="12" />
        </div>

        <div>
            <button id="ddcalc_btn" class="ddcalc_btn">Подсчитать</button>
        </div>

</div>
<!-- Контейнер для компаний -->
<div id="ddcalc_container">
    <div id="ddcalc_containerself"></div>
    <div id="ddcalc_containercourier"></div>
</div>



