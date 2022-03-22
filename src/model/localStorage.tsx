import { Accessor, createSignal, Setter } from "solid-js";
import { Header } from "./store";

export function createLocalStorageSignal<T extends object>(
	key: string
): T extends (...args: never) => unknown ? unknown : [get: Accessor<T>, set: Setter<T>];

export function createLocalStorageSignal<T extends object>(key: string): [Accessor<T>, Setter<T>] {
	const storage = window.localStorage;
	let initialValue: T = JSON.parse( storage.getItem(key) ?? `{"value":{"foldersDetails":[{"id":"hdtcpj6e0tqb4abquqv8cl-2","name":"first","isopen":true,"files":[{"id":"jrhspj6e0koueoasep88cl-3","name":"new Item","isactive":false,"isopen":true,"folderId":"hdtcpj6e0tqb4abquqv8cl-2","index":0},{"id":"6bpcpj6c00vdv7qhncc8cl-2","name":"secod t","isactive":true,"isopen":true,"folderId":"hdtcpj6e0tqb4abquqv8cl-2","index":1}],"index":0}],"activeFileDetails":{"fileId":"6bpcpj6c00vdv7qhncc8cl-2","folderId":"hdtcpj6e0tqb4abquqv8cl-2"},"prevActiveFileDetails":{"fileId":"v47j6cpj07n8kvmt1begcl-1","folderId":"25amcpj6g07272085t0p8cl-0"}}}` ).value;
	const [value, setValue] = createSignal<T>(initialValue);
	const newSetValue = (newValue: T | ((v: T) => T)): T => {
		//@ts-ignore
		const _val: T = typeof newValue === "function" ? newValue(value()) : newValue;
		setValue(_val as any);
		storage.setItem(key, JSON.stringify({ value: _val }));
		return _val;
	};
	return [value, newSetValue as Setter<T>];
}

const key = 'lunchAI';
if( !(key in localStorage) ) {
	console.log("Running")
	localStorage.setItem(key,`{"value":{"foldersDetails":[{"id":"hdtcpj6e0tqb4abquqv8cl-2","name":"first","isopen":true,"files":[{"id":"jrhspj6e0koueoasep88cl-3","name":"new Item","isactive":false,"isopen":true,"folderId":"hdtcpj6e0tqb4abquqv8cl-2","index":0},{"id":"6bpcpj6c00vdv7qhncc8cl-2","name":"secod t","isactive":true,"isopen":true,"folderId":"hdtcpj6e0tqb4abquqv8cl-2","index":1}],"index":0}],"activeFileDetails":{"fileId":"6bpcpj6c00vdv7qhncc8cl-2","folderId":"hdtcpj6e0tqb4abquqv8cl-2"},"prevActiveFileDetails":{"fileId":"v47j6cpj07n8kvmt1begcl-1","folderId":"25amcpj6g07272085t0p8cl-0"}}}`);
}
type STORE = { headers: Header[]; rows: Row[] }
export const [get, set] = createLocalStorageSignal<Readonly<STORE>>(key);
