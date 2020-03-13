<html>
<body>  
<h1>
CRUD SprignBoot + React.js + Postgres
</h1>

<a href="https://hub.docker.com/r/ninrrad/samaiait_docker.img">imagen no dockerhub ninrrad/samaiait_docker.img </a>

comando para baixar a imagem   : "docker pull ninrrad/samaiait_docker.img"</br>
comando para executar a imagem : "docker run  -p 8080:8080 -i -t -d ninrrad/samaiait_docker.img start"</br>
                           URL : <a href="http://localhost:8080/">localhost:8080</a></br>

O projeto deve ser importado pelo eclipse como um projeto Maven.

Para o funcionamento é necessario apenas a existencia da databse crud_avaliacao no postgres, 
que pode ser criado com os comandos DDL abaixo: 

CREATE DATABASE crud_avaliacao;

a conexão com o banco utiliza o usuario postgres com a senha 123, as configurações e podem ser alteradas no arquivo:

https://github.com/ninrrad/avalia-o_samaia/blob/master/AvaliacaoSamaiaIT/src/main/resources/application.properties

Nao tiven tempo de implementar o swagger para documentar a api, mas como utilizo tambem o thymeleaf, o mesmo exibe
uma descrição basica da API. 

Qualquer duvida envie um email para davidvlad@gmail.com. 
</body>   
</html>

