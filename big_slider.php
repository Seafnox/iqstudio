<?php
function big_slider($ImageArray) { ?>
    <div class="big_slider_wrapper slider_wrapper">
        <div class="slider">
            <? foreach($ImageArray as $Item) { ?>
                <div class="item">
                    <img src="img/slider/<?= $Item["href"] ?>" alt="" width="<?= $Item["width"] ?>" height="<?= $Item["height"] ?>">
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