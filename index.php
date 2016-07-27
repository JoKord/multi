<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>MultiChoice</title>
        <link rel="stylesheet" href="js/vendor/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="js/vendor/bootstrap/css/bootstrap-theme.css">
        <link rel="stylesheet" href="js/vendor/dynatree/skin/ui.dynatree.css">
        <link rel="stylesheet" href="css/index.css">
        <link rel="stylesheet" href="css/details.css">
        <link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon">
        <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    </head>
    <body>
        <div id="my-alert" class="my-alert"></div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div id="top" class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#"><img src="assets/mc-logo-hz.png"></a>
                </div>               
                <form id="login-form" class="navbar-form navbar-right" role="login">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1"> <span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
                        <input type="text" name="username" class="form-control" placeholder="Nome de Utilizador" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1"> <span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
                        <input type="password" name="password" class="form-control" placeholder="Password" aria-describedby="basic-addon1">
                    </div>
                    <button type="submit" class="btn btn-black">Iniciar Sessão</button>
                </form>               
            </div>
        </nav>  
        <div id="container_toggle" class="container-fluid">
            <section class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 sidebar">
                    <ul class="nav nav-sidebar">
                        <hr>
                        <li id="sel_map" data-vis="map" class="visual side-1 active"><a href="#"><i class="glyphicon glyphicon-globe"></i> Mapa <span class="sr-only">(current)</span></a></li>
                        <li id="sel_detail" data-vis="detail" class="visual side-2"><a href="#"><i class="glyphicon glyphicon-signal"></i> Detalhe</a></li>                        
                        <hr>
                        <li data-ind="vendasdirectas" class="idc side-3"><a href="#"><i class="glyphicon glyphicon-map-marker"></i> Vendas Directas</a></li>
                        <li data-ind="clientes" class="idc side-4"><a href="#"><i class="glyphicon glyphicon-map-marker"></i> Clientes</a></li>
                        <li data-ind="instaladores" class="idc side-5"><a href="#"><i class="glyphicon glyphicon-map-marker"></i> Instaladores</a></li>
                        <li data-ind="canaisvendaindirecta" class="idc side-6"><a href="#"><i class="glyphicon glyphicon-map-marker"></i> Canais Venda Indirecta</a></li>                     
                        <li data-ind="concorrencia" class="idc side-7"><a href="#"><i class="glyphicon glyphicon-map-marker"></i> Concorrência</a></li>
                    </ul>
                    <ul class="nav nav-sidebar well">
                        <div id="indicadores_title"></div>
                        <article id="concorrencia"></article>
                        <article id="indicadores">                           
                        </article>
                    </ul>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 main">
                    <div id="map_area">
                        <div id="loader" style="display:none;">
                            <div><img style="margin-top: 200px;" src="assets/mc-logo-hz.png"></div>
                            <div style="margin-top: 20px;"><img src="assets/loader.gif"></div>
                        </div>
                        <div id="registos" class="effect1" style="display: none;"><i class="glyphicon glyphicon-tag"></i><span> Foram encontrados <b>0</b> registos.</span></div>
                        <div id="radio-cvd" style="display:none;">
                            <input id="radio-cvd-t" type="radio" name="cluster" value="t" checked/><label for="radio-cvd-t"> Tudo</label><br>
                            <input id="radio-cvd-n" type="radio" name="cluster" value="qqt" /><label for="radio-cvd-n"> Número de Vendas</label><br>
                            <input id="radio-cvd-v" type="radio" name="cluster" value="prc" /><label for="radio-cvd-v"> Valor de Vendas</label><br>
                        </div>
                        <div id="basemap"></div>
                    </div>
                    <div id="details" >
                        <div class="center-details">
                            <i class="glyphicon glyphicon-alert"></i> Não existem neste momento detalhes para apresentar... <i class="glyphicon glyphicon-alert"></i>
                        </div>
                    </div>
                </div>
            </section>
        </div>  
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script data-main="main.js" src="vendor/require.js/require.js"></script>
    </script>
</body>
</html>
