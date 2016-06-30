<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>MultiChoice</title>
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap-theme.css">
        <link rel="stylesheet" href="js/vendor/dynatree/skin/ui.dynatree.css">
        <link rel="stylesheet" href="/css/index.css">
        <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon">
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#"><img src="/assets/mc-logo-hz.png"></a>
                </div>
                <form class="navbar-form navbar-right" role="login">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1"> <span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
                        <input type="text" class="form-control" placeholder="Nome de Utilizador" aria-describedby="basic-addon1">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1"> <span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
                        <input type="password" class="form-control" placeholder="Password" aria-describedby="basic-addon1">
                    </div>
                    <button type="submit" class="btn btn-black">Iniciar Sessão</button>
                </form>
            </div>
        </nav>  
        <div class="container-fluid">
            <section class="row">
                <article class="col-lg-2 col-md-2 col-sm-2 sidebar">
                    <ul class="nav nav-sidebar">
                        <hr>
                        <li data-vis="map" class="visual side-1 active"><a href="#"><i class="glyphicon glyphicon-globe"></i> Mapa <span class="sr-only">(current)</span></a></li>
                        <li data-vis="detail" class="visual side-2"><a href="#"><i class="glyphicon glyphicon-signal"></i> Detalhe</a></li>                        
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
                        <article id="indicadores"></article>
                    </ul>
                </article>
                <div class="col-lg-10 col-md-10 col-sm-10 col-lg-offset-2 col-md-offset-2 main">
                    <div id="basemap"></div>
                    <div id="details">Não Existem Detalhes Associados.</div>
                </div>
            </section>
        </div>  
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script data-main="main.js" src="vendor/require.js/require.js"></script>

        <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>-->       
        <!--<script src="/vendor/bootstrap/js/bootstrap.js"></script>-->
        <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>-->
        <!--<script src="https://www.google.com/jsapi"></script>-->
        <!--<script src="https://maps.google.com/maps/api/js?v=3"></script>-->
        <script src="/vendor/google/markercluster/markerclusterer.js"></script>
        <script>
            var test = null;
            /*(function () {
             var mapOptions = {
             zoom: 5,
             center: new google.maps.LatLng(-18.482051, 32.810217),
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             disableDefaultUI: true,
             styles: [{
             featureType: "poi",
             stylers: [
             {visibility: "off"}
             ]
             },
             {
             featureType: "transit.station",
             stylers: [
             {visibility: "off"}
             ]
             }, {
             featureType: "all",
             stylers: [
             {
             //saturation: -80
             //hue: "#ff2233"
             }
             ]
             }, {
             featureType: "administrative.country",
             elementType: "labels",
             stylers: [
             {visibility: "off"}
             ]
             },
             {
             featureType: "administrative.cities",
             elementType: "labels",
             stylers: [
             {visibility: "off"}
             ]
             }
             ]
             };
             map = new google.maps.Map(document.getElementById('basemap'), mapOptions);
             })();
             */
        </script>
    </body>
</html>
