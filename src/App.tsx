import type { Component } from "solid-js";

const App: Component = () => {
	return (
		<section class="min-h-screen w-full bg-slate-900 flex flex-col items-center">
			<article class="w-96 flex">
				<div class="flex flex-col w-max">
					<span id="header" class="rounded-tl-lg bg-slate-800 border-r-2 text-white p-2">
						Asdas
					</span>
					<span class="bg-gray-600 border-r-2 text-white p-2"> Asdasd </span>
					<span class="bg-gray-600 border-r-2 text-white p-2"> Asdasd </span>
					<span class="bg-gray-600 rounded-bl-lg border-r-2 text-white p-2"> Asdasd </span>
				</div>
				<div class="flex flex-col w-max">
					<span id="header" class="bg-slate-800 border-r-2 text-white p-2">
						🎶
					</span>
					<span class="bg-gray-600 border-r-2 text-white p-2 flex items-center justify-center bg"> 🟢 </span>
					<span class="bg-gray-600 border-r-2 text-white p-2"> 🔴 </span>
					<span class="bg-gray-600 border-r-2 text-white p-2"> 🟢 </span>
				</div>
				<div class="flex flex-col w-max">
					<span id="header" class="h-10 rounded-tr-lg bg-slate-800 text-white p-2"></span>
					<span class="bg-gray-600 text-white p-2 flex items-center justify-center"> edit </span>
					<span class="bg-gray-600 text-white p-2"> edit </span>
					<span class="bg-gray-600 rounded-br-lg text-white p-2"> edit </span>
				</div>
			</article>
		</section>
	);
};

export default App;
