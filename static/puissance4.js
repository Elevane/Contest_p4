class Puissance4 {

  constructor(ai = false) {
    this.ai = ai;

    // On met en place le nombre de lignes et de colonnes de la grille
    this.rows = 6;
    this.cols = 7;

    // On met en place le nombre de tour
    this.turn = 1;

    // On désigne celui qui commence la partie
    this.starter = Math.round(Math.random());
    const player = (this.turn - this.starter) % 2 + 1
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

    this.ai ? this.playAI() : null
  }

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

  handleClick(event) {
    if (event.target.attributes.col && !this.winner) {
      const selected_col = parseInt(event.target.attributes.col.value)
      let reached_row = this.getMouvement(selected_col)
      if (reached_row === null) {
        $('h3.full-column').show();
      } else {
        $('h3.full-column').hide();
        // On vérifie si une ligne a été complété
        this.determineWinner(reached_row, selected_col)

        this.ai ? this.playAI() : null;
      }
    }
  }

  playAI() {
    if ((this.turn - this.starter) % 2 === 0) {

      let reached_row = null;
      let random;
      while (reached_row === null) {
        random = Math.floor(Math.random() * this.cols)
        reached_row = this.getMouvement(random)
      }
      this.determineWinner(reached_row, random)
    }
  }

  recoverClick() {
    self = this;
    $('table#puissance4').on('click', function (event) {
      self.handleClick(event);
    })
  }

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

  placePiece(row, col) {
    const player = (this.turn - this.starter) % 2 + 1
    this.grid[row][col] = player;
    this.turn++;

    // On indique quel utilisateur doit jouer avec des éléments graphiques
    $("span[id^='player-coin-']").show()
    $('span#player-coin-' + player).hide()
  }

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
      $('a#main-title').text(this.winner !== 0 ? `Victoire de Joueur ${this.winner} !` : `Egalite !`)
      $('table#puissance4').off('click')
      $('button#reset-grid').show();
    }
  }

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
}


  let p4 = new Puissance4(true);

