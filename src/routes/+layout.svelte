<script lang='ts'>
    import { onMount } from "svelte";
    import supabase from "../lib/supabase";

    let loggedIn:boolean = false;
    let aria = false

    const logout = () => {
        localStorage.clear()
        window.location.href = '/authentications/login'
    }

    const toggle = () => {
        aria = !aria
    }

    onMount(() => {
        if(localStorage.getItem('token')) {
            loggedIn = true;
        }
    })

</script>

<nav class="bg-white drop-shadow-2xl border-gray-200">
    <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
        <a
            href="/"
            class="flex items-center space-x-3 rtl:space-x-reverse"
        >
            <img
                src="/lo.png"
           
                class="h-10"
                alt="Flowbite Logo"
            />
            
        </a>
        <button
            data-collapse-toggle="navbar-default"
            on:click={() => toggle()}
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={aria}
        >
            <span class="sr-only">Open main menu</span>
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                />
            </svg>
        </button>
        <div class={aria ? "hidden w-full md:block md:w-auto" : "w-full md:block md:w-auto"} id="navbar-default">
            <ul
                class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
            >
                <li>
                    <a
                    on:click={() => toggle()}
                        href="/"
                        class="block py-2 px-3 text-dark rounded md:border-0 md:p-0"
                        >Home</a
                    >
                </li>
                
                <li>
                    <a
                    on:click={() => toggle()}
                        href="/blogs"
                        class="block py-2 px-3 text-dark rounded md:border-0 md:p-0"
                        >Blog</a
                    >
                </li>
                {#if loggedIn == false}
                <li>
                    <a
                    on:click={() => toggle()}
                        href="/guestOrder"
                        class="block py-2 px-3 text-dark rounded md:border-0 md:p-0"
                        >Order</a
                    >
                </li>
                {/if}
                {#if loggedIn == true}
                

                <li>
                    <a
                    on:click={() => toggle()}
                        href="/lists"
                        class="block py-2 px-3 text-dark rounded md:border-0 md:p-0"
                        >Lists</a
                    >
                </li>

                <li>
                    <a
                    on:click={() => toggle()}
                        href="/orders"
                        class="block py-2 px-3 text-dark rounded md:border-0 md:p-0"
                        >Orders</a
                    >
                </li>
                
                <li>
                    <a
                    on:click={() => toggle()}
                        href="/profile"
                        class="block py-2 px-3 lg:mb-0 mb-4 text-dark rounded md:border-0 md:p-0"
                        >Profile</a
                    >
                </li>
                {/if}
                <li>
                    {#if loggedIn == false}
                    <a href="/authentications/login" style='background-color: #48c4c2;' class="mt-5 lg:mt-0 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
                        Login
                      </a>
                      {/if}

                      {#if loggedIn == true}
                        <a on:click={() => logout()} style='background-color: #FF333F;' class="cursor mt-5 lg:mt-0 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
                            Logout
                        </a>
                      {/if}
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class='lg:my-1'>
<slot/>
</div>



