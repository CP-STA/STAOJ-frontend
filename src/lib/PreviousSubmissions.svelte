<script>
	import { Query, onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { formatDate, formateFirebaseDate } from '$lib/utils';

	/** @type Query */
	export let q;
	/** @type QueryDocumentSnapshot[] */
	let submissions = [];

	let loading = true;

	/**
	 * @type {import("@firebase/firestore").Unsubscribe}
	 */
	let unsub;

	let startLoading = false;

	export function load() {
		if (!startLoading) {
			startLoading = true;
			unsub = onSnapshot(q, (querySnapshot) => {
				/** @type QueryDocumentSnapshot[] */
				let newSubmissions = [];
				querySnapshot.forEach((doc) => newSubmissions.push(doc));
				submissions = newSubmissions;
				loading = false;
			});
		}
	}

	onMount(() => {
		return () => {
			if (unsub) {
				console.log('unsub list');
				unsub();
			}
		};
	});
</script>

<table class="table">
	<tr>
		<th scope="col">ID</th>
		<th scope="col">Submission Time</th>
		<th scope="col">Verdict</th>
	</tr>
	{#if loading}
		<th scope="row">Loading...</th>
		<td />
		<td />
	{:else}
		{#each submissions as doc}
			<tr>
				<th scope="row">{doc.id}</th>
				<td>{formateFirebaseDate(doc.data().submissionTime)}</td>
				<td>Under Construction</td>
			</tr>
		{/each}
	{/if}
</table>
