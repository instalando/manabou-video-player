# Sobre o Projeto

Manabou Video Player é um aplicativo ainda em desenvolvimento com o objetivo em especial de agilizar os estudos de idiomas estrangeiros (Especialmente Japonês).

![Manabou Video Player Preview](https://user-images.githubusercontent.com/50197635/162561203-837cdef2-a503-4470-947c-7ae075da041d.png
)

### O que o Manabou Video Player pode fazer?

 - Navegar pela sua coleção semelhante a um gerenciador de arquivos
 - Exiba simultaneamente vários idiomas/faixas de legendas (Somente no formato SRT por enquanto)
 - Gerar anotações furigana automaticamente (somente em Japonês)
 - Passe o mouse sobre as palavras para ver as definições do dicionário (somente em Japonês)
 - *(Em Breve)* Exporte legendas como cartões de frases para o Anki instantaneamente via AnkiConnect
 - *(Em Breve)* Reproduza rapidamente a legenda atual e navegue para frente e para trás por legenda usando o teclado

# Usando Manabou Video Player

Antes de usar o Manabou Video Player, você precisa ter uma coleção de mídia organizada de forma semelhante ao Kodi ou Plex (cada filme/serie/anime em seu próprio diretório e também o nome de arquivo de legenda deve ser correspondente ao mesmo nome do arquivo de vídeo etc.). Observe que Manabou atualmente só pode reproduzir vídeos no formato **MP4**. Além disso, tenha em mente que Manabou não será útil a menos que você tenha legendas no idioma que está estudando.

Os nomes das legendas precisam seguir um padrão:

 - As legendas do seu idioma nativo precisam estar no **formato: episodio-1.srt**

 - As legendas do idioma que você está estudando precisam estar no **formato: episodio-1.jpn.srt** (esp. Japonês)

Se já estiver com sua coleção pronta, Abra o Manabou Video Player e navegue pelo Gerenciador de Arquivos até a pasta do vídeo.

# Compilando o Manabou Video Player

### Requisitos
 
 - Build Essential (Será necessário o build essential para compilar o sqlite3)
 - Node v16+
 - Yarn v1.22+


### Comandos para compilar
```sh
$ sudo apt install build-essential -y # Caso estiver no linux
$ yarn install
$ yarn electron:build
```

## Rodando em ambiente de desenvolvimento

Inicie os serviços de desenvolvimento com:
```sh
$ yarn electron:serve
```

O aplicativo Electron será aberto, com a janela principal servindo do servidor de desenvolvimento.
Uma pequena API será rodada em background usando Fastify no Host: http://localhost:3000/

