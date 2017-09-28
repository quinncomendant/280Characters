// Loop until init-data is available, then change the necessary settings.
var checkExists = setInterval(function() {
    if (document.getElementById('init-data') && document.getElementById('init-data').value != '') {
        // Next five lines by @Prof9 https://twitter.com/Prof9/status/912859110776950784
        var initDataInput = document.getElementById('init-data');
        var initData = JSON.parse(initDataInput.value);
        initData.deciders.cramming_feature_enabled = true;
        initData.deciders.cramming_ui_enabled = true;
        initDataInput.value = JSON.stringify(initData);
        // Add the new RadialCounter to all RichEditor-containers, except for those inside DMComposer-containers.
        document.querySelectorAll('.RichEditor-container').forEach(elm => {
            if (!document.querySelector('.DMComposer-container').contains(elm)) {
                elm.insertAdjacentHTML('beforeend', '<div class="RichEditor-rightItems RichEditor-bottomItems"> <div class="js-character-counter"> <div class="js-countdown-counter tweet-counter warn CountdownCounter"></div> <svg class="RadialCounter js-radial-counter" height="20" width="20"> <style> /* Global svg style overrides the overflow. Added svg for specificity */ svg.RadialCounter { margin-bottom: -4px; overflow: visible; transform: rotate(-90deg); } .RadialCounter--safe { stroke: #1da1f2; } .RadialCounter--warn { stroke: #ffad1f; } .RadialCounter--danger { stroke: #e0245e; } .RadialCounter-progressUnderlay { stroke: #ccd6dd; } @keyframes RadialCounterPulse { 0% { stroke-width:2 } 50% { stroke-width: 4; } 100% { stroke-width: 2; } } .RadialCounter--danger.RadialCounter--pulse, .RadialCounter--warn.RadialCounter--pulse { animation: RadialCounterPulse 0.3s ease-in-out; animation-iteration-count: 1; } </style> <circle class="RadialCounter-progressUnderlay" cx="50%" cy="50%" r="8" fill="none" stroke-width="1"></circle> <circle class="js-progress-circle RadialCounter--safe" cx="50%" cy="50%" r="8" fill="none" stroke-width="2" style="stroke-dashoffset: 46.2442; stroke-dasharray: 50.2655;"> </circle> </svg> </div> </div>');
            }
        });
        clearInterval(checkExists);
    }
}, 100);
document.addEventListener('DOMContentLoaded', function () {
    // Move the EmojiPicker to the top of the RichEditor-container.
    document.querySelectorAll('.RichEditor-bottomItems > .EmojiPicker').forEach(elm => {
        elm.parentElement.classList.add('RichEditor-topItems');
        elm.parentElement.classList.remove('RichEditor-bottomItems');
    });
    // Hide the old-style tweet-counter.
    document.querySelectorAll('.TweetBoxToolbar-tweetButton > span.tweet-counter').forEach(elm => {
        elm.style.display = 'none';
    });
}, false);
