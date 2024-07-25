<script lang="ts">

    import { onMount } from "svelte";
    import moment from "moment";
    import {
        getUser,
        generateRandomNumber,
        generateOrderId,
        checkFields,
    } from "$lib/index";
    import supabase from "$lib/supabase";
    import swal from "sweetalert2";

    let orders = []
    let worker = {}

    let loading = false;
    let section = 'table'

    let curUser = {}

    const loadInfo = async () => {
        let token = localStorage.getItem("token");
        let user = await getUser(token);
        curUser = user

        await supabase
            .from("orders")
            .select()
            .eq("email", curUser.email)
            .then((res) => {
                orders = res.data;
            });
    };

    const viewDriver = async (id) => {
        await supabase
            .from("users")
            .select()
            .eq("id", id)
            .then((res) => {
                worker = res.data[0];
                section = "driver";
            });
    };

    onMount(() => {
        loadInfo()
    })
</script>


{#if loading == false}
    <section class="guest-order-section bg-center bg-no-repeat">
        <div class="px-4 mx-auto text-center py-24 lg:py-16">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl header"
            >
                Orders
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 lg:px-48 normal-text"
            >
               View your current and previous orders here
            </p>
        </div>        

        <div
        class="mx-1 p-5"
        style=""
    >
        {#if section == "table"}
        <div class="lg:my-5 my-10 w-full overflow-x-auto">
            <h1 class="text-2xl mb-2">Previous Orders</h1>
            <table>
                <tr>
                    <th>Order Id</th>
                    <th>Delivery Day</th>
                    <th>Delivery Time</th>
                    <th>Status</th>
                    <th>Driver</th>
                    <th># of items</th>
                </tr>
                {#each orders as order}
                    <tr>
                        <td>{order.orderId}</td>
                        <td>{order.day}</td>
                        <td>{order.time}</td>
                        <td>{order.status}</td>
                        <td
                            >{#if order.worker}<p
                                    style="cursor:pointer; color:blue; text-decoration:underline"
                                    on:click={() =>
                                        viewDriver(order.worker)}
                                >
                                    {order.driver}
                                </p>{/if}</td
                        >
                        <td>{order.items.length}</td>
                    </tr>
                {/each}
            </table>
        </div>
    {/if}

    {#if section == "driver"}

                <div class="lg:my-5 my-10 lg:mx-10">
                    <button
                        on:click={() => section = 'table'}
                        class=" confirm-buttons mb-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >Back</button
                    >
                    <h1>{worker.firstname + " " + worker.lastname}</h1>
                    <img
                        src={worker.image}
                        class='my-3'
                        style="width:300px; height:200px; object-fit: cover; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                    />
                    <p>{worker.bio}</p>
                </div>
            {/if}
    </div>
    </section>
{/if}        