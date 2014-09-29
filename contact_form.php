<?php
?>
<div class="block contact_block">
    <form id="contact_form" method="post" action="?page=contact_form">
        <div class="hr"></div>
        <h1 class="noline">Связаться с нами</h1>
        <p class="nessesary">* - Обязательные поля</p>
        <p class="notify">Заполните форму и мы свяжемся с Вами в течении суток</p>
        <div class="input string">
            <input name="name" id="input_name" placeholder="Имя" class="input_text" type="text">
            <span class="nessesary_input"></span>
        </div>
        <div class="input string">
            <input name="phone" id="input_phone" placeholder="Телефон" class="input_text" type="tel" required="required">
            <span class="nessesary_input">*</span>
        </div>
        <div class="input string">
            <textarea name="question" id="input_question" placeholder="Предмет вопроса" cols="4"></textarea>
            <span class="nessesary_input"></span>
        </div>
        <div class="actions">
            <button class="input_submit" type="submit">отправить заявку<span class="after"></span></button>
        </div>
    </form>
</div>