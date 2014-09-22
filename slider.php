<?php
function slider($ImageArray) { ?>
    <div class="slider_wrapper">
        <div class="slider">
            <? foreach($ImageArray as $Item) { ?>
                <div class="item">
                    <img src="img/slider/<?= $Item ?>">
                </div>
            <? } ?>
        </div>
        <div class="buttons">
            <div class="pagenumber"><span></span>/<?= sizeof($ImageArray)?></div>
            <a href="#" title="Go to the previous image." class="prev"></a>
            <a href="#" title="Go to the next image." class="next"></a>
        </div>
    </div>
<? } ?>