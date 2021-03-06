'use strict';

function showRSS(str) {
    let xmlhttp;

    if (str.length == 0) {
        document.getElementById("rss-container").innerHTML="";
        return;
    }

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();

    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            document.getElementById("rss-container").innerHTML=this.responseText;
        }
    }

    // Comment
    xmlhttp.open("GET","php/getrss.php?q="+str,true);
    xmlhttp.send();
}

function initUbuntuButtons(){
    $(".btn.close").each(function(){

        let dataGroup = $(this).attr("data-target-group");

        $(this).click(function(event){
            event.preventDefault();
            $("[data-group="+ dataGroup + "]").each(function(){
                $(this).fadeOut();
            });
        });
    });

    $(".btn.min").each(function(){

        let dataTarget = $(this).attr("data-target");

        $(this).click(function(event){
            event.preventDefault();
            $("#" + dataTarget).fadeOut();
        });
    });

    $(".btn.max").each(function(){

        let dataTarget = $(this).attr("data-target");

        $(this).click(function(event){
            event.preventDefault();
            $("#" + dataTarget).fadeIn();
        });
    });
}

function closeAllWindows(){
    $(".btn.close").each(function(){
        $(this).trigger("click");
    });
}

function restoreAllWindows(){
    $("[data-group]").each(function(){
        $(this).fadeIn();
    });
}

function minimiseAllWindows(){
    $(".btn.min").each(function(){
        $(this).trigger("click");
    });
}

function maximiseAllWindows(){
    $(".btn.max").each(function(){
        $(this).trigger("click");
    })
}

function initTopbarButtons(){
    $("#close-all").click(function(){
        closeAllWindows();
    });

    $("#restore-all").click(function(){
        restoreAllWindows();
    })

    $("#minimise-all").click(function(){
       minimiseAllWindows();
    });

    $("#maximise-all").click(function () {
        maximiseAllWindows();
    });
}

function getCurrentTime(){

    let d = new Date();
    let h = d.getHours();
    let apm;

    if (h > 12){
        h -= 12;
        apm = "PM";
    }

    else{
        apm = "AM";
    }

    let m = d.getMinutes();

    return h.toString() + ":" + (m < 10? "0" : "") + m.toString() + " " + apm;
}

function initClock(){

    $("#clock").text(getCurrentTime());

    setInterval(function(){
        $("#clock").text(getCurrentTime());
    }, 1000);
}

$(function(){

    let typewriter = {
        text: [
            "Who's There...?",
            "Welcome, stranger." +
            "^Do you know what this place is about?",
            "Fine. This place belongs to Donghoon Jang... " +
            "^Do you know who he is?",
            "As I heard, he's a 3rd software engineering student at Australian National University..",
            "He frequently comes back to this place to store pieces of precious knowledge he learns from outside...",
            "Because This place was just made, you, Moron!",
            "Phew.. Come back and check a few days later." +
            "^He's not as rude as I am at least..",
            "- Old man slams the door -"
        ],
        nextBtnText: [
            "Umm... just looking around?",
            "No... Mind telling me now?",
            "Never heard of the name",
            "So what...?",
            "I don't see anything here..",
            "Okay, okay. Calm down...",
            "Sure, I will! Thanks!"
        ],

        timeouts: [],
        current: 0,
        interval: 25,
        target: 'typewriter',
        nextBtn: 'btn next',
        prevBtn: 'btn prev',

        init: function (sec) {

            this.interval = sec;

            document.getElementById(this.target)
                .getElementsByClassName(this.nextBtn)[0]
                .addEventListener('click', (event) => {
                    typewriter.next();
                    typewriter.write();
                    event.preventDefault();
                });

            document.getElementById(this.target)
                .getElementsByClassName(this.prevBtn)[0]
                .addEventListener('click', (event) => {
                    typewriter.prev();
                    typewriter.write();
                    event.preventDefault();
                });

        },

        write: function (){

            let str = this.text[this.current];
            let strlen = str.length;
            var elem = document.getElementById(this.target).getElementsByClassName('text')[0];

            var nextBtn = document.getElementById(this.target).getElementsByClassName(this.nextBtn)[0];
            var prevBtn = document.getElementById(this.target).getElementsByClassName(this.prevBtn)[0];
            var btnStr = this.nextBtnText[this.current];

            nextBtn.innerHTML = '>_ ' + btnStr;

            elem.innerText = "";

            this._clearTimeouts();
            this._hideBtn();

            for (let i = 0; i < str.length; i++){

                let char = str.charAt(i);

                this.timeouts.push(setTimeout(function(){

                    if (char == "^"){
                        elem.appendChild(document.createElement("br"));
                    }

                    else{
                        elem.innerHTML = elem.innerHTML + char;
                    }

                }, this.interval * i));

                if (i == str.length -1){
                    this.timeouts.push(setTimeout(function(){
                        typewriter._showBtn();
                    }, this.interval * i + 750));
                }
            }

        },

        next: function() {
            if ((typewriter.current +1) < typewriter.text.length){
                typewriter.current++;
            }
        },

        prev: function() {
            if ((this.current -1) >= 0){
                this.current--;
            }
        },

        _showBtn: function(){
            if ((this.current +1) >= this.text.length){
                document.getElementById(this.target).getElementsByClassName(this.nextBtn)[0].style.display = "none";
            }

            else {
                document.getElementById(this.target).getElementsByClassName(this.nextBtn)[0].style.display = "inline-block";
            }


            if ((this.current -1) < 0){
                document.getElementById(this.target).getElementsByClassName(this.prevBtn)[0].style.display = "none";
            }

            else {
                document.getElementById(this.target).getElementsByClassName(this.prevBtn)[0].style.display = "inline-block";
            }
        },

        _hideBtn: function(){
            document.getElementById(this.target).getElementsByClassName(this.nextBtn)[0].style.display = "none";
            document.getElementById(this.target).getElementsByClassName(this.prevBtn)[0].style.display = "none";
        },

        _clearTimeouts : function(){
            var t;

            while (this.timeouts.length){
                t = this.timeouts.pop();
                window.clearTimeout(t);
            }
        }

    };

    typewriter.init(25);
    typewriter.write();
    showRSS('https://www.darkreading.com/rss_simple.asp');

    //Initialise tooltips and popovers -- Must
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    initUbuntuButtons();
    initTopbarButtons();
    initClock();

});