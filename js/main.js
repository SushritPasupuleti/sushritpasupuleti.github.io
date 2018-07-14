$(document).ready(function() {
    $('#main').hide()

    // Intro animation

    var container = $("#intro")
        // RegEx identifies end of sentence
    var _sentenceEndExp = /(\.|\?|!)$/g;

    function machineGun(text) {

        var words = text.split(" "),
            tl = new TimelineMax({
                delay: 1,
                repeat: 0,
                repeatDelay: 4
            }),
            wordCount = words.length,
            time = 0,
            word, element, duration, isSentenceEnd, i;

        // For each word in the given string...
        for (i = 0; i < wordCount; i++) {
            word = words[i];
            isSentenceEnd = _sentenceEndExp.test(word);

            // Populate element variable with correct HTML
            element = $("<h3>" + word + "</h3>").appendTo(container)

            // Longer words stay on screen longer
            duration = Math.max(0.5, word.length * 0.12)


            // Last word stays on the screen for longer
            if (i == wordCount - 1) {
                duration += 2
                time += 0.8
            }

            // Long pause after each sentence
            if (isSentenceEnd) {
                duration += 0.8
                time += 0.8
            }

            TweenLite.set(element, {
                autoAlpha: 0,
                scale: 0,
                z: 0.01
            })
            tl.to(element, duration, {
                    scale: 1.2,
                    ease: SlowMo.ease.config(0.25, 0.9)
                }, time)
                .to(element, duration, {
                    autoAlpha: 1,
                    ease: SlowMo.ease.config(0.25, 0.9, true)
                }, time)
            time += duration - 0.05
        }
    }

    var timerBuffer = 0  // 15000

    setTimeout(function() {
        $('#intro').fadeOut(1000)
    }, timerBuffer)

    setTimeout(function() {
        $('#main').fadeIn(3000)
        $('#top').hide().slideDown(3000).fadeIn(3000)
        $('body').animate({
            'backgroundColor': '#fff',
            'color': '#000'
        }, 500)
    }, timerBuffer + 1000)
})
