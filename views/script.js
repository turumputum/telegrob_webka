//import  mqtt   from 'mqtt'
//import * as mqtt from "mqtt"
var step_run = 1000;
var step_rotate = 90;
var flag_busy = 0
//- const options = {
//-         keepalive: 30,
//-         clientId: 13334,
//-         protocolId: 'MQTT',
//-         protocolVersion: 4,
//-         clean: true,
//-         reconnectPeriod: 1000,
//-         connectTimeout: 30 * 1000,
//-         will: {
//-         topic: 'WillMsg',
//-         payload: 'Connection Closed abnormally..!',
//-         qos: 0,
//-         retain: true
//-         },
//-         rejectUnauthorized: false
//-     }

var client = mqtt.connect('ws://192.168.4.122:1890/mqtt')

client.on('connect', function () {
    console.log("mqtt brocker connected!");

    //- client.subscribe('player/state')
    //- client.subscribe('player/volume_val')
    //- client.subscribe('scheduler/current_playlist')
    //- client.subscribe('scheduler/on_off_time')
})

client.on('message', function (topic, message) {
    // message is Buffer
    //console.log(topic + ':'+message.toString())
})

$(document).ready(function () {
    console.log("ready!");
    $('#step_run_range').val(1000)
    $('#step_run_range_label').text(`step_run: ${1000}`)

    $('#step_rotate_range').val(90)
    $('#step_rotate_range_label').text(`step_rotate: ${90}`)

    $('#speed_range').val(1)
    $('#speed_range_label').text(`speed: 1.0`)

    $('#accel_G_range').val(1)
    $('#accel_G_range_label').text(`accel_G: 1.0`)

    $('#accel_B_range').val(1)
    $('#accel_B_range_label').text(`accel_B: 1.0`)

});

//$( "#target" ).mouseup(function(){})

$('#step_run_range').on("mouseup touchend", function () {
    $('#step_run_range_label').text(`step_run: ${$('#step_run_range').val()}`)
    console.log(`step_run:${$('#step_run_range').val()}`)
})

$('#step_rotate_range').on("mouseup touchend", function () {
    $('#step_rotate_range_label').text(`step_rotate: ${$('#step_rotate_range').val()}`)
    console.log(`step_rotate:${$('#step_rotate_range').val()}`)
})

$('#speed_range').on("mouseup touchend", function () {
    $('#speed_range_label').text(`speed: ${$('#speed_range').val()}`)
    console.log(`set speed:${$('#speed_range').val()}`)
    client.publish('cart/move', `speed:${$('#speed_range').val()}`)
})

$('#accel_G_range').on("mouseup touchend", function () {
    $('#accel_G_range_label').text(`accel_G: ${$('#accel_G_range').val()}`)
    console.log(`set accel_G:${$('#accel_G_range').val()}`)
    client.publish('cart/setup', `acceel:${$('#accel_G_range').val()},${$('#accel_B_range').val()}`)
})

$('#accel_B_range').on("mouseup touchend", function () {
    $('#accel_B_range_label').text(`accel_B: ${$('#accel_B_range').val()}`)
    console.log(`set accel_B:${$('#accel_B_range').val()}`)
    client.publish('cart/setup', `acceel:${$('#accel_G_range').val()},${$('#accel_B_range').val()}`)
})



$('#bt_forward').on('mousedown touchstart', function () {
    console.log(`move forward:${$('#step_run_range').val()}`)
    client.publish('cart/move', `forward:${$('#step_run_range').val()}`, { retain: true })
})
$('#bt_forward').on("mouseup touchend", function () {
    client.publish('cart/move', 'stop')
    console.log(`stop`)
})

$('#bt_backward').on('mousedown touchstart', function () {
    console.log(`move forward:-${$('#step_run_range').val()}`)
    client.publish('cart/move', `forward:-${$('#step_run_range').val()}`, { retain: true })
})
$('#bt_backward').on("mouseup touchend", function () {
    client.publish('cart/move', 'stop')
    console.log(`stop`)
})

$('#bt_right').on('mousedown touchstart', function () {
    console.log(`rotate right:${$('#step_rotate_range').val()}`)
    client.publish('cart/move', `right:${$('#step_rotate_range').val()}`, { retain: true })
})
$('#bt_right').on("mouseup touchend", function () {
    client.publish('cart/move', 'stop')
    console.log(`stop`)
})

$('#bt_left').on('mousedown touchstart', function () {
    console.log(`rotate left:${$('#step_rotate_range').val()}`)
    client.publish('cart/move', `left:${$('#step_rotate_range').val()}`, { retain: true })
})
$('#bt_left').on("mouseup touchend", function () {
    client.publish('cart/move', 'stop')
    console.log(`stop`)
})


left = 37, up = 38, right = 39, down = 40

$(document).keydown(function (e) {
    if (flag_busy == 0) {
        flag_busy = 1;
        switch (e.which) {
            case 37:
                console.log(`rotate left:${$('#step_rotate_range').val()}`)
                client.publish('cart/move', `left:${$('#step_rotate_range').val()}`, { retain: true })
                break;

            case 38:
                console.log(`move forward:${$('#step_run_range').val()}`)
                client.publish('cart/move', `forward:${$('#step_run_range').val()}`, { retain: true })
                break;

            case 39:
                console.log(`rotate right:${$('#step_rotate_range').val()}`)
                client.publish('cart/move', `right:${$('#step_rotate_range').val()}`, { retain: true })
                break;

            case 40:
                console.log(`move forward:-${$('#step_run_range').val()}`)
                client.publish('cart/move', `forward:-${$('#step_run_range').val()}`, { retain: true })
                break;

            default: return;
        }
        e.preventDefault();
    }
})

$(document).keyup(function (e) {
    if (e.which >= 37 && e.which <= 40) {
        client.publish('cart/move', 'stop')
        console.log(`stop`)
        flag_busy = 0
    }
    e.preventDefault();
})