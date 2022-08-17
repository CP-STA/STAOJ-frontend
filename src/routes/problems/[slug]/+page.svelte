<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData} */
	export let data;
	import { page } from '$app/stores';
	import CodeInput from "$lib/CodeInput.svelte";
	let slug = $page.params.slug;
</script>

<h1 class="text-center">{data.problem.name}</h1>
<p class="text-center">By {data.problem.author}</p>
<div class="container">
	<div class="row align-items-start">
		<div class="col text-end">
			Time: {data.problem.time} ms
		</div>
		<div class="col text-start">
			Memory: {data.problem.memory} kb
		</div>
	</div>
</div>
<h2>Problem Statement</h2>
<p>
	{data.problem.problemStatement}
</p>
<h2>Constrains</h2>
<p>{data.constrains}</p>


{#if data.problem.subtasks}
	{#each data.problem.subtasks as subtask, i}
		<h3>
			Subtask {i + 1} ({subtask.percentage * 100} %)
		</h3>
		<p>
			{subtask.constrains}
		</p>
	{/each}
{/if}

<h2>Examples</h2>
{#each data.problem.examples as example}
	<div class="card my-3">
		<div class="card-body">
			<h3>Input</h3>
			<div class="card">
				<div class="card-body">
					<code>{example.input}</code>
				</div>
			</div>
			<h3>Output</h3>
			<div class="card">
				<div class="card-body">
					<code>{example.input}</code>
				</div>
			</div>
		</div>
	</div>
{/each}

<CodeInput languages={data.languages} />