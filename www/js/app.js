// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function (require) {
    var $ = require('jquery'),
        fitText = require('jquery.fittext'),
        rssurl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=9140ee24103c12f5941716f2288ed149&_render=json';

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    //Big, responsive title
    $('#title').fitText(1.0);

    //Loading icon
    $('#list').html('<img src="img/328.gif" alt="Loading..."/>');

    //Get feed
    $.get(rssurl, function (data) {
        var $object, lastArticle, i;

        //Check browser in case data needs to be parsed
        if ($.browser.mozilla) {
            $object = $.parseJSON(data);
            //Show install button if browser is a mozilla one
            $('#install-btn').show();
        } else if ($.browser.safari) {
            $object = data;
        } else {
            $object = data;
        }
        //Loop each item in value
        for (i = $object.value.items.length - 1; i >= 0; i--) {
            //Skip last for better design
            if(!(i === 9)) {
                //Prepend the results into #list
                $('#list').prepend('<li style="opacity: '+ (1.2 - i/10) +'"><a href="' + $object.value.items[i].link + '" style="color: rgba(255, 255, 255, '+ (1.4 - i/10) +')" target="_blank">' + $object.value.items[i].title + '</li>');
            }
        };
        //Remove loading icon
        $('#list img').remove();
        //Check when the latest article was published
        lastArticle = $object.value.items[0]['y:published'];
        //Append it to #latest
        $('#latest').append('Latest article: ' + lastArticle.day_name.toString() + ', ' + lastArticle.day + ' ' + lastArticle.month_name + ' ' + lastArticle.year);
    });
});