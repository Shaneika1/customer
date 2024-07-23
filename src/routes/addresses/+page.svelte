<script lang='ts'>

    import supabase from "$lib/supabase";
    import { onMount } from "svelte";
    import {getUser} from "../../lib/index"

    let address:string = ''
    let addresses = [] 
    let user = {}
    let loading = false;
    let message = ''

    const add = async () => {
        loading = true;
        await supabase.from('addresses').insert({address, user: user.id}).then(res => {
            message = 'Address Added'
        })
        loading = false;
        loadData()
    }

    const loadData = async () => {
        let userData = await getUser(localStorage.getItem('token'))
        let data = await supabase.from("addresses").select().eq('user', userData.id)
        addresses = data.data
        user = userData
    }

    onMount(async () => {
        loadData()
    })


    const deleteAddress = async (id: number) => {
        loading = true;
        await supabase.from("addresses").delete().eq('id', id).then(res => {
            message = 'Address Deleted'
        })
        loading = false;
        loadData()
    }
</script>

{#if loading == false}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 mx-auto text-center py-24 lg:py-16">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Addresses
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
                Create your addresses here
            </p>
        </div>

        

    <div class="relative  mx-10 p-10 "style='box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;'>
        <div class="lg:grid lg:grid-cols-2 text-left lg:px-24 overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase  ">
                    <tr>
                        <th scope="col" class="px-6  py-1">
                            Address
                        </th>
                    
                        <th scope="col" class="px-6  py-1">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each addresses as address}
                        <tr class="bg-white border-b  ">
                            <th scope="row" class="px-6  py-1 font-medium text-gray-900 whitespace-nowrap ">
                                {address.address}
                            </th>
                            <th scope="row" on:click={() => deleteAddress(address.id)} style='cursor:pointer' class="px-6  py-1 text-red-500 font-medium text-gray-900 whitespace-nowrap ">
                                Delete
                            </th>
                        </tr>
                    {/each}
                    
                </tbody>
            </table>
            <div class="lg:my-5 my-10">
                <div class="max-w-md mx-auto">
                    <div class="relative z-0 w-full mb-5 group">
                        <label
                            for="email"
                            class="block text-gray-700 text-sm font-bold mb-2"
                            >Enter Address</label
                        >
                        <input
                            type="email"
                            bind:value={address}
                            name="floating_email"
                            id="floating_email"
                            class=" w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder=" "
                            required
                        />
                    </div>


                    <div class="flex items-center justify-between">
                        <button
                            on:click={() => add()}
                            class=" confirm-buttons text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >Add Address</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>

    </section>   
{/if}         


{#if loading == true}
<div class="text-center">
    <div role="status">
        <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>
{/if}