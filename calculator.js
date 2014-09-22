 var DDeliveryCalculator = (function($){
    var itemCompanyMarkup;
    var url;
    var imgFolder;
    var images = {
        '0': 'dd.png',
        '1': 'pickpoint.png',
        '3': 'img4.jpg',
        '4': 'boxberry.png',
        '7': 'qiwi.png',
        '11': 'hermes.png',
        '17': 'iml.png',
        '20': 'dpd-parsel.png',
        '23': 'dpd-consumer.png',
        '25': 'cdek.png',
        '26': 'cdek.png',
        '27': 'dpd-economy.png',
        '28': 'dpd-express.png',
        '29': 'dpd-classic.png',
        '30': 'ems.png',
        '34': 'lenod.png',
        '33': 'aplix.png',
        '35': 'aplix_dpd_black.png',
        '36': 'aplix_dpd_black.png',
        '37': 'aplix_imlogistics.png',
        '38': 'aplix_pickpoint.png',
        '39': 'aplix_cdek.png',
        '40': 'aplix_cdek.png',
        '41': 'kit.png',
        '43': 'iml.png',
        '44': 'russianpost.png',
        '45': 'aplix.png',
        '48': 'aplix_imlogistics.png'
    };


    var matchInt = /^[0-9]{1,}$/;

    var matchFloat = /^[0-9\.]{1,}$/;

    var searchTimeout = 0;

    function ajaxRender( data, callback, beforeSend ){
        $.ajax({
            url: url,
            beforeSend: beforeSend,
            type: "POST",
            data: data,
            dataType: "json",
            success:callback
        })
    };

    return {

        init: function ( config ) {

            var th = this;
            itemCompanyMarkup = config.itemMark;
            url = config.url;
            imgFolder = config.imageFolder;
            $('#ddcalc_search').keyup(function(){

                var title = $(this).val();
                var input = $(this);
                if (title.length >= 2) {
                    if(!searchTimeout)
                        clearTimeout(searchTimeout);
                    searchTimeout = setTimeout( th.searchCity(title) , 300);
                }
            });

            $('#ddcalc_btn').on('click', function(){

                var data = {};
                if( th.checkForm() ){
                    data = th.serializeForm();
                    th.sendForm( data );
                }else{
                    alert('Обнаружена ошибка в заполнении полей');
                }
                return false;

            });

            $(window).on('onCompanyChange', th.onCompanyChange);
            $(window).on('onCityChange', th.onCityChange);

        },

        // обрабатывает ивенты
        onCityChange:function(e, data){
            //console.log(e);
            //console.log(data);
        },
        onCompanyChange: function( e, data ){
            //console.log(e);
            //console.log(data);
        },
        companyBeforeSend: function(xhr){
            //console.log('company on before sent');
        },
        cityBeforeSend: function(xhr){
            //console.log('city on before sent');
        },
        searchCityCallBack: function ( result ){
            $('#ddcalc_citylistcont').empty();
            if( result.length > 0 ){
                var resultUl = $('<ul/>', {
                    class: 'ddcalc_citylist'
                });
                $.each(result, function(key,item){
                    var li = $('<li/>',{
                        value: item.id,
                        text:  item.label
                    });
                    li.appendTo(resultUl);
                    li.on('click', function(){
                        $('#ddcalc_to').val( $(this).attr('value') );
                        $('#ddcalc_citylistcont').empty();
                    });
                });
                $('#ddcalc_citylistcont').append(resultUl);
                $(window).trigger('onCityChange', result );
            }
        },

        getCompaniesCallBack: function( result ){
            var itemMark ;
            var ddcalc_container = $('#ddcalc_container');
            var ddcalc_containerself =  $('#ddcalc_containerself');
            var ddcalc_containercourier = $('#ddcalc_containercourier');
            //ddcalc_container.empty();
            ddcalc_containerself.empty();
            ddcalc_containercourier.empty();
            
            if( result.pickup.length > 0 ){
                $.each( result.pickup, function(key, item){
                    var image;
                    itemMark = itemCompanyMarkup;
                    itemMark = itemMark.replace(/\{price\}/, item.delivery_price);
                    itemMark = itemMark.replace(/\{duration\}/, item.delivery_time_min);
                    itemMark = itemMark.replace(/\{companyname\}/, item.delivery_company_name);
                    itemMark = itemMark.replace(/\{companyid\}/, item.delivery_company);
                    if( images[item.delivery_company] != 'undefined' ){
                        image = imgFolder + images[item.delivery_company];
                    }else{
                        image = imgFolder + images[0];
                    }
                    itemMark = itemMark.replace(/\{image\}/, image);
                    ddcalc_containerself.append(itemMark);
                });
            }

            if( result.courier.length > 0 ){
                $.each( result.courier, function(key, item){
                    var image;
                    itemMark = itemCompanyMarkup;
                    itemMark = itemMark.replace(/\{price\}/, item.delivery_price);
                    itemMark = itemMark.replace(/\{duration\}/, item.delivery_time_min);
                    itemMark = itemMark.replace(/\{companyname\}/, item.delivery_company_name);
                    itemMark = itemMark.replace(/\{companyid\}/, item.delivery_company);
                    if( images[item.delivery_company] != 'undefined' ){
                        image = imgFolder + images[item.delivery_company];
                    }else{
                        image = imgFolder + images[0];
                    }
                    itemMark = itemMark.replace(/\{image\}/, image);

                    ddcalc_containercourier.append( itemMark );
                });
            }
            $(window).trigger('onCompanyChange', result );
        },

        searchCity: function( cityName ){
            var th = this;
            var data = {
                dd_plugin:1,
                action: 'searchCity2',
                name: cityName
            }
            ajaxRender( data , th.searchCityCallBack, th.cityBeforeSend );
        },
        sendForm: function( data ){
            var th = this;
            data['dd_plugin'] = 1;
            data['action'] = 'getCompanies';

            ajaxRender( data , th.getCompaniesCallBack, th.companyBeforeSend );
        },
        serializeForm:function(){
            var data = {};
            $('.ddfield').each(function(){
                data[$(this).attr('name')] = $(this).val();
            });
            return data;
        },
        checkForm: function(){
            var error = 0;
            $('.ddfield').each(function(){

                if( $(this).val() == '' ){
                    error = 1
                }
                if( $(this).hasClass('int') ){
                    if( !matchInt.test( $(this).val() ) ){
                        error = 1;
                    }
                }

                if( $(this).hasClass('float') ){
                    if( !matchFloat.test( $(this).val() ) ){
                        error = 1;
                    }
                }
            });
            if( error == 0 ){
                return true;
            }
            return false;
        }

    }
})(jQuery);
