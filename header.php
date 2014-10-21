<?php
if ($access != 1) exit();
?>
<header id="header">
</header>
<div class="bordered">
    <h1 class="line"><span><a href="/"><img src="img/logo.png" width="560" height="48" alt="VALEEV & RAY" title="VALEEV & RAY"></a></span><span class="hidden"><a href="/">VALEEV & RAY</a></span></h1>
    <div class="left_line"></div>
    <div class="right_line"></div>
    <nav class="navbar navbar-default" role="navigation">
        <ul class="nav">
            <li <? if (isset($page) && $page == "about") echo "class='active'" ?> ><a href="?page=about">О компании</a></li>
            <li <? if (isset($page) && $page == "portfolio") echo "class='active'" ?> ><a href="?page=portfolio">Работы</a></li>
            <li <? if (isset($page) && $page == "servises") echo "class='active'" ?> ><a href="?page=servises">Направления</a></li>
            <li <? if (isset($page) && $page == "news") echo "class='active'" ?> ><a href="?page=news">Новости</a></li>
            <li <? if (isset($page) && $page == "contacts") echo "class='active'" ?> ><a href="?page=contacts">Контакты</a></li>
            <li class="show_menu"><a href="#">Меню</a></li>
        </ul>
    </nav>
    <div class="down_arrow"><a href="#down"></a></div>
    <div class="language"><a href="#">In English</a></div>
</div>
