import DOM from "./DOM.js";

export default class Table {

    constructor (id, rows, cols, cellSize, matrix, heads, rowHeads) {
        this.id = id;
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.matrix = matrix;

        this.heads = heads;
        this.rowHeads = rowHeads;
    }

    render () {
        const table = DOM.create('table', 'table');
        table.id = this.id;

        const tableHeader = DOM.create('thead', 'table-header');
        table.appendChild(tableHeader);

        const tableBody = DOM.create('tbody', 'table-body');
        table.appendChild(tableBody);

        if (this.heads) {
            const tableHead = DOM.create('tr', 'table-head');
            tableHeader.appendChild(tableHead);

            for (let i = 0; i < this.cols; i++) {
                const tableHeadCell = DOM.create('th', 'table-head-cell', this.heads[i]);
                tableHead.appendChild(tableHeadCell);
            }
        }

        for (let i = 0; i < this.rows; i++) {
            const tableRow = DOM.create('tr', 'table-row');
            tableBody.appendChild(tableRow);

            if (this.rowHeads) {
                const tableRowHead = DOM.create('th', 'table-row-head', this.rowHeads[i]);
                tableRow.appendChild(tableRowHead);
            }

            for (let j = 0; j < this.cols; j++) {
                const tableCell = DOM.create('td', 'table-cell');
                tableRow.appendChild(tableCell);

                const tableCellContent = DOM.create('div', 'table-cell-content');
                tableCell.appendChild(tableCellContent);

                const tableCellContentText = DOM.create('p', 'table-cell-content-text', this.matrix[i][j]);
                tableCellContent.appendChild(tableCellContentText);
            }
        }

        return table;
    }
}