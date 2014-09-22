<!DOCTYPE html>
<?
$access = 1;
$page = isset($_GET['page']) ? $_GET['page'] : "main";
?>
<html>
<? require("head.php"); ?>
	<body class="top <?= $page ?>">
    <? require("header.php"); ?>
        <div id="content">
            <? require($page.".php") ?>
        </div>
    <? require("footer.php"); ?>
    <? require("resourses.php"); ?>
    <? require("popup.php"); ?>
	</body>
</html>