import { createStore, produce } from "solid-js/store";

function uid() {
	let a = new Uint32Array(3);
	window.crypto.getRandomValues(a);
	return (
		performance.now().toString(36) +
		Array.from(a)
			.map((A) => A.toString(36))
			.join("")
	).replace(/\./g, "");
}

export type Col = {
	header: string;
	cells: Cell[];
	at: number;
};

export type Cell = {
	row: number;
	col: number;
	content: string;
	metadata: any;
};

export type STORE = { table: Col[] };

export const [store, setStore] = createStore<STORE>({ table: [] });

const addCol = (col: Partial<Col> = {}) => {
	setStore(
		"table",
		produce((table) => {
			table.push({
				at: store.table.length,
				cells: [],
				header: `default ${store.table.length}`,
				...col,
			});
		})
	);
};

export const convert = (response: string[][]) => {
	const headers = response[0];
	setStore(
		"table",
		produce((table) => {
			for (let ci = 0; ci < headers.length; ci++) {
				const header = headers[ci];
				const cellsdata: Cell[] = [];
				for (let ri = 1; ri < response.length; ri++) {
					cellsdata.push({
						row: ri,
						col: ci+1,
						content: response[ri][ci],
						metadata: null,
					});
				}
				table.push({
					header,
					cells: cellsdata,
					at: ci+1,
				});
			}
		})
	);
};

/* 
	createHeader,
	createRow,
	creaetCell,
	addRow,
	addCol,
	removeRow,
	removeCol,
	updateRow,
	updateCol,
	updateCell,
	getRow,
	getCol,
	sortCol
*/
