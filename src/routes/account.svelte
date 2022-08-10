<script>
// @ts-nocheck
  import Login, { loggedIn } from "$lib/Login.svelte";
</script>


<h1>
  Account
</h1>

{#if !$loggedIn}

<Login />

{:else}
<p>Welcome. You are logged in</p>
{/if}