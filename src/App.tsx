import { Component, For, Index, PropsWithChildren } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { store, setStore, Row } from "./model/store";
import { store as storeV2, setStore as setStoreV2, convert } from "./model/storeV2";

import { response } from "./model/example";

const App: Component = () => {
	let inputRef: HTMLInputElement;
	const cvt = (response: string[][]) => {
		const headersRes = response[0];
		setStore(
			"headers",
			produce((headers) => {
				for (let ci = 0; ci < headersRes.length; ci++) {
					headers.push({
						index: ci + 1,
						body: headersRes[ci],
						metadata: [],
					});
				}
			})
		);
		let rowLen = response.length;
		setStore(
			"rows",
			produce((rows) => {
				for (let ri = 1; ri < rowLen; ri++) {
					const row: Row = {
						index: ri,
						metadata: [],
						cells: [],
					};
					for (let ci = 0; ci < headersRes.length; ci++) {
						row.cells.push({
							body: response[ri][ci],
							row: ri,
							col: ci,
							metadata: [],
						});
					}
					rows.push(row);
				}
			})
		);
	};
	cvt(response);

	console.log(store);
	console.log(storeV2);
	convert(response);
	console.log(storeV2);

	return (
		<>
			<section class="min-h-screen w-full bg-slate-900 flex flex-col items-center">
				<div class="flex">
					<Index each={storeV2.table}>
						{(t, i) => (
							<div
								class="flex flex-col w-max border-green-100"
								classList={{
									"border-l-2": i !== 0,
								}}>
								<Header at={i} content={t().header} />
								<Index each={t().cells}>{(c, j) => <Cell at={[j, i]} content={c().content} />}</Index>
							</div>
						)}
					</Index>
				</div>
			</section>
		</>
	);
};

const cclass = `
 	px-5 py-3 font-bold
`;

const Header = (props: { at: number; content: string }) => {
	const { content, at } = props;
	return <div class={`bg-[#4c8896] text-[#cae8fd] uppercase ${cclass}`}>{content}</div>;
};

const Cell = (props: { content: string; at: [number, number] }) => {
	const { content, at } = props;
	return (
		<div
			class={`flex text-sm gap-x-5 place-content-between items-center bg-[#cae8fd] text-[#4c8896] border-green-100 ${cclass}`}
			classList={{
				"border-t-2": at[0] !== 0,
			}}>
			{content}
			<div class="flex items-center gap-x-2">
				🟢
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-[#114552]"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
					/>
				</svg>
				<div class="bg-white flex items-center justify-center rounded-3xl p-0.5">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5"
						fill="none"
						viewBox="0 0 3 6"
						stroke="currentColor"
						stroke-width="2">
						 <circle cx="1.5" cy="1" r="0.5" stroke="none" stroke-width="0" fill="#114552" />#
						 <circle cx="1.5" cy="3" r="0.5" stroke="none" stroke-width="0" fill="#114552" />
						 <circle cx="1.5" cy="5" r="0.5" stroke="none" stroke-width="0" fill="#114552" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default App;

/* 
		<section class="min-h-screen w-full bg-slate-900 flex flex-col items-center">
			<article class="w-96 flex">
				<table class="">
					<thead>
						<tr class="text-xs text-gray-700 bg-gray-50 uppercase text-left">
							<Index each={store.headers}>
								{(header) => (
									<th scope="col" class="px-6 py-3 border-r-2">
										{header().body}
									</th>
								)}
							</Index>
						</tr>
					</thead>
					<tbody>
						<Index each={store.rows}>
							{row => (
								<tr class="border-b bg-teal-200 hover:bg-teal-100">
									<Index each={row().cells}>
										{cell => (
											<td class="px-6 py-4 text-teal-900">{cell().body}</td>
										)}
									</Index>
								</tr>
							)}
						</Index>
					</tbody>
				</table>
			</article>
		</section>
*/
