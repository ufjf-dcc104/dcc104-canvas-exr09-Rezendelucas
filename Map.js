function Map(rows, collumns) {
  this.SIZE = 32;
  this.victory = false;
  this.coin;
  this.coins = 0;
  this.vetCoins = [];
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, img) {

  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c] == 1){
        ctx.fillStyle = "brown";
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 2){
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 3){
        ctx.fillStyle = "yellow";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 4){
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else if(this.cells[r][c] == 5){
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }else{};
      // 1 == plataforma
      // 2 == area livre
      // 3 == coin
      // 4 == player spawn
      // 5 == parede
    }
  }

  for (var i = 0; i < this.Coins; i++) {
      this.coin[i].desenharQuadrado(ctx);
      //this.tesouros[i].desenharObjeto(ctx, img.images[this.tesouros[i].imgKey]);
  }
};

 Map.prototype.deletaCoin = function(gx, gy){
    for (var i = 0; i < this.vetCoins.length; i++) {
      this.coin[i].localizacao(map);
      if(this.coin[i].gx == gx && this.coin[i].gy == gy){
         this.coin.splice(i, 1); 
      }
    }
 }; 


Map.prototype.showInformations = function(ctx){
  
  if(this.victory){
    ctx.fillStyle = "blue";
    ctx.fillText("Vitória", 285, 225);
  }

};

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          break;
        case 3:
          this.cells[i][j] = 3;
          coin = new Sprite();
          coin.x = (j+0.5)*map.SIZE;
          coin.y = (i+0.5)*map.SIZE;
          this.vetCoins.push(coin);
          this.coins++;
          break;
        case 4:
          this.cells[i][j] = 2;
          pc.y = (i+0.5)*map.SIZE;
          pc.x = (j+0.5)*map.SIZE;
          pc.g = 75;
          break;
        case 5:
          this.cells[i][j] = 5;
          break; 
        default:
          this.cells[i][j] = 2;
      }
    }
  }
};