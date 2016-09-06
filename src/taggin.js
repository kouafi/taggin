/*
 *  jquery-taggin - v0.1a.0
 *  A lighweight jQuery plugin to create tags/keywords.
 *  https://github.com/kouafi/taggin
 *
 *  Copyright (c) 2016
 *  MIT License
 */
// -- Github Repository --------------------------------------------------------
$.fn.taggin = function() {
    $('<input>').attr({
        type: 'text',
        class: 'tagger',
        name: 'tagger',
        placeholder: 'A tag'
    }).appendTo(this);
    $('<div>').attr({
        class: 'tagged'
    }).prependTo(this);
    $('<ul>').appendTo('.tagged', this);
    $('<input>').attr({
        type: 'hidden',
        class: 'tags',
        name: 'tags'
    }).appendTo(this);

    $('.tags input.tagger').keypress(function(e) {
        if (e.which == 13) {
            var val = $(this).val();
            if ($('.tags input.tags').val().indexOf(val) >= 0) {
                alert(val + ' was already tagged.');
            } else {
                $('<li>' + val + '<span class="rm">x</span></li>').appendTo('.tagged ul');
                var current_tags = $('.tags input.tags').val();
                if (current_tags.length === 0) {
                    var updated_tags = current_tags.concat(val);
                } else {
                    var updated_tags = current_tags.concat(', ' + val);
                }
                $('.tags input.tags').val(updated_tags);
            }
            $(this).val('');
        }
    });

    this.on('click', '.tagged ul li span.rm', function() {
        this.closest('li').remove();
        var tag_id = $(this).closest('li').clone().children().remove().end().text();
        if ($('.tags input.tags').val().toLowerCase().indexOf(tag_id) >= 0) {
            if ($('.tags input.tags').val().indexOf(', ' + tag_id) >= 0) {
                var o1 = new RegExp(', ' + tag_id, 'g');
                var o2 = new RegExp(tag_id, 'g');
                var updated_tags = $('.tags input.tags').val().replace(o1, '');
                var updated_tags = updated_tags.replace(o2, '');
                if (updated_tags.substring(0, 2) == ", ") {
                    var updated_tags = updated_tags.replace(', ', '');
                }
            } else {
                var o = new RegExp(tag_id, 'g');
                var updated_tags = $('.tags input.tags').val().replace(o, '');
            }
            if (updated_tags.substring(0, 2) == ", ") {
                var updated_tags = updated_tags.replace(', ', '');
            }
            $('.tags input.tags').val(updated_tags);
        }
    });
};