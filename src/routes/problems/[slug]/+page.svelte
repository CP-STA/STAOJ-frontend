<script>

	/** @type {import('./$types').PageData} */
	export let data;
	import { page } from '$app/stores';
	let slug = $page.params.slug;
</script>

<h1 class="text-center">{data.name}</h1>
<p class="text-center">By {data.author}</p>
<div class="container">
	<div class="row align-items-start">
		<div class="col text-end">
			Time: {data.time} ms
		</div>
		<div class="col text-start">
			Memory: {data.memory} kb
		</div>
	</div>
</div>
<h2>Problem Statement</h2>
<p>
	{data.problemStatement}
</p>
<h2>Constrains</h2>
<p>{data.constrains}</p>

{#if data.subtasks}
	{#each data.subtasks as subtask, i}
		<h3>
			Subtask {i + 1} ({subtask.percentage * 100} %)
		</h3>
		<p>
			{subtask.constrains}
		</p>
	{/each}
{/if}

<h2>Examples</h2>
{#each data.examples as example}
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
