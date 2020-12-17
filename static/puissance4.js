class Puissance4 {

  constructor() {
    // On met en place le nombre de lignes et de colonnes de la grille
    this.rows = 6;
    this.cols = 7;

    // On met en place le nombre de tour
    this.turn = 1;

    // On met en place une variable qui stockera l'utilisateur gagnant
    this.winner = null;

    // On construit un tableau de tableau contenant this.rows de rangées chacune ayant this.cols colonnes
    this.grid = []
    for(let r = 0; r < this.rows; r++) {
      this.grid[r] = Array(this.cols).fill(null)
    }

    // A chaque clic sur le tableau, la fonction handleClick se lance
    self = this;
    $('table#puissance4').on('click', function (event) {
      self.handleClick(event)
    })

    this.setGrid();
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

  handleClick(event) {
    if (event.target.attributes.col) {
      const selected_col = parseInt(event.target.attributes.col.value)
      let reached_row = this.getMouvement(selected_col)
      if (reached_row === null) {
        $('h3.full-column').show();
      } else {
        $('h3.full-column').hide();
        // On vérifie si une ligne a été complété
        let result = this.checkLines(reached_row, selected_col)
        if (result) {
          this.winner = this.turn % 2 + 1;
          $('table#puissance4').off('click')
        } else if (this.turn === this.rows * this.cols) {
          this.winner = 0;
          $('table#puissance4').off('click')
        }
        // Si l'action d'ajouter une pièce a été validé, on reconstruit la grille
        this.setGrid();
      }
    }
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
    this.grid[row][col] = this.turn % 2 + 1;
    this.turn++;
  }

  checkLines(row, col) {
    // On va tester dans toutes les directions à partir de la dernière pièce posée si une ligne a été complété
    // Horizontal
    let count = 0;
    for (let c = 0; c < this.cols; c++) {
      (this.grid[row][c] === (this.turn + 1) % 2 + 1) ? count++ : count = 0;
      if (count === 4) return true
    }

    // Vertical
    count = 0;
    for (let r = 0; r < this.rows; r++) {
      (this.grid[r][col] === (this.turn + 1) % 2 + 1) ? count++ : count = 0;
      if (count === 4) return true
    }

    // Diagonale (gauche-droite)
    // On détermine la base de la diagonale en X et Y selon les coordonnées de la dernière pièce ajoutée
    let baseRow = row - col > 0 ? row - col : 0;
    let baseCol = col - row;
    // On parcours en escalier la grille à partir de la base de la diagonale en X (baseRow)
    for (let d = baseRow; d < this.rows; d++) {
      // Pour chaque itération, on décale l'escalier d'une colonne en Y (baseCol)
      (this.grid[d][d + baseCol] === (this.turn + 1) % 2 + 1) ? count++ : count = 0;
      if (count === 4) return true
    }

    // Diagonale inversée
    // Même chose que pour une diagonale mais parcours de l'escalier inversé
    baseRow = row + col < this.rows - 1 ? row + col : this.rows - 1;
    baseCol = col + row;
    for (let d = baseRow; d >= 0; d--) {
      (this.grid[d][baseCol - d] === (this.turn + 1) % 2 + 1) ? count++ : count = 0
      if (count === 4) return true
    }

    return false;
  }
}

const p4 = new Puissance4();
