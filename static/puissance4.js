class Puissance4 {

  constructor(ai = false) {
    // On détecte si le joueur joue seul
    this.ai = ai;

    // On met en place le nombre de lignes et de colonnes de la grille
    this.rows = 6;
    this.cols = 7;

    // On met en place le nombre de tour
    this.turn = 1;

    // On désigne celui qui commence la partie
    this.starter = Math.round(Math.random());
    const player = ((this.turn - this.starter) % 2 + 1)
    $('span#player-coin-' + player).show();

    // On met en place une variable qui stockera l'utilisateur gagnant
    this.winner = null;

    // On construit un tableau de tableau contenant this.rows de rangées chacune ayant this.cols colonnes
    this.grid = [];
    for(let r = 0; r < this.rows; r++) {
      this.grid[r] = Array(this.cols).fill(null);
    }

    // A chaque clic sur le tableau, la fonction handleClick se lance
    this.recoverClick();

    $('button.reset').on('click', function (e) {
      self.resetGrid();
    })

    this.setGrid();

    // On teste si l'IA commence
    this.ai ? this.playAI() : null
  }

  // Construit la grille
  setGrid() {
    let tabContent = ''
    for (let r = this.rows - 1; r >= 0; r--) {
      tabContent += '<tr>'
      for (let c = 0; c <= this.cols - 1; c++) {
        tabContent += '<td col="' + c + '" class="player'+ this.grid[r][c] +'"></td>'
      }
      tabContent += '</tr>'
    }
    // On vide l'élement puis on le recrée
    $('table#puissance4').empty().append(tabContent)
  }

  // Remet la grille à zéro
  resetGrid() {
    $('a#main-title').text('Puissance 4')
    $('button#reset-grid').hide();

    this.turn = 1;
    this.winner = null;

    this.starter = Math.round(Math.random());
    const player = (this.turn - this.starter) % 2 + 1
    $("span[id^='player-coin-']").hide()
    $('span#player-coin-' + player).show()

    this.grid = [];
    for(let r = 0; r < this.rows; r++) {
      this.grid[r] = Array(this.cols).fill(null)
    }

    this.recoverClick();
    this.setGrid();

    this.ai ? this.playAI() : null
  }

  // Détection du clic sur une des cellules du tableau
  handleClick(event) {
    if (event.target.attributes.col && !this.winner) {
      const selected_col = parseInt(event.target.attributes.col.value)
      let reached_row = this.getMouvement(selected_col)
      if (reached_row === null) {
      } else {
        // On vérifie si une ligne a été complété
        this.determineWinner(reached_row, selected_col)

        this.ai ? this.playAI() : null;
      }
    }
  }

  // Corps de l'IA qui cherche les meilleurs coups puis joue automatiquement
  playAI() {
    // Si c'est au tour de l'IA
    if ((this.turn - this.starter) % 2 === 0) {

      let best_values = Array(this.cols).fill(0)
      let best_values_ad = Array(this.cols).fill(0)
      for (let c = 0; c < this.cols; c++) {
        for(let r = 0; r < this.rows; r++) {
          if (this.grid[r][c] === null) {
            // On récupère les meilleurs valeurs pour l'IA et le joueur
            best_values_ad = this.checkLinesAI(r, c, best_values_ad, 2)
            best_values = this.checkLinesAI(r, c, best_values, 1)
            break;
          }
        }
      }

      let selected_col;
      // Si l'utilisateur a au moins une façon de gagner, alors l'IA le bloque
      if (best_values_ad.includes(4)) {
        let max_values_ad = this.getMaxIndexes(best_values_ad)
        selected_col = max_values_ad[Math.floor(Math.random() * max_values_ad.length)]
      }
      // Si l'IA peut gagner, alors elle préferera utiliser cette opportunité au lieu de bloquer
      // OU
      // Si il n'y a pas d'opportunité directe de victoire, on prend un des colonnes avec le plus de valeurs
      if (best_values.includes(4) || (!(best_values_ad.includes(4)) && !(best_values.includes(4)))) {
        let max_values = this.getMaxIndexes(best_values)
        selected_col = max_values[Math.floor(Math.random() * max_values.length)]
      }
      let reached_row = this.getMouvement(selected_col)

      if (reached_row !== null) {
        this.determineWinner(reached_row, selected_col)
      }
    }
  }

  // Rétablit le clic utilisateur sur la grille
  recoverClick() {
    // Si la table Puissance 4 n'a plus d'evenement onClick()
    if (!($._data($("table#puissance4")[0], "events"))) {
      self = this;
      // On lui remet
      $('table#puissance4').on('click', function (event) {
        self.handleClick(event);
      })
    }
  }

  // Vérifie si l'ajout d'une pièece sur une colonne est posssible
  getMouvement(col) {
    let reached_row = null;
    for(let r = 0; r < this.rows; r++) {
      if (this.grid[r][col] === null) {
        reached_row = r
        break;
      }
    }
    if (reached_row !== null) {
      this.placePiece(reached_row, col)
      return reached_row;
    }
    return null;
  }

  // Place la pièece
  placePiece(row, col) {
    const player = ((this.turn - this.starter) % 2 + 1)
    this.grid[row][col] = player;
    this.turn++;

    // On indique quel utilisateur doit jouer avec des éléments graphiques
    $("span[id^='player-coin-']").show()
    $('span#player-coin-' + player).hide()
  }

  // Détermine si un des deux joueurs a complété une ligne
  determineWinner(row, col) {
    let result = this.checkLines(row, col)
    if (result) {
      this.winner = (this.turn - 1 - this.starter) % 2 + 1
    } else if ((this.turn - 1) === this.rows * this.cols) {
      this.winner = 0;
    }

    // Si l'action d'ajouter une pièce a été validé, on reconstruit la grille
    this.setGrid();

    if (this.winner || this.winner === 0) {
      if(this.winner){
        var wer = this.winner == 1 ? "IA" : $('#p1').text();
        var modalwin = new tingle.modal({
          footer: true,
          stickyFooter: false,
          closeMethods: ['overlay', 'button', 'escape'],
          cssClass: ['custom-class-1', 'custom-class-2'],

        });
        modalwin.setContent('<h3>'+ wer +' win</h3><p> You will be redirected to Score page.</p>');
        modalwin.addFooterBtn('Ok', 'tingle-btn tingle-btn--primary', function() {
          var path = "/add_scores/" + wer;
          console.log(path);
          window.location.replace(path);
          modalwin.close();
      });
        modalwin.open();

        }
      $('a#main-title').text(this.winner !== 0 ? `Victoire de Joueur ${this.winner} !` : `Egalite !`)
      $('table#puissance4').off('click')
      $('button#reset-grid').show();
    }
  }

  // Vérifie toutes les lignes à partir de la dernière pièce ajoutée pour savoir si une ligne est complétée
  checkLines(row, col) {
    // On récupère le joueur qui a joué au tour précédent (le joueur qui vient juste de se faire valider son placement)
    // Voir placePiece() où on incrémente les tours avant d'effectuer plus tard cette fonction
    const player = ((this.turn - this.starter) + 1) % 2 + 1
    // On va tester dans toutes les directions à partir de la dernière pièce posée si une ligne a été complété
    // Horizontal
    let count = 0;
    for (let c = 0; c < this.cols; c++) {
      (this.grid[row][c] === player) ? count++ : count = 0;
      if (count === 4) return true
    }

    // Vertical
    count = 0;
    for (let r = 0; r < this.rows; r++) {
      (this.grid[r][col] === player) ? count++ : count = 0;
      if (count === 4) return true
    }

    // Diagonale (gauche-droite)
    // On détermine la base de la diagonale en X et Y selon les coordonnées de la dernière pièce ajoutée
    count = 0;
    let baseRow = row - col > 0 ? row - col : 0;
    let baseCol = col - row;
    // On parcours en escalier la grille à partir de la base de la diagonale en X (baseRow)
    for (let d = baseRow; d < this.rows; d++) {
      // Pour chaque itération, on décale l'escalier d'une colonne en Y (baseCol)
      (this.grid[d][d + baseCol] === player) ? count++ : count = 0;
      if (count === 4) return true
    }

    // Diagonale inversée
    // Même chose que pour une diagonale mais parcours de l'escalier inversé
    count = 0;
    baseRow = row + col < this.rows - 1 ? row + col : this.rows - 1;
    baseCol = col + row;
    for (let d = baseRow; d >= 0; d--) {
      (this.grid[d][baseCol - d] === player) ? count++ : count = 0
      if (count === 4) return true
    }

    return false;
  }

  // Evalue les meilleurs coups pour l'IA (fait à partir de la base de checkLines)
  checkLinesAI(row, col, best_values, player) {
    let count = 0;
    for (let c = 0; c < this.cols; c++) {
      if (col === c) {
        count++;
      } else {
        (this.grid[row][c] === player) ? count++ : count = 0;
      }
      (best_values[col] < count) ? best_values[col] = count : null;
    }

    count = 0;
    for (let r = 0; r < this.rows; r++) {
      if (row === r && col) {
        count++;
      } else {
        (this.grid[r][col] === player) ? count++ : count = 0;
      }
      (best_values[col] < count) ? best_values[col] = count : null;
    }

    let baseRow = row - col > 0 ? row - col : 0;
    let baseCol = col - row;
    for (let d = baseRow; d < this.rows; d++) {
      if (row === d && col === d + baseCol) {
        count++;
      } else {
        (this.grid[d][d + baseCol] === player) ? count++ : count = 0;
      }
      (best_values[col] < count) ? best_values[col] = count : null;
    }

    count = 0;
    baseRow = row + col < this.rows - 1 ? row + col : this.rows - 1;
    baseCol = col + row;
    for (let d = baseRow; d >= 0; d--) {
      if (row === d && col === baseCol - d) {
        count++;
      } else {
        (this.grid[d][baseCol - d] === player) ? count++ : count = 0
      }
      (best_values[col] < count) ? best_values[col] = count : null;
    }
    return best_values
  }

  // Récupère les valeurs les plus hautes dans un tableau
  getMaxIndexes(array) {
    var max = -Infinity;
    var maxIndices = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i] === max) {
        maxIndices.push(i);
      } else if (array[i] > max) {
        maxIndices = [i];
        max = array[i];
      }
    }
    return maxIndices;
  }
}

let p4;
// Si l'objet n'a pas été crée
if (!p4) {
  // On détermine le mode de jeu en fonction de l'url
  switch (window.location.pathname) {
    case "/single":
      p4 = new Puissance4(true);
      break;
    case '/multiplayer':
      p4 = new Puissance4(false);
      break;
  }
}

