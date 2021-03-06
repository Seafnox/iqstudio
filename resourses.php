<?php
if ($access != 1) exit();
?>
<div id="fade_menu">
    <nav class="navbar navbar-default" role="navigation">
        <ul class="nav">
            <li class="close_menu"><a href="#"></a></li>
            <li <? if (isset($page) && $page == "about") echo "class='active'" ?> ><a href="?page=about"><span>О компании</span></a></li>
            <li <? if (isset($page) && $page == "portfolio") echo "class='active'" ?> ><a href="?page=portfolio"><span>Работы</span></a></li>
            <li <? if (isset($page) && $page == "servises") echo "class='active'" ?> ><a href="?page=servises"><span>Направления</span></a></li>
            <li <? if (isset($page) && $page == "news") echo "class='active'" ?> ><a href="?page=news"><span>Новости</span></a></li>
            <li <? if (isset($page) && $page == "contacts") echo "class='active'" ?> ><a href="?page=contacts"><span>Контакты</span></a></li>
        </ul>
    </nav>
</div>
<div id="preloader">
    <img src="img/add.png" alt="unknown"/>
    <img src="img/big_slide_arrows.png" alt="unknown"/>
    <img src="img/close.png" alt="unknown"/>
    <img src="img/down.png" alt="unknown"/>
    <img src="img/exclamation.png" alt="unknown"/>
    <img src="img/fancybox/close_button.jpg"  alt="unknown"/>
    <img src="img/fancybox/fancybox_loading.gif"  alt="unknown"/>
    <img src="img/fancybox/fancybox_overlay.png" alt="unknown"/>
    <img src="img/fancybox/blank.gif"  alt="unknown"/>

    <!-- скрипты -->
    <script type="text/javascript" src="http://api-maps.yandex.ru/2.1/?load=package.standard&lang=ru-RU"></script>
    <script type="text/javascript" src="js/1.jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="js/jquery.reject.js"></script>
    <script type="text/javascript" src="js/jquery.placeholder.min.js"></script>
    <script type="text/javascript" src="js/jquery.fancybox.pack.js"></script>
    <script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
    <script type="text/javascript" src="js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
    <script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>
    <script type="text/javascript" src="js/jquery.carouFredSel-6.2.1-packed.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
</div>
