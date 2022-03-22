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

export type Header = {
	index: number;
	body: string;
	metadata: any;
};

export type Row = {
	index: number;
	cells: Cell[];
	metadata: any;
};

export type Cell = {
	row: number;
	col: number;
	body: string;
	metadata: any;
};

export type STORE = { headers: Header[]; rows: Row[] };

export const [store, setStore] = createStore<STORE>({ headers: [], rows: [] });

const addHeader = (header: Partial<Header> = {}) => {
	setStore(
		"headers",
		produce((headers) => {
			headers.push({
				index: store.headers.length,
				body: "Default Header",
				metadata: null,
				...header,
			});
		})
	);
};

const addRow = (row: Row) => {
	setStore(
		"rows",
		produce((rows) => {
			rows.push({
				index: store.rows.length,
				cells: [],
				metadata: [],
			});
		})
	);
}

const createCells = (cellData:Cell[]) => {

}


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
